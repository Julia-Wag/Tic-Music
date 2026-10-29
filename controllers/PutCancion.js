import PutCancionQuery from "../services/PutCancionQuery.js";

export default async function PutCancion(req,res){
    try {
        await PutCancionQuery(req.body.id, req.body.nombre);
        res.status(200).send("Canción actualizada");
    }
    catch (error){ res.status(500).send(error.message)}
}