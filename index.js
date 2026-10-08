import express from "express";
const app = express()



const secretKey = process.env.JWT_SECRET || "tinchito";

const port = process.env.PORT;



app.use(express.json());
app.use("/canciones",cancionesRouter)
app.use("/auth",authRouter)


if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}`);
    });
}

export default app;