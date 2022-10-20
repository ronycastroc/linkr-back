import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PORT } from "./configs/constants.js";
import routerusers from "./routes/usersRoutes.js"


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routerusers)

app.listen(process.env.PORT, () => console.log(`Listening on`, process.env.PORT));