cd client;
docker build -t revoly/nginx .

cd ../server
docker build -t revoly/discoded .

cd ../discordbot
docker build -t revoly/discordbot .

cd ..
docker-compose up --scale app1=4 