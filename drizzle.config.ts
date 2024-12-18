import {config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({path: '.env'});
export default defineConfig({
    schema: "./lib/schemas/pg_db/schema.js",
    out: "./pg_db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
