#!/bin/bash
cat test.cpp
cat inputFile
cat inputfile | g++ -o myapp test.cpp > ./output
