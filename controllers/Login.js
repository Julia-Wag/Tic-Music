import LoginQuery from "../services/LoginQuery.js";

async function Login(req, res){
    const { userid, password } = req.body;
    const user_data = await LoginQuery(userid);
        
        const passOK = await bcrypt.compare(password, user_data.rows[0].password);
        if (passOK) {
            const payload = {
                id: userid,
                username: user_data.rows[0].nombre
            };
            const options = { expiresIn: "1h", issuer: "Tinchito2" };
            const token = jwt.sign(payload, secretKey, options);
            res.status(200).send(token);
        } else {
            res.status(401).send("Usuario o contraseña incorrecta");
        }
    }