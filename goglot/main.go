package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
)

func p(a interface{}) {
	fmt.Printf("\nPrinting.. %+#v of type %T\n", a, a)
}

func handler(w http.ResponseWriter, r *http.Request) {
	var in Input
	var response Output = Output{
		Stdout: "",
		Stderr: "",
		Err:    errors.New(""),
	}
	err := json.NewDecoder(r.Body).Decode(&in)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	response, err = CodeRunner(r.Context(), in)
	if err != nil {
		response.Err = err
		panic(err)
	}
	res, err := json.Marshal(response)
	if err != nil {
		panic(err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(res)
	p(string(res))
}

func main() {
	p("Executing go code!")
	http.HandleFunc("/", handler)

	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		fmt.Println(err)
		return
	}
}
