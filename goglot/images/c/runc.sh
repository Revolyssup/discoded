#!/bin/bash
echo "$2" > "$3"
gcc -o myapp "$3"
echo "$1" | ./myapp
