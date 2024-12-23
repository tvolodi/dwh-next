CREATE TABLE IF NOT EXISTS "dwh-meta"."EtlTransformMappings" (
	"Id" serial PRIMARY KEY NOT NULL,
	"EtlProcessId" integer,
	"StepNumber" integer NOT NULL,
	"Script" text NOT NULL,
	"TransformationDescriptionType" text NOT NULL,
	"TargetTable" text NOT NULL,
	"TargetSchema" text NOT NULL,
	"TargetColumn" jsonb NOT NULL
);
--> statement-breakpoint
ALTER TABLE "dwh-meta"."EtlProcessConfigs" ADD COLUMN "TransformationOptions" jsonb;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dwh-meta"."EtlTransformMappings" ADD CONSTRAINT "EtlTransformMappings_EtlProcessId_EtlProcessConfigs_Id_fk" FOREIGN KEY ("EtlProcessId") REFERENCES "dwh-meta"."EtlProcessConfigs"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
