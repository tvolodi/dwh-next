import {integer, text, boolean, jsonb, serial, primaryKey, pgTable, pgSchema, AnyPgColumn, uuid, timestamp} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { timeAuditTrail } from "./timeAuditTrail";
import { Code, Target } from "lucide-react";



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


/// ETL Process
/// Table to store ETL process information. Here are templates to run ETL process instances.
/// Process instances are stored in EtlProcessJournal table.

export const meta_EtlProcessConfig = metaSchema.table("EtlProcessConfigs", {
    Id: serial().primaryKey(),
    Code: text().unique(),
    Name: text().notNull(),
    EtlProcessTypeId: integer().references(() => meta_EtlProcessType.Id),
    EtlProcessScript: text().notNull(),
    ProcedureName: text().notNull(),
    ProcedureParams: jsonb(),
    CronSchedule: text(),
    TransformationOptions: jsonb(),
    /*
    { 
        "transformOneToOne": true   // If true, then each column in source table will be mapped to target table column. 
                                    // Target table column name should be the same as source table column name.
                                    // Target table data schema will used for transformation.
                                    // If false, then transformation mapping should be provided in EtlTransformMapping table.
    }
    */
    ProcessStatus: text().notNull(), // enum -> /app/lib/common/enums.ts::EtlProcessConfigStatus
    IsDeleted: boolean(),
});
export const meta_EtlProcessRelations = relations(meta_EtlProcessConfig, ({ one }) => ({
    EtlProcessType: one(meta_EtlProcessType, { fields: [meta_EtlProcessConfig.EtlProcessTypeId], references: [meta_EtlProcessType.Id] }),
}))

export const meta_EtlProcessType = metaSchema.table("EtlProcessTypes", {
    Id: serial().primaryKey(),
    Code: text().unique(),
    Name: text().notNull(),    
    Notes: text(),
});

export const meta_EtlProcessJournal = metaSchema.table("EtlProcessJournal", {
    Id: serial().primaryKey(),
    EtlProcessId: integer().references(() => meta_EtlProcessConfig.Id),
    StartedAt: timestamp(),
    FinishedAt: timestamp(),
    Status: text().notNull(), // // enum -> /app/lib/common/enums.ts::EtlProcessStatus
    Notes: text(),
});

/// ETL Transform Mapping
/// Description of the transformation steps in the ETL process.
export const meta_EtlTransformMapping = metaSchema.table("EtlTransformMappings", {
    Id: serial().primaryKey(),
    EtlProcessId: integer().references(() => meta_EtlProcessConfig.Id),
    StepNumber: integer().notNull(),
    Script: text().notNull(),
    TransformationDescriptionType: text().notNull(),   // enum 
    TargetTable: text().notNull(),
    TargetSchema: text().notNull(),
    TargetColumn: jsonb().notNull(),
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


