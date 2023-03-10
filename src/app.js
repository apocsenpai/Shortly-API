import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authRouter } from "./routes/auth.route.js";
import { urlsRouter } from "./routes/urls.route.js";
import { usersRouter } from "./routes/users.route.js";
import { rankingsRouter } from "./routes/rankings.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

app.use("/", authRouter);
app.use("/urls", urlsRouter);
app.use("/", usersRouter);
app.use("/ranking", rankingsRouter);

app.listen(PORT, () => console.log(`Server is listening in PORT: ${PORT}`));
