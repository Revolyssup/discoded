package main

import (
	"archive/tar"
	"bytes"
	"context"
	"fmt"
	"io"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/docker/pkg/stdcopy"
	"github.com/docker/go-connections/nat"
)

//CreateNewContainer ... Creates a new container based on given image and context of request and returns the standard output and error from it
func CreateNewContainer(ctx context.Context, image string, code string, input string, lan string) (string, string, error) {
	var script string
	var filename string
	const inputfile string = "inputfile"
	switch lan {
	case "cpp":
		{
			script = "./runcpp.sh"
			filename = "test.cpp"
		}
	}
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
			Tty:          false,
			AttachStderr: true,
			AttachStdin:  true,
			AttachStdout: true,
		},
		&container.HostConfig{
			PortBindings: portBinding,
			AutoRemove:   true,
			// Resources:container.Resources{
			// 	CPUShares:
			// }

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

	// statusCh, errCh := cli.ContainerWait(ctx, resp.ID, container.wa)
	// select {
	// case err := <-errCh:
	// 	if err != nil {
	// 		panic(err)
	// 	}
	// case <-statusCh:
	// }

	err = cli.CopyToContainer(ctx, cont.ID, "/usr/src/myapp/", createTar(filename, code), types.CopyToContainerOptions{})
	if err != nil {
		fmt.Printf("error copying code to container: %s\n", err)
		panic("Could not copy code to the container")
	}

	err = cli.CopyToContainer(ctx, cont.ID, "/usr/src/myapp/", createTar(inputfile, input), types.CopyToContainerOptions{})
	if err != nil {
		fmt.Printf("error copying input to container: %s\n", err)
		panic("Could not copy input to the container")
	}

	// Create an exec process
	execResp, err := cli.ContainerExecCreate(ctx, cont.ID, types.ExecConfig{
		Cmd: []string{script},
	})
	if err != nil {
		panic("[EXEC CREATE FAIL]: Failed to exec in the container: " + err.Error())
	}

	// Start the exec process
	if err := cli.ContainerExecStart(ctx, execResp.ID, types.ExecStartCheck{}); err != nil {
		panic("[EXEC START FAIL]: Failed to exec in the container: " + err.Error())
	}

	// time.Sleep(5 * time.Second)

	fmt.Printf("Container %s is started", cont.ID)

	// The missing "follow" in the containerlogsoptions costed me 2 days. Because I couldn't get any logs out even though my code running container
	//was clearly flushing them in stdout. :(
	out, err := cli.ContainerLogs(ctx, cont.ID, types.ContainerLogsOptions{ShowStdout: true, ShowStderr: true, Follow: true})
	if err != nil {
		panic(err)
	}

	// Stop the container after collecting the logs
	if err := cli.ContainerStop(ctx, cont.ID, nil); err != nil {
		panic("[CONTAINER FAILURE]: Failed to stop the container: " + err.Error())
	}

	bufout := new(bytes.Buffer)
	buferr := new(bytes.Buffer)
	stdcopy.StdCopy(bufout, buferr, out)
	stdout := bufout.String()
	stderr := buferr.String()

	return stdout, stderr, nil
}

func createTar(filename, content string) io.Reader {
	var buf bytes.Buffer
	tw := tar.NewWriter(&buf)

	hdr := &tar.Header{
		Name: filename,
		Mode: 0600,
		Size: int64(len(content)),
	}

	if err := tw.WriteHeader(hdr); err != nil {
		fmt.Println("[TAR ERROR]:", err)
	}

	if _, err := tw.Write([]byte(content)); err != nil {
		fmt.Println("[TAR ERROR]:", err)
	}

	if err := tw.Close(); err != nil {
		fmt.Println("[TAR ERROR]:", err)
	}

	return tar.NewReader(&buf)
}
