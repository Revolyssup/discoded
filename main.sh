if [[ "$(docker images -q revoly/nginx 2> /dev/null)" == "" ]]; then
    cd client;
    npm i
    npm run build
    docker build -t revoly/nginx .
    cd ../
fi


if [[ "$(docker images -q revoly/discoded/v2 2> /dev/null)" == "" ]]; then
    cd server
    docker build -t revoly/discoded/v2 .
    cd ../
fi

if [[ "$(docker images -q revoly/discordbot/v2 2> /dev/null)" == "" ]]; then
    cd discordbot
    docker build -t revoly/discordbot/v2 .
    cd ../
fi

if [[ "$(docker images -q revoly/goglot 2> /dev/null)" == "" ]]; then
    cd goglot
    docker build -t revoly/goglot .
    cd ../
fi

if [[ "$(docker images -q revoly/cpprunner 2> /dev/null)" == "" ]]; then
    cd goglot/images/cpp
    docker build -t revoly/cpprunner .
    cd ../
fi

if [[ "$(docker images -q revoly/crunner 2> /dev/null)" == "" ]]; then
    cd goglot/images/c
    docker build -t revoly/crunner .
    cd ../
fi

if [[ "$(docker images -q revoly/jsrunner 2> /dev/null)" == "" ]]; then
    cd goglot/images/js
    docker build -t revoly/jsrunner .
    cd ../
fi

if [[ "$(docker images -q revoly/gorunner 2> /dev/null)" == "" ]]; then
    cd goglot/images/go
    docker build -t revoly/gorunner .
    cd ../
fi

if [[ "$(docker images -q revoly/pyrunner 2> /dev/null)" == "" ]]; then
    cd goglot/images/python
    docker build -t revoly/pyrunner .
    cd ../
fi
docker-compose up --scale app1=4 