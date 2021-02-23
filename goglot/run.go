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
	return out, nil
}
