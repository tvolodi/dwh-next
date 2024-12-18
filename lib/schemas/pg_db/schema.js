import {integer, text, boolean, jsonb, serial, primaryKey, pgTable, pgSchema, AnyPgColumn, uuid, timestamp} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { Description } from "@radix-ui/react-dialog";
import { Table } from "lucide-react";
import { time } from "console";

// ================= dwh-meta schema =================
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

export const meta_LastProcessedRecord = metaSchema.table("LastProcessedRecords", {
    Id: serial().primaryKey(),
    SchemaName: text().notNull(),
    TableName: text().notNull(),
    LastProcessedId: integer(),
    LastProcessedUuid: uuid(),
    LastDT: timestamp(),
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



export const meta_EtlProcess = metaSchema.table("EtlProcesses", {
    Id: serial().primaryKey(),
    EtlProcessTypeId: integer().references(() => meta_EtlProcessType.Id),
    ProcessStartedAt: timestamp(),
    ProcessFinishedAt: timestamp(),
    ProcessStatus: text().notNull(),
});

export const meta_EtlProcessType = metaSchema.table("EtlProcessTypes", {
    Id: serial().primaryKey(),
    Code: text().unique(),
    Name: text().notNull(),
    Notes: text(),
});



// ================= core schema =================
export const coreSchema = pgSchema("core");

export const core_OrgUnit = coreSchema.table("OrgUnits", {
    Id: integer().primaryKey(),
    BIN: text().unique(),
    Code: text().unique(),
    CodeFromExtAcctSys: text(),
    Description: text().notNull(),
    ExternalId: uuid().unique(),
    Group: text(),
    KBE: text(),
    ParentId: integer().references(() => core_OrgUnit.Id),
    Prefix: text(),
});


