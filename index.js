import express from 'express';
import { dbConnection } from './database/dbConnection.js';
import dotenv from "dotenv";

const app = express();
const port = 3000;
dotenv.config();

app.use(express.json());
app.all("*", (req, res) => {
  res.json({message: `can't find this route:${req.originalUrl}`})
  
}
)

dbConnection();

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))