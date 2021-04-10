#!/bin/bash
echo -E "$2" > "$3"
g++ -o myapp "$3"
echo "$1" | ./myapp

