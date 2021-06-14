#!/bin/bash
printf "%s\n" "$2" >> "$3"
printf "%s\n" "$1" | ./monkeyrun "$3"