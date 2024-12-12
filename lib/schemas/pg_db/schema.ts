import {integer, text, boolean, jsonb, serial, primaryKey, pgTable, pgSchema, AnyPgColumn} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

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

export const Entity = metaSchema.table("Entities", {
    Id: serial().primaryKey(),
    Code: text().unique(),
    Name: text().notNull(),
    Notes: text(),
    ModuleId: integer().references(() => Module.Id),
});
export const EntityRelations = relations(Entity, ({ one }) => ({
    module: one(Module, { fields: [Entity.ModuleId], references: [Module.Id] }),
}))



export const JsonSchema = metaSchema.table("JsonSchemas", {
    Id: serial().primaryKey(),
    Code: text().unique(),
    Name: text().notNull(),
    SchemaName: text().notNull(),
    Schema: jsonb(),
    Notes: text(),
});

export const Module = metaSchema.table("Modules", {
    Id: serial().primaryKey(),
    Code: text().unique(),
    Name: text().notNull(),
    Notes: text(),
});

export const ModuleRelations = relations(Module, ({ many }) => ({
    Entity: many(Entity),
}))
