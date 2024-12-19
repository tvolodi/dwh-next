CREATE TABLE IF NOT EXISTS "dwh-meta"."EtlProcessConfigs" (
	"Id" serial PRIMARY KEY NOT NULL,
	"EtlProcessTypeId" integer,
	"EtlProcessScript" text NOT NULL,
	"ProcedureName" text NOT NULL,
	"ProcedureParams" jsonb,
	"CronSchedule" text,
	"ProcessStatus" text NOT NULL,
	"IsDeleted" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dwh-meta"."EtlProcessJournal" (
	"Id" serial PRIMARY KEY NOT NULL,
	"EtlProcessId" integer,
	"StartedAt" timestamp,
	"FinishedAt" timestamp,
	"Status" text NOT NULL,
	"Notes" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dwh-meta"."EtlProcessTypes" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Code" text,
	"Name" text NOT NULL,
	"Notes" text,
	CONSTRAINT "EtlProcessTypes_Code_unique" UNIQUE("Code")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dwh-meta"."EtlProcessConfigs" ADD CONSTRAINT "EtlProcessConfigs_EtlProcessTypeId_EtlProcessTypes_Id_fk" FOREIGN KEY ("EtlProcessTypeId") REFERENCES "dwh-meta"."EtlProcessTypes"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dwh-meta"."EtlProcessJournal" ADD CONSTRAINT "EtlProcessJournal_EtlProcessId_EtlProcessConfigs_Id_fk" FOREIGN KEY ("EtlProcessId") REFERENCES "dwh-meta"."EtlProcessConfigs"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
