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


docker-compose up --scale app1=4 