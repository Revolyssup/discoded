# **Discoded** [Working currently] but [more features to be added]
*GOGLOT code runner+Discord bot+code editor*

- The discord bot is started as soon as the backend server spins up. The code editor is served as a static react application by nginx.

- The server is split into 5 microservices as a combination of 7 docker containers, one of which is the discord bot, one is nginx reverse proxy,one is the goglot go server where the API calls are made to run the code and other four(you can rescale in main.sh , docker compose is doing the load balancing between containers) are express servers.
## Snapshot

![If you're seeing this text means somehow my image got renamed or deleted lol](https://github.com/Revolyssup/discoded/blob/master/demo.png?raw=true)

![If you're seeing this text means somehow my image got renamed or deleted lol](https://github.com/Revolyssup/discoded/blob/master/demo2.png?raw=true)

## How does it work?

1. The express server exposes api endpoints which take up the language,code and standard input in request's body from client.(Discord bot or code editor)

2. The server hashes the entire code along with its input and checks with the database(first redis then mongodb) if that hashed value already exists.

3. The mongo and redis database here stores documents with hashed code and their output ,redis acts as a caching mechanism.

4. If no such hashcode exists then the request is re-structured and forwarded to GOGLOT API endpoint, which responds with the standard output, standard error, and error.

5. GOGLOT is a go server which is spun up with the docker.sock of host machine given to it through volumes and for each request,
it creates a container for that language, runs the code, flushes the output and a go routine comes and clear the stopped containers while the generated output is sent back to the client. 


6. That output is first sent back to the client and then the hashcode along with the output is stored in mongo db & redis for future caching.


## Few implementation details

1. In order to completely isolate the database logic from business logic, a data access object is used to perform all database specific operations. The express server in turns uses methods of DAO. So in future, data base can be replaced with Postgres or even redis(as it is more suitable choice for caching) without changing any business logic. Only changes in the DAO methods will be required.

2. Before DAO is initialized, the incoming request's body is filtered and verified through DTO(Data transfer Object).


## How to use?

1. *Discord bot* Create a discord bot application and generate an authentication token. [Create Discord application](https://discord.com/developers/applications). Add that token in the .env file of discordbot directory.
Note:- Discord bot has other features too that you can checkout by ";help" command.

2.  Make sure you have docker installed.

### Building the images and running containers.
3. Give the permission to ./main.sh
```
chmod +x ./main.sh
```

4. 
```
sudo ./main.sh
```
5. Now you can send GET request on port 3000 for running code editor/runner. And your discord bot will be automatically online on whichever discord server you authorized it.

6. Run 
```
docker-compose down
```
to stop the containers. 
## Further Improvements.

1. This external call to Glot api is pretty expensive so I plan to replace that with my own code runner built in go. I have currently written C/C++/Java code runner in bash but a better version can be made in GO. [ GOGLOT ] :ballot_box_with_check: DONE


2. I plan to use mongo db with redis. As instead of capping my mongo db collections, I can simply use redis for caching. :ballot_box_with_check: DONE


3. Currently I am load_balancing individual containers hardcoding in nginx which is not very scalable. I plan to offload the load_balancing responsibility to docker-compose so I can give any n number of indentical express server containers without changing nginx configuration, :ballot_box_with_check: DONE

