import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const configDb = {
  connectionString: process.env.DATABASE_URL,
  ...(process.env.MODE === "production" && {
    ssl: {
      rejectUnauthorized: false,
    },
  }),
};

const db = new Pool(configDb);

export default db;