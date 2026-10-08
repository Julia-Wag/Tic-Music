import bcrypt from "bcrypt";
import CreateUserQuery from "../services/CreateUserQuery.js";

async function CrearUsuario (req, res){
    const { userid, nombre, password } = req.body;
    const password_hashed = await bcrypt.hash(password, 10);
    
    CreateUserQuery(userid, nombre, password_hashed)
    res.status(200);
    }