import client from "../db.js";
import pkg from "pg";

export async function CreateUserQuery(userid, nombre, password_hashed){
await client.query("INSERT INTO usuario (id, nombre, password) VALUES ($1, $2, $3)", [userid, nombre, password_hashed]);
    res.status(201).send("Usuario creado");}