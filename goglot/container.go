package main

import (
	"bytes"
	"context"
	"fmt"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/filters"
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
		panic("Unable to get the port")
	}

	fmt.Println("[INPUT CODE]", code)

	portBinding := nat.PortMap{containerPort: []nat.PortBinding{hostBinding}}
	cont, err := cli.ContainerCreate(
		ctx,
		&container.Config{
			Image:        image,
			Cmd:          []string{script, input, code, filename},
			Tty:          false,
			AttachStderr: true,
			AttachStdin:  true,
			AttachStdout: true,
		},
		&container.HostConfig{
			PortBindings: portBinding,
		}, nil, nil, "")
	if err != nil {
		panic(err)
	}
	fmt.Printf("%v is the container id\n", cont.ID)
	err = cli.ContainerStart(ctx, cont.ID, types.ContainerStartOptions{})
	if err != nil {
		fmt.Printf("error starting container: %s\n", err)
		panic("Could not start the container")
	}

	fmt.Printf("Container %s is started", cont.ID)

	// The missing "follow" in the containerlogsoptions costed me 2 days. Because I couldn't get any logs out even though my code running container
	//was clearly flushing them in stdout. :(
	out, err := cli.ContainerLogs(ctx, cont.ID, types.ContainerLogsOptions{ShowStdout: true, ShowStderr: true, Follow: true})
	if err != nil {
		panic(err)
	}

	//cleanup
	go func() {
		_, err := cli.ContainersPrune(ctx, filters.Args{})
		if err != nil {
			panic("[Clean up failed]: Could not remove containers")
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
