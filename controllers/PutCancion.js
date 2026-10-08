import PutCancionQuery from "../services/PutCancionQuery.js";

async function PutCancion(req,res){
    try {
        await PutCancionQuery(req.body.id, req.body.nombre);
        res.status(200);
    }
    catch (error){ res.status(501).send("Database error")}
}