import bcrypt from "bcrypt";
import CreateUserQuery from "../services/CreateUserQuery.js";

export default async function CrearUsuario (req, res){
    try {
        const { userid, nombre, password } = req.body;
        const password_hashed = await bcrypt.hash(password, 10);
        await CreateUserQuery(userid, nombre, password_hashed);
        res.status(201).send("Usuario creado");
    }
    catch (error){ console.log("Error en la database: ", error.message); res.status(500).send(error.message)}
}