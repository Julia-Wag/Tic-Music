import Router from "express"
import Escucho from "../controllers/Escucho.js";
import PostCancion from "../controllers/PostCancion.js";
import PutCancion from "../controllers/PutCancion.js";
import DeleteCancion from "../controllers/DeleteCancion.js";

const router = Router()

router.post("/escucho", verificarToken, Escucho)
router.post("/cancion",verificarToken, verificarAdmin, PostCancion)
router.put("/cancion", verificarToken, verificarAdmin, PutCancion)
router.delete("/cancion", verificarToken, verificarAdmin, DeleteCancion)