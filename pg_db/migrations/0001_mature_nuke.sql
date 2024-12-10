CREATE TABLE IF NOT EXISTS "dwh-meta"."Entities" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Code" text,
	"Name" text NOT NULL,
	"Notes" text,
	"ModuleId" integer,
	CONSTRAINT "Entities_Code_unique" UNIQUE("Code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dwh-meta"."Modules" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Code" text,
	"Name" text NOT NULL,
	"Notes" text,
	CONSTRAINT "Modules_Code_unique" UNIQUE("Code")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dwh-meta"."Entities" ADD CONSTRAINT "Entities_ModuleId_Modules_Id_fk" FOREIGN KEY ("ModuleId") REFERENCES "dwh-meta"."Modules"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
