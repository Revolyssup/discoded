package main

//Output ...
type Output struct {
	Stdout string `json:"stdout"`
	Stderr string `json:"stderr"`
	Err    string `json:"err"`
}

//Input ...
type Input struct {
	Input    string `json:"input"`
	Language string `json:"language"`
	Code     string `json:"code"`
}
