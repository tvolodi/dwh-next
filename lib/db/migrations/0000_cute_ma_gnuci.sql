CREATE SCHEMA "dwh-meta";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dwh-meta"."DwhConfig" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Code" text,
	"Name" text NOT NULL,
	"ParamValue" text,
	"ExtendedValue" jsonb,
	"Notes" text,
	CONSTRAINT "DwhConfig_Code_unique" UNIQUE("Code")
);
