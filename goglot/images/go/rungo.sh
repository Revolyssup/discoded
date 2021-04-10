#!/bin/bash
echo -E "$2" > "$3"
echo "$1" | go run "$3"
