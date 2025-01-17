import dotenv from "dotenv";
import express from "express";
import router from "./routes";
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())
dotenv.config();

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log("server dah jalan broo!");
});
