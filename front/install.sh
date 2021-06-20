#!/bin/bash
input="requirement.txt"
while IFS= read -r line
do
  npm install "${line:: -1}"
done<"$input"
