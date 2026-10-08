async function CrearUsuario (req, res){
    const { userid, nombre, password } = req.body;
    const password_hashed = await bcrypt.hash(password, 10);
    
    await client.query("INSERT INTO usuario (id, nombre, password) VALUES ($1, $2, $3)", [userid, nombre, password_hashed]);
    res.status(201).send("Usuario creado");
    }