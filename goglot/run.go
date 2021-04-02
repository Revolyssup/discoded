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
	var lrc bool = false
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
	case "postgres", "pg":
		{
			script = "./pg.sh"
			filename = "" //no use here
			image = "revoly/pgrunner"
			lrc = true
		}
	default:
		{
			return out, errors.New("Invalid Language")
		}
	}
	if !lrc {
		stdout, stderr, err := CreateNewContainer(ctx, image, in.Code, in.Input, script, filename)
		if err != nil {
			fmt.Println(err)
		}
		out.Stdout = stdout
		out.Stderr = stderr
		p(out)
		return out, err
	} else {
		output := RunLRC(ctx, image, in.Code, in.Input, script, in.Language)
		out.Stdout = output
		out.Stderr = ""
		p(out)
		return out, nil
	}

}
