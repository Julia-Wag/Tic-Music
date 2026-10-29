import PostCancionQuery from "../services/PostCancionQuery.js";

export default async function PostCancion(req,res){
    try {
        await PostCancionQuery(req.body.nombre);
        res.status(201).send("Canción creada");
    }
    catch (error){ res.status(500).send(error.message)}
}