#!/bin/zsh 

newArgs=''
for var in "$@"
do
    var="$(pwd)/$var"
    newArgs="${newArgs} ${var}"
done

# $0 location of script