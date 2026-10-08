import express from "express";
const app = express()

import pkg from "pg";
import config from "./db_config.js";
import bcrypt from "bcrypt";
const secretKey = process.env.JWT_SECRET || "tinchito";

const port = process.env.PORT;

const { Client } = pkg;
const client = new Client(config);
await client.connect();

app.use(express.json());
app.use("/canciones",cancionesRouter)
app.use("/auth",authRouter)


if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}`);
    });
}

export default app;