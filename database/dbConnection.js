import mongoose from "mongoose";

export function dbConnection() {
  return mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => console.log("database connected"))
    .catch((err) => console.log("error connection", err));
}