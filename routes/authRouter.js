import Router from "express";
import CrearUsuario from "../controllers/CreateUser.js";
import Login from "../controllers/Login.js";

const router = Router()

router.post("/crearusuario", CrearUsuario)
router.post("/login", Login);