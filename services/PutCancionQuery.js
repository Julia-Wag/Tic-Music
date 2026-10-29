import client from "../db.js";

export default async function PutCancionQuery(id, nombre){
    await client.query("UPDATE cancion SET nombre = $2 WHERE id = $1", [id, nombre]);
}