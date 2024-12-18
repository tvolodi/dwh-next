CREATE SCHEMA "core";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."OrgUnits" (
	"Id" integer PRIMARY KEY NOT NULL,
	"BIN" text,
	"Code" text,
	"CodeFromExtAcctSys" text,
	"Description" text NOT NULL,
	"ExternalId" uuid,
	"Group" text,
	"KBE" text,
	"ParentId" integer,
	"Prefix" text,
	CONSTRAINT "OrgUnits_BIN_unique" UNIQUE("BIN"),
	CONSTRAINT "OrgUnits_Code_unique" UNIQUE("Code"),
	CONSTRAINT "OrgUnits_ExternalId_unique" UNIQUE("ExternalId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dwh-meta"."LastProcessedRecords" (
	"Id" serial PRIMARY KEY NOT NULL,
	"SchemaName" text NOT NULL,
	"TableName" text NOT NULL,
	"LastProcessedId" integer,
	"LastProcessedUuid" uuid,
	"LastDT" timestamp
);
--> statement-breakpoint
DROP TABLE "dwh-meta"."DataTypes" CASCADE;--> statement-breakpoint
DROP TABLE "dwh-meta"."JsonSchemas" CASCADE;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."OrgUnits" ADD CONSTRAINT "OrgUnits_ParentId_OrgUnits_Id_fk" FOREIGN KEY ("ParentId") REFERENCES "core"."OrgUnits"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
