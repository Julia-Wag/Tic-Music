import client from "../db.js";

export default async function CreateUserQuery(userid, nombre, password_hashed){
    await client.query("INSERT INTO usuario (id, nombre, password) VALUES ($1, $2, $3)", [userid, nombre, password_hashed]);
}