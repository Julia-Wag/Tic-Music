import pkg from "pg";
import config from "./db_config.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const secretKey = "tinchito"
const app = express()
const port = 3000;

const { Client } = pkg;
const client = new Client(config);
await client.connect();

//endpoint 1 CREAR
app.post("/crearusuario", async (req, res)=>{
    const { nombre, password } = req.body;
//hashear la contraseña
    password_hashed = await bcrypt.hash(password,10)
    await query("INSERT INTO usuario (nombre, password) VALUES ($1, $2)", [nombre, password_hashed]);
    res.status(201).json({ nombre, password });
})
//endpoint 2 login
app.get("/login", async(req,res)=>
{
    /// SEGUIR CON ESTO
    const { id, password } = req.body
    //poner password hasher
    const user_data = await query("SELECT password, nombre FROM usuario WHERE id = $1", [id]);
    const passOK = await bcrypt.compare(password,user_data.rows[0].password);
    if (passOK){
        const payload = {
            id: id,
            username: user_data.rows[0].nombre
        }
        const secretKey = secretKey;
        const options = {expiresIn: "1h", issuer: "Tinchito2"}
        const token = jwt.sign(payload, secretKey, options)
        res.send(token)
    }
    else res.send() //llenar con error
})

app.get("/escucho", async(req,res)=>{
    const token = req.body.token;
    let payloadOriginal = null;
    try {
        let payloadOriginal = await jwt.verify(token, secretKey);
    }
    catch(error) {console.log("Error en el token: ", error.message)}
    let user_id = payloadOriginal.id;
    let result = await query("SELECT cancion.nombre FROM escucha WHERE usuario_id = $1 INNER JOIN cancion ON cancion.id = escucha.id",[user_id]);
    res.send(result.rows);
})




const server = app.listen(port,()=>{
    console.log("Listening on http://localhost:${port}"); //CHEQUEAR
})
await client.end()


export { app, server };