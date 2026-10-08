async function Escucho(req,res){
    try {  
        EscuchoQuery(req.user_id)
    }
    catch(error) {console.log("Error en la database: ", error.message); res.status(500).send(error.message)}
}