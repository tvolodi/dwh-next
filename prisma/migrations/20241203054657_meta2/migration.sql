-- CreateTable
CREATE TABLE "dwh_meta"."JsonSchemas" (
    "Id" SERIAL NOT NULL,
    "Category" TEXT NOT NULL,
    "Code" TEXT NOT NULL,
    "Name" TEXT,
    "Schema" JSONB NOT NULL,
    "Notes" TEXT,

    CONSTRAINT "JsonSchemas_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JsonSchemas_Code_key" ON "dwh_meta"."JsonSchemas"("Code");
