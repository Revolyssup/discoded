# **Discoded**  [in progress]
*Discord bot+code editor*

- The discord bot is started as soon as the backend server spins up. The code editor is served as a static react application by nginx.

- The server is a combination of 6 docker containers(you can rescale in main.sh , docker compose is doing the load balancing between containers), one of which is the discord bot, one is nginx reverse proxy and other four are express servers.
## Snapshot

![If you're seeing this text means somehow my image got renamed or deleted lol](https://github.com/Revolyssup/discoded/blob/master/demo.png?raw=true)

![If you're seeing this text means somehow my image got renamed or deleted lol](https://github.com/Revolyssup/discoded/blob/master/demo2.png?raw=true)

## How does it work?

1. The express server exposes api endpoints which take up the language,code and standard input in request's body from client.(Discord bot or react frontend)

2. The server hashes the entire code along with its input and checks with the database(first redis then mongodb) if that hashed value already exists.

3. The mongo and redis database here stores documents with hashed code and their output ,redis acts as a caching mechanism.

4. If no such hashcode exists then the request is re-structured and forwarded to GLOT API endpoint, which responds with the standard output, standard error, and error.

5. That output is first sent back to the client and then the hashcode along with the output is stored in mongo db & redis for future caching.


## Few implementation details

1. In order to completely isolate the database logic from business logic, a data access object is used to perform all database specific operations. The express server in turns uses methods of DAO. So in future, data base can be replaced with Postgres or even redis(as it is more suitable choice for caching) without changing any business logic. Only changes in the DAO methods will be required.

2. Before DAO is initialized, the incoming request's body is filtered and verified through DTO(Data transfer Object).


## How to use?

1. *Discord bot* Create a discord bot application and generate an authentication token. [Create Discord application](https://discord.com/developers/applications). Add that token in the .env file of discordbot directory.

2. Generate token from Glot api and add that in .env file in your source directory. 

3. For some reason, Glot api's certificate authority is not trusted by few operating systems(at least mine) as of now so add the below line in .env file.(we can trust glot ;))

```
NODE_TLS_REJECT_UNAUTHORIZED=0
```

4.  Make sure you have docker installed.

### Building the images and running containers.
5. Give the permission to ./main.sh
```
chmod +x ./main.sh
```

6. 
```
sudo ./main.sh
```
7. Now you can send GET request on port 3000 for running code editor/runner. And your discord bot will be automatically online on whichever discord server you authorized it.

8. Run 
```
docker-compose down
```
to stop the containers. 
## Further Improvements.

1. This external call to Glot api is pretty expensive so I plan to replace that with my own code runner built in go. I have currently written C/C++/Java code runner in bash but a better version can be made in GO. [ GOGLOT ]

Problem:- My alternate to the GLOT API, which I call goglot is almost ready except for one small thing. To get stderr and stdout 
seperately from the code running container, I have to detach the tty while creating the container as mentioned in the api docs
of docker engine sdk for GO. Now as I have detached the tty, the container exits as soon as it runs the code and containerlog function
is not able to fetch the logs from the container. Then I used tail command as the ENTRYPOINT to the code running container with -f flag to the output file such that it waits till my code output is pushed to the output file, but this time I am getting error which says tail cannot recognize the file system, which is probably due to contradiction of filesystem outside the container and inside the container, I plan to get around this as soon as possible in order to complete the code runner.  


2. I plan to use mongo db with redis. As instead of capping my mongo db collections, I can simply use redis for caching. :ballot_box_with_check:


3. Currently I am load_balancing individual containers hardcoding in nginx which is not very scalable. I plan to offload the load_balancing responsibility to docker-compose so I can give any n number of indentical express server containers without changing nginx configuration, :ballot_box_with_check:

<!-- docker run -it -p 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock revoly/goglot -->