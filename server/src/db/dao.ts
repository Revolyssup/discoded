/**This is the class for Data Access Object which is being used to consume the filtered data from DTO and 
 * perform all database specific operations.This is done to isolate all database specific code and create
 * an abstraction from backend server so even if
 * we switch the data base in future, we only have to make changes in this class.
 */

import { json } from "express";
import { Collection, Db, MongoClient } from "mongodb";
import redis, { RedisClient } from 'redis';
import {promisify} from 'util'



import UserDTO, { LyricDTO } from "./dto";
const uri = `mongodb://root:rootpassword@mongo:27017`;
const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  authSource: "admin",
});
const redisclient:RedisClient=redis.createClient({
  host:'redis',
  port:6379,
  password:'root',
})

// const getfromredis=promisify(redisclient.get).bind(client);
// const setonredis=promisify(redisclient.set).bind(client);


export class UserDAO {
  db: Db;
  coll: Collection;
  lyrcoll:Collection;
  cli: MongoClient;
  rcli:RedisClient;
  getfromredis:Function;
  setonredis:Function;
  constructor(client: MongoClient,redisClient:RedisClient) {
    console.log("hy")
    this.cli = client;
    this.db = this.cli.db("Ashish");
    this.coll = this.db.collection("Users");
    this.lyrcoll=this.db.collection("Lyrics");
    this.rcli=redisClient;
    this.getfromredis=promisify(this.rcli.get).bind(this.rcli);
    this.setonredis=promisify(this.rcli.set).bind(this.rcli);
  }

  async addCode(aud: UserDTO) {
    if(aud.forcerun) return; // Do not involve database
    this.rcli.set(JSON.stringify(aud.hashcode),JSON.stringify(aud.output),async (err,reply)=>{
      this.rcli.expire(JSON.stringify(aud.hashcode),600);
      const prom = await this.coll.insertOne({
        code: aud.hashcode,
        output:aud.output
      });
      if(!err) console.log("cached in redis");
       return prom;
    })
  }

  async checkCode(aud: UserDTO):Promise<string |null>{
      if(aud.forcerun) return null; //User doesn't want cached value. I am doing this for test scripts.
      const val=await this.getfromredis(JSON.stringify(aud.hashcode));
      if(!val){
        const prom=await this.coll.find({code:aud.hashcode}).toArray();
            if(prom.length){
              console.log('\nserving from mongodb and now caching it to redis');
              this.rcli.set(JSON.stringify(aud.hashcode),JSON.stringify(prom[0].output),(err,reply)=>{
                if(err) console.log("\ncould not cache in redis");
                else this.rcli.expire(JSON.stringify(aud.hashcode),600);
              })
              return prom[0].output;
            } 
            return null;
      }
      console.log('serving from redis ='+JSON.parse(val));
      return JSON.parse(val);

  }

async addLyrics(ald:LyricDTO){
    this.rcli.set(JSON.stringify(ald.name),JSON.stringify(ald.lyrics),async (err,reply)=>{
      this.rcli.expire(JSON.stringify(ald.name),60);
      const prom=await this.lyrcoll.insertOne({
          name:ald.name,
          lyrics:ald.lyrics
      });
      if(!err) console.log("\nCould not cache in redis");
      return prom;
    })
}
async checkLyrics(ald:LyricDTO):Promise<string | null>{
    const lyrics=await this.getfromredis(JSON.stringify(ald.name));
    if(!lyrics){
      const prom=await this.lyrcoll.find({name:ald.name}).toArray();
        if(prom.length){
          this.rcli.set(JSON.stringify(ald.name),JSON.stringify(prom[0].lyrics),(err,reply)=>{
            if(err) console.log("\ncould not set cache lyrics in redis.");
            else this.rcli.expire(JSON.stringify(ald.name),600);
          })
          return prom[0].lyrics;
        }
        return null;
    }
    return JSON.parse(lyrics);
}

}



export default function () {
  return new Promise<UserDAO>((res, rej) => {
    client.connect().then((connectedClient) => {
      if (!connectedClient) rej(Error("Could not connect to mongo"));
      else {
        const userDao = new UserDAO(connectedClient,redisclient);
        res(userDao);
      }
    });
  });
}