#!/bin/bash
echo "$2" > "$3"
echo "$1" | go run "$3"
