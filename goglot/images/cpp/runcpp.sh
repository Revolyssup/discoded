#!/bin/bash

touch test.cpp
echo $2 > test.cpp
echo $1 | g++ -o myapp test.cpp