import {integer, text, boolean, jsonb, serial, primaryKey, pgTable, pgSchema, AnyPgColumn} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const metaSchema = pgSchema("dwh-meta");

export const meta_DwhConfig = metaSchema.table("DwhConfigs", {
        Id: serial().primaryKey(),
        Code: text().unique(),
        Name: text().notNull(),
        ParamValue: text(),
        ExtendedValue: jsonb(),
        Notes: text(),
    }
);

export const meta_DataType = metaSchema.table("DataTypes", {
    Id: serial().primaryKey(),
    Code: text().unique(),
    PgType: text().notNull(),
    Name: text().notNull(),
    Notes: text(),
});

export const meta_Entity = metaSchema.table("Entities", {
    Id: serial().primaryKey(),
    Code: text().unique(),
    Name: text().notNull(),
    Notes: text(),
    ModuleId: integer().references(() => meta_Module.Id),
});
export const meta_EntityRelations = relations(meta_Entity, ({ one }) => ({
    Module: one(meta_Module, { fields: [meta_Entity.ModuleId], references: [meta_Module.Id] }),
}))



export const meta_JsonSchema = metaSchema.table("JsonSchemas", {
    Id: serial().primaryKey(),
    Code: text().unique(),
    Name: text().notNull(),
    SchemaName: text().notNull(),
    Schema: jsonb(),
    Notes: text(),
});

export const meta_Module = metaSchema.table("Modules", {
    Id: serial().primaryKey(),
    Code: text().unique(),
    Name: text().notNull(),
    Notes: text(),
});

export const meta_ModuleRelations = relations(meta_Module, ({ many }) => ({
    Entity: many(meta_Entity),
}))
