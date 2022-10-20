import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { PORT } from "./configs/constants.js";
import hashtagsRoutes from "./routes/hashtagsRoutes.js"
import authRoutes from "./routes/authRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(hashtagsRoutes);
app.use(authRoutes);
app.use(likeRoutes);

app.get("/status", (req, res) => {
    return res.send("Ok");
});


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
