import "dotenv/config";
import { Logger } from 'drizzle-orm/logger';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";


class MyLogger implements Logger {
    logQuery(query: string, params: unknown[]): void {
      // console.log({ query, params });
    }
  }

const pool = new Pool({connectionString: process.env.DATABASE_URL!});

export const db = drizzle({
    client: pool,
  }
  // process.env.DATABASE_URL!, 
  
    // {logger: new MyLogger()}
);