CREATE SCHEMA "dwh-meta";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dwh-meta"."DataTypes" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Code" text,
	"PgType" text NOT NULL,
	"Name" text NOT NULL,
	"Notes" text,
	CONSTRAINT "DataTypes_Code_unique" UNIQUE("Code")
);
--> statement-breakpoint
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
CREATE TABLE IF NOT EXISTS "dwh-meta"."JsonSchemas" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Code" text,
	"Name" text NOT NULL,
	"SchemaName" text NOT NULL,
	"Schema" jsonb,
	"Notes" text,
	CONSTRAINT "JsonSchemas_Code_unique" UNIQUE("Code")
);
