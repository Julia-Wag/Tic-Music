import pkg from "pg";
import config from "./db_config.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


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
    await query("INSERT INTO usuarios (nombre, password) VALUES ($1, $2)", [nombre, password_hashed]);
    res.status(201).json({ nombre, password });
})
//endpoint 2 login
app.get("/login", async(req,res)=>
{
    /// SEGUIR CON ESTO
    const { nombre, password } = req.body
    //poner password hasher
    const result = await query("select usuario.id, usuario.password from usuario");
    res.json(result.rows);
})





const server = app.listen(port,()=>{
    console.log("Listening on http://localhost:${port}"); //CHEQUEAR
})
await client.end()


export { app, server };