import pkg from "pg";
import config from "./db_config.js";

const client = new pkg.Pool(config);

export default client;