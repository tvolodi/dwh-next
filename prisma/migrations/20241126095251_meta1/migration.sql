-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "dwh_meta";

-- CreateTable
CREATE TABLE "dwh_meta"."DataTypes" (
    "Id" SERIAL NOT NULL,
    "Code" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "PgType" TEXT NOT NULL,

    CONSTRAINT "DataTypes_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "dwh_meta"."Modules" (
    "Id" SERIAL NOT NULL,
    "Code" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "SchemaName" TEXT NOT NULL,
    "OltpModuleName" TEXT,

    CONSTRAINT "Modules_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "dwh_meta"."Entities" (
    "Id" SERIAL NOT NULL,
    "Code" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "ModuleId" INTEGER NOT NULL,
    "OltpEntityName" TEXT,

    CONSTRAINT "Entities_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "dwh_meta"."EntityAttributes" (
    "Id" SERIAL NOT NULL,
    "Code" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "EntityId" INTEGER NOT NULL,
    "DataTypeId" INTEGER NOT NULL,
    "IsNullable" BOOLEAN NOT NULL,
    "IsPrimaryKey" BOOLEAN NOT NULL,
    "IsUnique" BOOLEAN NOT NULL,
    "IsIndexed" BOOLEAN NOT NULL,
    "IsAutoIncrement" BOOLEAN NOT NULL,
    "IsReadOnly" BOOLEAN NOT NULL,
    "LinkedAttributeId" INTEGER,

    CONSTRAINT "EntityAttributes_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "dwh_meta"."DwhConfigs" (
    "Id" SERIAL NOT NULL,
    "Code" TEXT NOT NULL,
    "Name" TEXT,
    "ParamValue" TEXT,
    "ExtendedValue" JSONB,
    "Notes" TEXT,

    CONSTRAINT "DwhConfigs_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DataTypes_Code_key" ON "dwh_meta"."DataTypes"("Code");

-- CreateIndex
CREATE UNIQUE INDEX "Modules_Code_key" ON "dwh_meta"."Modules"("Code");

-- CreateIndex
CREATE UNIQUE INDEX "Entities_Code_key" ON "dwh_meta"."Entities"("Code");

-- CreateIndex
CREATE UNIQUE INDEX "EntityAttributes_Code_key" ON "dwh_meta"."EntityAttributes"("Code");

-- CreateIndex
CREATE UNIQUE INDEX "DwhConfigs_Code_key" ON "dwh_meta"."DwhConfigs"("Code");

-- AddForeignKey
ALTER TABLE "dwh_meta"."Entities" ADD CONSTRAINT "Entities_ModuleId_fkey" FOREIGN KEY ("ModuleId") REFERENCES "dwh_meta"."Modules"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dwh_meta"."EntityAttributes" ADD CONSTRAINT "EntityAttributes_EntityId_fkey" FOREIGN KEY ("EntityId") REFERENCES "dwh_meta"."Entities"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dwh_meta"."EntityAttributes" ADD CONSTRAINT "EntityAttributes_DataTypeId_fkey" FOREIGN KEY ("DataTypeId") REFERENCES "dwh_meta"."DataTypes"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dwh_meta"."EntityAttributes" ADD CONSTRAINT "EntityAttributes_LinkedAttributeId_fkey" FOREIGN KEY ("LinkedAttributeId") REFERENCES "dwh_meta"."EntityAttributes"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
