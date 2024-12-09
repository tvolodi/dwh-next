import "dotenv/config";
import { Logger } from 'drizzle-orm/logger';
import { drizzle } from "drizzle-orm/node-postgres";

class MyLogger implements Logger {
    logQuery(query: string, params: unknown[]): void {
      // console.log({ query, params });
    }
  }

export const db = drizzle(process.env.DATABASE_URL!, 
    // {logger: new MyLogger()}
);