import { relations } from "drizzle-orm/relations";
import { Tasks, Attachments, CheckLists, CheckListItems, CheckListResults, EntityReadings, CurrentEntityReadings, TypesOfMaintenance, DefectListTemplates, Documents, DocumentVersions, DocumentTypes, ProdStatReadings, EntityProdStatReadings, ReadingTypes, EntityReadingStandards, EqClassReadingsTypes, EqDefectTypes, EqDefectsJournals, MaintRequestRegistries, EqInspectionResult, EqMaintJournal, ScheduledWorks, EqMaintReadings, EqReadingsStandards, EqRepairJournal, EqRepairJournalWork, EquipmentDocumentation, EquipmentNotes, InstructionFiles, InstructionItems, Instructions, InstructionTypes, InventoryListTemplates, JobDescriptions, Jobs, JobRoutes, FrequencyUnits, JobStatuses, JobTypes, Priorities, MaintenanceAssets, MaintenanceSchedules, MaintenanceSchedulesStatus, PermitToWorks, ProdStatRegistries, ProdUnitStatRegistries, Regulations, RegulationsAssets, SysConfig, TaskStates, UnitProdStatReadings, UsedInventoryJournals } from "./schema";

export const AttachmentsRelations = relations(Attachments, ({one}) => ({
	Task: one(Tasks, {
		fields: [Attachments.TaskId],
		references: [Tasks.Id]
	}),
}));

export const TasksRelations = relations(Tasks, ({one, many}) => ({
	Attachments: many(Attachments),
	CheckListResults: many(CheckListResults),
	EquipmentNotes: many(EquipmentNotes),
	TaskStates: many(TaskStates),
	CheckList: one(CheckLists, {
		fields: [Tasks.CheckListId],
		references: [CheckLists.Id]
	}),
	Job: one(Jobs, {
		fields: [Tasks.JobId],
		references: [Jobs.Id]
	}),
	UsedInventoryJournals: many(UsedInventoryJournals),
}));

export const CheckListItemsRelations = relations(CheckListItems, ({one, many}) => ({
	CheckList: one(CheckLists, {
		fields: [CheckListItems.CheckListId],
		references: [CheckLists.Id]
	}),
	CheckListResults: many(CheckListResults),
}));

export const CheckListsRelations = relations(CheckLists, ({many}) => ({
	CheckListItems: many(CheckListItems),
	Tasks: many(Tasks),
}));

export const CheckListResultsRelations = relations(CheckListResults, ({one}) => ({
	CheckListItem: one(CheckListItems, {
		fields: [CheckListResults.CheckListItemId],
		references: [CheckListItems.Id]
	}),
	Task: one(Tasks, {
		fields: [CheckListResults.TaskId],
		references: [Tasks.Id]
	}),
}));

export const CurrentEntityReadingsRelations = relations(CurrentEntityReadings, ({one}) => ({
	EntityReading: one(EntityReadings, {
		fields: [CurrentEntityReadings.EntityReadingId],
		references: [EntityReadings.Id]
	}),
}));

export const EntityReadingsRelations = relations(EntityReadings, ({one, many}) => ({
	CurrentEntityReadings: many(CurrentEntityReadings),
	ReadingType: one(ReadingTypes, {
		fields: [EntityReadings.ReadingTypeId],
		references: [ReadingTypes.Id]
	}),
	MaintRequestRegistries: many(MaintRequestRegistries),
	RegulationsAssets: many(RegulationsAssets),
}));

export const DefectListTemplatesRelations = relations(DefectListTemplates, ({one}) => ({
	TypesOfMaintenance: one(TypesOfMaintenance, {
		fields: [DefectListTemplates.TypeOfMaintenanceId],
		references: [TypesOfMaintenance.Id]
	}),
}));

export const TypesOfMaintenanceRelations = relations(TypesOfMaintenance, ({one, many}) => ({
	DefectListTemplates: many(DefectListTemplates),
	EqMaintJournals: many(EqMaintJournal),
	EqMaintReadings: many(EqMaintReadings),
	InventoryListTemplates: many(InventoryListTemplates),
	Jobs: many(Jobs),
	MaintRequestRegistries: many(MaintRequestRegistries),
	MaintenanceAssets: many(MaintenanceAssets),
	MaintenanceSchedules: many(MaintenanceSchedules),
	Regulations: many(Regulations),
	ScheduledWorks: many(ScheduledWorks),
	EqReadingsStandard: one(EqReadingsStandards, {
		fields: [TypesOfMaintenance.EqReadingsStandardId],
		references: [EqReadingsStandards.Id]
	}),
}));

export const DocumentVersionsRelations = relations(DocumentVersions, ({one}) => ({
	Document: one(Documents, {
		fields: [DocumentVersions.DocumentId],
		references: [Documents.Id]
	}),
}));

export const DocumentsRelations = relations(Documents, ({one, many}) => ({
	DocumentVersions: many(DocumentVersions),
	DocumentType: one(DocumentTypes, {
		fields: [Documents.DocumentTypeId],
		references: [DocumentTypes.Id]
	}),
	EquipmentDocumentations: many(EquipmentDocumentation),
	JobDescriptions: many(JobDescriptions),
}));

export const DocumentTypesRelations = relations(DocumentTypes, ({many}) => ({
	Documents: many(Documents),
}));

export const EntityProdStatReadingsRelations = relations(EntityProdStatReadings, ({one}) => ({
	ProdStatReading: one(ProdStatReadings, {
		fields: [EntityProdStatReadings.ProdStatReadingId],
		references: [ProdStatReadings.Id]
	}),
}));

export const ProdStatReadingsRelations = relations(ProdStatReadings, ({many}) => ({
	EntityProdStatReadings: many(EntityProdStatReadings),
	ProdStatRegistries: many(ProdStatRegistries),
	ProdUnitStatRegistries: many(ProdUnitStatRegistries),
	UnitProdStatReadings: many(UnitProdStatReadings),
}));

export const EntityReadingStandardsRelations = relations(EntityReadingStandards, ({one}) => ({
	ReadingType: one(ReadingTypes, {
		fields: [EntityReadingStandards.ReadingTypeId],
		references: [ReadingTypes.Id]
	}),
}));

export const ReadingTypesRelations = relations(ReadingTypes, ({many}) => ({
	EntityReadingStandards: many(EntityReadingStandards),
	EntityReadings: many(EntityReadings),
	EqClassReadingsTypes: many(EqClassReadingsTypes),
	EqMaintJournals: many(EqMaintJournal),
	EqMaintReadings: many(EqMaintReadings),
	EqReadingsStandards: many(EqReadingsStandards),
	MaintRequestRegistries: many(MaintRequestRegistries),
	Regulations: many(Regulations),
	ScheduledWorks: many(ScheduledWorks),
}));

export const EqClassReadingsTypesRelations = relations(EqClassReadingsTypes, ({one}) => ({
	ReadingType: one(ReadingTypes, {
		fields: [EqClassReadingsTypes.ReadingTypeId],
		references: [ReadingTypes.Id]
	}),
}));

export const EqDefectsJournalsRelations = relations(EqDefectsJournals, ({one, many}) => ({
	EqDefectType: one(EqDefectTypes, {
		fields: [EqDefectsJournals.EqDefectTypeId],
		references: [EqDefectTypes.Id]
	}),
	MaintRequestRegistry: one(MaintRequestRegistries, {
		fields: [EqDefectsJournals.MaintRequestRegistryId],
		references: [MaintRequestRegistries.Id]
	}),
	EqInspectionResults: many(EqInspectionResult),
}));

export const EqDefectTypesRelations = relations(EqDefectTypes, ({many}) => ({
	EqDefectsJournals: many(EqDefectsJournals),
	EqInspectionResults: many(EqInspectionResult),
}));

export const MaintRequestRegistriesRelations = relations(MaintRequestRegistries, ({one, many}) => ({
	EqDefectsJournals: many(EqDefectsJournals),
	EqMaintJournals: many(EqMaintJournal),
	EntityReading: one(EntityReadings, {
		fields: [MaintRequestRegistries.EntityReadingId],
		references: [EntityReadings.Id]
	}),
	ReadingType: one(ReadingTypes, {
		fields: [MaintRequestRegistries.ReadingTypeId],
		references: [ReadingTypes.Id]
	}),
	ScheduledWork: one(ScheduledWorks, {
		fields: [MaintRequestRegistries.ScheduledWorkId],
		references: [ScheduledWorks.Id]
	}),
	TypesOfMaintenance: one(TypesOfMaintenance, {
		fields: [MaintRequestRegistries.TypeOfMaintenanceId],
		references: [TypesOfMaintenance.Id]
	}),
}));

export const EqInspectionResultRelations = relations(EqInspectionResult, ({one}) => ({
	EqDefectsJournal: one(EqDefectsJournals, {
		fields: [EqInspectionResult.EqDefectsJournalId],
		references: [EqDefectsJournals.Id]
	}),
	EqDefectType: one(EqDefectTypes, {
		fields: [EqInspectionResult.EqDefectTypeId],
		references: [EqDefectTypes.Id]
	}),
}));

export const EqMaintJournalRelations = relations(EqMaintJournal, ({one, many}) => ({
	MaintRequestRegistry: one(MaintRequestRegistries, {
		fields: [EqMaintJournal.MaintRequestRegistryId],
		references: [MaintRequestRegistries.Id]
	}),
	ReadingType: one(ReadingTypes, {
		fields: [EqMaintJournal.ReadingTypeId],
		references: [ReadingTypes.Id]
	}),
	ScheduledWork: one(ScheduledWorks, {
		fields: [EqMaintJournal.ScheduledWorkId],
		references: [ScheduledWorks.Id]
	}),
	TypesOfMaintenance: one(TypesOfMaintenance, {
		fields: [EqMaintJournal.TypeOfMaintenanceId],
		references: [TypesOfMaintenance.Id]
	}),
	EqMaintReadings: many(EqMaintReadings),
}));

export const ScheduledWorksRelations = relations(ScheduledWorks, ({one, many}) => ({
	EqMaintJournals: many(EqMaintJournal),
	Jobs: many(Jobs),
	MaintRequestRegistries: many(MaintRequestRegistries),
	MaintenanceSchedules: many(MaintenanceSchedules),
	ReadingType: one(ReadingTypes, {
		fields: [ScheduledWorks.ReadingTypeId],
		references: [ReadingTypes.Id]
	}),
	TypesOfMaintenance: one(TypesOfMaintenance, {
		fields: [ScheduledWorks.TypeOfMaintenanceId],
		references: [TypesOfMaintenance.Id]
	}),
}));

export const EqMaintReadingsRelations = relations(EqMaintReadings, ({one}) => ({
	EqMaintJournal: one(EqMaintJournal, {
		fields: [EqMaintReadings.EqMaintJournalId],
		references: [EqMaintJournal.Id]
	}),
	ReadingType: one(ReadingTypes, {
		fields: [EqMaintReadings.ReadingTypeId],
		references: [ReadingTypes.Id]
	}),
	TypesOfMaintenance: one(TypesOfMaintenance, {
		fields: [EqMaintReadings.TypeOfMaintenanceId],
		references: [TypesOfMaintenance.Id]
	}),
}));

export const EqReadingsStandardsRelations = relations(EqReadingsStandards, ({one, many}) => ({
	ReadingType: one(ReadingTypes, {
		fields: [EqReadingsStandards.ReadingTypeId],
		references: [ReadingTypes.Id]
	}),
	TypesOfMaintenances: many(TypesOfMaintenance),
}));

export const EqRepairJournalWorkRelations = relations(EqRepairJournalWork, ({one}) => ({
	EqRepairJournal: one(EqRepairJournal, {
		fields: [EqRepairJournalWork.EqRepairJournalId],
		references: [EqRepairJournal.Id]
	}),
}));

export const EqRepairJournalRelations = relations(EqRepairJournal, ({many}) => ({
	EqRepairJournalWorks: many(EqRepairJournalWork),
}));

export const EquipmentDocumentationRelations = relations(EquipmentDocumentation, ({one}) => ({
	Document: one(Documents, {
		fields: [EquipmentDocumentation.DocumentId],
		references: [Documents.Id]
	}),
}));

export const EquipmentNotesRelations = relations(EquipmentNotes, ({one}) => ({
	Task: one(Tasks, {
		fields: [EquipmentNotes.TaskId],
		references: [Tasks.Id]
	}),
}));

export const InstructionItemsRelations = relations(InstructionItems, ({one}) => ({
	InstructionFile_ShiftTraineeSignId: one(InstructionFiles, {
		fields: [InstructionItems.ShiftTraineeSignId],
		references: [InstructionFiles.Id],
		relationName: "InstructionItems_ShiftTraineeSignId_InstructionFiles_Id"
	}),
	InstructionFile_TraineePhotoId: one(InstructionFiles, {
		fields: [InstructionItems.TraineePhotoId],
		references: [InstructionFiles.Id],
		relationName: "InstructionItems_TraineePhotoId_InstructionFiles_Id"
	}),
	InstructionFile_TraineeSignId: one(InstructionFiles, {
		fields: [InstructionItems.TraineeSignId],
		references: [InstructionFiles.Id],
		relationName: "InstructionItems_TraineeSignId_InstructionFiles_Id"
	}),
	Instruction: one(Instructions, {
		fields: [InstructionItems.InstructionId],
		references: [Instructions.Id]
	}),
}));

export const InstructionFilesRelations = relations(InstructionFiles, ({many}) => ({
	InstructionItems_ShiftTraineeSignId: many(InstructionItems, {
		relationName: "InstructionItems_ShiftTraineeSignId_InstructionFiles_Id"
	}),
	InstructionItems_TraineePhotoId: many(InstructionItems, {
		relationName: "InstructionItems_TraineePhotoId_InstructionFiles_Id"
	}),
	InstructionItems_TraineeSignId: many(InstructionItems, {
		relationName: "InstructionItems_TraineeSignId_InstructionFiles_Id"
	}),
	Instructions_InstructorSignId: many(Instructions, {
		relationName: "Instructions_InstructorSignId_InstructionFiles_Id"
	}),
	Instructions_ShiftInstructorSignId: many(Instructions, {
		relationName: "Instructions_ShiftInstructorSignId_InstructionFiles_Id"
	}),
}));

export const InstructionsRelations = relations(Instructions, ({one, many}) => ({
	InstructionItems: many(InstructionItems),
	InstructionFile_InstructorSignId: one(InstructionFiles, {
		fields: [Instructions.InstructorSignId],
		references: [InstructionFiles.Id],
		relationName: "Instructions_InstructorSignId_InstructionFiles_Id"
	}),
	InstructionFile_ShiftInstructorSignId: one(InstructionFiles, {
		fields: [Instructions.ShiftInstructorSignId],
		references: [InstructionFiles.Id],
		relationName: "Instructions_ShiftInstructorSignId_InstructionFiles_Id"
	}),
	InstructionType: one(InstructionTypes, {
		fields: [Instructions.TypeId],
		references: [InstructionTypes.Id]
	}),
}));

export const InstructionTypesRelations = relations(InstructionTypes, ({many}) => ({
	Instructions: many(Instructions),
}));

export const InventoryListTemplatesRelations = relations(InventoryListTemplates, ({one}) => ({
	TypesOfMaintenance: one(TypesOfMaintenance, {
		fields: [InventoryListTemplates.TypeOfMaintenanceId],
		references: [TypesOfMaintenance.Id]
	}),
}));

export const JobDescriptionsRelations = relations(JobDescriptions, ({one}) => ({
	Document: one(Documents, {
		fields: [JobDescriptions.DocumentId],
		references: [Documents.Id]
	}),
	Job: one(Jobs, {
		fields: [JobDescriptions.JobId],
		references: [Jobs.Id]
	}),
}));

export const JobsRelations = relations(Jobs, ({one, many}) => ({
	JobDescriptions: many(JobDescriptions),
	JobRoutes: many(JobRoutes),
	FrequencyUnit: one(FrequencyUnits, {
		fields: [Jobs.FrequencyUnitId],
		references: [FrequencyUnits.Id]
	}),
	JobStatus: one(JobStatuses, {
		fields: [Jobs.JobStatusId],
		references: [JobStatuses.Id]
	}),
	Job_BasedOnJobId: one(Jobs, {
		fields: [Jobs.BasedOnJobId],
		references: [Jobs.Id],
		relationName: "Jobs_BasedOnJobId_Jobs_Id"
	}),
	Jobs_BasedOnJobId: many(Jobs, {
		relationName: "Jobs_BasedOnJobId_Jobs_Id"
	}),
	Job_LastWorkOrderID: one(Jobs, {
		fields: [Jobs.LastWorkOrderID],
		references: [Jobs.Id],
		relationName: "Jobs_LastWorkOrderID_Jobs_Id"
	}),
	Jobs_LastWorkOrderID: many(Jobs, {
		relationName: "Jobs_LastWorkOrderID_Jobs_Id"
	}),
	Job_PlannedWorkOrderPMId: one(Jobs, {
		fields: [Jobs.PlannedWorkOrderPMId],
		references: [Jobs.Id],
		relationName: "Jobs_PlannedWorkOrderPMId_Jobs_Id"
	}),
	Jobs_PlannedWorkOrderPMId: many(Jobs, {
		relationName: "Jobs_PlannedWorkOrderPMId_Jobs_Id"
	}),
	JobType: one(JobTypes, {
		fields: [Jobs.JobTypeId],
		references: [JobTypes.Id]
	}),
	Priority: one(Priorities, {
		fields: [Jobs.PriorityId],
		references: [Priorities.Id]
	}),
	ScheduledWork: one(ScheduledWorks, {
		fields: [Jobs.ScheduledWorkId],
		references: [ScheduledWorks.Id]
	}),
	TypesOfMaintenance: one(TypesOfMaintenance, {
		fields: [Jobs.TypeOfMaintenanceId],
		references: [TypesOfMaintenance.Id]
	}),
	PermitToWorks: many(PermitToWorks),
	Regulations: many(Regulations),
	RegulationsAssets: many(RegulationsAssets),
	Tasks: many(Tasks),
}));

export const JobRoutesRelations = relations(JobRoutes, ({one}) => ({
	Job: one(Jobs, {
		fields: [JobRoutes.JobId],
		references: [Jobs.Id]
	}),
}));

export const FrequencyUnitsRelations = relations(FrequencyUnits, ({many}) => ({
	Jobs: many(Jobs),
}));

export const JobStatusesRelations = relations(JobStatuses, ({many}) => ({
	Jobs: many(Jobs),
}));

export const JobTypesRelations = relations(JobTypes, ({many}) => ({
	Jobs: many(Jobs),
}));

export const PrioritiesRelations = relations(Priorities, ({many}) => ({
	Jobs: many(Jobs),
}));

export const MaintenanceAssetsRelations = relations(MaintenanceAssets, ({one}) => ({
	TypesOfMaintenance: one(TypesOfMaintenance, {
		fields: [MaintenanceAssets.TypeOfMaintenanceId],
		references: [TypesOfMaintenance.Id]
	}),
}));

export const MaintenanceSchedulesRelations = relations(MaintenanceSchedules, ({one, many}) => ({
	ScheduledWork: one(ScheduledWorks, {
		fields: [MaintenanceSchedules.ScheduledWorkId],
		references: [ScheduledWorks.Id]
	}),
	TypesOfMaintenance: one(TypesOfMaintenance, {
		fields: [MaintenanceSchedules.TypeOfMaintenanceId],
		references: [TypesOfMaintenance.Id]
	}),
	MaintenanceSchedulesStatuses: many(MaintenanceSchedulesStatus),
}));

export const MaintenanceSchedulesStatusRelations = relations(MaintenanceSchedulesStatus, ({one}) => ({
	MaintenanceSchedule: one(MaintenanceSchedules, {
		fields: [MaintenanceSchedulesStatus.MaintenanceScheduleId],
		references: [MaintenanceSchedules.Id]
	}),
}));

export const PermitToWorksRelations = relations(PermitToWorks, ({one}) => ({
	Job: one(Jobs, {
		fields: [PermitToWorks.JobId],
		references: [Jobs.Id]
	}),
}));

export const ProdStatRegistriesRelations = relations(ProdStatRegistries, ({one}) => ({
	ProdStatReading: one(ProdStatReadings, {
		fields: [ProdStatRegistries.ProdStatReadingId],
		references: [ProdStatReadings.Id]
	}),
}));

export const ProdUnitStatRegistriesRelations = relations(ProdUnitStatRegistries, ({one}) => ({
	ProdStatReading: one(ProdStatReadings, {
		fields: [ProdUnitStatRegistries.ProdStatReadingId],
		references: [ProdStatReadings.Id]
	}),
}));

export const RegulationsRelations = relations(Regulations, ({one, many}) => ({
	Job: one(Jobs, {
		fields: [Regulations.BaseJobId],
		references: [Jobs.Id]
	}),
	ReadingType: one(ReadingTypes, {
		fields: [Regulations.ReadingTypeId],
		references: [ReadingTypes.Id]
	}),
	TypesOfMaintenance: one(TypesOfMaintenance, {
		fields: [Regulations.TypeOfMaintenanceId],
		references: [TypesOfMaintenance.Id]
	}),
	RegulationsAssets: many(RegulationsAssets),
}));

export const RegulationsAssetsRelations = relations(RegulationsAssets, ({one}) => ({
	EntityReading: one(EntityReadings, {
		fields: [RegulationsAssets.EntityReadingId],
		references: [EntityReadings.Id]
	}),
	Job: one(Jobs, {
		fields: [RegulationsAssets.WorkOrderId],
		references: [Jobs.Id]
	}),
	Regulation: one(Regulations, {
		fields: [RegulationsAssets.RegulationsId],
		references: [Regulations.Id]
	}),
}));

export const SysConfigRelations = relations(SysConfig, ({one, many}) => ({
	SysConfig: one(SysConfig, {
		fields: [SysConfig.ParentId],
		references: [SysConfig.Id],
		relationName: "SysConfig_ParentId_SysConfig_Id"
	}),
	SysConfigs: many(SysConfig, {
		relationName: "SysConfig_ParentId_SysConfig_Id"
	}),
}));

export const TaskStatesRelations = relations(TaskStates, ({one}) => ({
	Task: one(Tasks, {
		fields: [TaskStates.TaskId],
		references: [Tasks.Id]
	}),
}));

export const UnitProdStatReadingsRelations = relations(UnitProdStatReadings, ({one}) => ({
	ProdStatReading: one(ProdStatReadings, {
		fields: [UnitProdStatReadings.ProdStatReadingId],
		references: [ProdStatReadings.Id]
	}),
}));

export const UsedInventoryJournalsRelations = relations(UsedInventoryJournals, ({one}) => ({
	Task: one(Tasks, {
		fields: [UsedInventoryJournals.TaskId],
		references: [Tasks.Id]
	}),
}));