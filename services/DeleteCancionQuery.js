import client from "../db.js";

export default async function DeleteCancionQuery(id){
    await client.query("DELETE FROM escucha WHERE cancion_id = $1", [id]);
    await client.query("DELETE FROM cancion WHERE id = $1", [id]);
}