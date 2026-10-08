import DeleteCancionQuery from "../services/DeleteCancionQuery.js";

async function DeleteCancion(req,res){
    try { 
        await DeleteCancionQuery(req.id);
        res.status(200);
    }
    catch (error){ res.status(501).send("Database error")}
    }