#!/bin/bash
echo -E "$2" > "$3"
echo "$1" | python "$3"