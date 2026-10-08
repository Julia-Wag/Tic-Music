async function EscuchoQuery(user_id){
let result = await client.query(
    `SELECT cancion.nombre, escucha.reproducciones
    FROM escucha
    INNER JOIN cancion ON cancion.id = escucha.cancion_id
    WHERE escucha.usuario_id = $1`, [user_id]);
        res.send(result.rows);}