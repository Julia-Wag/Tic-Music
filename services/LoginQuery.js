import client from "../db.js";
import pkg from "pg";

export async function LoginQuery(userid){
await client.query("SELECT password, nombre FROM usuario WHERE id = $1", [userid]);
return
}