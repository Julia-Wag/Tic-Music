import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import LoginQuery from "../services/LoginQuery.js";

const secretKey = process.env.JWT_SECRET || "tinchito";

export default async function Login(req, res){
    try {
        const { userid, password } = req.body;
        const user_data = await LoginQuery(userid);

        if (user_data.rows.length === 0) {
            return res.status(401).send("Usuario o contraseña incorrecta");
        }

        const passOK = await bcrypt.compare(password, user_data.rows[0].password);
        if (passOK) {
            const payload = {
                id: userid,
                username: user_data.rows[0].nombre,
                rol: user_data.rows[0].rol
            };
            const options = { expiresIn: "1h", issuer: "Tinchito2" };
            const token = jwt.sign(payload, secretKey, options);
            res.status(200).send(token);
        } else {
            res.status(401).send("Usuario o contraseña incorrecta");
        }
    }
    catch (error){ console.log("Error en el login: ", error.message); res.status(500).send(error.message)}
}