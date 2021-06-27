if [[ "$(docker images -q revoly/nginx 2> /dev/null)" == "" ]]; then
    echo "Starting in"  ;pwd
    cd client;
    npm run build
    docker build -t revoly/nginx .
    cd ../
    echo "Exiting in " ;pwd
fi


if [[ "$(docker images -q revoly/discoded 2> /dev/null)" == "" ]]; then
    echo "Starting in"  ;pwd
    cd server
    docker build -t revoly/discoded .
    cd ../
    echo "Exiting in " ;pwd

fi

if [[ "$(docker images -q revoly/discordbot 2> /dev/null)" == "" ]]; then
    echo "Starting in"  ;pwd

    cd discordbot
    docker build -t revoly/discordbot .
    cd ../
    echo "Exiting in " ;pwd

fi

if [[ "$(docker images -q revoly/goglot 2> /dev/null)" == "" ]]; then
    echo "Starting in"  ;pwd

    cd goglot
    docker build -t revoly/goglot .
    cd ../
    echo "Exiting in " ;pwd

fi

if [[ "$(docker images -q revoly/cpprunner 2> /dev/null)" == "" ]]; then
    echo "Starting in"  ;pwd

    cd goglot/images/cpp
    docker build -t revoly/cpprunner .
    cd ../../../
    echo "Exiting in " ;pwd

fi

if [[ "$(docker images -q revoly/crunner 2> /dev/null)" == "" ]]; then
    echo "Starting in"  ;pwd

    cd goglot/images/c
    docker build -t revoly/crunner .
    cd ../../../
    echo "Exiting in " ;pwd

fi

if [[ "$(docker images -q revoly/jsrunner 2> /dev/null)" == "" ]]; then
    echo "Starting in"  ;pwd

    cd goglot/images/js
    docker build -t revoly/jsrunner .
    cd ../../../
    echo "Exiting in " ;pwd

fi

if [[ "$(docker images -q revoly/gorunner 2> /dev/null)" == "" ]]; then
    echo "Starting in"  ;pwd

    cd goglot/images/go
    docker build -t revoly/gorunner .
    cd ../../../
    echo "Exiting in " ;pwd

fi

if [[ "$(docker images -q revoly/pyrunner 2> /dev/null)" == "" ]]; then
    echo "Starting in"  ;pwd

    cd goglot/images/python
    docker build -t revoly/pyrunner .
    cd ../../../
    echo "Exiting in " ;pwd

fi
if [[ "$(docker images -q revoly/monkeyrunner 2> /dev/null)" == "" ]]; then
    echo "Starting in"  ;pwd

    cd goglot/images/monkey
    docker build -t revoly/monkeyrunner .
    cd ../../../
    echo "Exiting in " ;pwd

fi

docker-compose up --scale app1=4 