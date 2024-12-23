ALTER TABLE "dwh-meta"."EtlProcessConfigs" ADD COLUMN "Code" text;--> statement-breakpoint
ALTER TABLE "dwh-meta"."EtlProcessConfigs" ADD COLUMN "Name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "dwh-meta"."EtlProcessConfigs" ADD CONSTRAINT "EtlProcessConfigs_Code_unique" UNIQUE("Code");