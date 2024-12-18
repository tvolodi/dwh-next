import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, foreignKey, primaryKey, binary, longtext, varchar, int, datetime, bigint, unique, double, date, text, float, mysqlView, json } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const Attachments = mysqlTable("Attachments", {
	Id: binary({ length: 16 }).notNull(),
	MimeType: longtext().notNull(),
	FilePath: varchar({ length: 255 }),
	OriginalFileName: longtext().notNull(),
	TaskId: binary({ length: 16 }).notNull().references(() => Tasks.Id, { onDelete: "restrict" } ),
	AssetId: binary({ length: 16 }).notNull(),
	EmployeeId: int().notNull(),
	AttachmentCreationTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	IsRemoved: tinyint().default(0).notNull(),
	TaskViewId: binary({ length: 16 }),
},
(table) => {
	return {
		IX_Attachments_TaskId: index("IX_Attachments_TaskId").on(table.TaskId),
		IX_Attachments_TaskViewId: index("IX_Attachments_TaskViewId").on(table.TaskViewId),
		Attachments_Id: primaryKey({ columns: [table.Id], name: "Attachments_Id"}),
	}
});

export const Briefings = mysqlTable("Briefings", {
	Id: binary({ length: 16 }).notNull(),
	Familiar: tinyint().notNull(),
	LastBriefingDate: datetime({ mode: 'string', fsp: 6 }).notNull(),
	DocumentId: binary({ length: 16 }).notNull(),
	ExternalUserId: int().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		IX_Briefings_DocumentId: index("IX_Briefings_DocumentId").on(table.DocumentId),
		Briefings_Id: primaryKey({ columns: [table.Id], name: "Briefings_Id"}),
	}
});

export const Briefings_tracking = mysqlTable("Briefings_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		Briefings_tracking_Id: primaryKey({ columns: [table.Id], name: "Briefings_tracking_Id"}),
	}
});

export const CheckListItems = mysqlTable("CheckListItems", {
	Id: binary({ length: 16 }).notNull(),
	CheckListId: binary({ length: 16 }).notNull().references(() => CheckLists.Id, { onDelete: "restrict" } ),
	Description: varchar({ length: 255 }).notNull(),
	Enabled: tinyint().default(1).notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	Severity: longtext().notNull(),
},
(table) => {
	return {
		IX_CheckListItems_CheckListId: index("IX_CheckListItems_CheckListId").on(table.CheckListId),
		CheckListItems_Id: primaryKey({ columns: [table.Id], name: "CheckListItems_Id"}),
		IX_CheckListItems_Description_CheckListId: unique("IX_CheckListItems_Description_CheckListId").on(table.Description, table.CheckListId),
	}
});

export const CheckListItems_tracking = mysqlTable("CheckListItems_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		CheckListItems_tracking_Id: primaryKey({ columns: [table.Id], name: "CheckListItems_tracking_Id"}),
	}
});

export const CheckListResults = mysqlTable("CheckListResults", {
	Id: binary({ length: 16 }).notNull(),
	CheckListItemId: binary({ length: 16 }).notNull().references(() => CheckListItems.Id, { onDelete: "restrict" } ),
	TaskId: binary({ length: 16 }).notNull().references(() => Tasks.Id, { onDelete: "restrict" } ),
	AssetId: binary({ length: 16 }).notNull(),
	EmployeeId: int().notNull(),
	Time: datetime({ mode: 'string', fsp: 6 }).notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	TaskViewId: binary({ length: 16 }),
},
(table) => {
	return {
		IX_CheckListResults_CheckListItemId: index("IX_CheckListResults_CheckListItemId").on(table.CheckListItemId),
		IX_CheckListResults_TaskId: index("IX_CheckListResults_TaskId").on(table.TaskId),
		IX_CheckListResults_TaskViewId: index("IX_CheckListResults_TaskViewId").on(table.TaskViewId),
		CheckListResults_Id: primaryKey({ columns: [table.Id], name: "CheckListResults_Id"}),
	}
});

export const CheckLists = mysqlTable("CheckLists", {
	Id: binary({ length: 16 }).notNull(),
	Description: varchar({ length: 255 }).notNull(),
	MultipleChoice: tinyint().default(0).notNull(),
	Enabled: tinyint().default(1).notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		CheckLists_Id: primaryKey({ columns: [table.Id], name: "CheckLists_Id"}),
		IX_CheckLists_Description: unique("IX_CheckLists_Description").on(table.Description),
	}
});

export const CheckLists_tracking = mysqlTable("CheckLists_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		CheckLists_tracking_Id: primaryKey({ columns: [table.Id], name: "CheckLists_tracking_Id"}),
	}
});

export const ColumnChangesLogs = mysqlTable("ColumnChangesLogs", {
	Id: int().autoincrement().notNull(),
	TableName: varchar({ length: 255 }).notNull(),
	RowGuid: binary({ length: 16 }).notNull(),
	ColumnName: varchar({ length: 255 }).notNull(),
	LastChangedOn: datetime({ mode: 'string', fsp: 6 }).notNull(),
},
(table) => {
	return {
		ColumnChangesLogs_Id: primaryKey({ columns: [table.Id], name: "ColumnChangesLogs_Id"}),
		IX_ColumnChangesLogs_RowGuid_TableName_ColumnName: unique("IX_ColumnChangesLogs_RowGuid_TableName_ColumnName").on(table.RowGuid, table.TableName, table.ColumnName),
	}
});

export const ComponentTypes = mysqlTable("ComponentTypes", {
	Id: binary({ length: 16 }).notNull(),
	Description: longtext(),
	AssetClassId: binary({ length: 16 }).notNull(),
},
(table) => {
	return {
		ComponentTypes_Id: primaryKey({ columns: [table.Id], name: "ComponentTypes_Id"}),
	}
});

export const CurrentEntityReadings = mysqlTable("CurrentEntityReadings", {
	Id: binary({ length: 16 }).notNull(),
	EntityType: longtext().notNull(),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	EntityReadingId: binary({ length: 16 }).notNull().references(() => EntityReadings.Id, { onDelete: "restrict" } ),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	ReadingTypeId: binary({ length: 16 }).default('0x').notNull(),
},
(table) => {
	return {
		CurrentEntityReadings_Id: primaryKey({ columns: [table.Id], name: "CurrentEntityReadings_Id"}),
		IX_CurrentEntityReadings_EntityReadingId_EntityGuidId: unique("IX_CurrentEntityReadings_EntityReadingId_EntityGuidId").on(table.EntityReadingId, table.EntityGuidId),
		IX_CurrentEntityReadings_EntityReadingId_EntityIntId: unique("IX_CurrentEntityReadings_EntityReadingId_EntityIntId").on(table.EntityReadingId, table.EntityIntId),
	}
});

export const DefectListTemplates = mysqlTable("DefectListTemplates", {
	Id: binary({ length: 16 }).notNull(),
	AssetClassId: binary({ length: 16 }),
	TypeOfMaintenanceId: binary({ length: 16 }).references(() => TypesOfMaintenance.Id, { onDelete: "restrict" } ),
	Description: longtext().notNull(),
	IsRemoved: tinyint().notNull(),
	DefectListContent: longtext(),
},
(table) => {
	return {
		IX_DefectListTemplates_TypeOfMaintenanceId: index("IX_DefectListTemplates_TypeOfMaintenanceId").on(table.TypeOfMaintenanceId),
		DefectListTemplates_Id: primaryKey({ columns: [table.Id], name: "DefectListTemplates_Id"}),
	}
});

export const DocumentTypes = mysqlTable("DocumentTypes", {
	Id: varchar({ length: 20 }).notNull(),
	Description: longtext().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		DocumentTypes_Id: primaryKey({ columns: [table.Id], name: "DocumentTypes_Id"}),
	}
});

export const DocumentTypes_tracking = mysqlTable("DocumentTypes_tracking", {
	Id: varchar({ length: 20 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		DocumentTypes_tracking_Id: primaryKey({ columns: [table.Id], name: "DocumentTypes_tracking_Id"}),
	}
});

export const DocumentVersions = mysqlTable("DocumentVersions", {
	Id: binary({ length: 16 }).notNull(),
	DocumentId: binary({ length: 16 }).notNull().references(() => Documents.Id, { onDelete: "cascade" } ),
	RevNr: int().notNull(),
	Comment: longtext().notNull(),
	MimeType: longtext(),
	FilePath: longtext(),
	OriginalFileName: longtext(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		IX_DocumentVersions_DocumentId: index("IX_DocumentVersions_DocumentId").on(table.DocumentId),
		DocumentVersions_Id: primaryKey({ columns: [table.Id], name: "DocumentVersions_Id"}),
	}
});

export const Documents = mysqlTable("Documents", {
	Id: binary({ length: 16 }).notNull(),
	RevNr: int(),
	Comment: longtext(),
	Description: longtext(),
	DocumentName: longtext(),
	DocumentTypeId: varchar({ length: 20 }).references(() => DocumentTypes.Id, { onDelete: "restrict" } ),
	MimeType: longtext(),
	FilePath: longtext(),
	ReviewType: longtext().notNull(),
	OriginalFileName: longtext(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	LocationId: int(),
},
(table) => {
	return {
		IX_Documents_DocumentTypeId: index("IX_Documents_DocumentTypeId").on(table.DocumentTypeId),
		Documents_Id: primaryKey({ columns: [table.Id], name: "Documents_Id"}),
	}
});

export const Documents_tracking = mysqlTable("Documents_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		Documents_tracking_Id: primaryKey({ columns: [table.Id], name: "Documents_tracking_Id"}),
	}
});

export const EntityProdStatReadings = mysqlTable("EntityProdStatReadings", {
	Id: int().autoincrement().notNull(),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	ProdStatReadingId: int().notNull().references(() => ProdStatReadings.Id, { onDelete: "restrict" } ),
	EntityType: longtext().notNull(),
	IsRemoved: tinyint().notNull(),
},
(table) => {
	return {
		IX_EntityProdStatReadings_ProdStatReadingId: index("IX_EntityProdStatReadings_ProdStatReadingId").on(table.ProdStatReadingId),
		EntityProdStatReadings_Id: primaryKey({ columns: [table.Id], name: "EntityProdStatReadings_Id"}),
	}
});

export const EntityReadingStandards = mysqlTable("EntityReadingStandards", {
	Id: int().autoincrement().notNull(),
	IsRemoved: tinyint().notNull(),
	EntityType: longtext().notNull(),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	ReadingTypeId: binary({ length: 16 }).references(() => ReadingTypes.Id, { onDelete: "restrict" } ),
},
(table) => {
	return {
		IX_EntityReadingStandards_ReadingTypeId: index("IX_EntityReadingStandards_ReadingTypeId").on(table.ReadingTypeId),
		EntityReadingStandards_Id: primaryKey({ columns: [table.Id], name: "EntityReadingStandards_Id"}),
	}
});

export const EntityReadings = mysqlTable("EntityReadings", {
	Id: binary({ length: 16 }).notNull(),
	ReadingTypeId: binary({ length: 16 }).notNull().references(() => ReadingTypes.Id, { onDelete: "restrict" } ),
	EntityType: longtext().notNull(),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	Value: varchar({ length: 255 }).notNull(),
	OccuredAt: datetime({ mode: 'string', fsp: 6 }).notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsRemoved: tinyint().default(0).notNull(),
	UnitOfMeasureId: binary({ length: 16 }).default('0x').notNull(),
},
(table) => {
	return {
		IX_EntityReadings_EntityGuidId: index("IX_EntityReadings_EntityGuidId").on(table.EntityGuidId),
		IX_EntityReadings_OccuredAt: index("IX_EntityReadings_OccuredAt").on(table.OccuredAt),
		IX_EntityReadings_ReadingTypeId: index("IX_EntityReadings_ReadingTypeId").on(table.ReadingTypeId),
		IX_EntityReadings_Value: index("IX_EntityReadings_Value").on(table.Value),
		EntityReadings_Id: primaryKey({ columns: [table.Id], name: "EntityReadings_Id"}),
	}
});

export const EqClassReadingsTypes = mysqlTable("EqClassReadingsTypes", {
	Id: binary({ length: 16 }).notNull(),
	AssetClassId: binary({ length: 16 }).notNull(),
	AssetId: binary({ length: 16 }).notNull(),
	ReadingTypeId: binary({ length: 16 }).notNull().references(() => ReadingTypes.Id, { onDelete: "cascade" } ),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		IX_EqClassReadingsTypes_ReadingTypeId: index("IX_EqClassReadingsTypes_ReadingTypeId").on(table.ReadingTypeId),
		EqClassReadingsTypes_Id: primaryKey({ columns: [table.Id], name: "EqClassReadingsTypes_Id"}),
	}
});

export const EqDefectTypes = mysqlTable("EqDefectTypes", {
	Id: binary({ length: 16 }).notNull(),
	Code: varchar({ length: 255 }).notNull(),
	AssetClassId: binary({ length: 16 }),
	Description: longtext(),
	ExtDescription: longtext(),
},
(table) => {
	return {
		EqDefectTypes_Id: primaryKey({ columns: [table.Id], name: "EqDefectTypes_Id"}),
		IX_EqDefectTypes_Code: unique("IX_EqDefectTypes_Code").on(table.Code),
	}
});

export const EqDefectsJournals = mysqlTable("EqDefectsJournals", {
	Id: binary({ length: 16 }).notNull(),
	AssetId: binary({ length: 16 }).notNull(),
	AssetClassId: binary({ length: 16 }),
	DocTypeId: binary({ length: 16 }),
	EqDefectTypeId: binary({ length: 16 }).references(() => EqDefectTypes.Id, { onDelete: "restrict" } ),
	DefectNote: longtext(),
	DefectQnt: int(),
	DefectResolutionNote: longtext(),
	MaintRequestRegistryId: binary({ length: 16 }).references(() => MaintRequestRegistries.Id, { onDelete: "restrict" } ),
	OpenDT: datetime({ mode: 'string', fsp: 6 }).notNull(),
	ResolveDT: datetime({ mode: 'string', fsp: 6 }),
	IssueAuthorId: int().notNull(),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		IX_EqDefectsJournals_EqDefectTypeId: index("IX_EqDefectsJournals_EqDefectTypeId").on(table.EqDefectTypeId),
		IX_EqDefectsJournals_MaintRequestRegistryId: index("IX_EqDefectsJournals_MaintRequestRegistryId").on(table.MaintRequestRegistryId),
		EqDefectsJournals_Id: primaryKey({ columns: [table.Id], name: "EqDefectsJournals_Id"}),
	}
});

export const EqInspectionResult = mysqlTable("EqInspectionResult", {
	Id: binary({ length: 16 }).notNull(),
	AssetClassId: binary({ length: 16 }),
	AssetId: binary({ length: 16 }),
	InspectionNote: longtext(),
	DefectNote: longtext(),
	EqDefectTypeId: binary({ length: 16 }).references(() => EqDefectTypes.Id, { onDelete: "restrict" } ),
	DefectQnt: int(),
	EqDefectsJournalId: binary({ length: 16 }).references(() => EqDefectsJournals.Id, { onDelete: "restrict" } ),
	ResponsibleId: int(),
	InspectionDT: datetime({ mode: 'string', fsp: 6 }).notNull(),
	DocId: binary({ length: 16 }),
	DocTypeId: binary({ length: 16 }),
	IsRemoved: tinyint().notNull(),
},
(table) => {
	return {
		IX_EqInspectionResult_EqDefectsJournalId: index("IX_EqInspectionResult_EqDefectsJournalId").on(table.EqDefectsJournalId),
		IX_EqInspectionResult_EqDefectTypeId: index("IX_EqInspectionResult_EqDefectTypeId").on(table.EqDefectTypeId),
		EqInspectionResult_Id: primaryKey({ columns: [table.Id], name: "EqInspectionResult_Id"}),
	}
});

export const EqMaintJournal = mysqlTable("EqMaintJournal", {
	Id: binary({ length: 16 }).notNull(),
	MaintRequestRegistryId: binary({ length: 16 }).references(() => MaintRequestRegistries.Id, { onDelete: "restrict" } ),
	AssetId: binary({ length: 16 }),
	MaintDoneDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	DocTypesId: binary({ length: 16 }).notNull(),
	MaintDocId: binary({ length: 16 }).notNull(),
	MaintResponsibleId: int().notNull(),
	TypeOfMaintenanceId: binary({ length: 16 }).references(() => TypesOfMaintenance.Id),
	ReadingTypeId: binary({ length: 16 }).references(() => ReadingTypes.Id),
	ReadingsValue: longtext(),
	ReadingsUoMId: binary({ length: 16 }),
	IsRemoved: tinyint().notNull(),
	Seriality: int(),
	ScheduledWorkId: binary({ length: 16 }).references(() => ScheduledWorks.Id, { onDelete: "restrict" } ),
	StatusColour: longtext(),
},
(table) => {
	return {
		IX_EqMaintJournal_MaintRequestRegistryId: index("IX_EqMaintJournal_MaintRequestRegistryId").on(table.MaintRequestRegistryId),
		IX_EqMaintJournal_ReadingTypeId: index("IX_EqMaintJournal_ReadingTypeId").on(table.ReadingTypeId),
		IX_EqMaintJournal_ScheduledWorkId: index("IX_EqMaintJournal_ScheduledWorkId").on(table.ScheduledWorkId),
		IX_EqMaintJournal_TypeOfMaintenanceId: index("IX_EqMaintJournal_TypeOfMaintenanceId").on(table.TypeOfMaintenanceId),
		EqMaintJournal_Id: primaryKey({ columns: [table.Id], name: "EqMaintJournal_Id"}),
	}
});

export const EqMaintReadings = mysqlTable("EqMaintReadings", {
	Id: binary({ length: 16 }).notNull(),
	AssetId: binary({ length: 16 }),
	TypeOfMaintenanceId: binary({ length: 16 }).references(() => TypesOfMaintenance.Id),
	EqMaintJournalId: binary({ length: 16 }).notNull().references(() => EqMaintJournal.Id, { onDelete: "cascade" } ),
	ReadingTypeId: binary({ length: 16 }).notNull().references(() => ReadingTypes.Id, { onDelete: "cascade" } ),
	ReadingValue: double().notNull(),
	OccuredAt: datetime({ mode: 'string', fsp: 6 }).notNull(),
},
(table) => {
	return {
		IX_EqMaintReadings_EqMaintJournalId: index("IX_EqMaintReadings_EqMaintJournalId").on(table.EqMaintJournalId),
		IX_EqMaintReadings_ReadingTypeId: index("IX_EqMaintReadings_ReadingTypeId").on(table.ReadingTypeId),
		IX_EqMaintReadings_TypeOfMaintenanceId: index("IX_EqMaintReadings_TypeOfMaintenanceId").on(table.TypeOfMaintenanceId),
		EqMaintReadings_Id: primaryKey({ columns: [table.Id], name: "EqMaintReadings_Id"}),
	}
});

export const EqReadingsStandards = mysqlTable("EqReadingsStandards", {
	Id: int().autoincrement().notNull(),
	AssetId: binary({ length: 16 }),
	AssetClassId: binary({ length: 16 }),
	ReadingTypeId: binary({ length: 16 }).references(() => ReadingTypes.Id, { onDelete: "restrict" } ),
	ComparisonType: longtext().notNull(),
	MinValue: double(),
	MaxValue: double(),
	MaxAlertValue: double(),
	MinAlertValue: double(),
	IsRemoved: tinyint().default(0).notNull(),
	Description: longtext().notNull(),
},
(table) => {
	return {
		IX_EqReadingsStandards_ReadingTypeId: index("IX_EqReadingsStandards_ReadingTypeId").on(table.ReadingTypeId),
		EqReadingsStandards_Id: primaryKey({ columns: [table.Id], name: "EqReadingsStandards_Id"}),
	}
});

export const EqRepairJournal = mysqlTable("EqRepairJournal", {
	Id: binary({ length: 16 }).notNull(),
	ReceiptDate: datetime({ mode: 'string', fsp: 6 }).notNull(),
	SourcePlantOrWagonNumber: longtext(),
	AssetTypeId: binary({ length: 16 }),
	AssetId: binary({ length: 16 }).notNull(),
	AssetClassId: binary({ length: 16 }),
	DateProduceAxle: datetime({ mode: 'string', fsp: 6 }),
	LastFormation: datetime({ mode: 'string', fsp: 6 }),
	LastFullInspectionAndBogieMounting: datetime({ mode: 'string', fsp: 6 }),
	RollingCircleDiameter: int(),
	DispatchOrUndertruckDate: datetime({ mode: 'string', fsp: 6 }),
	DestinationOrCarNumber: longtext(),
},
(table) => {
	return {
		EqRepairJournal_Id: primaryKey({ columns: [table.Id], name: "EqRepairJournal_Id"}),
	}
});

export const EqRepairJournalWork = mysqlTable("EqRepairJournalWork", {
	Id: binary({ length: 16 }).notNull(),
	AssetId: binary({ length: 16 }).notNull(),
	TypeOfWorkId: binary({ length: 16 }).notNull(),
	EqRepairJournalId: binary({ length: 16 }).notNull().references(() => EqRepairJournal.Id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		IX_EqRepairJournalWork_EqRepairJournalId: index("IX_EqRepairJournalWork_EqRepairJournalId").on(table.EqRepairJournalId),
		EqRepairJournalWork_Id: primaryKey({ columns: [table.Id], name: "EqRepairJournalWork_Id"}),
	}
});

export const EquipmentDocumentation = mysqlTable("EquipmentDocumentation", {
	Id: int().autoincrement().notNull(),
	DocumentId: binary({ length: 16 }).notNull().references(() => Documents.Id, { onDelete: "cascade" } ),
	EquipmentId: binary({ length: 16 }).notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		IX_EquipmentDocumentation_DocumentId: index("IX_EquipmentDocumentation_DocumentId").on(table.DocumentId),
		EquipmentDocumentation_Id: primaryKey({ columns: [table.Id], name: "EquipmentDocumentation_Id"}),
		IX_EquipmentDocumentation_EquipmentId_DocumentId: unique("IX_EquipmentDocumentation_EquipmentId_DocumentId").on(table.EquipmentId, table.DocumentId),
	}
});

export const EquipmentDocumentation_tracking = mysqlTable("EquipmentDocumentation_tracking", {
	Id: int().notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		EquipmentDocumentation_tracking_Id: primaryKey({ columns: [table.Id], name: "EquipmentDocumentation_tracking_Id"}),
	}
});

export const EquipmentNotes = mysqlTable("EquipmentNotes", {
	Id: binary({ length: 16 }).notNull(),
	TaskId: binary({ length: 16 }).notNull().references(() => Tasks.Id, { onDelete: "restrict" } ),
	AssetId: binary({ length: 16 }).notNull(),
	EmployeeId: int().notNull(),
	Note: longtext().notNull(),
	NoteTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsRemoved: tinyint().default(0).notNull(),
	TaskViewId: binary({ length: 16 }),
},
(table) => {
	return {
		IX_EquipmentNotes_TaskId: index("IX_EquipmentNotes_TaskId").on(table.TaskId),
		IX_EquipmentNotes_TaskViewId: index("IX_EquipmentNotes_TaskViewId").on(table.TaskViewId),
		EquipmentNotes_Id: primaryKey({ columns: [table.Id], name: "EquipmentNotes_Id"}),
	}
});

export const EquipmentNotes_tracking = mysqlTable("EquipmentNotes_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		EquipmentNotes_tracking_Id: primaryKey({ columns: [table.Id], name: "EquipmentNotes_tracking_Id"}),
	}
});

export const FrequencyUnits = mysqlTable("FrequencyUnits", {
	Id: varchar({ length: 20 }).notNull(),
	Description: longtext(),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		FrequencyUnits_Id: primaryKey({ columns: [table.Id], name: "FrequencyUnits_Id"}),
	}
});

export const FrequencyUnits_tracking = mysqlTable("FrequencyUnits_tracking", {
	Id: varchar({ length: 20 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		FrequencyUnits_tracking_Id: primaryKey({ columns: [table.Id], name: "FrequencyUnits_tracking_Id"}),
	}
});

export const InstructionFiles = mysqlTable("InstructionFiles", {
	Id: binary({ length: 16 }).notNull(),
	MimeType: longtext(),
	FilePath: longtext(),
	OriginalFileName: longtext(),
	CreationTime: datetime({ mode: 'string', fsp: 6 }).default('0001-01-01 00:00:00.000000').notNull(),
	RegisterTime: datetime({ mode: 'string', fsp: 6 }).default('0001-01-01 00:00:00.000000').notNull(),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		InstructionFiles_Id: primaryKey({ columns: [table.Id], name: "InstructionFiles_Id"}),
	}
});

export const InstructionItems = mysqlTable("InstructionItems", {
	Id: binary({ length: 16 }).notNull(),
	InstructionId: binary({ length: 16 }).notNull().references(() => Instructions.Id, { onDelete: "cascade" } ),
	TraineeId: int().notNull(),
	TraineeSignId: binary({ length: 16 }).references(() => InstructionFiles.Id, { onDelete: "restrict" } ),
	ShiftTraineeSignId: binary({ length: 16 }).references(() => InstructionFiles.Id, { onDelete: "restrict" } ),
	TraineePhotoId: binary({ length: 16 }).references(() => InstructionFiles.Id, { onDelete: "restrict" } ),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		IX_InstructionItems_InstructionId: index("IX_InstructionItems_InstructionId").on(table.InstructionId),
		InstructionItems_Id: primaryKey({ columns: [table.Id], name: "InstructionItems_Id"}),
		IX_InstructionItems_ShiftTraineeSignId: unique("IX_InstructionItems_ShiftTraineeSignId").on(table.ShiftTraineeSignId),
		IX_InstructionItems_TraineePhotoId: unique("IX_InstructionItems_TraineePhotoId").on(table.TraineePhotoId),
		IX_InstructionItems_TraineeSignId: unique("IX_InstructionItems_TraineeSignId").on(table.TraineeSignId),
	}
});

export const InstructionItems_tracking = mysqlTable("InstructionItems_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		InstructionItems_tracking_Id: primaryKey({ columns: [table.Id], name: "InstructionItems_tracking_Id"}),
	}
});

export const InstructionTypes = mysqlTable("InstructionTypes", {
	Id: binary({ length: 16 }).notNull(),
	Code: varchar({ length: 255 }),
	Name: longtext(),
	IsSystem: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		InstructionTypes_Id: primaryKey({ columns: [table.Id], name: "InstructionTypes_Id"}),
		IX_InstructionTypes_Code: unique("IX_InstructionTypes_Code").on(table.Code),
	}
});

export const InstructionTypes_tracking = mysqlTable("InstructionTypes_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		InstructionTypes_tracking_Id: primaryKey({ columns: [table.Id], name: "InstructionTypes_tracking_Id"}),
	}
});

export const Instructions = mysqlTable("Instructions", {
	Id: binary({ length: 16 }).notNull(),
	RecNo: longtext(),
	RecordDT: datetime({ mode: 'string', fsp: 6 }).notNull(),
	InstructorId: int().notNull(),
	InstructorSignId: binary({ length: 16 }).references(() => InstructionFiles.Id, { onDelete: "restrict" } ),
	Reason: longtext(),
	ShiftQnt: int().notNull(),
	ShiftInstructorSignId: binary({ length: 16 }).references(() => InstructionFiles.Id, { onDelete: "restrict" } ),
	TypeId: binary({ length: 16 }).notNull().references(() => InstructionTypes.Id, { onDelete: "cascade" } ),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsRemoved: tinyint().default(0).notNull(),
	JsonData: longtext(),
},
(table) => {
	return {
		IX_Instructions_TypeId: index("IX_Instructions_TypeId").on(table.TypeId),
		Instructions_Id: primaryKey({ columns: [table.Id], name: "Instructions_Id"}),
		IX_Instructions_InstructorSignId: unique("IX_Instructions_InstructorSignId").on(table.InstructorSignId),
		IX_Instructions_ShiftInstructorSignId: unique("IX_Instructions_ShiftInstructorSignId").on(table.ShiftInstructorSignId),
	}
});

export const Instructions_tracking = mysqlTable("Instructions_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		Instructions_tracking_Id: primaryKey({ columns: [table.Id], name: "Instructions_tracking_Id"}),
	}
});

export const InventoryListTemplates = mysqlTable("InventoryListTemplates", {
	Id: binary({ length: 16 }).notNull(),
	AssetClassId: binary({ length: 16 }),
	TypeOfMaintenanceId: binary({ length: 16 }).references(() => TypesOfMaintenance.Id, { onDelete: "restrict" } ),
	Description: longtext().notNull(),
	IsRemoved: tinyint().notNull(),
	ListContent: longtext(),
},
(table) => {
	return {
		IX_InventoryListTemplates_TypeOfMaintenanceId: index("IX_InventoryListTemplates_TypeOfMaintenanceId").on(table.TypeOfMaintenanceId),
		InventoryListTemplates_Id: primaryKey({ columns: [table.Id], name: "InventoryListTemplates_Id"}),
	}
});

export const JobDescriptions = mysqlTable("JobDescriptions", {
	Id: binary({ length: 16 }).notNull(),
	JobId: binary({ length: 16 }).notNull().references(() => Jobs.Id, { onDelete: "cascade" } ),
	DocumentId: binary({ length: 16 }).references(() => Documents.Id, { onDelete: "restrict" } ),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_JobDescriptions_DocumentId: index("IX_JobDescriptions_DocumentId").on(table.DocumentId),
		IX_JobDescriptions_JobId: index("IX_JobDescriptions_JobId").on(table.JobId),
		JobDescriptions_Id: primaryKey({ columns: [table.Id], name: "JobDescriptions_Id"}),
	}
});

export const JobDescriptions_tracking = mysqlTable("JobDescriptions_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		JobDescriptions_tracking_Id: primaryKey({ columns: [table.Id], name: "JobDescriptions_tracking_Id"}),
	}
});

export const JobRoutes = mysqlTable("JobRoutes", {
	Id: binary({ length: 16 }).notNull(),
	JobId: binary({ length: 16 }).notNull().references(() => Jobs.Id, { onDelete: "cascade" } ),
	AssetId: binary({ length: 16 }).notNull(),
},
(table) => {
	return {
		IX_JobRoutes_JobId: index("IX_JobRoutes_JobId").on(table.JobId),
		JobRoutes_Id: primaryKey({ columns: [table.Id], name: "JobRoutes_Id"}),
	}
});

export const JobRoutes_tracking = mysqlTable("JobRoutes_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		JobRoutes_tracking_Id: primaryKey({ columns: [table.Id], name: "JobRoutes_tracking_Id"}),
	}
});

export const JobStatuses = mysqlTable("JobStatuses", {
	Id: varchar({ length: 20 }).notNull(),
	Description: longtext(),
},
(table) => {
	return {
		JobStatuses_Id: primaryKey({ columns: [table.Id], name: "JobStatuses_Id"}),
	}
});

export const JobStatuses_tracking = mysqlTable("JobStatuses_tracking", {
	Id: varchar({ length: 20 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		JobStatuses_tracking_Id: primaryKey({ columns: [table.Id], name: "JobStatuses_tracking_Id"}),
	}
});

export const JobTypes = mysqlTable("JobTypes", {
	Id: varchar({ length: 20 }).notNull(),
	Description: longtext(),
},
(table) => {
	return {
		JobTypes_Id: primaryKey({ columns: [table.Id], name: "JobTypes_Id"}),
	}
});

export const JobTypes_tracking = mysqlTable("JobTypes_tracking", {
	Id: varchar({ length: 20 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		JobTypes_tracking_Id: primaryKey({ columns: [table.Id], name: "JobTypes_tracking_Id"}),
	}
});

export const Jobs = mysqlTable("Jobs", {
	Id: binary({ length: 16 }).notNull(),
	LocationId: int(),
	ExternalAssigneeId: int(),
	RowVersion: timestamp({ fsp: 6, mode: 'string' }).default(sql`(CURRENT_TIMESTAMP(6))`).onUpdateNow(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	Description: longtext(),
	OrgUnitId: int(),
	EquipmentClassId: binary({ length: 16 }),
	Enabled: tinyint().notNull(),
	BasedOnJobId: binary({ length: 16 }),
	JobDiscriminator: longtext().notNull(),
	JobStatusId: varchar({ length: 20 }).references(() => JobStatuses.Id, { onDelete: "cascade" } ),
	JobTypeId: varchar({ length: 20 }).references(() => JobTypes.Id, { onDelete: "cascade" } ),
	ScheduledOn: datetime({ mode: 'string', fsp: 6 }),
	StartedOn: datetime({ mode: 'string', fsp: 6 }),
	FinishedOn: datetime({ mode: 'string', fsp: 6 }),
	Notes: longtext(),
	Frequency: int(),
	FrequencyUnitId: varchar({ length: 20 }).references(() => FrequencyUnits.Id, { onDelete: "cascade" } ),
	LastWorkOrderID: binary({ length: 16 }),
	PlannedWorkOrderPMId: binary({ length: 16 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	PlannedWorkOrderScheduledOn: date({ mode: 'string' }),
	IsTaskMaterial: tinyint(),
	StockWriteOffDocId: binary({ length: 16 }),
	PriorityId: binary({ length: 16 }).references(() => Priorities.Id, { onDelete: "restrict" } ),
	FinishOffset: bigint({ mode: "number" }),
	StartOffset: bigint({ mode: "number" }),
	TypeOfMaintenanceId: binary({ length: 16 }).references(() => TypesOfMaintenance.Id, { onDelete: "restrict" } ),
	AssetClassId: binary({ length: 16 }),
	AssetId: binary({ length: 16 }),
	OrderDocumentId: binary({ length: 16 }),
	ScheduledWorkId: binary({ length: 16 }).references(() => ScheduledWorks.Id, { onDelete: "restrict" } ),
},
(table) => {
	return {
		IX_Jobs_BasedOnJobId: index("IX_Jobs_BasedOnJobId").on(table.BasedOnJobId),
		IX_Jobs_FrequencyUnitId: index("IX_Jobs_FrequencyUnitId").on(table.FrequencyUnitId),
		IX_Jobs_JobStatusId: index("IX_Jobs_JobStatusId").on(table.JobStatusId),
		IX_Jobs_JobTypeId: index("IX_Jobs_JobTypeId").on(table.JobTypeId),
		IX_Jobs_LastWorkOrderID: index("IX_Jobs_LastWorkOrderID").on(table.LastWorkOrderID),
		IX_Jobs_PlannedWorkOrderPMId: index("IX_Jobs_PlannedWorkOrderPMId").on(table.PlannedWorkOrderPMId),
		IX_Jobs_PriorityId: index("IX_Jobs_PriorityId").on(table.PriorityId),
		IX_Jobs_ScheduledOn: index("IX_Jobs_ScheduledOn").on(table.ScheduledOn),
		IX_Jobs_ScheduledWorkId: index("IX_Jobs_ScheduledWorkId").on(table.ScheduledWorkId),
		IX_Jobs_TypeOfMaintenanceId: index("IX_Jobs_TypeOfMaintenanceId").on(table.TypeOfMaintenanceId),
		FK_Jobs_Jobs_BasedOnJobId: foreignKey({
			columns: [table.BasedOnJobId],
			foreignColumns: [table.Id],
			name: "FK_Jobs_Jobs_BasedOnJobId"
		}).onDelete("set null"),
		FK_Jobs_Jobs_LastWorkOrderID: foreignKey({
			columns: [table.LastWorkOrderID],
			foreignColumns: [table.Id],
			name: "FK_Jobs_Jobs_LastWorkOrderID"
		}).onDelete("restrict"),
		FK_Jobs_Jobs_PlannedWorkOrderPMId: foreignKey({
			columns: [table.PlannedWorkOrderPMId],
			foreignColumns: [table.Id],
			name: "FK_Jobs_Jobs_PlannedWorkOrderPMId"
		}).onDelete("restrict"),
		Jobs_Id: primaryKey({ columns: [table.Id], name: "Jobs_Id"}),
	}
});

export const Jobs_tracking = mysqlTable("Jobs_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		Jobs_tracking_Id: primaryKey({ columns: [table.Id], name: "Jobs_tracking_Id"}),
	}
});

export const MaintRequestRegistries = mysqlTable("MaintRequestRegistries", {
	Id: binary({ length: 16 }).notNull(),
	InitDateTime: datetime({ mode: 'string', fsp: 6 }),
	AssetId: binary({ length: 16 }).notNull(),
	TypeOfMaintenanceId: binary({ length: 16 }).references(() => TypesOfMaintenance.Id, { onDelete: "restrict" } ),
	ReadingTypeId: binary({ length: 16 }).notNull().references(() => ReadingTypes.Id, { onDelete: "cascade" } ),
	InitReadingsValue: longtext(),
	InitReadingsUoMId: binary({ length: 16 }).notNull(),
	InitWorkerId: int().notNull(),
	MaintStartDateTime: datetime({ mode: 'string', fsp: 6 }),
	MaintDocRefIdGuid: binary({ length: 16 }),
	RequestStatusId: binary({ length: 16 }).notNull(),
	IsRemoved: tinyint().notNull(),
	ReqNumber: int().default(0).notNull(),
	ScheduledWorkId: binary({ length: 16 }).references(() => ScheduledWorks.Id, { onDelete: "restrict" } ),
	WOTemplateId: binary({ length: 16 }),
	EntityReadingId: binary({ length: 16 }).references(() => EntityReadings.Id, { onDelete: "restrict" } ),
	OriginSourceId: binary({ length: 16 }),
	OriginSourceName: longtext(),
},
(table) => {
	return {
		IX_MaintRequestRegistries_EntityReadingId: index("IX_MaintRequestRegistries_EntityReadingId").on(table.EntityReadingId),
		IX_MaintRequestRegistries_ReadingTypeId: index("IX_MaintRequestRegistries_ReadingTypeId").on(table.ReadingTypeId),
		IX_MaintRequestRegistries_ScheduledWorkId: index("IX_MaintRequestRegistries_ScheduledWorkId").on(table.ScheduledWorkId),
		IX_MaintRequestRegistries_TypeOfMaintenanceId: index("IX_MaintRequestRegistries_TypeOfMaintenanceId").on(table.TypeOfMaintenanceId),
		MaintRequestRegistries_Id: primaryKey({ columns: [table.Id], name: "MaintRequestRegistries_Id"}),
		AK_MaintRequestRegistries_ReqNumber: unique("AK_MaintRequestRegistries_ReqNumber").on(table.ReqNumber),
	}
});

export const MaintenanceAssets = mysqlTable("MaintenanceAssets", {
	Id: binary({ length: 16 }).notNull(),
	TypeOfMaintenanceId: binary({ length: 16 }).notNull().references(() => TypesOfMaintenance.Id, { onDelete: "restrict" } ),
	AssetId: binary({ length: 16 }).notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		MaintenanceAssets_Id: primaryKey({ columns: [table.Id], name: "MaintenanceAssets_Id"}),
		IX_MaintenanceAssets_TypeOfMaintenanceId_AssetId: unique("IX_MaintenanceAssets_TypeOfMaintenanceId_AssetId").on(table.TypeOfMaintenanceId, table.AssetId),
	}
});

export const MaintenanceAssets_original = mysqlTable("MaintenanceAssets_original", {
	Id: binary({ length: 16 }).notNull(),
	MaintenanceId: binary({ length: 16 }).notNull(),
	AssetId: binary({ length: 16 }).notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
});

export const MaintenanceSchedules = mysqlTable("MaintenanceSchedules", {
	Id: int().autoincrement().notNull(),
	IsAutoGenerated: tinyint().notNull(),
	ScheduledWorkId: binary({ length: 16 }).references(() => ScheduledWorks.Id, { onDelete: "restrict" } ),
	ScheduledDT: datetime({ mode: 'string', fsp: 6 }).notNull(),
	CreateWOBefore: int().notNull(),
	CreatedDT: datetime({ mode: 'string', fsp: 6 }).notNull(),
	TypeOfMaintenanceId: binary({ length: 16 }).references(() => TypesOfMaintenance.Id, { onDelete: "restrict" } ),
	AssetId: binary({ length: 16 }).notNull(),
	WorkScheduledDuration: longtext(),
	WorkDocumentTemplateId: binary({ length: 16 }),
	AssetClassId: binary({ length: 16 }).notNull(),
	IsRemoved: tinyint().notNull(),
	ReqInventoryJson: longtext(),
	MaintDocRefIdGuid: binary({ length: 16 }),
	EndScheduledDT: datetime({ mode: 'string', fsp: 6 }),
	StartScheduledDT: datetime({ mode: 'string', fsp: 6 }),
	StaticEndScheduledDT: datetime({ mode: 'string', fsp: 6 }).default('0001-01-01 00:00:00.000000').notNull(),
	LastServiceDate: datetime({ mode: 'string', fsp: 6 }),
	LastServiceMileage: int(),
	AdjustedDate: datetime({ mode: 'string', fsp: 6 }),
	Created: datetime({ mode: 'string', fsp: 6 }),
	CreatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
},
(table) => {
	return {
		IX_MaintenanceSchedules_ScheduledWorkId: index("IX_MaintenanceSchedules_ScheduledWorkId").on(table.ScheduledWorkId),
		IX_MaintenanceSchedules_TypeOfMaintenanceId: index("IX_MaintenanceSchedules_TypeOfMaintenanceId").on(table.TypeOfMaintenanceId),
		MaintenanceSchedules_Id: primaryKey({ columns: [table.Id], name: "MaintenanceSchedules_Id"}),
	}
});

export const MaintenanceSchedulesStatus = mysqlTable("MaintenanceSchedulesStatus", {
	Id: binary({ length: 16 }).notNull(),
	MaintenanceScheduleId: int().notNull().references(() => MaintenanceSchedules.Id, { onDelete: "cascade" } ),
	StatusColour: longtext(),
},
(table) => {
	return {
		MaintenanceSchedulesStatus_Id: primaryKey({ columns: [table.Id], name: "MaintenanceSchedulesStatus_Id"}),
		IX_MaintenanceSchedulesStatus_MaintenanceScheduleId: unique("IX_MaintenanceSchedulesStatus_MaintenanceScheduleId").on(table.MaintenanceScheduleId),
	}
});

export const OrderTeams = mysqlTable("OrderTeams", {
	Id: int().autoincrement().notNull(),
	UserId: int().notNull(),
	QualificationId: int().notNull(),
	PositionId: binary({ length: 16 }).notNull(),
	IsAllowed: tinyint().notNull(),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		OrderTeams_Id: primaryKey({ columns: [table.Id], name: "OrderTeams_Id"}),
	}
});

export const PermitToWorks = mysqlTable("PermitToWorks", {
	Id: binary({ length: 16 }).notNull(),
	Allowed: tinyint().notNull(),
	JobId: binary({ length: 16 }).notNull().references(() => Jobs.Id, { onDelete: "restrict" } ),
	ExternalUserId: int().notNull(),
	Notes: longtext(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		IX_PermitToWorks_JobId: index("IX_PermitToWorks_JobId").on(table.JobId),
		PermitToWorks_Id: primaryKey({ columns: [table.Id], name: "PermitToWorks_Id"}),
	}
});

export const PermitToWorks_tracking = mysqlTable("PermitToWorks_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		PermitToWorks_tracking_Id: primaryKey({ columns: [table.Id], name: "PermitToWorks_tracking_Id"}),
	}
});

export const Priorities = mysqlTable("Priorities", {
	Id: binary({ length: 16 }).notNull(),
	Value: int().notNull(),
	Description: varchar({ length: 255 }).notNull(),
	Color: int().notNull(),
	IsSystem: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		Priorities_Id: primaryKey({ columns: [table.Id], name: "Priorities_Id"}),
		IX_Priorities_Color_Value_Description: unique("IX_Priorities_Color_Value_Description").on(table.Color, table.Value, table.Description),
	}
});

export const Priorities_tracking = mysqlTable("Priorities_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		Priorities_tracking_Id: primaryKey({ columns: [table.Id], name: "Priorities_tracking_Id"}),
	}
});

export const ProdStatReadings = mysqlTable("ProdStatReadings", {
	Id: int().autoincrement().notNull(),
	UoMId: binary({ length: 16 }),
	Description: longtext().notNull(),
	Code: varchar({ length: 255 }),
	IsRemoved: tinyint().notNull(),
},
(table) => {
	return {
		ProdStatReadings_Id: primaryKey({ columns: [table.Id], name: "ProdStatReadings_Id"}),
	}
});

export const ProdStatRegistries = mysqlTable("ProdStatRegistries", {
	Id: binary({ length: 16 }).notNull(),
	IsRemoved: tinyint().notNull(),
	AssetId: binary({ length: 16 }),
	ProdStatReadingId: int().notNull().references(() => ProdStatReadings.Id, { onDelete: "restrict" } ),
	StatValue: double().notNull(),
	RegistrationDate: datetime({ mode: 'string', fsp: 6 }).default('0001-01-01 00:00:00.000000').notNull(),
	BranchType: longtext(),
},
(table) => {
	return {
		IX_ProdStatRegistries_ProdStatReadingId: index("IX_ProdStatRegistries_ProdStatReadingId").on(table.ProdStatReadingId),
		ProdStatRegistries_Id: primaryKey({ columns: [table.Id], name: "ProdStatRegistries_Id"}),
	}
});

export const ProdUnitStatRegistries = mysqlTable("ProdUnitStatRegistries", {
	Id: binary({ length: 16 }).notNull(),
	IsRemoved: tinyint().notNull(),
	EntityTypeId: longtext().notNull(),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	StatValue: double().notNull(),
	ProdStatReadingId: int().notNull().references(() => ProdStatReadings.Id, { onDelete: "restrict" } ),
	RegistrationDate: datetime({ mode: 'string', fsp: 6 }).default('0001-01-01 00:00:00.000000').notNull(),
	BranchType: longtext(),
},
(table) => {
	return {
		IX_ProdUnitStatRegistries_ProdStatReadingId: index("IX_ProdUnitStatRegistries_ProdStatReadingId").on(table.ProdStatReadingId),
		ProdUnitStatRegistries_Id: primaryKey({ columns: [table.Id], name: "ProdUnitStatRegistries_Id"}),
	}
});

export const ProvisionInfoTable = mysqlTable("ProvisionInfoTable", {
	Id: varchar({ length: 256 }).notNull(),
	MigrationId: text(),
	SyncConfiguration: text(),
	SyncConfigurationId: text(),
},
(table) => {
	return {
		ProvisionInfoTable_Id: primaryKey({ columns: [table.Id], name: "ProvisionInfoTable_Id"}),
	}
});

export const ReadingTypes = mysqlTable("ReadingTypes", {
	Id: binary({ length: 16 }).notNull(),
	Description: longtext().notNull(),
	UnitOfMeasureId: binary({ length: 16 }).notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsSystem: tinyint().default(0).notNull(),
	IsRemoved: tinyint().default(0).notNull(),
	Code: varchar({ length: 255 }),
	Precision: int(),
},
(table) => {
	return {
		ReadingTypes_Id: primaryKey({ columns: [table.Id], name: "ReadingTypes_Id"}),
		IX_ReadingTypes_Code: unique("IX_ReadingTypes_Code").on(table.Code),
	}
});

export const ReadingsListTemplates = mysqlTable("ReadingsListTemplates", {
	Id: binary({ length: 16 }).notNull(),
	AssetClassId: binary({ length: 16 }).notNull(),
	Description: longtext().notNull(),
	IsRemoved: tinyint().notNull(),
	ListContent: longtext(),
},
(table) => {
	return {
		ReadingsListTemplates_Id: primaryKey({ columns: [table.Id], name: "ReadingsListTemplates_Id"}),
	}
});

export const Regulations = mysqlTable("Regulations", {
	Id: binary({ length: 16 }).notNull(),
	Description: longtext().notNull(),
	Enabled: tinyint().default(1).notNull(),
	TypeOfMaintenanceId: binary({ length: 16 }).notNull().references(() => TypesOfMaintenance.Id, { onDelete: "restrict" } ),
	BaseJobId: binary({ length: 16 }).notNull().references(() => Jobs.Id, { onDelete: "restrict" } ),
	IsDate: tinyint().default(0).notNull(),
	ReadingTypeId: binary({ length: 16 }).references(() => ReadingTypes.Id, { onDelete: "restrict" } ),
	ComparisonType: longtext().notNull(),
	Value: longtext().notNull(),
	CompareTo: longtext().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsOneWay: tinyint().default(0).notNull(),
},
(table) => {
	return {
		IX_Regulations_BaseJobId: index("IX_Regulations_BaseJobId").on(table.BaseJobId),
		IX_Regulations_ReadingTypeId: index("IX_Regulations_ReadingTypeId").on(table.ReadingTypeId),
		IX_Regulations_TypeOfMaintenanceId: index("IX_Regulations_TypeOfMaintenanceId").on(table.TypeOfMaintenanceId),
		Regulations_Id: primaryKey({ columns: [table.Id], name: "Regulations_Id"}),
	}
});

export const RegulationsAssets = mysqlTable("RegulationsAssets", {
	Id: binary({ length: 16 }).notNull(),
	RegulationsId: binary({ length: 16 }).notNull().references(() => Regulations.Id, { onDelete: "restrict" } ),
	AssetId: binary({ length: 16 }).notNull(),
	WorkOrderId: binary({ length: 16 }).references(() => Jobs.Id, { onDelete: "restrict" } ),
	EntityReadingId: binary({ length: 16 }).references(() => EntityReadings.Id, { onDelete: "restrict" } ),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		IX_RegulationsAssets_EntityReadingId: index("IX_RegulationsAssets_EntityReadingId").on(table.EntityReadingId),
		IX_RegulationsAssets_WorkOrderId: index("IX_RegulationsAssets_WorkOrderId").on(table.WorkOrderId),
		RegulationsAssets_Id: primaryKey({ columns: [table.Id], name: "RegulationsAssets_Id"}),
		IX_RegulationsAssets_RegulationsId_AssetId: unique("IX_RegulationsAssets_RegulationsId_AssetId").on(table.RegulationsId, table.AssetId),
	}
});

export const RepairOrgUnits = mysqlTable("RepairOrgUnits", {
	Id: int().autoincrement().notNull(),
	OrgUnitId: int().notNull(),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		RepairOrgUnits_Id: primaryKey({ columns: [table.Id], name: "RepairOrgUnits_Id"}),
	}
});

export const ScheduledWorkProInfos = mysqlTable("ScheduledWorkProInfos", {
	Id: int().autoincrement().notNull(),
	ScheduledWorkId: binary({ length: 16 }).notNull(),
	ProcDT: datetime({ mode: 'string', fsp: 6 }).notNull(),
	ProcResult: int().notNull(),
	AssetId: binary({ length: 16 }).notNull(),
	ProcInfo: longtext(),
	IsRemoved: tinyint().notNull(),
},
(table) => {
	return {
		ScheduledWorkProInfos_Id: primaryKey({ columns: [table.Id], name: "ScheduledWorkProInfos_Id"}),
	}
});

export const ScheduledWorks = mysqlTable("ScheduledWorks", {
	Id: binary({ length: 16 }).notNull(),
	Description: longtext(),
	AssetClassId: binary({ length: 16 }),
	AssetId: binary({ length: 16 }),
	SchedulingTypeId: int(),
	Seriality: int().notNull(),
	ReadingTypeId: binary({ length: 16 }).references(() => ReadingTypes.Id, { onDelete: "restrict" } ),
	ReadingsValue: double(),
	PeriodType: longtext(),
	PeriodValue: int(),
	IsUsingWorkingDays: tinyint(),
	PeriodCreateWOBefore: int(),
	StatCreateWOBefore: int(),
	WOTemplateId: binary({ length: 16 }),
	IsRemoved: tinyint().notNull(),
	TypeOfMaintenanceId: binary({ length: 16 }).references(() => TypesOfMaintenance.Id, { onDelete: "restrict" } ),
	Created: datetime({ mode: 'string', fsp: 6 }),
	CreatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	MaxPeriodValue: int(),
	MaxReadingsValue: double(),
	MinPeriodValue: int(),
	MinReadingsValue: double(),
	AverageValuePerDay: int(),
},
(table) => {
	return {
		IX_ScheduledWorks_ReadingTypeId: index("IX_ScheduledWorks_ReadingTypeId").on(table.ReadingTypeId),
		IX_ScheduledWorks_SchedulingTypeId: index("IX_ScheduledWorks_SchedulingTypeId").on(table.SchedulingTypeId),
		IX_ScheduledWorks_TypeOfMaintenanceId: index("IX_ScheduledWorks_TypeOfMaintenanceId").on(table.TypeOfMaintenanceId),
		ScheduledWorks_Id: primaryKey({ columns: [table.Id], name: "ScheduledWorks_Id"}),
	}
});

export const SchedulingTypes = mysqlTable("SchedulingTypes", {
	Id: int().autoincrement().notNull(),
	Code: longtext().notNull(),
	Description: longtext().notNull(),
	IsRemoved: tinyint().notNull(),
},
(table) => {
	return {
		SchedulingTypes_Id: primaryKey({ columns: [table.Id], name: "SchedulingTypes_Id"}),
	}
});

export const SpecEqRegistries = mysqlTable("SpecEqRegistries", {
	Id: binary({ length: 16 }).notNull(),
	AssetId: binary({ length: 16 }).notNull(),
	PlanStartTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	PlanFinishTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	ActualStartTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	ActualFinishTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	OrderDocumentId: binary({ length: 16 }).notNull(),
	ResponsibleUserId: int().notNull(),
	Notes: longtext(),
},
(table) => {
	return {
		SpecEqRegistries_Id: primaryKey({ columns: [table.Id], name: "SpecEqRegistries_Id"}),
	}
});

export const SysConfig = mysqlTable("SysConfig", {
	Id: varchar({ length: 255 }).notNull(),
	Value: longtext(),
	Description: longtext(),
	ParentId: varchar({ length: 255 }),
	Category: longtext().notNull(),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		IX_SysConfig_ParentId: index("IX_SysConfig_ParentId").on(table.ParentId),
		FK_SysConfig_SysConfig_ParentId: foreignKey({
			columns: [table.ParentId],
			foreignColumns: [table.Id],
			name: "FK_SysConfig_SysConfig_ParentId"
		}).onDelete("restrict"),
		SysConfig_Id: primaryKey({ columns: [table.Id], name: "SysConfig_Id"}),
	}
});

export const SystemRecords = mysqlTable("SystemRecords", {
	Id: int().autoincrement().notNull(),
	TableName: longtext(),
	RecordId: longtext(),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		SystemRecords_Id: primaryKey({ columns: [table.Id], name: "SystemRecords_Id"}),
	}
});

export const TaskStates = mysqlTable("TaskStates", {
	Id: binary({ length: 16 }).notNull(),
	EventTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	State: longtext().notNull(),
	EmployeeId: int().notNull(),
	TaskId: binary({ length: 16 }).notNull().references(() => Tasks.Id, { onDelete: "restrict" } ),
	AssetId: binary({ length: 16 }).notNull(),
	IsRemoved: tinyint().default(0).notNull(),
	TaskViewId: binary({ length: 16 }),
},
(table) => {
	return {
		IX_TaskStates_TaskId: index("IX_TaskStates_TaskId").on(table.TaskId),
		IX_TaskStates_TaskViewId: index("IX_TaskStates_TaskViewId").on(table.TaskViewId),
		TaskStates_Id: primaryKey({ columns: [table.Id], name: "TaskStates_Id"}),
	}
});

export const TaskStates_tracking = mysqlTable("TaskStates_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		TaskStates_tracking_Id: primaryKey({ columns: [table.Id], name: "TaskStates_tracking_Id"}),
	}
});

export const TaskTemplates = mysqlTable("TaskTemplates", {
	Id: binary({ length: 16 }).notNull(),
	ParentId: binary({ length: 16 }),
	Description: longtext(),
	TaskBody: longtext(),
	OrgUnitId: int(),
	WorkflowTypesId: binary({ length: 16 }),
	AssetClassId: binary({ length: 16 }),
	AssetId: binary({ length: 16 }),
},
(table) => {
	return {
		TaskTemplates_Id: primaryKey({ columns: [table.Id], name: "TaskTemplates_Id"}),
	}
});

export const Tasks = mysqlTable("Tasks", {
	Id: binary({ length: 16 }).notNull(),
	LineNr: int().notNull(),
	DurationTicks: bigint({ mode: "number" }).notNull(),
	JobId: binary({ length: 16 }).notNull().references(() => Jobs.Id, { onDelete: "cascade" } ),
	Description: longtext(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsAttachmentsRequired: tinyint().notNull(),
	IsEquipmentNotesRequired: tinyint().notNull(),
	AssetId: binary({ length: 16 }),
	CheckListId: binary({ length: 16 }).references(() => CheckLists.Id, { onDelete: "restrict" } ),
	IsCheckListRequired: tinyint().default(0).notNull(),
	TaskBody: longtext(),
	ParentId: binary({ length: 16 }),
	Quantity: int(),
	ActualFinishDate: datetime({ mode: 'string', fsp: 6 }),
	ActualStartDate: datetime({ mode: 'string', fsp: 6 }),
	PlannedFinishDate: datetime({ mode: 'string', fsp: 6 }),
	PlannedStartDate: datetime({ mode: 'string', fsp: 6 }),
	TaskStatusId: binary({ length: 16 }),
	WorkTeamId: int(),
},
(table) => {
	return {
		IX_Tasks_CheckListId: index("IX_Tasks_CheckListId").on(table.CheckListId),
		IX_Tasks_JobId_LineNr: index("IX_Tasks_JobId_LineNr").on(table.JobId, table.LineNr),
		Tasks_Id: primaryKey({ columns: [table.Id], name: "Tasks_Id"}),
	}
});

export const Tasks_tracking = mysqlTable("Tasks_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		Tasks_tracking_Id: primaryKey({ columns: [table.Id], name: "Tasks_tracking_Id"}),
	}
});

export const TypesOfMaintenance = mysqlTable("TypesOfMaintenance", {
	Id: binary({ length: 16 }).notNull(),
	Description: longtext().notNull(),
	Enabled: tinyint().notNull(),
	AssetClassId: binary({ length: 16 }),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsRemoved: tinyint().default(0).notNull(),
	EqReadingsStandardId: int().references(() => EqReadingsStandards.Id, { onDelete: "restrict" } ),
	MaintenancePriority: int().default(0).notNull(),
},
(table) => {
	return {
		IX_TypesOfMaintenance_EqReadingsStandardId: index("IX_TypesOfMaintenance_EqReadingsStandardId").on(table.EqReadingsStandardId),
		TypesOfMaintenance_Id: primaryKey({ columns: [table.Id], name: "TypesOfMaintenance_Id"}),
	}
});

export const UnitProdStatReadings = mysqlTable("UnitProdStatReadings", {
	Id: binary({ length: 16 }).notNull(),
	IsRemoved: tinyint().notNull(),
	EntityTypeId: longtext(),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	ProdStatReadingId: int().notNull().references(() => ProdStatReadings.Id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		IX_UnitProdStatReadings_ProdStatReadingId: index("IX_UnitProdStatReadings_ProdStatReadingId").on(table.ProdStatReadingId),
		UnitProdStatReadings_Id: primaryKey({ columns: [table.Id], name: "UnitProdStatReadings_Id"}),
	}
});

export const UsedInventoryJournals = mysqlTable("UsedInventoryJournals", {
	Id: binary({ length: 16 }).notNull(),
	DocumentId: binary({ length: 16 }).notNull(),
	TaskId: binary({ length: 16 }).notNull().references(() => Tasks.Id, { onDelete: "cascade" } ),
	AssetId: binary({ length: 16 }),
	NomenclatureId: binary({ length: 16 }).notNull(),
	UoMId: binary({ length: 16 }).notNull(),
	StdQnt: double().notNull(),
	Qnt: double().notNull(),
	IsRemoved: tinyint().notNull(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	CreatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
},
(table) => {
	return {
		IX_UsedInventoryJournals_TaskId: index("IX_UsedInventoryJournals_TaskId").on(table.TaskId),
		UsedInventoryJournals_Id: primaryKey({ columns: [table.Id], name: "UsedInventoryJournals_Id"}),
	}
});

export const WorkNormStatuses = mysqlTable("WorkNormStatuses", {
	Id: int().autoincrement().notNull(),
	Code: varchar({ length: 255 }).notNull(),
	Description: longtext().notNull(),
	IsSystem: tinyint().notNull(),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		IX_WorkNormStatuses_Code: index("IX_WorkNormStatuses_Code").on(table.Code),
		WorkNormStatuses_Id: primaryKey({ columns: [table.Id], name: "WorkNormStatuses_Id"}),
	}
});

export const WorkPermits = mysqlTable("WorkPermits", {
	Id: binary({ length: 16 }).notNull(),
	PermitDate: datetime({ mode: 'string', fsp: 6 }),
	PermitNumber: varchar({ length: 255 }),
	OrgUnitId: int().notNull(),
	IsGeneralPermit: tinyint().notNull(),
},
(table) => {
	return {
		WorkPermits_Id: primaryKey({ columns: [table.Id], name: "WorkPermits_Id"}),
		IX_WorkPermits_PermitNumber: unique("IX_WorkPermits_PermitNumber").on(table.PermitNumber),
		IX_WorkPermits_PermitNumber_PermitDate: unique("IX_WorkPermits_PermitNumber_PermitDate").on(table.PermitNumber, table.PermitDate),
	}
});

export const WorkStartFinishStatuses = mysqlTable("WorkStartFinishStatuses", {
	Id: int().autoincrement().notNull(),
	Code: longtext().notNull(),
	Description: longtext().notNull(),
	IsSystem: tinyint().notNull(),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		WorkStartFinishStatuses_Id: primaryKey({ columns: [table.Id], name: "WorkStartFinishStatuses_Id"}),
	}
});

export const __EFMigrationsHistory = mysqlTable("__EFMigrationsHistory", {
	MigrationId: varchar({ length: 95 }).notNull(),
	ProductVersion: varchar({ length: 32 }).notNull(),
});

export const __EFMigrationsHistoryOld = mysqlTable("__EFMigrationsHistoryOld", {
	MigrationId: varchar({ length: 95 }).notNull(),
	ProductVersion: varchar({ length: 32 }).notNull(),
},
(table) => {
	return {
		__EFMigrationsHistoryOld_MigrationId: primaryKey({ columns: [table.MigrationId], name: "__EFMigrationsHistoryOld_MigrationId"}),
	}
});

export const backgroundJobs_AggregatedCounter = mysqlTable("backgroundJobs_AggregatedCounter", {
	Id: int().autoincrement().notNull(),
	Key: varchar({ length: 100 }).notNull(),
	Value: int().notNull(),
	ExpireAt: datetime({ mode: 'string'}),
},
(table) => {
	return {
		backgroundJobs_AggregatedCounter_Id: primaryKey({ columns: [table.Id], name: "backgroundJobs_AggregatedCounter_Id"}),
		IX_CounterAggregated_Key: unique("IX_CounterAggregated_Key").on(table.Key),
	}
});

export const backgroundJobs_Counter = mysqlTable("backgroundJobs_Counter", {
	Id: int().autoincrement().notNull(),
	Key: varchar({ length: 100 }).notNull(),
	Value: int().notNull(),
	ExpireAt: datetime({ mode: 'string'}),
},
(table) => {
	return {
		IX_Counter_Key: index("IX_Counter_Key").on(table.Key),
		backgroundJobs_Counter_Id: primaryKey({ columns: [table.Id], name: "backgroundJobs_Counter_Id"}),
	}
});

export const backgroundJobs_DistributedLock = mysqlTable("backgroundJobs_DistributedLock", {
	Resource: varchar({ length: 100 }).notNull(),
	CreatedAt: datetime({ mode: 'string'}).notNull(),
});

export const backgroundJobs_Hash = mysqlTable("backgroundJobs_Hash", {
	Id: int().autoincrement().notNull(),
	Key: varchar({ length: 100 }).notNull(),
	Field: varchar({ length: 40 }).notNull(),
	Value: longtext(),
	ExpireAt: datetime({ mode: 'string'}),
},
(table) => {
	return {
		backgroundJobs_Hash_Id: primaryKey({ columns: [table.Id], name: "backgroundJobs_Hash_Id"}),
		IX_Hash_Key_Field: unique("IX_Hash_Key_Field").on(table.Key, table.Field),
	}
});

export const backgroundJobs_Job = mysqlTable("backgroundJobs_Job", {
	Id: int().autoincrement().notNull(),
	StateId: int(),
	StateName: varchar({ length: 20 }),
	InvocationData: longtext().notNull(),
	Arguments: longtext().notNull(),
	CreatedAt: datetime({ mode: 'string'}).notNull(),
	ExpireAt: datetime({ mode: 'string'}),
},
(table) => {
	return {
		IX_Job_StateName: index("IX_Job_StateName").on(table.StateName),
		backgroundJobs_Job_Id: primaryKey({ columns: [table.Id], name: "backgroundJobs_Job_Id"}),
	}
});

export const backgroundJobs_JobParameter = mysqlTable("backgroundJobs_JobParameter", {
	Id: int().autoincrement().notNull(),
	JobId: int().notNull(),
	Name: varchar({ length: 40 }).notNull(),
	Value: longtext(),
},
(table) => {
	return {
		FK_JobParameter_Job: index("FK_JobParameter_Job").on(table.JobId),
		backgroundJobs_JobParameter_Id: primaryKey({ columns: [table.Id], name: "backgroundJobs_JobParameter_Id"}),
		IX_JobParameter_JobId_Name: unique("IX_JobParameter_JobId_Name").on(table.JobId, table.Name),
	}
});

export const backgroundJobs_JobQueue = mysqlTable("backgroundJobs_JobQueue", {
	Id: int().autoincrement().notNull(),
	JobId: int().notNull(),
	Queue: varchar({ length: 50 }).notNull(),
	FetchedAt: datetime({ mode: 'string'}),
	FetchToken: varchar({ length: 36 }),
},
(table) => {
	return {
		IX_JobQueue_QueueAndFetchedAt: index("IX_JobQueue_QueueAndFetchedAt").on(table.Queue, table.FetchedAt),
		backgroundJobs_JobQueue_Id: primaryKey({ columns: [table.Id], name: "backgroundJobs_JobQueue_Id"}),
	}
});

export const backgroundJobs_JobState = mysqlTable("backgroundJobs_JobState", {
	Id: int().autoincrement().notNull(),
	JobId: int().notNull(),
	Name: varchar({ length: 20 }).notNull(),
	Reason: varchar({ length: 100 }),
	CreatedAt: datetime({ mode: 'string'}).notNull(),
	Data: longtext(),
},
(table) => {
	return {
		FK_JobState_Job: index("FK_JobState_Job").on(table.JobId),
		backgroundJobs_JobState_Id: primaryKey({ columns: [table.Id], name: "backgroundJobs_JobState_Id"}),
	}
});

export const backgroundJobs_List = mysqlTable("backgroundJobs_List", {
	Id: int().autoincrement().notNull(),
	Key: varchar({ length: 100 }).notNull(),
	Value: longtext(),
	ExpireAt: datetime({ mode: 'string'}),
},
(table) => {
	return {
		backgroundJobs_List_Id: primaryKey({ columns: [table.Id], name: "backgroundJobs_List_Id"}),
	}
});

export const backgroundJobs_Server = mysqlTable("backgroundJobs_Server", {
	Id: varchar({ length: 100 }).notNull(),
	Data: longtext().notNull(),
	LastHeartbeat: datetime({ mode: 'string'}),
},
(table) => {
	return {
		backgroundJobs_Server_Id: primaryKey({ columns: [table.Id], name: "backgroundJobs_Server_Id"}),
	}
});

export const backgroundJobs_Set = mysqlTable("backgroundJobs_Set", {
	Id: int().autoincrement().notNull(),
	Key: varchar({ length: 100 }).notNull(),
	Value: varchar({ length: 256 }).notNull(),
	Score: float().notNull(),
	ExpireAt: datetime({ mode: 'string'}),
},
(table) => {
	return {
		backgroundJobs_Set_Id: primaryKey({ columns: [table.Id], name: "backgroundJobs_Set_Id"}),
		IX_Set_Key_Value: unique("IX_Set_Key_Value").on(table.Key, table.Value),
	}
});

export const backgroundJobs_State = mysqlTable("backgroundJobs_State", {
	Id: int().autoincrement().notNull(),
	JobId: int().notNull(),
	Name: varchar({ length: 20 }).notNull(),
	Reason: varchar({ length: 100 }),
	CreatedAt: datetime({ mode: 'string'}).notNull(),
	Data: longtext(),
},
(table) => {
	return {
		FK_HangFire_State_Job: index("FK_HangFire_State_Job").on(table.JobId),
		backgroundJobs_State_Id: primaryKey({ columns: [table.Id], name: "backgroundJobs_State_Id"}),
	}
});

export const scope_info_history = mysqlTable("scope_info_history", {
	sync_scope_id: varchar({ length: 36 }).notNull(),
	sync_scope_name: varchar({ length: 100 }).notNull(),
	scope_last_sync_timestamp: bigint({ mode: "number" }),
	scope_last_sync_duration: bigint({ mode: "number" }),
	scope_last_sync: datetime({ mode: 'string'}),
},
(table) => {
	return {
		scope_info_history_sync_scope_id: primaryKey({ columns: [table.sync_scope_id], name: "scope_info_history_sync_scope_id"}),
	}
});

export const scope_info_server = mysqlTable("scope_info_server", {
	sync_scope_name: varchar({ length: 100 }).notNull(),
	sync_scope_schema: longtext(),
	sync_scope_setup: longtext(),
	sync_scope_version: varchar({ length: 10 }),
	sync_scope_last_clean_timestamp: bigint({ mode: "number" }),
},
(table) => {
	return {
		scope_info_server_sync_scope_name: primaryKey({ columns: [table.sync_scope_name], name: "scope_info_server_sync_scope_name"}),
	}
});
export const ComponentTypeView = mysqlView("ComponentTypeView", {
	AssetClassDescription: longtext(),
	Id: binary({ length: 16 }).notNull(),
	Description: longtext(),
	AssetClassId: binary({ length: 16 }).notNull(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`acd\`.\`Description\` AS \`AssetClassDescription\`,\`ms\`.\`Id\` AS \`Id\`,\`ms\`.\`Description\` AS \`Description\`,\`ms\`.\`AssetClassId\` AS \`AssetClassId\` from (\`infrastructure\`.\`ComponentTypes\` \`ms\` left join \`inventory\`.\`AssetClasses\` \`acd\` on((\`ms\`.\`AssetClassId\` = \`acd\`.\`Id\`)))`);

export const EntityProdStatReadingView = mysqlView("EntityProdStatReadingView", {
	Asset: longtext(),
	AssetClass: longtext(),
	ProdStatDescription: longtext(),
	Id: int().default(0).notNull(),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	ProdStatReadingId: int().notNull(),
	EntityType: longtext().notNull(),
	IsRemoved: tinyint().notNull(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`a\`.\`Name\` AS \`Asset\`,\`ac\`.\`Description\` AS \`AssetClass\`,\`ps\`.\`Description\` AS \`ProdStatDescription\`,\`epsr\`.\`Id\` AS \`Id\`,\`epsr\`.\`EntityGuidId\` AS \`EntityGuidId\`,\`epsr\`.\`EntityIntId\` AS \`EntityIntId\`,\`epsr\`.\`ProdStatReadingId\` AS \`ProdStatReadingId\`,\`epsr\`.\`EntityType\` AS \`EntityType\`,\`epsr\`.\`IsRemoved\` AS \`IsRemoved\` from (((\`infrastructure\`.\`EntityProdStatReadings\` \`epsr\` left join \`inventory\`.\`Assets\` \`a\` on(((\`epsr\`.\`EntityGuidId\` = \`a\`.\`Id\`) and (\`epsr\`.\`EntityType\` = 'Asset')))) left join \`inventory\`.\`AssetClasses\` \`ac\` on(((\`epsr\`.\`EntityGuidId\` = \`ac\`.\`Id\`) and (\`epsr\`.\`EntityType\` = 'AssetClass')))) left join \`infrastructure\`.\`ProdStatReadings\` \`ps\` on((\`epsr\`.\`ProdStatReadingId\` = \`ps\`.\`Id\`)))`);

export const EntityReadingStandardsView = mysqlView("EntityReadingStandardsView", {
	Asset: longtext(),
	AssetClass: longtext(),
	ReadingTypeDescription: longtext(),
	Id: int().default(0).notNull(),
	IsRemoved: tinyint().notNull(),
	EntityType: longtext().notNull(),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	ReadingTypeId: binary({ length: 16 }),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`a\`.\`Name\` AS \`Asset\`,\`ac\`.\`Description\` AS \`AssetClass\`,\`rt\`.\`Description\` AS \`ReadingTypeDescription\`,\`ers\`.\`Id\` AS \`Id\`,\`ers\`.\`IsRemoved\` AS \`IsRemoved\`,\`ers\`.\`EntityType\` AS \`EntityType\`,\`ers\`.\`EntityGuidId\` AS \`EntityGuidId\`,\`ers\`.\`EntityIntId\` AS \`EntityIntId\`,\`ers\`.\`ReadingTypeId\` AS \`ReadingTypeId\` from (((\`infrastructure\`.\`EntityReadingStandards\` \`ers\` left join \`inventory\`.\`Assets\` \`a\` on(((\`ers\`.\`EntityGuidId\` = \`a\`.\`Id\`) and (\`ers\`.\`EntityType\` = 'Asset')))) left join \`inventory\`.\`AssetClasses\` \`ac\` on(((\`ers\`.\`EntityGuidId\` = \`ac\`.\`Id\`) and (\`ers\`.\`EntityType\` = 'AssetClass')))) left join \`infrastructure\`.\`ReadingTypes\` \`rt\` on((\`ers\`.\`ReadingTypeId\` = \`rt\`.\`Id\`)))`);

export const EntityReadingView = mysqlView("EntityReadingView", {
	Id: binary({ length: 16 }).notNull(),
	ReadingTypeId: binary({ length: 16 }).notNull(),
	EntityType: longtext().notNull(),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	Value: varchar({ length: 255 }).notNull(),
	OccuredAt: datetime({ mode: 'string', fsp: 6 }).notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsRemoved: tinyint().default(0).notNull(),
	UnitOfMeasureId: binary({ length: 16 }).default('0x').notNull(),
	UnitOfMeasureName: varchar({ length: 200 }),
	EntityName: longtext(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`er\`.\`Id\` AS \`Id\`,\`er\`.\`ReadingTypeId\` AS \`ReadingTypeId\`,\`er\`.\`EntityType\` AS \`EntityType\`,\`er\`.\`EntityGuidId\` AS \`EntityGuidId\`,\`er\`.\`EntityIntId\` AS \`EntityIntId\`,\`er\`.\`Value\` AS \`Value\`,\`er\`.\`OccuredAt\` AS \`OccuredAt\`,\`er\`.\`CreatedById\` AS \`CreatedById\`,\`er\`.\`Created\` AS \`Created\`,\`er\`.\`UpdatedById\` AS \`UpdatedById\`,\`er\`.\`Updated\` AS \`Updated\`,\`er\`.\`IsRemoved\` AS \`IsRemoved\`,\`er\`.\`UnitOfMeasureId\` AS \`UnitOfMeasureId\`,\`uom\`.\`Name\` AS \`UnitOfMeasureName\`,\`a\`.\`Name\` AS \`EntityName\` from (((\`infrastructure\`.\`EntityReadings\` \`er\` left join \`infrastructure\`.\`ReadingTypes\` \`rt\` on((\`er\`.\`ReadingTypeId\` = \`rt\`.\`Id\`))) left join \`inventory\`.\`UnitsOfMeasure\` \`uom\` on((\`rt\`.\`UnitOfMeasureId\` = \`uom\`.\`Id\`))) left join \`inventory\`.\`Assets\` \`a\` on((\`er\`.\`EntityGuidId\` = \`a\`.\`Id\`)))`);

export const EqDefectTypeView = mysqlView("EqDefectTypeView", {
	AssetClass: longtext(),
	Id: binary({ length: 16 }).notNull(),
	Code: varchar({ length: 255 }).notNull(),
	AssetClassId: binary({ length: 16 }),
	Description: longtext(),
	ExtDescription: longtext(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`ac\`.\`Description\` AS \`AssetClass\`,\`df\`.\`Id\` AS \`Id\`,\`df\`.\`Code\` AS \`Code\`,\`df\`.\`AssetClassId\` AS \`AssetClassId\`,\`df\`.\`Description\` AS \`Description\`,\`df\`.\`ExtDescription\` AS \`ExtDescription\` from (\`infrastructure\`.\`EqDefectTypes\` \`df\` left join \`inventory\`.\`AssetClasses\` \`ac\` on((\`df\`.\`AssetClassId\` = \`ac\`.\`Id\`)))`);

export const EqDefectsJournalView = mysqlView("EqDefectsJournalView", {
	AssetName: longtext(),
	AssetClassDescription: longtext(),
	DocTypeDescription: longtext(),
	IssueAuthorFullName: varchar({ length: 256 }),
	Id: binary({ length: 16 }).notNull(),
	AssetId: binary({ length: 16 }).notNull(),
	AssetClassId: binary({ length: 16 }),
	DocTypeId: binary({ length: 16 }),
	EqDefectTypeId: binary({ length: 16 }),
	DefectNote: longtext(),
	DefectQnt: int(),
	DefectResolutionNote: longtext(),
	MaintRequestRegistryId: binary({ length: 16 }),
	OpenDT: datetime({ mode: 'string', fsp: 6 }).notNull(),
	ResolveDT: datetime({ mode: 'string', fsp: 6 }),
	IssueAuthorId: int().notNull(),
	IsRemoved: tinyint().default(0).notNull(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`a\`.\`Name\` AS \`AssetName\`,\`ac\`.\`Description\` AS \`AssetClassDescription\`,\`dt\`.\`Description\` AS \`DocTypeDescription\`,\`ia\`.\`FullName\` AS \`IssueAuthorFullName\`,\`ms\`.\`Id\` AS \`Id\`,\`ms\`.\`AssetId\` AS \`AssetId\`,\`ms\`.\`AssetClassId\` AS \`AssetClassId\`,\`ms\`.\`DocTypeId\` AS \`DocTypeId\`,\`ms\`.\`EqDefectTypeId\` AS \`EqDefectTypeId\`,\`ms\`.\`DefectNote\` AS \`DefectNote\`,\`ms\`.\`DefectQnt\` AS \`DefectQnt\`,\`ms\`.\`DefectResolutionNote\` AS \`DefectResolutionNote\`,\`ms\`.\`MaintRequestRegistryId\` AS \`MaintRequestRegistryId\`,\`ms\`.\`OpenDT\` AS \`OpenDT\`,\`ms\`.\`ResolveDT\` AS \`ResolveDT\`,\`ms\`.\`IssueAuthorId\` AS \`IssueAuthorId\`,\`ms\`.\`IsRemoved\` AS \`IsRemoved\` from ((((\`infrastructure\`.\`EqDefectsJournals\` \`ms\` left join \`inventory\`.\`Assets\` \`a\` on((\`ms\`.\`AssetId\` = \`a\`.\`Id\`))) left join \`inventory\`.\`AssetClasses\` \`ac\` on((\`ms\`.\`AssetClassId\` = \`ac\`.\`Id\`))) left join \`docworkflow\`.\`DocTypes\` \`dt\` on((\`ms\`.\`DocTypeId\` = \`dt\`.\`Id\`))) left join \`hr\`.\`Users\` \`ia\` on((\`ms\`.\`IssueAuthorId\` = \`ia\`.\`Id\`)))`);

export const EqInspectionResultView = mysqlView("EqInspectionResultView", {
	AssetName: longtext(),
	AssetClassDescription: longtext(),
	Id: binary({ length: 16 }).notNull(),
	AssetClassId: binary({ length: 16 }),
	AssetId: binary({ length: 16 }),
	InspectionNote: longtext(),
	DefectNote: longtext(),
	EqDefectTypeId: binary({ length: 16 }),
	DefectQnt: int(),
	EqDefectsJournalId: binary({ length: 16 }),
	ResponsibleId: int(),
	InspectionDT: datetime({ mode: 'string', fsp: 6 }).notNull(),
	DocId: binary({ length: 16 }),
	DocTypeId: binary({ length: 16 }),
	IsRemoved: tinyint().notNull(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`a\`.\`Name\` AS \`AssetName\`,\`ac\`.\`Description\` AS \`AssetClassDescription\`,\`ms\`.\`Id\` AS \`Id\`,\`ms\`.\`AssetClassId\` AS \`AssetClassId\`,\`ms\`.\`AssetId\` AS \`AssetId\`,\`ms\`.\`InspectionNote\` AS \`InspectionNote\`,\`ms\`.\`DefectNote\` AS \`DefectNote\`,\`ms\`.\`EqDefectTypeId\` AS \`EqDefectTypeId\`,\`ms\`.\`DefectQnt\` AS \`DefectQnt\`,\`ms\`.\`EqDefectsJournalId\` AS \`EqDefectsJournalId\`,\`ms\`.\`ResponsibleId\` AS \`ResponsibleId\`,\`ms\`.\`InspectionDT\` AS \`InspectionDT\`,\`ms\`.\`DocId\` AS \`DocId\`,\`ms\`.\`DocTypeId\` AS \`DocTypeId\`,\`ms\`.\`IsRemoved\` AS \`IsRemoved\` from ((\`infrastructure\`.\`EqInspectionResult\` \`ms\` left join \`inventory\`.\`Assets\` \`a\` on((\`ms\`.\`AssetId\` = \`a\`.\`Id\`))) left join \`inventory\`.\`AssetClasses\` \`ac\` on((\`ms\`.\`AssetClassId\` = \`ac\`.\`Id\`)))`);

export const EqMaintJournalView = mysqlView("EqMaintJournalView", {
	AssetName: longtext(),
	DocTypeDescription: longtext(),
	WorkerName: varchar({ length: 256 }),
	ReadingsUoMValueName: varchar({ length: 200 }),
	Id: binary({ length: 16 }).notNull(),
	MaintRequestRegistryId: binary({ length: 16 }),
	AssetId: binary({ length: 16 }),
	MaintDoneDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	DocTypesId: binary({ length: 16 }).notNull(),
	MaintDocId: binary({ length: 16 }).notNull(),
	MaintResponsibleId: int().notNull(),
	TypeOfMaintenanceId: binary({ length: 16 }),
	ReadingTypeId: binary({ length: 16 }),
	ReadingsValue: longtext(),
	ReadingsUoMId: binary({ length: 16 }),
	IsRemoved: tinyint().notNull(),
	Seriality: int(),
	ScheduledWorkId: binary({ length: 16 }),
	StatusColour: longtext(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`a\`.\`Name\` AS \`AssetName\`,\`dt\`.\`Description\` AS \`DocTypeDescription\`,\`u\`.\`FullName\` AS \`WorkerName\`,\`um\`.\`Name\` AS \`ReadingsUoMValueName\`,\`eq\`.\`Id\` AS \`Id\`,\`eq\`.\`MaintRequestRegistryId\` AS \`MaintRequestRegistryId\`,\`eq\`.\`AssetId\` AS \`AssetId\`,\`eq\`.\`MaintDoneDateTime\` AS \`MaintDoneDateTime\`,\`eq\`.\`DocTypesId\` AS \`DocTypesId\`,\`eq\`.\`MaintDocId\` AS \`MaintDocId\`,\`eq\`.\`MaintResponsibleId\` AS \`MaintResponsibleId\`,\`eq\`.\`TypeOfMaintenanceId\` AS \`TypeOfMaintenanceId\`,\`eq\`.\`ReadingTypeId\` AS \`ReadingTypeId\`,\`eq\`.\`ReadingsValue\` AS \`ReadingsValue\`,\`eq\`.\`ReadingsUoMId\` AS \`ReadingsUoMId\`,\`eq\`.\`IsRemoved\` AS \`IsRemoved\`,\`eq\`.\`Seriality\` AS \`Seriality\`,\`eq\`.\`ScheduledWorkId\` AS \`ScheduledWorkId\`,\`eq\`.\`StatusColour\` AS \`StatusColour\` from ((((\`infrastructure\`.\`EqMaintJournal\` \`eq\` left join \`inventory\`.\`Assets\` \`a\` on((\`eq\`.\`AssetId\` = \`a\`.\`Id\`))) left join \`docworkflow\`.\`DocTypes\` \`dt\` on((\`eq\`.\`DocTypesId\` = \`dt\`.\`Id\`))) left join \`hr\`.\`Users\` \`u\` on((\`eq\`.\`MaintResponsibleId\` = \`u\`.\`Id\`))) left join \`inventory\`.\`UnitsOfMeasure\` \`um\` on((\`eq\`.\`ReadingsUoMId\` = \`um\`.\`Id\`)))`);

export const EqReadingsStandardView = mysqlView("EqReadingsStandardView", {
	Asset: longtext(),
	AssetClass: longtext(),
	ReadingTypeDescription: longtext(),
	Id: int().default(0).notNull(),
	AssetId: binary({ length: 16 }),
	AssetClassId: binary({ length: 16 }),
	ReadingTypeId: binary({ length: 16 }),
	ComparisonType: longtext().notNull(),
	MinValue: double(),
	MaxValue: double(),
	MaxAlertValue: double(),
	MinAlertValue: double(),
	IsRemoved: tinyint().default(0).notNull(),
	Description: longtext().notNull(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`a\`.\`Name\` AS \`Asset\`,\`ac\`.\`Description\` AS \`AssetClass\`,\`rt\`.\`Description\` AS \`ReadingTypeDescription\`,\`st\`.\`Id\` AS \`Id\`,\`st\`.\`AssetId\` AS \`AssetId\`,\`st\`.\`AssetClassId\` AS \`AssetClassId\`,\`st\`.\`ReadingTypeId\` AS \`ReadingTypeId\`,\`st\`.\`ComparisonType\` AS \`ComparisonType\`,\`st\`.\`MinValue\` AS \`MinValue\`,\`st\`.\`MaxValue\` AS \`MaxValue\`,\`st\`.\`MaxAlertValue\` AS \`MaxAlertValue\`,\`st\`.\`MinAlertValue\` AS \`MinAlertValue\`,\`st\`.\`IsRemoved\` AS \`IsRemoved\`,\`st\`.\`Description\` AS \`Description\` from (((\`infrastructure\`.\`EqReadingsStandards\` \`st\` left join \`inventory\`.\`Assets\` \`a\` on((\`st\`.\`AssetId\` = \`a\`.\`Id\`))) left join \`inventory\`.\`AssetClasses\` \`ac\` on((\`st\`.\`AssetClassId\` = \`ac\`.\`Id\`))) left join \`infrastructure\`.\`ReadingTypes\` \`rt\` on((\`st\`.\`ReadingTypeId\` = \`rt\`.\`Id\`)))`);

export const EqRepairJournalView = mysqlView("EqRepairJournalView", {
	AssetName: longtext(),
	AssetClassDescription: longtext(),
	AssetTypeName: longtext(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`a\`.\`Name\` AS \`AssetName\`,\`ac\`.\`Description\` AS \`AssetClassDescription\`,\`at\`.\`Name\` AS \`AssetTypeName\` from (((\`infrastructure\`.\`EqRepairJournal\` \`st\` left join \`inventory\`.\`Assets\` \`a\` on((\`st\`.\`AssetId\` = \`a\`.\`Id\`))) left join \`inventory\`.\`AssetClasses\` \`ac\` on((\`st\`.\`AssetClassId\` = \`ac\`.\`Id\`))) left join \`inventory\`.\`AssetTypes\` \`at\` on((\`st\`.\`AssetTypeId\` = \`at\`.\`Id\`)))`);

export const MaintRequestRegistryView = mysqlView("MaintRequestRegistryView", {
	AssetName: longtext(),
	InitReadingsUoMName: varchar({ length: 200 }),
	InitWorkerFullName: varchar({ length: 256 }),
	RequestStatusDescription: longtext(),
	WOTemplateDescription: json(),
	Id: binary({ length: 16 }).notNull(),
	InitDateTime: datetime({ mode: 'string', fsp: 6 }),
	AssetId: binary({ length: 16 }).notNull(),
	TypeOfMaintenanceId: binary({ length: 16 }),
	ReadingTypeId: binary({ length: 16 }).notNull(),
	InitReadingsValue: longtext(),
	InitReadingsUoMId: binary({ length: 16 }).notNull(),
	InitWorkerId: int().notNull(),
	MaintStartDateTime: datetime({ mode: 'string', fsp: 6 }),
	MaintDocRefIdGuid: binary({ length: 16 }),
	RequestStatusId: binary({ length: 16 }).notNull(),
	IsRemoved: tinyint().notNull(),
	ReqNumber: int().default(0).notNull(),
	ScheduledWorkId: binary({ length: 16 }),
	WOTemplateId: binary({ length: 16 }),
	EntityReadingId: binary({ length: 16 }),
	OriginSourceId: binary({ length: 16 }),
	OriginSourceName: longtext(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`a\`.\`Name\` AS \`AssetName\`,\`uom\`.\`Name\` AS \`InitReadingsUoMName\`,\`u\`.\`FullName\` AS \`InitWorkerFullName\`,\`ds\`.\`Description\` AS \`RequestStatusDescription\`,\`od\`.\`DocBody\` AS \`WOTemplateDescription\`,\`sw\`.\`Id\` AS \`Id\`,\`sw\`.\`InitDateTime\` AS \`InitDateTime\`,\`sw\`.\`AssetId\` AS \`AssetId\`,\`sw\`.\`TypeOfMaintenanceId\` AS \`TypeOfMaintenanceId\`,\`sw\`.\`ReadingTypeId\` AS \`ReadingTypeId\`,\`sw\`.\`InitReadingsValue\` AS \`InitReadingsValue\`,\`sw\`.\`InitReadingsUoMId\` AS \`InitReadingsUoMId\`,\`sw\`.\`InitWorkerId\` AS \`InitWorkerId\`,\`sw\`.\`MaintStartDateTime\` AS \`MaintStartDateTime\`,\`sw\`.\`MaintDocRefIdGuid\` AS \`MaintDocRefIdGuid\`,\`sw\`.\`RequestStatusId\` AS \`RequestStatusId\`,\`sw\`.\`IsRemoved\` AS \`IsRemoved\`,\`sw\`.\`ReqNumber\` AS \`ReqNumber\`,\`sw\`.\`ScheduledWorkId\` AS \`ScheduledWorkId\`,\`sw\`.\`WOTemplateId\` AS \`WOTemplateId\`,\`sw\`.\`EntityReadingId\` AS \`EntityReadingId\`,\`sw\`.\`OriginSourceId\` AS \`OriginSourceId\`,\`sw\`.\`OriginSourceName\` AS \`OriginSourceName\` from (((((\`infrastructure\`.\`MaintRequestRegistries\` \`sw\` left join \`inventory\`.\`Assets\` \`a\` on((\`sw\`.\`AssetId\` = \`a\`.\`Id\`))) left join \`inventory\`.\`UnitsOfMeasure\` \`uom\` on((\`sw\`.\`InitReadingsUoMId\` = \`uom\`.\`Id\`))) left join \`hr\`.\`Users\` \`u\` on((\`sw\`.\`InitWorkerId\` = \`u\`.\`Id\`))) left join \`docworkflow\`.\`DocStatuses\` \`ds\` on((\`sw\`.\`RequestStatusId\` = \`ds\`.\`Id\`))) left join \`docworkflow\`.\`OrderDocuments\` \`od\` on((\`sw\`.\`WOTemplateId\` = \`od\`.\`Id\`)))`);

export const MaintenanceScheduleView = mysqlView("MaintenanceScheduleView", {
	AssetName: longtext(),
	AssetClassDescription: longtext(),
	WorkDocumentTemplateName: longtext(),
	MaintDocRefName: longtext(),
	Id: int().default(0).notNull(),
	IsAutoGenerated: tinyint().notNull(),
	ScheduledWorkId: binary({ length: 16 }),
	ScheduledDT: datetime({ mode: 'string', fsp: 6 }).notNull(),
	CreateWOBefore: int().notNull(),
	CreatedDT: datetime({ mode: 'string', fsp: 6 }).notNull(),
	TypeOfMaintenanceId: binary({ length: 16 }),
	AssetId: binary({ length: 16 }).notNull(),
	WorkScheduledDuration: longtext(),
	WorkDocumentTemplateId: binary({ length: 16 }),
	AssetClassId: binary({ length: 16 }).notNull(),
	IsRemoved: tinyint().notNull(),
	ReqInventoryJson: longtext(),
	MaintDocRefIdGuid: binary({ length: 16 }),
	EndScheduledDT: datetime({ mode: 'string', fsp: 6 }),
	StartScheduledDT: datetime({ mode: 'string', fsp: 6 }),
	StaticEndScheduledDT: datetime({ mode: 'string', fsp: 6 }).default('0001-01-01 00:00:00.000000').notNull(),
	LastServiceDate: datetime({ mode: 'string', fsp: 6 }),
	LastServiceMileage: int(),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	AdjustedDate: datetime({ mode: 'string', fsp: 6 }),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`a\`.\`Name\` AS \`AssetName\`,\`ac\`.\`Description\` AS \`AssetClassDescription\`,json_unquote(json_extract(\`od\`.\`DocBody\`,'$.DocNumber')) AS \`WorkDocumentTemplateName\`,json_unquote(json_extract(\`mdrig\`.\`DocBody\`,'$.DocNumber')) AS \`MaintDocRefName\`,\`ms\`.\`Id\` AS \`Id\`,\`ms\`.\`IsAutoGenerated\` AS \`IsAutoGenerated\`,\`ms\`.\`ScheduledWorkId\` AS \`ScheduledWorkId\`,\`ms\`.\`ScheduledDT\` AS \`ScheduledDT\`,\`ms\`.\`CreateWOBefore\` AS \`CreateWOBefore\`,\`ms\`.\`CreatedDT\` AS \`CreatedDT\`,\`ms\`.\`TypeOfMaintenanceId\` AS \`TypeOfMaintenanceId\`,\`ms\`.\`AssetId\` AS \`AssetId\`,\`ms\`.\`WorkScheduledDuration\` AS \`WorkScheduledDuration\`,\`ms\`.\`WorkDocumentTemplateId\` AS \`WorkDocumentTemplateId\`,\`ms\`.\`AssetClassId\` AS \`AssetClassId\`,\`ms\`.\`IsRemoved\` AS \`IsRemoved\`,\`ms\`.\`ReqInventoryJson\` AS \`ReqInventoryJson\`,\`ms\`.\`MaintDocRefIdGuid\` AS \`MaintDocRefIdGuid\`,\`ms\`.\`EndScheduledDT\` AS \`EndScheduledDT\`,\`ms\`.\`StartScheduledDT\` AS \`StartScheduledDT\`,\`ms\`.\`StaticEndScheduledDT\` AS \`StaticEndScheduledDT\`,\`ms\`.\`LastServiceDate\` AS \`LastServiceDate\`,\`ms\`.\`LastServiceMileage\` AS \`LastServiceMileage\`,\`ms\`.\`UpdatedById\` AS \`UpdatedById\`,\`ms\`.\`Updated\` AS \`Updated\`,\`ms\`.\`CreatedById\` AS \`CreatedById\`,\`ms\`.\`Created\` AS \`Created\`,\`ms\`.\`AdjustedDate\` AS \`AdjustedDate\` from ((((\`infrastructure\`.\`MaintenanceSchedules\` \`ms\` left join \`inventory\`.\`Assets\` \`a\` on((\`ms\`.\`AssetId\` = \`a\`.\`Id\`))) left join \`inventory\`.\`AssetClasses\` \`ac\` on((\`ms\`.\`AssetClassId\` = \`ac\`.\`Id\`))) left join \`docworkflow\`.\`OrderDocuments\` \`od\` on((\`ms\`.\`WorkDocumentTemplateId\` = \`od\`.\`Id\`))) left join \`docworkflow\`.\`OrderDocuments\` \`mdrig\` on((\`ms\`.\`MaintDocRefIdGuid\` = \`mdrig\`.\`Id\`)))`);

export const ProdStatReadingView = mysqlView("ProdStatReadingView", {
	UnitName: varchar({ length: 200 }),
	Id: int().default(0).notNull(),
	UoMId: binary({ length: 16 }),
	Description: longtext().notNull(),
	Code: varchar({ length: 255 }),
	IsRemoved: tinyint().notNull(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`u\`.\`Name\` AS \`UnitName\`,\`pr\`.\`Id\` AS \`Id\`,\`pr\`.\`UoMId\` AS \`UoMId\`,\`pr\`.\`Description\` AS \`Description\`,\`pr\`.\`Code\` AS \`Code\`,\`pr\`.\`IsRemoved\` AS \`IsRemoved\` from (\`infrastructure\`.\`ProdStatReadings\` \`pr\` left join \`inventory\`.\`UnitsOfMeasure\` \`u\` on((\`pr\`.\`UoMId\` = \`u\`.\`Id\`)))`);

export const ProdStatRegistryView = mysqlView("ProdStatRegistryView", {
	Asset: longtext(),
	ProdStatReadingDescription: longtext(),
	UnitOfMeasure: varchar({ length: 200 }),
	Id: binary({ length: 16 }).notNull(),
	IsRemoved: tinyint().notNull(),
	AssetId: binary({ length: 16 }),
	ProdStatReadingId: int().notNull(),
	StatValue: double().notNull(),
	RegistrationDate: datetime({ mode: 'string', fsp: 6 }).default('0001-01-01 00:00:00.000000').notNull(),
	BranchType: longtext(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`a\`.\`Name\` AS \`Asset\`,\`ps\`.\`Description\` AS \`ProdStatReadingDescription\`,\`u\`.\`Name\` AS \`UnitOfMeasure\`,\`psr\`.\`Id\` AS \`Id\`,\`psr\`.\`IsRemoved\` AS \`IsRemoved\`,\`psr\`.\`AssetId\` AS \`AssetId\`,\`psr\`.\`ProdStatReadingId\` AS \`ProdStatReadingId\`,\`psr\`.\`StatValue\` AS \`StatValue\`,\`psr\`.\`RegistrationDate\` AS \`RegistrationDate\`,\`psr\`.\`BranchType\` AS \`BranchType\` from (((\`infrastructure\`.\`ProdStatRegistries\` \`psr\` left join \`inventory\`.\`Assets\` \`a\` on((\`psr\`.\`AssetId\` = \`a\`.\`Id\`))) left join \`infrastructure\`.\`ProdStatReadings\` \`ps\` on((\`psr\`.\`ProdStatReadingId\` = \`ps\`.\`Id\`))) left join \`inventory\`.\`UnitsOfMeasure\` \`u\` on((\`u\`.\`Id\` = \`ps\`.\`UoMId\`)))`);

export const ProdUnitStatRegistryView = mysqlView("ProdUnitStatRegistryView", {
	WorkTeamName: varchar({ length: 256 }),
	VehicleDescription: varchar({ length: 255 }),
	ProdStatReadingDescription: longtext(),
	UnitOfMeasure: varchar({ length: 200 }),
	Id: binary({ length: 16 }).notNull(),
	IsRemoved: tinyint().notNull(),
	EntityTypeId: longtext().notNull(),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	StatValue: double().notNull(),
	ProdStatReadingId: int().notNull(),
	RegistrationDate: datetime({ mode: 'string', fsp: 6 }).default('0001-01-01 00:00:00.000000').notNull(),
	BranchType: longtext(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`wt\`.\`Name\` AS \`WorkTeamName\`,\`OR REPLACE \`.\`Description\` AS \`VehicleDescription\`,\`ps\`.\`Description\` AS \`ProdStatReadingDescription\`,\`u\`.\`Name\` AS \`UnitOfMeasure\`,\`pusr\`.\`Id\` AS \`Id\`,\`pusr\`.\`IsRemoved\` AS \`IsRemoved\`,\`pusr\`.\`EntityTypeId\` AS \`EntityTypeId\`,\`pusr\`.\`EntityGuidId\` AS \`EntityGuidId\`,\`pusr\`.\`EntityIntId\` AS \`EntityIntId\`,\`pusr\`.\`StatValue\` AS \`StatValue\`,\`pusr\`.\`ProdStatReadingId\` AS \`ProdStatReadingId\`,\`pusr\`.\`RegistrationDate\` AS \`RegistrationDate\`,\`pusr\`.\`BranchType\` AS \`BranchType\` from ((((\`infrastructure\`.\`ProdUnitStatRegistries\` \`pusr\` left join \`hr\`.\`WorkTeams\` \`wt\` on(((\`pusr\`.\`EntityIntId\` = \`wt\`.\`Id\`) and (\`pusr\`.\`EntityTypeId\` = 'WorkTeams')))) left join \`tracking\`.\`ComposedVehicles\` \`OR REPLACE \` on(((\`pusr\`.\`EntityIntId\` = \`OR REPLACE \`.\`Id\`) and (\`pusr\`.\`EntityTypeId\` = 'ComposedVehicles')))) left join \`infrastructure\`.\`ProdStatReadings\` \`ps\` on((\`pusr\`.\`ProdStatReadingId\` = \`ps\`.\`Id\`))) left join \`inventory\`.\`UnitsOfMeasure\` \`u\` on((\`u\`.\`Id\` = \`ps\`.\`UoMId\`)))`);

export const ReadingTypeView = mysqlView("ReadingTypeView", {
	UnitOfMeasureName: varchar({ length: 200 }),
	Id: binary({ length: 16 }).notNull(),
	Description: longtext().notNull(),
	UnitOfMeasureId: binary({ length: 16 }).notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsSystem: tinyint().default(0).notNull(),
	IsRemoved: tinyint().default(0).notNull(),
	Code: varchar({ length: 255 }),
	Precision: int(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`uom\`.\`Name\` AS \`UnitOfMeasureName\`,\`ms\`.\`Id\` AS \`Id\`,\`ms\`.\`Description\` AS \`Description\`,\`ms\`.\`UnitOfMeasureId\` AS \`UnitOfMeasureId\`,\`ms\`.\`CreatedById\` AS \`CreatedById\`,\`ms\`.\`Created\` AS \`Created\`,\`ms\`.\`UpdatedById\` AS \`UpdatedById\`,\`ms\`.\`Updated\` AS \`Updated\`,\`ms\`.\`IsSystem\` AS \`IsSystem\`,\`ms\`.\`IsRemoved\` AS \`IsRemoved\`,\`ms\`.\`Code\` AS \`Code\`,\`ms\`.\`Precision\` AS \`Precision\` from (\`infrastructure\`.\`ReadingTypes\` \`ms\` left join \`inventory\`.\`UnitsOfMeasure\` \`uom\` on((\`ms\`.\`UnitOfMeasureId\` = \`uom\`.\`Id\`)))`);

export const RepairOrgUnitView = mysqlView("RepairOrgUnitView", {
	OrgUnitDescription: longtext(),
	Id: int().default(0).notNull(),
	OrgUnitId: int().notNull(),
	IsRemoved: tinyint().default(0).notNull(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`ou\`.\`Description\` AS \`OrgUnitDescription\`,\`ms\`.\`Id\` AS \`Id\`,\`ms\`.\`OrgUnitId\` AS \`OrgUnitId\`,\`ms\`.\`IsRemoved\` AS \`IsRemoved\` from (\`infrastructure\`.\`RepairOrgUnits\` \`ms\` left join \`hr\`.\`OrgUnits\` \`ou\` on((\`ms\`.\`OrgUnitId\` = \`ou\`.\`Id\`)))`);

export const ScheduledWorkProInfosView = mysqlView("ScheduledWorkProInfosView", {
	AssetName: longtext(),
	ScheduledWorkDescription: longtext(),
	Id: int().default(0).notNull(),
	ScheduledWorkId: binary({ length: 16 }).notNull(),
	ProcDT: datetime({ mode: 'string', fsp: 6 }).notNull(),
	ProcResult: int().notNull(),
	AssetId: binary({ length: 16 }).notNull(),
	ProcInfo: longtext(),
	IsRemoved: tinyint().notNull(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`a\`.\`Name\` AS \`AssetName\`,\`fn\`.\`Description\` AS \`ScheduledWorkDescription\`,\`ms\`.\`Id\` AS \`Id\`,\`ms\`.\`ScheduledWorkId\` AS \`ScheduledWorkId\`,\`ms\`.\`ProcDT\` AS \`ProcDT\`,\`ms\`.\`ProcResult\` AS \`ProcResult\`,\`ms\`.\`AssetId\` AS \`AssetId\`,\`ms\`.\`ProcInfo\` AS \`ProcInfo\`,\`ms\`.\`IsRemoved\` AS \`IsRemoved\` from ((\`infrastructure\`.\`ScheduledWorkProInfos\` \`ms\` left join \`inventory\`.\`Assets\` \`a\` on((\`ms\`.\`AssetId\` = \`a\`.\`Id\`))) left join \`infrastructure\`.\`ScheduledWorks\` \`fn\` on((\`ms\`.\`ScheduledWorkId\` = \`fn\`.\`Id\`)))`);

export const ScheduledWorkView = mysqlView("ScheduledWorkView", {
	AssetName: longtext(),
	AssetClassDescription: longtext(),
	OrderDocumentNumber: longtext(),
	Id: binary({ length: 16 }).notNull(),
	Description: longtext(),
	AssetClassId: binary({ length: 16 }),
	AssetId: binary({ length: 16 }),
	SchedulingTypeId: int(),
	Seriality: int().notNull(),
	ReadingTypeId: binary({ length: 16 }),
	ReadingsValue: double(),
	PeriodType: longtext(),
	PeriodValue: int(),
	IsUsingWorkingDays: tinyint(),
	PeriodCreateWOBefore: int(),
	StatCreateWOBefore: int(),
	WOTemplateId: binary({ length: 16 }),
	IsRemoved: tinyint().notNull(),
	TypeOfMaintenanceId: binary({ length: 16 }),
	Created: datetime({ mode: 'string', fsp: 6 }),
	CreatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	MaxPeriodValue: int(),
	MaxReadingsValue: double(),
	MinPeriodValue: int(),
	MinReadingsValue: double(),
	AverageValuePerDay: int(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`a\`.\`Name\` AS \`AssetName\`,\`ac\`.\`Description\` AS \`AssetClassDescription\`,\`od\`.\`DocNumber\` AS \`OrderDocumentNumber\`,\`sw\`.\`Id\` AS \`Id\`,\`sw\`.\`Description\` AS \`Description\`,\`sw\`.\`AssetClassId\` AS \`AssetClassId\`,\`sw\`.\`AssetId\` AS \`AssetId\`,\`sw\`.\`SchedulingTypeId\` AS \`SchedulingTypeId\`,\`sw\`.\`Seriality\` AS \`Seriality\`,\`sw\`.\`ReadingTypeId\` AS \`ReadingTypeId\`,\`sw\`.\`ReadingsValue\` AS \`ReadingsValue\`,\`sw\`.\`PeriodType\` AS \`PeriodType\`,\`sw\`.\`PeriodValue\` AS \`PeriodValue\`,\`sw\`.\`IsUsingWorkingDays\` AS \`IsUsingWorkingDays\`,\`sw\`.\`PeriodCreateWOBefore\` AS \`PeriodCreateWOBefore\`,\`sw\`.\`StatCreateWOBefore\` AS \`StatCreateWOBefore\`,\`sw\`.\`WOTemplateId\` AS \`WOTemplateId\`,\`sw\`.\`IsRemoved\` AS \`IsRemoved\`,\`sw\`.\`TypeOfMaintenanceId\` AS \`TypeOfMaintenanceId\`,\`sw\`.\`Created\` AS \`Created\`,\`sw\`.\`CreatedById\` AS \`CreatedById\`,\`sw\`.\`Updated\` AS \`Updated\`,\`sw\`.\`UpdatedById\` AS \`UpdatedById\`,\`sw\`.\`MaxPeriodValue\` AS \`MaxPeriodValue\`,\`sw\`.\`MaxReadingsValue\` AS \`MaxReadingsValue\`,\`sw\`.\`MinPeriodValue\` AS \`MinPeriodValue\`,\`sw\`.\`MinReadingsValue\` AS \`MinReadingsValue\`,\`sw\`.\`AverageValuePerDay\` AS \`AverageValuePerDay\` from (((\`infrastructure\`.\`ScheduledWorks\` \`sw\` left join \`inventory\`.\`Assets\` \`a\` on((\`sw\`.\`AssetId\` = \`a\`.\`Id\`))) left join \`inventory\`.\`AssetClasses\` \`ac\` on((\`sw\`.\`AssetClassId\` = \`ac\`.\`Id\`))) left join \`docworkflow\`.\`OrderDocuments\` \`od\` on((\`sw\`.\`WOTemplateId\` = \`od\`.\`Id\`)))`);

export const SpecEqRegistryView = mysqlView("SpecEqRegistryView", {
	AssetName: longtext(),
	ResponsibleUserFullName: varchar({ length: 256 }),
	OrderDocumentDocNumber: longtext(),
	Id: binary({ length: 16 }).notNull(),
	AssetId: binary({ length: 16 }).notNull(),
	PlanStartTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	PlanFinishTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	ActualStartTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	ActualFinishTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	OrderDocumentId: binary({ length: 16 }).notNull(),
	ResponsibleUserId: int().notNull(),
	Notes: longtext(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`a\`.\`Name\` AS \`AssetName\`,\`fn\`.\`FullName\` AS \`ResponsibleUserFullName\`,\`dn\`.\`DocNumber\` AS \`OrderDocumentDocNumber\`,\`ms\`.\`Id\` AS \`Id\`,\`ms\`.\`AssetId\` AS \`AssetId\`,\`ms\`.\`PlanStartTime\` AS \`PlanStartTime\`,\`ms\`.\`PlanFinishTime\` AS \`PlanFinishTime\`,\`ms\`.\`ActualStartTime\` AS \`ActualStartTime\`,\`ms\`.\`ActualFinishTime\` AS \`ActualFinishTime\`,\`ms\`.\`OrderDocumentId\` AS \`OrderDocumentId\`,\`ms\`.\`ResponsibleUserId\` AS \`ResponsibleUserId\`,\`ms\`.\`Notes\` AS \`Notes\` from (((\`infrastructure\`.\`SpecEqRegistries\` \`ms\` left join \`inventory\`.\`Assets\` \`a\` on((\`ms\`.\`AssetId\` = \`a\`.\`Id\`))) left join \`hr\`.\`Users\` \`fn\` on((\`ms\`.\`ResponsibleUserId\` = \`fn\`.\`Id\`))) left join \`docworkflow\`.\`OrderDocuments\` \`dn\` on((\`ms\`.\`OrderDocumentId\` = \`dn\`.\`Id\`)))`);

export const TaskView = mysqlView("TaskView", {
	WorkTeamName: varchar({ length: 256 }),
	DocStatusesDescription: longtext(),
	JobOrderDocument: longtext(),
	Id: binary({ length: 16 }).notNull(),
	LineNr: int().notNull(),
	DurationTicks: bigint({ mode: "number" }).notNull(),
	JobId: binary({ length: 16 }).notNull(),
	Description: longtext(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsAttachmentsRequired: tinyint().notNull(),
	IsEquipmentNotesRequired: tinyint().notNull(),
	AssetId: binary({ length: 16 }),
	CheckListId: binary({ length: 16 }),
	IsCheckListRequired: tinyint().default(0).notNull(),
	TaskBody: longtext(),
	ParentId: binary({ length: 16 }),
	Quantity: int(),
	ActualFinishDate: datetime({ mode: 'string', fsp: 6 }),
	ActualStartDate: datetime({ mode: 'string', fsp: 6 }),
	PlannedFinishDate: datetime({ mode: 'string', fsp: 6 }),
	PlannedStartDate: datetime({ mode: 'string', fsp: 6 }),
	TaskStatusId: binary({ length: 16 }),
	WorkTeamId: int(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`wt\`.\`Name\` AS \`WorkTeamName\`,\`ds\`.\`Description\` AS \`DocStatusesDescription\`,\`j\`.\`DocNumber\` AS \`JobOrderDocument\`,\`ms\`.\`Id\` AS \`Id\`,\`ms\`.\`LineNr\` AS \`LineNr\`,\`ms\`.\`DurationTicks\` AS \`DurationTicks\`,\`ms\`.\`JobId\` AS \`JobId\`,\`ms\`.\`Description\` AS \`Description\`,\`ms\`.\`CreatedById\` AS \`CreatedById\`,\`ms\`.\`Created\` AS \`Created\`,\`ms\`.\`UpdatedById\` AS \`UpdatedById\`,\`ms\`.\`Updated\` AS \`Updated\`,\`ms\`.\`IsAttachmentsRequired\` AS \`IsAttachmentsRequired\`,\`ms\`.\`IsEquipmentNotesRequired\` AS \`IsEquipmentNotesRequired\`,\`ms\`.\`AssetId\` AS \`AssetId\`,\`ms\`.\`CheckListId\` AS \`CheckListId\`,\`ms\`.\`IsCheckListRequired\` AS \`IsCheckListRequired\`,\`ms\`.\`TaskBody\` AS \`TaskBody\`,\`ms\`.\`ParentId\` AS \`ParentId\`,\`ms\`.\`Quantity\` AS \`Quantity\`,\`ms\`.\`ActualFinishDate\` AS \`ActualFinishDate\`,\`ms\`.\`ActualStartDate\` AS \`ActualStartDate\`,\`ms\`.\`PlannedFinishDate\` AS \`PlannedFinishDate\`,\`ms\`.\`PlannedStartDate\` AS \`PlannedStartDate\`,\`ms\`.\`TaskStatusId\` AS \`TaskStatusId\`,\`ms\`.\`WorkTeamId\` AS \`WorkTeamId\` from (((\`infrastructure\`.\`Tasks\` \`ms\` left join \`docworkflow\`.\`OrderDocuments\` \`j\` on((\`ms\`.\`JobId\` = \`j\`.\`JobId\`))) left join \`docworkflow\`.\`DocStatuses\` \`ds\` on((\`ms\`.\`TaskStatusId\` = \`ds\`.\`Id\`))) left join \`hr\`.\`WorkTeams\` \`wt\` on((\`ms\`.\`WorkTeamId\` = \`wt\`.\`Id\`)))`);

export const TypeOfMaintenanceView = mysqlView("TypeOfMaintenanceView", {
	AssetClass: longtext(),
	EqReadingsStandardDescription: longtext(),
	Id: binary({ length: 16 }).notNull(),
	Description: longtext().notNull(),
	Enabled: tinyint().notNull(),
	AssetClassId: binary({ length: 16 }),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsRemoved: tinyint().default(0).notNull(),
	EqReadingsStandardId: int(),
	MaintenancePriority: int().default(0).notNull(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`ac\`.\`Description\` AS \`AssetClass\`,\`rt\`.\`Description\` AS \`EqReadingsStandardDescription\`,\`tp\`.\`Id\` AS \`Id\`,\`tp\`.\`Description\` AS \`Description\`,\`tp\`.\`Enabled\` AS \`Enabled\`,\`tp\`.\`AssetClassId\` AS \`AssetClassId\`,\`tp\`.\`CreatedById\` AS \`CreatedById\`,\`tp\`.\`Created\` AS \`Created\`,\`tp\`.\`UpdatedById\` AS \`UpdatedById\`,\`tp\`.\`Updated\` AS \`Updated\`,\`tp\`.\`IsRemoved\` AS \`IsRemoved\`,\`tp\`.\`EqReadingsStandardId\` AS \`EqReadingsStandardId\`,\`tp\`.\`MaintenancePriority\` AS \`MaintenancePriority\` from ((\`infrastructure\`.\`TypesOfMaintenance\` \`tp\` left join \`inventory\`.\`AssetClasses\` \`ac\` on((\`tp\`.\`AssetClassId\` = \`ac\`.\`Id\`))) left join \`infrastructure\`.\`EqReadingsStandards\` \`rt\` on((\`tp\`.\`EqReadingsStandardId\` = \`rt\`.\`Id\`)))`);

export const UnitProdStatReadingView = mysqlView("UnitProdStatReadingView", {
	WorkTeamName: varchar({ length: 256 }),
	VehicleDescription: varchar({ length: 255 }),
	ProdStatReadingDescription: longtext(),
	Id: binary({ length: 16 }).notNull(),
	IsRemoved: tinyint().notNull(),
	EntityTypeId: longtext(),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	ProdStatReadingId: int().notNull(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`wt\`.\`Name\` AS \`WorkTeamName\`,\`OR REPLACE \`.\`Description\` AS \`VehicleDescription\`,\`ps\`.\`Description\` AS \`ProdStatReadingDescription\`,\`upsr\`.\`Id\` AS \`Id\`,\`upsr\`.\`IsRemoved\` AS \`IsRemoved\`,\`upsr\`.\`EntityTypeId\` AS \`EntityTypeId\`,\`upsr\`.\`EntityGuidId\` AS \`EntityGuidId\`,\`upsr\`.\`EntityIntId\` AS \`EntityIntId\`,\`upsr\`.\`ProdStatReadingId\` AS \`ProdStatReadingId\` from (((\`infrastructure\`.\`UnitProdStatReadings\` \`upsr\` left join \`hr\`.\`WorkTeams\` \`wt\` on(((\`upsr\`.\`EntityIntId\` = \`wt\`.\`Id\`) and (\`upsr\`.\`EntityTypeId\` = 'WorkTeams')))) left join \`tracking\`.\`ComposedVehicles\` \`OR REPLACE \` on(((\`upsr\`.\`EntityIntId\` = \`OR REPLACE \`.\`Id\`) and (\`upsr\`.\`EntityTypeId\` = 'ComposedVehicles')))) left join \`infrastructure\`.\`ProdStatReadings\` \`ps\` on((\`upsr\`.\`ProdStatReadingId\` = \`ps\`.\`Id\`)))`);

export const UserEmploymentJournalView = mysqlView("UserEmploymentJournalView", {
	OrderDocumentDocNumber: longtext(),
	TaskDescription: longtext(),
	Id: binary({ length: 16 }).notNull(),
	UserId: int().notNull(),
	OrgUnitId: int(),
	LocationId: int(),
	OrderDocumentId: binary({ length: 16 }),
	TaskId: binary({ length: 16 }),
	PeriodBegin: datetime({ mode: 'string', fsp: 6 }),
	PeriodEnd: datetime({ mode: 'string', fsp: 6 }),
	Description: longtext(),
	RecordAuthorId: int().notNull(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`dn\`.\`DocNumber\` AS \`OrderDocumentDocNumber\`,\`ac\`.\`Description\` AS \`TaskDescription\`,\`ms\`.\`Id\` AS \`Id\`,\`ms\`.\`UserId\` AS \`UserId\`,\`ms\`.\`OrgUnitId\` AS \`OrgUnitId\`,\`ms\`.\`LocationId\` AS \`LocationId\`,\`ms\`.\`OrderDocumentId\` AS \`OrderDocumentId\`,\`ms\`.\`TaskId\` AS \`TaskId\`,\`ms\`.\`PeriodBegin\` AS \`PeriodBegin\`,\`ms\`.\`PeriodEnd\` AS \`PeriodEnd\`,\`ms\`.\`Description\` AS \`Description\`,\`ms\`.\`RecordAuthorId\` AS \`RecordAuthorId\` from ((\`hr\`.\`UserEmploymentJournals\` \`ms\` left join \`docworkflow\`.\`OrderDocuments\` \`dn\` on((\`ms\`.\`OrderDocumentId\` = \`dn\`.\`Id\`))) left join \`infrastructure\`.\`Tasks\` \`ac\` on((\`ms\`.\`Description\` = \`ac\`.\`Id\`)))`);

export const WorkPermitView = mysqlView("WorkPermitView", {
	OrgUnitDescription: longtext(),
	Id: binary({ length: 16 }).notNull(),
	PermitDate: datetime({ mode: 'string', fsp: 6 }),
	PermitNumber: varchar({ length: 255 }),
	OrgUnitId: int().notNull(),
	IsGeneralPermit: tinyint().notNull(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`with recursive \`OrgUnitHierarchy\` as (select \`hr\`.\`OrgUnits\`.\`Id\` AS \`Id\`,\`hr\`.\`OrgUnits\`.\`Description\` AS \`Description\`,\`hr\`.\`OrgUnits\`.\`ParentId\` AS \`ParentId\`,\`hr\`.\`OrgUnits\`.\`Description\` AS \`OrgUnitDescription\` from \`hr\`.\`OrgUnits\` where (\`hr\`.\`OrgUnits\`.\`ParentId\` is null) union all select \`ou\`.\`Id\` AS \`Id\`,\`ou\`.\`Description\` AS \`Description\`,\`ou\`.\`ParentId\` AS \`ParentId\`,concat(\`ou\`.\`Description\`,' < ',\`ouh\`.\`OrgUnitDescription\`) AS \`OrgUnitDescription\` from (\`hr\`.\`OrgUnits\` \`ou\` join \`OrgUnitHierarchy\` \`ouh\` on((\`ou\`.\`ParentId\` = \`ouh\`.\`Id\`)))) select \`ouh\`.\`OrgUnitDescription\` AS \`OrgUnitDescription\`,\`ms\`.\`Id\` AS \`Id\`,\`ms\`.\`PermitDate\` AS \`PermitDate\`,\`ms\`.\`PermitNumber\` AS \`PermitNumber\`,\`ms\`.\`OrgUnitId\` AS \`OrgUnitId\`,\`ms\`.\`IsGeneralPermit\` AS \`IsGeneralPermit\` from (\`infrastructure\`.\`WorkPermits\` \`ms\` left join \`OrgUnitHierarchy\` \`ouh\` on((\`ms\`.\`OrgUnitId\` = \`ouh\`.\`Id\`)))`);