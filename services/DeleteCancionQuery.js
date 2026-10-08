import client from "../db.js";
import pkg from "pg";

export async function DeleteCancionQuery(id){
    await client.query("DELETE FROM canciones WHERE id = $1",[id])
    return;
}