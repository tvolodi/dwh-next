CREATE TABLE IF NOT EXISTS "dwh-meta"."JsonSchemas" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Code" text,
	"Name" text NOT NULL,
	"SchemaName" text NOT NULL,
	"Schema" jsonb,
	"Notes" text,
	CONSTRAINT "JsonSchemas_Code_unique" UNIQUE("Code")
);
