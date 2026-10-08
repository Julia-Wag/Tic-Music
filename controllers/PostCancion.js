import PostCancionQuery from "../services/PostCancionQuery.js";

async function PostCancion(req,res){
try { 
    await PostCancionQuery(req.nombre);
    res.status(200);
}
catch (error){ res.status(501).send("Database error")}
}