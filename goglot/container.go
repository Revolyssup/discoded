package main

import (
	"bytes"
	"context"
	"fmt"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/docker/pkg/stdcopy"
	"github.com/docker/go-connections/nat"
)

//CreateNewContainer ... Creates a new container based on given image and context of request and returns the standard output and error from it
func CreateNewContainer(ctx context.Context, image string, code string, input string, lan string) (string, string, error) {
	var script string
	switch lan {
	case "cpp":
		{
			script = "./runcpp.sh"
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

	portBinding := nat.PortMap{containerPort: []nat.PortBinding{hostBinding}}
	cont, err := cli.ContainerCreate(
		ctx,
		&container.Config{
			Image: image,
			Cmd:   []string{script, input, code},
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
	fmt.Printf("%v is the container id", cont.ID)
	err = cli.ContainerStart(ctx, cont.ID, types.ContainerStartOptions{})
	if err != nil {
		fmt.Printf("error starting container: %s", err)
		panic("Could not start the container")
	}
	fmt.Printf("Container %s is started", cont.ID)
	out, err := cli.ContainerLogs(ctx, cont.ID, types.ContainerLogsOptions{ShowStdout: true, ShowStderr: true})
	if err != nil {
		panic(err)
	}
	bufout := new(bytes.Buffer)
	buferr := new(bytes.Buffer)
	stdcopy.StdCopy(bufout, buferr, out)
	stdout := bufout.String()
	stderr := buferr.String()
	return stdout, stderr, nil
}
