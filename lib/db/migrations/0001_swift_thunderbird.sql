CREATE TABLE IF NOT EXISTS "dwh-meta"."DwhConfigs" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Code" text,
	"Name" text NOT NULL,
	"ParamValue" text,
	"ExtendedValue" jsonb,
	"Notes" text,
	CONSTRAINT "DwhConfigs_Code_unique" UNIQUE("Code")
);
--> statement-breakpoint
DROP TABLE "dwh-meta"."DwhConfig" CASCADE;