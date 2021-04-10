#!/bin/bash
printf "%s\n" "$2" >> "$3"
gcc -o myapp "$3"
printf "%s\n" "$1"  | ./myapp

