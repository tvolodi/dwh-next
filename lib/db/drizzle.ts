import "dotenv/config";
import { Logger } from 'drizzle-orm/logger';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as dbSchema from "@/lib/schemas/pg_db/schema";


class MyLogger implements Logger {
    logQuery(query: string, params: unknown[]): void {
      // console.log({ query, params });
    }
  }

const pool = new Pool({connectionString: process.env.DATABASE_URL!});

export const db = drizzle({
    client: pool,
    schema: dbSchema
  }
  // process.env.DATABASE_URL!, 
  
    // {logger: new MyLogger()}
);