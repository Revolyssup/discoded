package main

import (
	"context"
	"fmt"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
)

//CreateNewContainer ... Creates a new container based on given image and context of request and returns the container ID
func CreateNewContainer(ctx context.Context, image string) (string, error) {
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

	cli.ContainerStart(ctx, cont.ID, types.ContainerStartOptions{})
	fmt.Printf("Container %s is started", cont.ID)
	return cont.ID, nil
}
