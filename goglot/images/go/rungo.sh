#!/bin/bash
printf "%s\n" "$2" >> "$3"
printf "%s\n" "$1" | go run "$3"
