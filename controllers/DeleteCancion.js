import DeleteCancionQuery from "../services/DeleteCancionQuery.js";

async function DeleteCancion(req, res) {
    try {
        await DeleteCancionQuery(req.body.id);
        return res.status(200).send("Canción eliminada correctamente");
    } catch (error) {
        console.error("Error al eliminar la canción:", error);
        return res.status(500).send("Error en la base de datos");
    }
}

export default DeleteCancion;