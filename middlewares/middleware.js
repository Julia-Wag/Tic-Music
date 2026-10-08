import jwt from "jsonwebtoken";

async function verificarToken(req, res, next){
    try{
    let payloadOriginal = await jwt.verify(req.body.token, secretKey);
    req.user_id = payloadOriginal.id;
    req.user_rol = payloadOriginal.rol;
    next()
    }
    catch(error) {console.log("Error en el token: ", error.message); res.status(401).send(error.message)}
}

function verificarAdmin(req, res, next){
    if (req.user_rol === "A"){
        next()
    }
    else {
        res.status(403).send("Acción no autorizada")
    }
}