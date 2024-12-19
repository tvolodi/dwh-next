import { timestamp } from "drizzle-orm/pg-core";

export const timeAuditTrail = {
    CreatedAt: timestamp().defaultNow().notNull(),
    UpdatedAt: timestamp().defaultNow().notNull(),
    DeletedAt: timestamp().defaultNow().notNull(),
}