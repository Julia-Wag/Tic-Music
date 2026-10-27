import express from "express";
import cancionesRouter from "./routes/cancionesRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();
const secretKey = process.env.JWT_SECRET || "tinchito";
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/canciones",cancionesRouter)
app.use("/auth",authRouter)


if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}`);
    });
}

export default app;