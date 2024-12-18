import {config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({path: '.env'});
export default defineConfig({
    schema: "./oltp_db/hr_schema.js",
    out: "./oltp_db",
    dialect: "mysql",
    dbCredentials: {
        url: process.env.HR_DATABASE_URL!,
    },
    introspect: {
        casing: "preserve",
    }
});
