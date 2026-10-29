import client from "../db.js";

export default async function EscuchoQuery(user_id, cancion_id){
    let result = await client.query("SELECT 1 FROM escucha WHERE usuario_id = $1 AND cancion_id = $2", [user_id, cancion_id]);
    if (result.rows.length === 0){
        await client.query("INSERT INTO escucha (usuario_id, cancion_id, reproducciones) VALUES ($1, $2, 1)", [user_id, cancion_id]);
    }
    else {
        await client.query("UPDATE escucha SET reproducciones = reproducciones + 1 WHERE usuario_id = $1 AND cancion_id = $2", [user_id, cancion_id]);
    }
    await client.query("UPDATE usuario SET fan = true WHERE id = $1 AND (SELECT COUNT(*) FROM escucha WHERE usuario_id = $1) > 9", [user_id]);
}