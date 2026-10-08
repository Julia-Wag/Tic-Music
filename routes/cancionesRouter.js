import Router from "express"

const router = Router()

router.post("/escucho", verificarToken, Escucho)
router.post("/cancion",verificarToken, verificarAdmin)
router.put("/cancion", verificarToken, verificarAdmin)
router.delete("/cancion", verificarToken, verificarAdmin)