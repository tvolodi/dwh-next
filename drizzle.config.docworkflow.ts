import {config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({path: '.env'});
export default defineConfig({
    schema: "./oltp_db/docworkflow_schema.js",
    dialect: "mysql",
    out: "./oltp_db",
    dbCredentials: {
        url: process.env.DOCWORKFLOW_DATABASE_URL!,
    },
    introspect: {
        casing: "preserve",
    }
});
