import {integer, text, boolean, jsonb, serial, primaryKey, pgTable, pgSchema} from "drizzle-orm/pg-core";

export const metaSchema = pgSchema("dwh-meta");

export const DwhConfig = metaSchema.table("DwhConfigs", {
        Id: serial().primaryKey(),
        Code: text().unique(),
        Name: text().notNull(),
        ParamValue: text(),
        ExtendedValue: jsonb(),
        Notes: text(),
    }
);

export const DataType = metaSchema.table("DataTypes", {
    Id: serial().primaryKey(),
    Code: text().unique(),
    PgType: text().notNull(),
    Name: text().notNull(),
    Notes: text(),
});

export const JsonSchema = metaSchema.table("JsonSchemas", {
    Id: serial().primaryKey(),
    Code: text().unique(),
    Name: text().notNull(),
    SchemaName: text().notNull(),
    Schema: jsonb(),
    Notes: text(),
});
