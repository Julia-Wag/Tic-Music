import EscuchoQuery from "../services/EscuchoQuery.js";

export default async function Escucho(req,res){
    try {
        await EscuchoQuery(req.user_id, req.body.id);
        res.status(200).send("Escucha registrada");
    }
    catch(error) {console.log("Error en la database: ", error.message); res.status(500).send(error.message)}
}