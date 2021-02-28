if [[ "$(docker images -q revoly/nginx 2> /dev/null)" == "" ]]; then
    cd client;
    npm run build
    docker build -t revoly/nginx .
    cd ../
fi


if [[ "$(docker images -q revoly/discoded 2> /dev/null)" == "" ]]; then
    cd server
    docker build -t revoly/discoded .
    cd ../
fi

if [[ "$(docker images -q revoly/discordbot 2> /dev/null)" == "" ]]; then
    cd discordbot
    docker build -t revoly/discordbot .
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
docker-compose up --scale app1=4 