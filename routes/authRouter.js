import Router from "express"

const router = Router()

router.post("/crearusuario", CrearUsuario)
router.post("/login", Login);