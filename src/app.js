import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authRouter } from "./routers/auth.router";
import { urlsRouter } from "./routers/urls.router";
import { usersRouter } from "./routers/users.router";
import { rankingsRouter } from "./routers/rankings.router";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

app.use("/", authRouter);
app.use("/urls", urlsRouter);
app.use("/users", usersRouter);
app.use("/ranking", rankingsRouter);

app.listen(PORT, () => console.log(`Server is listening in PORT: ${PORT}`));
