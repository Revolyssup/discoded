package main

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/docker/pkg/stdcopy"
	"github.com/docker/go-connections/nat"
)

//CreateNewContainer ... Creates a new container based on given image and context of request and returns the standard output and error from it
func CreateNewContainer(ctx context.Context, image string, code string, input string, script string, filename string) (string, string, error) {
	cli, err := client.NewEnvClient()
	if err != nil {
		fmt.Println("Unable to create docker client")
		panic(err)
	}

	hostBinding := nat.PortBinding{
		HostIP:   "0.0.0.0",
		HostPort: "8000",
	}
	containerPort, err := nat.NewPort("tcp", "80")
	if err != nil {
		fmt.Println("Unable to get the port")
	}

	fmt.Println("[INPUT CODE]", code)

	portBinding := nat.PortMap{containerPort: []nat.PortBinding{hostBinding}}
	cont, err := cli.ContainerCreate(
		ctx,
		&container.Config{
			Image:        image,
			Cmd:          []string{script, input, code, filename}, //By convention, $1=input, $2=code, $3=filename
			Tty:          false,
			AttachStderr: true,
			AttachStdin:  true,
			AttachStdout: true,
		},
		&container.HostConfig{
			PortBindings: portBinding,
		}, nil, nil, "")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Printf("%v is the container id\n", cont.ID)
	err = cli.ContainerStart(ctx, cont.ID, types.ContainerStartOptions{})
	if err != nil {
		fmt.Printf("error starting container: %s\n", err)
		panic("Could not start the container")
	}

	fmt.Printf("Container %s is started", cont.ID)

	stopch := make(chan int)
	// if the container exceeds the time limit given here as 3 seconds
	go stopContainer(cli, cont.ID, stopch, 3)

	//wait untill the container stops
	statusCh, errCh := cli.ContainerWait(ctx, cont.ID, container.WaitConditionNotRunning)
	select {
	case err := <-errCh:
		if err != nil {
			panic(err)
		}
	case <-statusCh:
	case <-stopch:
		{
			return "", "", errors.New("Time limit exceeded")
		}
	}

	// The missing "follow" in the containerlogsoptions costed me 2 days. Because I couldn't get any logs out even though my code running container
	//was clearly flushing them in stdout. :(
	out, err := cli.ContainerLogs(ctx, cont.ID, types.ContainerLogsOptions{ShowStdout: true, ShowStderr: true, Follow: true})
	if err != nil {
		fmt.Println(err)
	}

	//cleanup
	go func() {
		err := cli.ContainerRemove(context.TODO(), cont.ID, types.ContainerRemoveOptions{})
		if err != nil {
			fmt.Println(err)
		}
	}()

	//demultiplexing the output and returning it
	bufout := new(bytes.Buffer)
	buferr := new(bytes.Buffer)
	stdcopy.StdCopy(bufout, buferr, out)
	stdout := bufout.String()
	stderr := buferr.String()

	return stdout, stderr, nil
}

//timeout is in seconds
func stopContainer(cli *client.Client, containerID string, stopch chan<- int, timeout time.Duration) {
	time.Sleep(timeout * time.Second)
	err := cli.ContainerStop(context.TODO(), containerID, nil)
	if err != nil {
		//maybe the container exited normally or the TLE occurred
		fmt.Println(err)
	} else {
		stopch <- 1
	}
}

func RunLRC(ctx context.Context, image string, code string, input string, script string, language string) string {
	cli, err := client.NewEnvClient()
	if err != nil {
		fmt.Println("Unable to create docker client")
		panic(err)
	}
	res, err := cli.ContainerExecCreate(ctx, track.ContIDs[language], types.ExecConfig{Privileged: true, AttachStdin: true, AttachStdout: true, Cmd: []string{script, input, code}})
	return res.ID
}

//Spin the long running containers when goglot spins up.
func (track *TrackCont) SpinLRC() {
	indexCont := []string{"postgres"}
	indexImage := []string{"revoly/pgrunner"}
	cli, err := client.NewEnvClient()
	if err != nil {
		fmt.Println("Unable to create docker client")
		panic(err)
	}

	//starting all the long running containers.
	for i := 0; i < len(indexCont); i++ {
		hostBinding := nat.PortBinding{
			HostIP:   "0.0.0.0",
			HostPort: fmt.Sprint(8000 + i),
		}
		containerPort, err := nat.NewPort("tcp", "80")
		if err != nil {
			fmt.Println("Unable to get the port")
		}
		portBinding := nat.PortMap{containerPort: []nat.PortBinding{hostBinding}}
		cont, errstrt := cli.ContainerCreate(
			context.TODO(),
			&container.Config{
				Image:        indexImage[i],
				Tty:          false,
				AttachStderr: true,
				AttachStdin:  true,
				AttachStdout: true,
			},
			&container.HostConfig{
				PortBindings: portBinding,
			}, nil, nil, "")
		track.ContIDs[indexCont[i]] = cont.ID
		if errstrt != nil {
			fmt.Println(err)
		}

		err = cli.ContainerStart(context.TODO(), cont.ID, types.ContainerStartOptions{})
		if err != nil {
			fmt.Printf("error starting container: %s\n", err)
			panic("Could not start the container")
		}

		fmt.Printf("Container %s is started", cont.ID)

		//To stop the container after 30 minutes
		go stopContainer(cli, track.ContIDs[indexCont[i]], nil, 30*60)
	}

}
