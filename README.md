# **Discoded**  
*Discord bot+code editor*

- The discord bot is started as soon as the backend server spins up. The code editor is served as a static react application by nginx.

- The server is a combination of 6 docker containers, one of which is the discord bot, one is nginx reverse proxy and other four are express servers.

## How does it work?

1. The express server exposes api endpoints which take up the language,code and standard input in request's body from client.(Discord bot or react frontend)

2. The server hashes the entire code along with its input and checks with the database if that hashed value already exists.

3. The mongo database here stores documents with hashed code and their output , therefore it acts as a caching mechanism.

4. If no such hashcode exists then the request is re-structured and forwarded to GLOT API endpoint, which responds with the standard output, standard error, and error.

5. That output is first sent back to the client and then the hashcode along with the output is stored in mongo db for future caching.


## Few implementation details

1. In order to completely isolate the database logic from business logic, a data access object is used to perform all database specific operations. The express server in turns uses methods of DAO. So in future, data base can be replaced with Postgres or even redis(as it is more suitable choice for caching) without changing any business logic. Only changes in the DAO methods will be required.

2. Before DAO is initialized, the incoming request's body is filtered and verified through DTO(Data transfer Object).

3. 
## How to use?

1. *Discord bot* Create a discord bot application and generate an authentication token. [Create Discord application](https://discord.com/developers/applications)

2. Generate token from Glot api and add that in .env file in your source directory. 

3. For some reason, Glot api's certificate authority is not trusted by few operating systems(at least mine) as of now so add the below line in .env file.(we can trust glot ;))

```
NODE_TLS_REJECT_UNAUTHORIZED=0
```


## Further Improvements.

1. This external call to Glot api is pretty expensive so I plan to replace that with my own code runner built in go. I have currently written C/C++/Java code runner in bash but a better version can be made in GO.

2. I plan to replace mongo db with redis. As instead of capping my mongo db collections, I can simply use redis for caching.
