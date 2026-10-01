import pkg from "pg";
import config from "./db_config.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const secretKey = "tinchito"
const app = express()
const port = 3000;

console.log(port)

const { Client } = pkg;
const client = new Client(config);
await client.connect();

app.use(express.json());

//endpoint 1 CREAR
app.post("/crearusuario", async (req, res)=>{
const { userid, nombre, password } = req.body;
const password_hashed = await bcrypt.hash(password, 10);
await client.query("INSERT INTO usuario (id, nombre, password) VALUES ($1, $2, $3)", [userid, nombre, password_hashed]);
res.status(201).send("Usuario creado");
})

//endpoint 2 login
app.post("/login", async (req, res) => {
    const { userid, password } = req.body;
    const user_data = await client.query("SELECT password, nombre FROM usuario WHERE id = $1", [userid]);

    if (user_data.rows.length === 0) {
        return res.status(401).send("Usuario o contraseña incorrecta");
    }

    const passOK = await bcrypt.compare(password, user_data.rows[0].password);
    if (passOK) {
        const payload = {
            id: userid,
            username: user_data.rows[0].nombre
        };
        const options = { expiresIn: "1h", issuer: "Tinchito2" };
        const token = jwt.sign(payload, secretKey, options);
        res.send(token);
    } else {
        res.status(401).send("Usuario o contraseña incorrecta");
    }
});

app.get("/escucho", async(req,res)=>{
    const token = req.body.token;
    try {
        let payloadOriginal = await jwt.verify(token, secretKey);
        let user_id = payloadOriginal.id;
        let result = await client.query(
    `SELECT cancion.nombre, escucha.reproducciones
    FROM escucha
    INNER JOIN cancion ON cancion.id = escucha.cancion_id
    WHERE escucha.usuario_id = $1`, [user_id]);
        res.send(result.rows);
    }
    catch(error) {console.log("Error en el token: ", error.message); res.status(401).send(error.message)}
})




const server = app.listen(port,()=>{
    console.log(`Listening on http://localhost:${port}`); //CHEQUEAR
})
//await client.end()


export default app;