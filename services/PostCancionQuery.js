import client from "../db.js";

export default async function PostCancionQuery(nombre) {
    await client.query("INSERT INTO cancion (nombre) VALUES ($1)", [nombre]);
}