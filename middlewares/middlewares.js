import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET || "tinchito";

async function verificarToken(req, res, next) {
    try {
        const authHeader = req.headers["authorization"];
        // Esto permite que manden "Bearer <token>" o el "<token>" solo
        const token = authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        if (!token) {
            return res.status(401).send("Falta el token");
        }

        let payloadOriginal = jwt.verify(token, secretKey);
        req.user = payloadOriginal; // Guarda { id, username, rol } en req.user
        next();
    } catch (error) {
        console.log("Error en el token: ", error.message);
        res.status(401).send(error.message);
    }
}

function verificarAdmin(req, res, next) {
    if (req.user && req.user.rol === "A") {
        next();
    } else {
        res.status(403).send("Acción no autorizada");
    }
}

export { verificarToken, verificarAdmin };