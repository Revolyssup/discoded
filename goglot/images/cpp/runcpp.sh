#!/bin/bash
printf "%s\n" "$2" >> "$3"
g++ -o myapp "$3"
printf "%s\n" "$1"  | ./myapp

