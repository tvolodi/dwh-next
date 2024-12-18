import {config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({path: '.env'});
export default defineConfig({
    schema: "./oltp_db/infrastructure_schema.js",
    out: "./oltp_db",
    dialect: "mysql",
    dbCredentials: {
        url: process.env.INFRASTRUCTURE_DATABASE_URL!,
    },
    introspect: {
        casing: "preserve",
    }
});
