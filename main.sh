

if [[ "$(docker images -q revoly/nginx/test 2> /dev/null)" == "" ]]; then
    
    docker build -t revoly/nginx/test ./nginx
fi


if [[ "$(docker images -q revoly/discoded/v2 2> /dev/null)" == "" ]]; then 
    cd server
    docker build -t revoly/discoded/v2 .
    cd ..
fi



if [[ "$(docker images -q revoly/goglot 2> /dev/null)" == "" ]]; then
    cd goglot
    docker build -t revoly/goglot .
    cd ..
fi

    if [[ "$(docker images -q revoly/cpprunner 2> /dev/null)" == "" ]]; then
    docker build -t revoly/cpprunner ./goglot/images/cpp

fi

if [[ "$(docker images -q revoly/crunner 2> /dev/null)" == "" ]]; then
    
    docker build -t revoly/crunner ./goglot/images/c
    
fi

if [[ "$(docker images -q revoly/jsrunner 2> /dev/null)" == "" ]]; then
    
    docker pull revoly/jsrunner 
    
fi

if [[ "$(docker images -q revoly/gorunner 2> /dev/null)" == "" ]]; then
    
    docker build -t revoly/gorunner ./goglot/images/go
    
fi

if [[ "$(docker images -q revoly/pyrunner 2> /dev/null)" == "" ]]; then

    docker build -t revoly/pyrunner ./goglot/images/python

fi



docker-compose up --scale app1=4 -d