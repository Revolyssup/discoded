#!/bin/bash
echo -E "$2" > "$3"
echo "$1" | node "$3"