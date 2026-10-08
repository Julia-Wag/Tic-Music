import pkg from "pg";
import config from "./db_config.js";
const { Client } = pkg;
export const client = new Client(config);
await client.connect();