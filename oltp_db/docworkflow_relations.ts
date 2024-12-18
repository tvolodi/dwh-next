import { relations } from "drizzle-orm/relations";
import { DocStatuses, DocExecJournal, OrderDocuments, WorkflowTypes, DocExecLog, DocTypes, DocNumbers, DocSettings, DocComponentTypes, DocTypeComponents, HangfireJobsJob, HangfireJobsJobParameter, HangfireJobsJobState, HangfireJobsState, OrderDocumentFiles, WorkflowActions, WorkflowActionEmployees, WorkflowActionRoles, WorkflowReferences, WorkflowSettings, WorkflowStatuses } from "./schema";

export const DocExecJournalRelations = relations(DocExecJournal, ({one}) => ({
	DocStatus_NextStatusId: one(DocStatuses, {
		fields: [DocExecJournal.NextStatusId],
		references: [DocStatuses.Id],
		relationName: "DocExecJournal_NextStatusId_DocStatuses_Id"
	}),
	DocStatus_PreviousStatusId: one(DocStatuses, {
		fields: [DocExecJournal.PreviousStatusId],
		references: [DocStatuses.Id],
		relationName: "DocExecJournal_PreviousStatusId_DocStatuses_Id"
	}),
	OrderDocument: one(OrderDocuments, {
		fields: [DocExecJournal.OrderDocumentId],
		references: [OrderDocuments.Id]
	}),
	WorkflowType: one(WorkflowTypes, {
		fields: [DocExecJournal.WorkflowTypesId],
		references: [WorkflowTypes.Id]
	}),
}));

export const DocStatusesRelations = relations(DocStatuses, ({many}) => ({
	DocExecJournals_NextStatusId: many(DocExecJournal, {
		relationName: "DocExecJournal_NextStatusId_DocStatuses_Id"
	}),
	DocExecJournals_PreviousStatusId: many(DocExecJournal, {
		relationName: "DocExecJournal_PreviousStatusId_DocStatuses_Id"
	}),
	DocExecLogs_CurrentStatusId: many(DocExecLog, {
		relationName: "DocExecLog_CurrentStatusId_DocStatuses_Id"
	}),
	DocExecLogs_PreviousStatusId: many(DocExecLog, {
		relationName: "DocExecLog_PreviousStatusId_DocStatuses_Id"
	}),
	OrderDocuments: many(OrderDocuments),
	WorkflowActions_CurrentStatusId: many(WorkflowActions, {
		relationName: "WorkflowActions_CurrentStatusId_DocStatuses_Id"
	}),
	WorkflowActions_NextStatusId: many(WorkflowActions, {
		relationName: "WorkflowActions_NextStatusId_DocStatuses_Id"
	}),
	WorkflowStatuses: many(WorkflowStatuses),
}));

export const OrderDocumentsRelations = relations(OrderDocuments, ({one, many}) => ({
	DocExecJournals: many(DocExecJournal),
	OrderDocumentFiles: many(OrderDocumentFiles),
	DocStatus: one(DocStatuses, {
		fields: [OrderDocuments.DocStatusesId],
		references: [DocStatuses.Id]
	}),
	DocType: one(DocTypes, {
		fields: [OrderDocuments.DocTypesId],
		references: [DocTypes.Id]
	}),
	WorkflowType: one(WorkflowTypes, {
		fields: [OrderDocuments.WorkflowTypesId],
		references: [WorkflowTypes.Id]
	}),
}));

export const WorkflowTypesRelations = relations(WorkflowTypes, ({one, many}) => ({
	DocExecJournals: many(DocExecJournal),
	DocNumbers: many(DocNumbers),
	DocSettings: many(DocSettings),
	DocTypes: many(DocTypes, {
		relationName: "DocTypes_DefaultWorkflowId_WorkflowTypes_Id"
	}),
	OrderDocuments: many(OrderDocuments),
	WorkflowActions: many(WorkflowActions),
	WorkflowReferences: many(WorkflowReferences),
	WorkflowSettings: many(WorkflowSettings),
	WorkflowStatuses: many(WorkflowStatuses),
	DocType: one(DocTypes, {
		fields: [WorkflowTypes.DocTypeId],
		references: [DocTypes.Id],
		relationName: "WorkflowTypes_DocTypeId_DocTypes_Id"
	}),
}));

export const DocExecLogRelations = relations(DocExecLog, ({one}) => ({
	DocStatus_CurrentStatusId: one(DocStatuses, {
		fields: [DocExecLog.CurrentStatusId],
		references: [DocStatuses.Id],
		relationName: "DocExecLog_CurrentStatusId_DocStatuses_Id"
	}),
	DocStatus_PreviousStatusId: one(DocStatuses, {
		fields: [DocExecLog.PreviousStatusId],
		references: [DocStatuses.Id],
		relationName: "DocExecLog_PreviousStatusId_DocStatuses_Id"
	}),
}));

export const DocNumbersRelations = relations(DocNumbers, ({one}) => ({
	DocType: one(DocTypes, {
		fields: [DocNumbers.DocTypeId],
		references: [DocTypes.Id]
	}),
	WorkflowType: one(WorkflowTypes, {
		fields: [DocNumbers.WorkflowTypeId],
		references: [WorkflowTypes.Id]
	}),
}));

export const DocTypesRelations = relations(DocTypes, ({one, many}) => ({
	DocNumbers: many(DocNumbers),
	DocSettings: many(DocSettings),
	DocTypeComponents: many(DocTypeComponents),
	WorkflowType: one(WorkflowTypes, {
		fields: [DocTypes.DefaultWorkflowId],
		references: [WorkflowTypes.Id],
		relationName: "DocTypes_DefaultWorkflowId_WorkflowTypes_Id"
	}),
	OrderDocuments: many(OrderDocuments),
	WorkflowSettings: many(WorkflowSettings),
	WorkflowStatuses: many(WorkflowStatuses),
	WorkflowTypes: many(WorkflowTypes, {
		relationName: "WorkflowTypes_DocTypeId_DocTypes_Id"
	}),
}));

export const DocSettingsRelations = relations(DocSettings, ({one}) => ({
	DocType: one(DocTypes, {
		fields: [DocSettings.DocTypeId],
		references: [DocTypes.Id]
	}),
	WorkflowType: one(WorkflowTypes, {
		fields: [DocSettings.WorkflowTypeId],
		references: [WorkflowTypes.Id]
	}),
}));

export const DocTypeComponentsRelations = relations(DocTypeComponents, ({one}) => ({
	DocComponentType: one(DocComponentTypes, {
		fields: [DocTypeComponents.DocComponentTypeId],
		references: [DocComponentTypes.Id]
	}),
	DocType: one(DocTypes, {
		fields: [DocTypeComponents.DocTypesId],
		references: [DocTypes.Id]
	}),
}));

export const DocComponentTypesRelations = relations(DocComponentTypes, ({many}) => ({
	DocTypeComponents: many(DocTypeComponents),
}));

export const HangfireJobsJobParameterRelations = relations(HangfireJobsJobParameter, ({one}) => ({
	HangfireJobsJob: one(HangfireJobsJob, {
		fields: [HangfireJobsJobParameter.JobId],
		references: [HangfireJobsJob.Id]
	}),
}));

export const HangfireJobsJobRelations = relations(HangfireJobsJob, ({many}) => ({
	HangfireJobsJobParameters: many(HangfireJobsJobParameter),
	HangfireJobsJobStates: many(HangfireJobsJobState),
	HangfireJobsStates: many(HangfireJobsState),
}));

export const HangfireJobsJobStateRelations = relations(HangfireJobsJobState, ({one}) => ({
	HangfireJobsJob: one(HangfireJobsJob, {
		fields: [HangfireJobsJobState.JobId],
		references: [HangfireJobsJob.Id]
	}),
}));

export const HangfireJobsStateRelations = relations(HangfireJobsState, ({one}) => ({
	HangfireJobsJob: one(HangfireJobsJob, {
		fields: [HangfireJobsState.JobId],
		references: [HangfireJobsJob.Id]
	}),
}));

export const OrderDocumentFilesRelations = relations(OrderDocumentFiles, ({one}) => ({
	OrderDocument: one(OrderDocuments, {
		fields: [OrderDocumentFiles.OrderDocumentId],
		references: [OrderDocuments.Id]
	}),
}));

export const WorkflowActionEmployeesRelations = relations(WorkflowActionEmployees, ({one}) => ({
	WorkflowAction: one(WorkflowActions, {
		fields: [WorkflowActionEmployees.WorkflowActionsId],
		references: [WorkflowActions.Id]
	}),
}));

export const WorkflowActionsRelations = relations(WorkflowActions, ({one, many}) => ({
	WorkflowActionEmployees: many(WorkflowActionEmployees),
	WorkflowActionRoles: many(WorkflowActionRoles),
	DocStatus_CurrentStatusId: one(DocStatuses, {
		fields: [WorkflowActions.CurrentStatusId],
		references: [DocStatuses.Id],
		relationName: "WorkflowActions_CurrentStatusId_DocStatuses_Id"
	}),
	DocStatus_NextStatusId: one(DocStatuses, {
		fields: [WorkflowActions.NextStatusId],
		references: [DocStatuses.Id],
		relationName: "WorkflowActions_NextStatusId_DocStatuses_Id"
	}),
	WorkflowType: one(WorkflowTypes, {
		fields: [WorkflowActions.WorkflowTypesId],
		references: [WorkflowTypes.Id]
	}),
}));

export const WorkflowActionRolesRelations = relations(WorkflowActionRoles, ({one}) => ({
	WorkflowAction: one(WorkflowActions, {
		fields: [WorkflowActionRoles.WorkflowActionsId],
		references: [WorkflowActions.Id]
	}),
}));

export const WorkflowReferencesRelations = relations(WorkflowReferences, ({one}) => ({
	WorkflowType: one(WorkflowTypes, {
		fields: [WorkflowReferences.WorkflowTypesId],
		references: [WorkflowTypes.Id]
	}),
}));

export const WorkflowSettingsRelations = relations(WorkflowSettings, ({one}) => ({
	DocType: one(DocTypes, {
		fields: [WorkflowSettings.DocTypeId],
		references: [DocTypes.Id]
	}),
	WorkflowType: one(WorkflowTypes, {
		fields: [WorkflowSettings.WorkflowTypeId],
		references: [WorkflowTypes.Id]
	}),
}));

export const WorkflowStatusesRelations = relations(WorkflowStatuses, ({one}) => ({
	DocStatus: one(DocStatuses, {
		fields: [WorkflowStatuses.DocStatusesId],
		references: [DocStatuses.Id]
	}),
	DocType: one(DocTypes, {
		fields: [WorkflowStatuses.DocTypeId],
		references: [DocTypes.Id]
	}),
	WorkflowType: one(WorkflowTypes, {
		fields: [WorkflowStatuses.WorkflowTypeId],
		references: [WorkflowTypes.Id]
	}),
}));