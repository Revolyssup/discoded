#!/bin/bash
echo "$2" > "$3"
g++ -o myapp "$3"
echo "$1" | ./myapp

