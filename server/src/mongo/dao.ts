/**This is the class for Data Access Object which is being used to consume the filtered data from DTO and 
 * perform all database specific operations.This is done to isolate all database specific code and create
 * an abstraction from backend server so even if
 * we switch the data base in future, we only have to make changes in this class.
 */

import { Collection, Db, MongoClient } from "mongodb";
import UserDTO from "./dto";
const uri = `mongodb://root:rootpassword@localhost:27017`;
const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  authSource: "admin",
});

export class UserDAO {
  db: Db;
  coll: Collection;
  cli: MongoClient;
  constructor(client: MongoClient) {
    console.log("hy")
    this.cli = client;
    this.db = this.cli.db("Ashish");
    this.coll = this.db.collection("Users");
  }

  async addCode(aud: UserDTO) {
    const prom = await this.coll.insertOne({
      code: aud.hashcode,
      output:aud.output
    });
    return prom;
  }

  async checkCode(aud: UserDTO){
      const prom=await this.coll.find({code:aud.hashcode}).toArray();
      if(prom.length) return prom[0].output;
      return null;
  }
}

export default function () {
  return new Promise<UserDAO>((res, rej) => {
    client.connect().then((connectedClient) => {
      if (!connectedClient) rej(Error("Could not connect to mongo"));
      else {
        const userDao = new UserDAO(connectedClient);
        res(userDao);
      }
    });
  });
}