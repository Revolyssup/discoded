import express from "express";
import bodyParser from "body-parser";
import solver from './solver';
import UserDTO from "./db/dto";
import userDAOP, { UserDAO } from "./db/dao";
const app = express();
const port = process.env.ID;


let newCode: UserDTO;

app.use(bodyParser.json());

function connectedToDB({ userDAO }: { userDAO: UserDAO }) {
  app.get('/', (req, res) => {
    res.json({ res: "Welcome to discoded! send your requests to /newcode endpoint ;)" })
  })
  
  app.post("/api/newcode", async (req, res) => {
    newCode = new UserDTO(req.body);

    if (newCode.validate()) {
      res.json({ status: "Code should be in string." });
      return;
    }

    try {
      newCode.output = await userDAO.checkCode(newCode);
      if (!newCode.output) {
        const response = await solver(newCode.language, newCode.code, newCode.input)
        newCode.output = response.data.stdout;
        newCode.stderror=response.data.stderr;
        newCode.error=response.data.err;
        console.log("solved again"+newCode);
        res.json({ output: newCode.output ,stderror: newCode.stderror ,error: newCode.error });
        userDAO.addCode(newCode);
      } else {
        console.log("sending cached output");
        res.json({ output: newCode.output ,stderror: newCode.stderror ,error: newCode.error });
      }
    } catch (error) {
      console.dir(error, { depth: 4 })
    }
  });


  app.listen(port, () => {
    console.log(`Server listening at ${port}`);
  });
}

userDAOP() //connect to database
  .then((dao) => {
    connectedToDB({ userDAO: dao });
  })
  .catch((err) => console.error(err));

