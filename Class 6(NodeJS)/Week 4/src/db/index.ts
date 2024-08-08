import { Client, Pool } from "pg";

export const client = new Client({
  host: "localhost",
  port: 5432,
  user: "DennyZhen",
  password: "1234",
  database: "midterm_store"
});

export const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "DennyZhen",
  password: "1234",
  database: "midterm_store"
});