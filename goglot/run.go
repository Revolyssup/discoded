package main

import (
	"context"
	"errors"
	"fmt"
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
	case "golang", "go", "GO", "Go":
		{
			script = "./rungo.sh"
			filename = "test.go"
			image = "revoly/gorunner"
		}
	case "py", "python", "python3":
		{
			script = "./runpy.sh"
			filename = "test.py"
			image = "revoly/pyrunner"
		}
	case "monkey", "monke":
		{
			script = "./runmonkey.sh"
			filename = "input.monkey"
			image = "revoly/monkeyrunner"
		}
	default:
		{
			return out, errors.New("Invalid Language")
		}
	}
	stdout, stderr, err := CreateNewContainer(ctx, image, in.Code, in.Input, script, filename)
	if err != nil {
		fmt.Println(err)
	}
	out.Stdout = stdout
	out.Stderr = stderr
	return out, err
}
