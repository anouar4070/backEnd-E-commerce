import express from 'express';
import { dbConnection } from './database/dbConnection.js';
import dotenv from "dotenv";
import categoryRouter from './src/modules/categories/categories.routes.js';

const app = express();
const port = 3000;
dotenv.config();

app.use(express.json());

app.use("/api/v1/category", categoryRouter )

app.all("*", (req, res) => {
  res.json({message: `can't find this route:${req.originalUrl}`})
  
}
)

dbConnection();

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))