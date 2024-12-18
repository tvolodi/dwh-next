import { tinyint, time, mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, longtext, json, unique, varchar, binary, datetime, index, foreignKey, float, double, mysqlView } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const ArchFactProcessConfig = mysqlTable("ArchFactProcessConfig", {
	Id: int().autoincrement().notNull(),
	Module: longtext(),
	FactTableName: longtext(),
	FactType: int().notNull(),
	StorePeriod: int().notNull(),
	DateColumnName: longtext(),
	Options: json(),
	Notes: longtext(),
},
(table) => {
	return {
		ArchFactProcessConfig_Id: primaryKey({ columns: [table.Id], name: "ArchFactProcessConfig_Id"}),
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

export const DocComponentTypes = mysqlTable("DocComponentTypes", {
	Id: int().autoincrement().notNull(),
	Code: varchar({ length: 255 }),
	Description: longtext().notNull(),
},
(table) => {
	return {
		DocComponentTypes_Id: primaryKey({ columns: [table.Id], name: "DocComponentTypes_Id"}),
		IX_DocComponentTypes_Code: unique("IX_DocComponentTypes_Code").on(table.Code),
	}
});

export const DocExecJournal = mysqlTable("DocExecJournal", {
	Id: binary({ length: 16 }).notNull(),
	WorkflowTypesId: binary({ length: 16 }).notNull().references(() => WorkflowTypes.Id, { onDelete: "cascade" } ),
	PreviousStatusId: binary({ length: 16 }).references(() => DocStatuses.Id),
	NextStatusId: binary({ length: 16 }).notNull().references(() => DocStatuses.Id, { onDelete: "cascade" } ),
	OrderDocumentId: binary({ length: 16 }).notNull().references(() => OrderDocuments.Id, { onDelete: "cascade" } ),
	UserId: int().notNull(),
	ScheduledStartOn: datetime({ mode: 'string', fsp: 6 }),
	ScheduledFinishOn: datetime({ mode: 'string', fsp: 6 }),
	FinishedStartOn: datetime({ mode: 'string', fsp: 6 }),
	FinishedFinishOn: datetime({ mode: 'string', fsp: 6 }),
	Updated: datetime({ mode: 'string', fsp: 6 }).notNull(),
},
(table) => {
	return {
		IX_DocExecJournal_NextStatusId: index("IX_DocExecJournal_NextStatusId").on(table.NextStatusId),
		IX_DocExecJournal_OrderDocumentId: index("IX_DocExecJournal_OrderDocumentId").on(table.OrderDocumentId),
		IX_DocExecJournal_PreviousStatusId: index("IX_DocExecJournal_PreviousStatusId").on(table.PreviousStatusId),
		IX_DocExecJournal_WorkflowTypesId: index("IX_DocExecJournal_WorkflowTypesId").on(table.WorkflowTypesId),
		DocExecJournal_Id: primaryKey({ columns: [table.Id], name: "DocExecJournal_Id"}),
	}
});

export const DocExecLog = mysqlTable("DocExecLog", {
	Id: binary({ length: 16 }).notNull(),
	DocId: binary({ length: 16 }).notNull(),
	StatusStartTime: datetime({ mode: 'string', fsp: 6 }),
	StatusFinishTime: datetime({ mode: 'string', fsp: 6 }),
	StatusStartUserId: int(),
	StatusFinishUserId: int(),
	IsRemoved: tinyint().default(0).notNull(),
	CurrentStatusId: binary({ length: 16 }).references(() => DocStatuses.Id, { onDelete: "restrict" } ),
	PreviousStatusId: binary({ length: 16 }).references(() => DocStatuses.Id, { onDelete: "restrict" } ),
},
(table) => {
	return {
		IX_DocExecLog_CurrentStatusId: index("IX_DocExecLog_CurrentStatusId").on(table.CurrentStatusId),
		IX_DocExecLog_PreviousStatusId: index("IX_DocExecLog_PreviousStatusId").on(table.PreviousStatusId),
		DocExecLog_Id: primaryKey({ columns: [table.Id], name: "DocExecLog_Id"}),
	}
});

export const DocNumbers = mysqlTable("DocNumbers", {
	Id: int().autoincrement().notNull(),
	OrgUnitId: int().notNull(),
	DocTypeId: binary({ length: 16 }).notNull().references(() => DocTypes.Id, { onDelete: "cascade" } ),
	WorkflowTypeId: binary({ length: 16 }).notNull().references(() => WorkflowTypes.Id, { onDelete: "cascade" } ),
	DocNumber: int().notNull(),
	DocPrefix: longtext(),
	DocSuffix: longtext(),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		IX_DocNumbers_DocTypeId: index("IX_DocNumbers_DocTypeId").on(table.DocTypeId),
		IX_DocNumbers_WorkflowTypeId: index("IX_DocNumbers_WorkflowTypeId").on(table.WorkflowTypeId),
		DocNumbers_Id: primaryKey({ columns: [table.Id], name: "DocNumbers_Id"}),
		IX_DocNumbers_OrgUnitId_DocTypeId_WorkflowTypeId: unique("IX_DocNumbers_OrgUnitId_DocTypeId_WorkflowTypeId").on(table.OrgUnitId, table.DocTypeId, table.WorkflowTypeId),
	}
});

export const DocSettings = mysqlTable("DocSettings", {
	Id: int().autoincrement().notNull(),
	OrgUnitId: int().notNull(),
	DocTypeId: binary({ length: 16 }).notNull().references(() => DocTypes.Id, { onDelete: "restrict" } ),
	WorkflowTypeId: binary({ length: 16 }).notNull().references(() => WorkflowTypes.Id, { onDelete: "restrict" } ),
	FieldsToCopy: longtext(),
	FieldsToTemplate: longtext(),
	UserInterface: longtext(),
	StatusesForDelete: longtext(),
},
(table) => {
	return {
		IX_DocSettings_DocTypeId: index("IX_DocSettings_DocTypeId").on(table.DocTypeId),
		IX_DocSettings_WorkflowTypeId: index("IX_DocSettings_WorkflowTypeId").on(table.WorkflowTypeId),
		DocSettings_Id: primaryKey({ columns: [table.Id], name: "DocSettings_Id"}),
	}
});

export const DocStatuses = mysqlTable("DocStatuses", {
	Id: binary({ length: 16 }).notNull(),
	Code: longtext().notNull(),
	Description: longtext().notNull(),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		DocStatuses_Id: primaryKey({ columns: [table.Id], name: "DocStatuses_Id"}),
	}
});

export const DocTypeComponents = mysqlTable("DocTypeComponents", {
	Id: int().autoincrement().notNull(),
	DocTypesId: binary({ length: 16 }).notNull().references(() => DocTypes.Id),
	DocComponentTypeId: int().notNull().references(() => DocComponentTypes.Id, { onDelete: "restrict" } ),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		IX_DocTypeComponents_DocComponentTypeId: index("IX_DocTypeComponents_DocComponentTypeId").on(table.DocComponentTypeId),
		IX_DocTypeComponents_DocTypesId: index("IX_DocTypeComponents_DocTypesId").on(table.DocTypesId),
		DocTypeComponents_Id: primaryKey({ columns: [table.Id], name: "DocTypeComponents_Id"}),
	}
});

export const DocTypes = mysqlTable("DocTypes", {
	Id: binary({ length: 16 }).notNull(),
	Code: longtext().notNull(),
	Description: longtext().notNull(),
	DefaultWorkflowId: binary({ length: 16 }).references((): AnyMySqlColumn => WorkflowTypes.Id),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		IX_DocTypes_DefaultWorkflowId: index("IX_DocTypes_DefaultWorkflowId").on(table.DefaultWorkflowId),
		DocTypes_Id: primaryKey({ columns: [table.Id], name: "DocTypes_Id"}),
	}
});

export const HangfireJobsAggregatedCounter = mysqlTable("HangfireJobsAggregatedCounter", {
	Id: int().autoincrement().notNull(),
	Key: varchar({ length: 100 }).notNull(),
	Value: int().notNull(),
	ExpireAt: datetime({ mode: 'string'}),
},
(table) => {
	return {
		HangfireJobsAggregatedCounter_Id: primaryKey({ columns: [table.Id], name: "HangfireJobsAggregatedCounter_Id"}),
		IX_HangfireJobsCounterAggregated_Key: unique("IX_HangfireJobsCounterAggregated_Key").on(table.Key),
	}
});

export const HangfireJobsCounter = mysqlTable("HangfireJobsCounter", {
	Id: int().autoincrement().notNull(),
	Key: varchar({ length: 100 }).notNull(),
	Value: int().notNull(),
	ExpireAt: datetime({ mode: 'string'}),
},
(table) => {
	return {
		IX_HangfireJobsCounter_Key: index("IX_HangfireJobsCounter_Key").on(table.Key),
		HangfireJobsCounter_Id: primaryKey({ columns: [table.Id], name: "HangfireJobsCounter_Id"}),
	}
});

export const HangfireJobsDistributedLock = mysqlTable("HangfireJobsDistributedLock", {
	Resource: varchar({ length: 100 }).notNull(),
	CreatedAt: datetime({ mode: 'string', fsp: 6 }).notNull(),
});

export const HangfireJobsHash = mysqlTable("HangfireJobsHash", {
	Id: int().autoincrement().notNull(),
	Key: varchar({ length: 100 }).notNull(),
	Field: varchar({ length: 40 }).notNull(),
	Value: longtext(),
	ExpireAt: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		HangfireJobsHash_Id: primaryKey({ columns: [table.Id], name: "HangfireJobsHash_Id"}),
		IX_HangfireJobsHash_Key_Field: unique("IX_HangfireJobsHash_Key_Field").on(table.Key, table.Field),
	}
});

export const HangfireJobsJob = mysqlTable("HangfireJobsJob", {
	Id: int().autoincrement().notNull(),
	StateId: int(),
	StateName: varchar({ length: 20 }),
	InvocationData: longtext().notNull(),
	Arguments: longtext().notNull(),
	CreatedAt: datetime({ mode: 'string', fsp: 6 }).notNull(),
	ExpireAt: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_HangfireJobsJob_StateName: index("IX_HangfireJobsJob_StateName").on(table.StateName),
		HangfireJobsJob_Id: primaryKey({ columns: [table.Id], name: "HangfireJobsJob_Id"}),
	}
});

export const HangfireJobsJobParameter = mysqlTable("HangfireJobsJobParameter", {
	Id: int().autoincrement().notNull(),
	JobId: int().notNull().references(() => HangfireJobsJob.Id, { onDelete: "cascade", onUpdate: "cascade" } ),
	Name: varchar({ length: 40 }).notNull(),
	Value: longtext(),
},
(table) => {
	return {
		HangfireJobsJobParameter_Id: primaryKey({ columns: [table.Id], name: "HangfireJobsJobParameter_Id"}),
		IX_HangfireJobsJobParameter_JobId_Name: unique("IX_HangfireJobsJobParameter_JobId_Name").on(table.JobId, table.Name),
	}
});

export const HangfireJobsJobQueue = mysqlTable("HangfireJobsJobQueue", {
	Id: int().autoincrement().notNull(),
	JobId: int().notNull(),
	FetchedAt: datetime({ mode: 'string', fsp: 6 }),
	Queue: varchar({ length: 50 }).notNull(),
	FetchToken: varchar({ length: 36 }),
},
(table) => {
	return {
		IX_HangfireJobsJobQueue_QueueAndFetchedAt: index("IX_HangfireJobsJobQueue_QueueAndFetchedAt").on(table.Queue, table.FetchedAt),
		HangfireJobsJobQueue_Id: primaryKey({ columns: [table.Id], name: "HangfireJobsJobQueue_Id"}),
	}
});

export const HangfireJobsJobState = mysqlTable("HangfireJobsJobState", {
	Id: int().autoincrement().notNull(),
	JobId: int().notNull().references(() => HangfireJobsJob.Id, { onDelete: "cascade", onUpdate: "cascade" } ),
	CreatedAt: datetime({ mode: 'string', fsp: 6 }).notNull(),
	Name: varchar({ length: 20 }).notNull(),
	Reason: varchar({ length: 100 }),
	Data: longtext(),
},
(table) => {
	return {
		HangfireJobsJobState_Id: primaryKey({ columns: [table.Id], name: "HangfireJobsJobState_Id"}),
	}
});

export const HangfireJobsList = mysqlTable("HangfireJobsList", {
	Id: int().autoincrement().notNull(),
	Key: varchar({ length: 100 }).notNull(),
	Value: longtext(),
	ExpireAt: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		HangfireJobsList_Id: primaryKey({ columns: [table.Id], name: "HangfireJobsList_Id"}),
	}
});

export const HangfireJobsServer = mysqlTable("HangfireJobsServer", {
	Id: varchar({ length: 100 }).notNull(),
	Data: longtext().notNull(),
	LastHeartbeat: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		HangfireJobsServer_Id: primaryKey({ columns: [table.Id], name: "HangfireJobsServer_Id"}),
	}
});

export const HangfireJobsSet = mysqlTable("HangfireJobsSet", {
	Id: int().autoincrement().notNull(),
	Key: varchar({ length: 100 }).notNull(),
	Value: varchar({ length: 256 }).notNull(),
	Score: float().notNull(),
	ExpireAt: datetime({ mode: 'string'}),
},
(table) => {
	return {
		HangfireJobsSet_Id: primaryKey({ columns: [table.Id], name: "HangfireJobsSet_Id"}),
		IX_HangfireJobsSet_Key_Value: unique("IX_HangfireJobsSet_Key_Value").on(table.Key, table.Value),
	}
});

export const HangfireJobsState = mysqlTable("HangfireJobsState", {
	Id: int().autoincrement().notNull(),
	JobId: int().notNull().references(() => HangfireJobsJob.Id, { onDelete: "cascade", onUpdate: "cascade" } ),
	Name: varchar({ length: 20 }).notNull(),
	Reason: varchar({ length: 100 }),
	CreatedAt: datetime({ mode: 'string', fsp: 6 }).notNull(),
	Data: longtext(),
},
(table) => {
	return {
		HangfireJobsState_Id: primaryKey({ columns: [table.Id], name: "HangfireJobsState_Id"}),
	}
});

export const OrderDocumentFiles = mysqlTable("OrderDocumentFiles", {
	Id: binary({ length: 16 }).notNull(),
	Path: longtext(),
	OrderDocumentId: binary({ length: 16 }).references(() => OrderDocuments.Id),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_OrderDocumentFiles_OrderDocumentId: index("IX_OrderDocumentFiles_OrderDocumentId").on(table.OrderDocumentId),
		OrderDocumentFiles_Id: primaryKey({ columns: [table.Id], name: "OrderDocumentFiles_Id"}),
	}
});

export const OrderDocuments = mysqlTable("OrderDocuments", {
	Id: binary({ length: 16 }).notNull(),
	DocBody: json(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	DocDate: datetime({ mode: 'string', fsp: 6 }).default('0001-01-01 00:00:00.000000').notNull(),
	DocNumber: longtext(),
	DocStatusesId: binary({ length: 16 }).references(() => DocStatuses.Id, { onDelete: "restrict" } ),
	DocTypesId: binary({ length: 16 }).notNull().references(() => DocTypes.Id, { onDelete: "cascade" } ),
	WorkflowTypesId: binary({ length: 16 }).notNull().references(() => WorkflowTypes.Id, { onDelete: "cascade" } ),
	WorkIssuerUserId: int().default(0).notNull(),
	WorkResponsibleUserId: int(),
	FinishedFinishOn: datetime({ mode: 'string', fsp: 6 }),
	FinishedStartOn: datetime({ mode: 'string', fsp: 6 }),
	ScheduledFinishOn: datetime({ mode: 'string', fsp: 6 }),
	ScheduledStartOn: datetime({ mode: 'string', fsp: 6 }),
	OrgUnitId: int(),
	AssetClassId: binary({ length: 16 }),
	AssetId: binary({ length: 16 }),
	DocumentMode: longtext(),
	JobId: binary({ length: 16 }),
	ExternalDocId: binary({ length: 16 }),
	LocationId: int(),
	ScheduledDuration: double(),
	Description: longtext(),
	WorkTeamId: int(),
	ExternalDocType: longtext(),
},
(table) => {
	return {
		IX_OrderDocuments_DocStatusesId: index("IX_OrderDocuments_DocStatusesId").on(table.DocStatusesId),
		IX_OrderDocuments_DocTypesId: index("IX_OrderDocuments_DocTypesId").on(table.DocTypesId),
		IX_OrderDocuments_WorkflowTypesId: index("IX_OrderDocuments_WorkflowTypesId").on(table.WorkflowTypesId),
		OrderDocuments_Id: primaryKey({ columns: [table.Id], name: "OrderDocuments_Id"}),
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

export const SysJobParams = mysqlTable("SysJobParams", {
	Id: int().autoincrement().notNull(),
	Code: varchar({ length: 255 }),
	Name: longtext(),
	Params: longtext(),
	JobId: longtext(),
	State: longtext(),
	ToRun: tinyint().notNull(),
	IsDisabled: tinyint().notNull(),
	CronSchedule: longtext(),
	ExternalData: longtext(),
	Interface: longtext(),
	Method: longtext(),
	Module: longtext(),
	Service: longtext(),
},
(table) => {
	return {
		SysJobParams_Id: primaryKey({ columns: [table.Id], name: "SysJobParams_Id"}),
		IX_SysJobParams_Code: unique("IX_SysJobParams_Code").on(table.Code),
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

export const TypeOfWork = mysqlTable("TypeOfWork", {
	Id: binary({ length: 16 }).notNull(),
	Description: longtext().notNull(),
	AssetClassId: binary({ length: 16 }).notNull(),
},
(table) => {
	return {
		TypeOfWork_Id: primaryKey({ columns: [table.Id], name: "TypeOfWork_Id"}),
	}
});

export const WorkflowActionEmployees = mysqlTable("WorkflowActionEmployees", {
	Id: binary({ length: 16 }).notNull(),
	UserId: int().notNull(),
	WorkflowActionsId: binary({ length: 16 }).references(() => WorkflowActions.Id, { onDelete: "restrict" } ),
},
(table) => {
	return {
		IX_WorkflowActionEmployees_WorkflowActionsId: index("IX_WorkflowActionEmployees_WorkflowActionsId").on(table.WorkflowActionsId),
		WorkflowActionEmployees_Id: primaryKey({ columns: [table.Id], name: "WorkflowActionEmployees_Id"}),
		IX_WorkflowActionEmployees_UserId_WorkflowActionsId: unique("IX_WorkflowActionEmployees_UserId_WorkflowActionsId").on(table.UserId, table.WorkflowActionsId),
	}
});

export const WorkflowActionRoles = mysqlTable("WorkflowActionRoles", {
	Id: binary({ length: 16 }).notNull(),
	RoleId: int().notNull(),
	IsAllowed: tinyint().notNull(),
	WorkflowActionsId: binary({ length: 16 }).references(() => WorkflowActions.Id, { onDelete: "restrict" } ),
},
(table) => {
	return {
		IX_WorkflowActionRoles_WorkflowActionsId: index("IX_WorkflowActionRoles_WorkflowActionsId").on(table.WorkflowActionsId),
		WorkflowActionRoles_Id: primaryKey({ columns: [table.Id], name: "WorkflowActionRoles_Id"}),
		IX_WorkflowActionRoles_RoleId_WorkflowActionsId: unique("IX_WorkflowActionRoles_RoleId_WorkflowActionsId").on(table.RoleId, table.WorkflowActionsId),
	}
});

export const WorkflowActions = mysqlTable("WorkflowActions", {
	Id: binary({ length: 16 }).notNull(),
	CurrentStatusId: binary({ length: 16 }).references(() => DocStatuses.Id, { onDelete: "restrict" } ),
	NextStatusId: binary({ length: 16 }).references(() => DocStatuses.Id, { onDelete: "restrict" } ),
	WorkflowTypesId: binary({ length: 16 }).references(() => WorkflowTypes.Id, { onDelete: "restrict" } ),
	IsRemoved: tinyint().default(0).notNull(),
	IntervalMinutes: int(),
},
(table) => {
	return {
		IX_WorkflowActions_CurrentStatusId: index("IX_WorkflowActions_CurrentStatusId").on(table.CurrentStatusId),
		IX_WorkflowActions_NextStatusId: index("IX_WorkflowActions_NextStatusId").on(table.NextStatusId),
		IX_WorkflowActions_WorkflowTypesId: index("IX_WorkflowActions_WorkflowTypesId").on(table.WorkflowTypesId),
		WorkflowActions_Id: primaryKey({ columns: [table.Id], name: "WorkflowActions_Id"}),
	}
});

export const WorkflowReferences = mysqlTable("WorkflowReferences", {
	Id: int().autoincrement().notNull(),
	Type: longtext(),
	WorkflowTypesId: binary({ length: 16 }).notNull().references(() => WorkflowTypes.Id, { onDelete: "restrict", onUpdate: "restrict" } ),
	IsRemoved: tinyint().notNull(),
	DocRefFrom: binary({ length: 16 }).default('0x').notNull(),
	DocRefTo: binary({ length: 16 }).default('0x').notNull(),
},
(table) => {
	return {
		IX_WorkflowReferences_WorkflowTypesId: index("IX_WorkflowReferences_WorkflowTypesId").on(table.WorkflowTypesId),
		WorkflowReferences_Id: primaryKey({ columns: [table.Id], name: "WorkflowReferences_Id"}),
	}
});

export const WorkflowRoleUsers = mysqlTable("WorkflowRoleUsers", {
	Id: binary({ length: 16 }).notNull(),
	WorkflowTypeId: binary({ length: 16 }).notNull(),
	UserId: int().notNull(),
	WorkflowRolesId: binary({ length: 16 }).notNull(),
	IsRemoved: tinyint().notNull(),
},
(table) => {
	return {
		WorkflowRoleUsers_Id: primaryKey({ columns: [table.Id], name: "WorkflowRoleUsers_Id"}),
	}
});

export const WorkflowRoles = mysqlTable("WorkflowRoles", {
	Id: binary({ length: 16 }).notNull(),
	Code: longtext().notNull(),
	Description: longtext().notNull(),
	IsRemoved: tinyint().notNull(),
},
(table) => {
	return {
		WorkflowRoles_Id: primaryKey({ columns: [table.Id], name: "WorkflowRoles_Id"}),
	}
});

export const WorkflowSettings = mysqlTable("WorkflowSettings", {
	Id: int().autoincrement().notNull(),
	WorkflowTypeId: binary({ length: 16 }).notNull().references(() => WorkflowTypes.Id, { onDelete: "cascade" } ),
	DocTypeId: binary({ length: 16 }).notNull().references(() => DocTypes.Id, { onDelete: "cascade" } ),
	DocumentDefaults: longtext(),
},
(table) => {
	return {
		IX_WorkflowSettings_DocTypeId: index("IX_WorkflowSettings_DocTypeId").on(table.DocTypeId),
		IX_WorkflowSettings_WorkflowTypeId: index("IX_WorkflowSettings_WorkflowTypeId").on(table.WorkflowTypeId),
		WorkflowSettings_Id: primaryKey({ columns: [table.Id], name: "WorkflowSettings_Id"}),
	}
});

export const WorkflowStatuses = mysqlTable("WorkflowStatuses", {
	Id: binary({ length: 16 }).notNull(),
	DocStatusesId: binary({ length: 16 }).references(() => DocStatuses.Id),
	ApiFunction: json(),
	WorkflowTypeId: binary({ length: 16 }).references(() => WorkflowTypes.Id),
	DocTypeId: binary({ length: 16 }).references(() => DocTypes.Id),
	OrderNumber: int(),
	ProcParams: json(),
	IsEnabled: tinyint(),
	IsRunAfterUpdate: tinyint(),
	ModuleName: longtext(),
},
(table) => {
	return {
		IX_WorkflowStatuses_DocStatusesId: index("IX_WorkflowStatuses_DocStatusesId").on(table.DocStatusesId),
		IX_WorkflowStatuses_DocTypeId: index("IX_WorkflowStatuses_DocTypeId").on(table.DocTypeId),
		IX_WorkflowStatuses_WorkflowTypeId: index("IX_WorkflowStatuses_WorkflowTypeId").on(table.WorkflowTypeId),
		WorkflowStatuses_Id: primaryKey({ columns: [table.Id], name: "WorkflowStatuses_Id"}),
	}
});

export const WorkflowTypes = mysqlTable("WorkflowTypes", {
	Id: binary({ length: 16 }).notNull(),
	Code: longtext().notNull(),
	Description: longtext().notNull(),
	IsRemoved: tinyint().default(0).notNull(),
	DefaultTemplateId: binary({ length: 16 }),
	DocTypeId: binary({ length: 16 }).references((): AnyMySqlColumn => DocTypes.Id),
},
(table) => {
	return {
		IX_WorkflowTypes_DocTypeId: index("IX_WorkflowTypes_DocTypeId").on(table.DocTypeId),
		WorkflowTypes_Id: primaryKey({ columns: [table.Id], name: "WorkflowTypes_Id"}),
	}
});

export const __EFMigrationsHistory = mysqlTable("__EFMigrationsHistory", {
	MigrationId: varchar({ length: 95 }).notNull(),
	ProductVersion: varchar({ length: 32 }).notNull(),
});

export const __EFMigrationsHistoryOldNet7 = mysqlTable("__EFMigrationsHistoryOldNet7", {
	MigrationId: varchar({ length: 95 }).notNull(),
	ProductVersion: varchar({ length: 32 }).notNull(),
},
(table) => {
	return {
		__EFMigrationsHistoryOldNet7_MigrationId: primaryKey({ columns: [table.MigrationId], name: "__EFMigrationsHistoryOldNet7_MigrationId"}),
	}
});
export const DocNumbersView = mysqlView("DocNumbersView", {
	OrgUnitDescription: longtext(),
	Id: int().default(0).notNull(),
	OrgUnitId: int().notNull(),
	DocTypeId: binary({ length: 16 }).notNull(),
	WorkflowTypeId: binary({ length: 16 }).notNull(),
	DocNumber: int().notNull(),
	DocPrefix: longtext(),
	DocSuffix: longtext(),
	IsRemoved: tinyint().default(0).notNull(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`ou\`.\`Description\` AS \`OrgUnitDescription\`,\`ms\`.\`Id\` AS \`Id\`,\`ms\`.\`OrgUnitId\` AS \`OrgUnitId\`,\`ms\`.\`DocTypeId\` AS \`DocTypeId\`,\`ms\`.\`WorkflowTypeId\` AS \`WorkflowTypeId\`,\`ms\`.\`DocNumber\` AS \`DocNumber\`,\`ms\`.\`DocPrefix\` AS \`DocPrefix\`,\`ms\`.\`DocSuffix\` AS \`DocSuffix\`,\`ms\`.\`IsRemoved\` AS \`IsRemoved\` from (\`docworkflow\`.\`DocNumbers\` \`ms\` left join \`hr\`.\`OrgUnits\` \`ou\` on((\`ms\`.\`OrgUnitId\` = \`ou\`.\`Id\`)))`);

export const DocSettingsView = mysqlView("DocSettingsView", {
	OrgUnitDescription: longtext(),
	Id: int().default(0).notNull(),
	OrgUnitId: int().notNull(),
	DocTypeId: binary({ length: 16 }).notNull(),
	WorkflowTypeId: binary({ length: 16 }).notNull(),
	FieldsToCopy: longtext(),
	FieldsToTemplate: longtext(),
	StatusesForDelete: longtext(),
	UserInterface: longtext(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`ou\`.\`Description\` AS \`OrgUnitDescription\`,\`ms\`.\`Id\` AS \`Id\`,\`ms\`.\`OrgUnitId\` AS \`OrgUnitId\`,\`ms\`.\`DocTypeId\` AS \`DocTypeId\`,\`ms\`.\`WorkflowTypeId\` AS \`WorkflowTypeId\`,\`ms\`.\`FieldsToCopy\` AS \`FieldsToCopy\`,\`ms\`.\`FieldsToTemplate\` AS \`FieldsToTemplate\`,\`ms\`.\`StatusesForDelete\` AS \`StatusesForDelete\`,\`ms\`.\`UserInterface\` AS \`UserInterface\` from (\`docworkflow\`.\`DocSettings\` \`ms\` left join \`hr\`.\`OrgUnits\` \`ou\` on((\`ms\`.\`OrgUnitId\` = \`ou\`.\`Id\`)))`);

export const OrderDocumentTestView = mysqlView("OrderDocumentTestView", {
	WorkIssuerUserName: varchar({ length: 256 }),
	WorkResponsibleUserName: varchar({ length: 256 }),
	AssetName: longtext(),
	AssetClassDescription: longtext(),
	LocationDescription: longtext(),
	WorkTeamName: varchar({ length: 256 }),
	Id: binary({ length: 16 }).notNull(),
	DocBody: json(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	DocDate: datetime({ mode: 'string', fsp: 6 }).default('0001-01-01 00:00:00.000000').notNull(),
	DocNumber: longtext(),
	DocStatusesId: binary({ length: 16 }),
	DocTypesId: binary({ length: 16 }).notNull(),
	WorkflowTypesId: binary({ length: 16 }).notNull(),
	WorkIssuerUserId: int().default(0).notNull(),
	WorkResponsibleUserId: int(),
	FinishedFinishOn: datetime({ mode: 'string', fsp: 6 }),
	FinishedStartOn: datetime({ mode: 'string', fsp: 6 }),
	ScheduledFinishOn: datetime({ mode: 'string', fsp: 6 }),
	ScheduledStartOn: datetime({ mode: 'string', fsp: 6 }),
	OrgUnitId: int(),
	AssetClassId: binary({ length: 16 }),
	AssetId: binary({ length: 16 }),
	DocumentMode: longtext(),
	JobId: binary({ length: 16 }),
	ExternalDocId: binary({ length: 16 }),
	LocationId: int(),
	ScheduledDuration: double(),
	Description: longtext(),
	WorkTeamId: int(),
	DocNumberWithDescription: longtext(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`l\`.\`FullName\` AS \`WorkIssuerUserName\`,\`r\`.\`FullName\` AS \`WorkResponsibleUserName\`,\`a\`.\`Name\` AS \`AssetName\`,\`ac\`.\`Description\` AS \`AssetClassDescription\`,\`lc\`.\`Description\` AS \`LocationDescription\`,\`wt\`.\`Name\` AS \`WorkTeamName\`,\`tr\`.\`Id\` AS \`Id\`,\`tr\`.\`DocBody\` AS \`DocBody\`,\`tr\`.\`IsRemoved\` AS \`IsRemoved\`,\`tr\`.\`CreatedById\` AS \`CreatedById\`,\`tr\`.\`Created\` AS \`Created\`,\`tr\`.\`UpdatedById\` AS \`UpdatedById\`,\`tr\`.\`Updated\` AS \`Updated\`,\`tr\`.\`DocDate\` AS \`DocDate\`,\`tr\`.\`DocNumber\` AS \`DocNumber\`,\`tr\`.\`DocStatusesId\` AS \`DocStatusesId\`,\`tr\`.\`DocTypesId\` AS \`DocTypesId\`,\`tr\`.\`WorkflowTypesId\` AS \`WorkflowTypesId\`,\`tr\`.\`WorkIssuerUserId\` AS \`WorkIssuerUserId\`,\`tr\`.\`WorkResponsibleUserId\` AS \`WorkResponsibleUserId\`,\`tr\`.\`FinishedFinishOn\` AS \`FinishedFinishOn\`,\`tr\`.\`FinishedStartOn\` AS \`FinishedStartOn\`,\`tr\`.\`ScheduledFinishOn\` AS \`ScheduledFinishOn\`,\`tr\`.\`ScheduledStartOn\` AS \`ScheduledStartOn\`,\`tr\`.\`OrgUnitId\` AS \`OrgUnitId\`,\`tr\`.\`AssetClassId\` AS \`AssetClassId\`,\`tr\`.\`AssetId\` AS \`AssetId\`,\`tr\`.\`DocumentMode\` AS \`DocumentMode\`,\`tr\`.\`JobId\` AS \`JobId\`,\`tr\`.\`ExternalDocId\` AS \`ExternalDocId\`,\`tr\`.\`LocationId\` AS \`LocationId\`,\`tr\`.\`ScheduledDuration\` AS \`ScheduledDuration\`,\`tr\`.\`Description\` AS \`Description\`,\`tr\`.\`WorkTeamId\` AS \`WorkTeamId\`,(case when (coalesce(\`tr\`.\`Description\`,'') = '') then \`tr\`.\`DocNumber\` else concat(\`tr\`.\`DocNumber\`,' (',\`tr\`.\`Description\`,')') end) AS \`DocNumberWithDescription\` from ((((((\`docworkflow\`.\`OrderDocuments\` \`tr\` left join \`hr\`.\`Users\` \`l\` on((\`tr\`.\`WorkIssuerUserId\` = \`l\`.\`Id\`))) left join \`hr\`.\`Users\` \`r\` on((\`tr\`.\`WorkResponsibleUserId\` = \`r\`.\`Id\`))) left join \`inventory\`.\`Assets\` \`a\` on((\`tr\`.\`AssetId\` = \`a\`.\`Id\`))) left join \`inventory\`.\`AssetClasses\` \`ac\` on((\`tr\`.\`AssetClassId\` = \`ac\`.\`Id\`))) left join \`hr\`.\`WorkTeams\` \`wt\` on((\`tr\`.\`WorkTeamId\` = \`wt\`.\`Id\`))) left join \`hr\`.\`Locations\` \`lc\` on((\`tr\`.\`LocationId\` = \`lc\`.\`Id\`))) where (\`tr\`.\`IsRemoved\` = 0)`);

export const OrderDocumentView = mysqlView("OrderDocumentView", {
	WorkIssuerUserName: varchar({ length: 256 }),
	WorkResponsibleUserName: varchar({ length: 256 }),
	AssetName: longtext(),
	AssetClassDescription: longtext(),
	LocationDescription: longtext(),
	OrgUnitDescription: longtext(),
	WorkTeamName: varchar({ length: 256 }),
	Id: binary({ length: 16 }).notNull(),
	DocBody: json(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	DocDate: datetime({ mode: 'string', fsp: 6 }).default('0001-01-01 00:00:00.000000').notNull(),
	DocNumber: longtext(),
	DocStatusesId: binary({ length: 16 }),
	DocTypesId: binary({ length: 16 }).notNull(),
	WorkflowTypesId: binary({ length: 16 }).notNull(),
	WorkIssuerUserId: int().default(0).notNull(),
	WorkResponsibleUserId: int(),
	FinishedFinishOn: datetime({ mode: 'string', fsp: 6 }),
	FinishedStartOn: datetime({ mode: 'string', fsp: 6 }),
	ScheduledFinishOn: datetime({ mode: 'string', fsp: 6 }),
	ScheduledStartOn: datetime({ mode: 'string', fsp: 6 }),
	OrgUnitId: int(),
	AssetClassId: binary({ length: 16 }),
	AssetId: binary({ length: 16 }),
	DocumentMode: longtext(),
	JobId: binary({ length: 16 }),
	ExternalDocId: binary({ length: 16 }),
	LocationId: int(),
	ScheduledDuration: double(),
	Description: longtext(),
	WorkTeamId: int(),
	ExternalDocType: longtext(),
	DocNumberWithDescription: longtext(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`l\`.\`FullName\` AS \`WorkIssuerUserName\`,\`r\`.\`FullName\` AS \`WorkResponsibleUserName\`,\`a\`.\`Name\` AS \`AssetName\`,\`ac\`.\`Description\` AS \`AssetClassDescription\`,\`lc\`.\`Description\` AS \`LocationDescription\`,\`ou\`.\`Description\` AS \`OrgUnitDescription\`,\`wt\`.\`Name\` AS \`WorkTeamName\`,\`tr\`.\`Id\` AS \`Id\`,\`tr\`.\`DocBody\` AS \`DocBody\`,\`tr\`.\`IsRemoved\` AS \`IsRemoved\`,\`tr\`.\`CreatedById\` AS \`CreatedById\`,\`tr\`.\`Created\` AS \`Created\`,\`tr\`.\`UpdatedById\` AS \`UpdatedById\`,\`tr\`.\`Updated\` AS \`Updated\`,\`tr\`.\`DocDate\` AS \`DocDate\`,\`tr\`.\`DocNumber\` AS \`DocNumber\`,\`tr\`.\`DocStatusesId\` AS \`DocStatusesId\`,\`tr\`.\`DocTypesId\` AS \`DocTypesId\`,\`tr\`.\`WorkflowTypesId\` AS \`WorkflowTypesId\`,\`tr\`.\`WorkIssuerUserId\` AS \`WorkIssuerUserId\`,\`tr\`.\`WorkResponsibleUserId\` AS \`WorkResponsibleUserId\`,\`tr\`.\`FinishedFinishOn\` AS \`FinishedFinishOn\`,\`tr\`.\`FinishedStartOn\` AS \`FinishedStartOn\`,\`tr\`.\`ScheduledFinishOn\` AS \`ScheduledFinishOn\`,\`tr\`.\`ScheduledStartOn\` AS \`ScheduledStartOn\`,\`tr\`.\`OrgUnitId\` AS \`OrgUnitId\`,\`tr\`.\`AssetClassId\` AS \`AssetClassId\`,\`tr\`.\`AssetId\` AS \`AssetId\`,\`tr\`.\`DocumentMode\` AS \`DocumentMode\`,\`tr\`.\`JobId\` AS \`JobId\`,\`tr\`.\`ExternalDocId\` AS \`ExternalDocId\`,\`tr\`.\`LocationId\` AS \`LocationId\`,\`tr\`.\`ScheduledDuration\` AS \`ScheduledDuration\`,\`tr\`.\`Description\` AS \`Description\`,\`tr\`.\`WorkTeamId\` AS \`WorkTeamId\`,\`tr\`.\`ExternalDocType\` AS \`ExternalDocType\`,(case when (coalesce(\`tr\`.\`Description\`,'') = '') then \`tr\`.\`DocNumber\` else concat(\`tr\`.\`DocNumber\`,' (',\`tr\`.\`Description\`,')') end) AS \`DocNumberWithDescription\` from (((((((\`docworkflow\`.\`OrderDocuments\` \`tr\` left join \`hr\`.\`Users\` \`l\` on((\`tr\`.\`WorkIssuerUserId\` = \`l\`.\`Id\`))) left join \`hr\`.\`Users\` \`r\` on((\`tr\`.\`WorkResponsibleUserId\` = \`r\`.\`Id\`))) left join \`inventory\`.\`Assets\` \`a\` on((\`tr\`.\`AssetId\` = \`a\`.\`Id\`))) left join \`inventory\`.\`AssetClasses\` \`ac\` on((\`tr\`.\`AssetClassId\` = \`ac\`.\`Id\`))) left join \`hr\`.\`WorkTeams\` \`wt\` on((\`tr\`.\`WorkTeamId\` = \`wt\`.\`Id\`))) left join \`hr\`.\`Locations\` \`lc\` on((\`tr\`.\`LocationId\` = \`lc\`.\`Id\`))) left join \`hr\`.\`OrgUnits\` \`ou\` on((\`tr\`.\`OrgUnitId\` = \`ou\`.\`Id\`))) where (\`tr\`.\`IsRemoved\` = 0)`);

export const TypeOfWorkView = mysqlView("TypeOfWorkView", {
	AssetClassDescription: longtext(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`a\`.\`Description\` AS \`AssetClassDescription\` from (\`docworkflow\`.\`TypeOfWork\` \`st\` left join \`inventory\`.\`AssetClasses\` \`a\` on((\`st\`.\`AssetClassId\` = \`a\`.\`Id\`)))`);

export const VehicleTypeView = mysqlView("VehicleTypeView", {
	AssetClassDescription: longtext(),
	Id: int().default(0).notNull(),
	Description: longtext().notNull(),
	AssetClassId: binary({ length: 16 }),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`ac\`.\`Description\` AS \`AssetClassDescription\`,\`ms\`.\`Id\` AS \`Id\`,\`ms\`.\`Description\` AS \`Description\`,\`ms\`.\`AssetClassId\` AS \`AssetClassId\` from (\`tracking\`.\`VehicleTypes\` \`ms\` left join \`inventory\`.\`AssetClasses\` \`ac\` on((\`ms\`.\`AssetClassId\` = \`ac\`.\`Id\`)))`);