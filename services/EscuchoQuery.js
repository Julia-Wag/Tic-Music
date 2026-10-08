import client from "../db.js";
import pkg from "pg";

export async function EscuchoQuery(user_id,cancion_id){
let result = await client.query("SELECT id FROM escucha WHERE user_id = $1 AND cancion_id = $2",[user_id,cancion_id]);
if (result.rows[0].id){
    await client.query(`INSERT INTO escucha (usuario_id, cancion_id, reproducciones) VALUES ($1, $2, `, [user_id, cancion_id]);
    return;
}
else {
    await client.query("UPDATE escucha  SET reproducciones = reproducciones + 1 WHERE user_id = $1 AND cancion_id = $2",[user_id,cancion_id]);
    await client.query("UPDATE usuario U SET fan = true INNER JOIN escucha E ON U.id = E.user_id WHERE COUNT(*) > 9");
    return;
}
}


        
    