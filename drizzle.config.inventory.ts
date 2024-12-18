import {config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({path: '.env'});
export default defineConfig({
    schema: "./oltp_db/inventory_schema.js",
    out: "./oltp_db",
    dialect: "mysql",
    dbCredentials: {
        url: process.env.INVENTORY_DATABASE_URL!,
    },
    introspect: {
        casing: "preserve",
    }
});
