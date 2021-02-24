package main

import (
	"context"
	"errors"
)

//CodeRunner ... Spins the container
func CodeRunner(ctx context.Context, in Input) (Output, error) {
	var out Output
	switch in.Language {
	case "cpp":
		{
			stdout, stderr, err := CreateNewContainer(ctx, "revoly/cpprunner", in.Code, in.Input, in.Language)
			if err != nil {
				panic(err)
			}
			out.Stdout = stdout
			out.Stderr = stderr
		}
	case "c":
		{

		}
	case "javascript":
		{

		}
	default:
		{
			return out, errors.New("Invalid Language")
		}
	}
	p(out)
	return out, nil
}
