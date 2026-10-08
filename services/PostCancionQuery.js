import client from "../db.js";
import pkg from "pg";

export async function PostCancionQuery(nombre) {
    return await client.query("INSERT INTO Canciones (nombre) VALUES $1",[nombre])
}