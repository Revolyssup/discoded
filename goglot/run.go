package main

import (
	"context"
	"errors"
)

//CodeRunner ... Spins the container
func CodeRunner(ctx context.Context, in Input) (Output, error) {
	var out Output
	var script string
	var filename string
	var image string
	switch in.Language {
	case "cpp":
		{
			script = "./runcpp.sh"
			filename = "test.cpp"
			image = "revoly/cpprunner"
		}
	case "c":
		{
			script = "./runc.sh"
			filename = "test.c"
			image = "revoly/crunner"
		}
	case "javascript", "js":
		{
			script = "./runjs.sh"
			filename = "test.js"
			image = "revoly/jsrunner"
		}
	case "golang", "go":
		{
			script = "./rungo.sh"
			filename = "test.go"
			image = "revoly/gorunner"
		}
	default:
		{
			return out, errors.New("Invalid Language")
		}
	}
	stdout, stderr, err := CreateNewContainer(ctx, image, in.Code, in.Input, script, filename)
	if err != nil {
		panic(err)
	}
	out.Stdout = stdout
	out.Stderr = stderr
	p(out)
	return out, nil
}
