import client from "../db.js";

export default async function LoginQuery(userid){
    return await client.query("SELECT password, nombre, rol FROM usuario WHERE id = $1", [userid]);
}