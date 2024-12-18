import { relations } from "drizzle-orm/relations";
import { AssetAttributes, AssetAttributeValues, Assets, AssetBalanceRegistries, AssetClassAttributes, AssetClasses, AssetCurrentBalanceRegistries, AssetFiles, AssetMovementRegistries, AssetMovementCountRegistries, MovementCountTypeConditions, AssetMovementDocuments, AssetMovementDocumentItems, WarehouseManagements, AssetProvisionDocumentItems, AssetProvisionDocuments, AssetTypes, AssetProvisionDocumentResponsibleUsers, AssetReceiptDocuments, AssetReceiptDocumentItems, AssetWriteOffDocumentItems, AssetWriteOffDocuments, AccountingTypes, AssetGroups, AssetStatuses, UnitsOfMeasure, CodeTypes, Codes, Containers, ContainerItemRegistries, ContainerItems, ContainerTypes, Companies, CustomerStockBalanceRegistries, StockAccountingGroups, CustomerStockCurrentBalanceRegistries, CustomerStockMovementRegistries, DocumentTypeStatuses, DocumentTypeStatusAccesses, DocumentStatuses, DocumentTypes, FileTypes, FileEntityTypes, HangfireJob, HangfireJobParameter, HangfireJobState, HangfireState, InventoryCommissionPositions, InventoryCommissionPeople, InventoryDocuments, StockInventoryDocuments, InventoryDocumentItems, InventoryDocumentItemFiles, InventoryFiles, MovementCountTypes, NomenclatureAttributes, NomenclatureAttributeValues, Nomenclatures, NomenclatureGroups, NomenclaturePeriodStandards, StockNomenclatureSetDocuments, PartnerContracts, RouteNodes, RouteNodeLinks, Routes, RouteProgresses, Shipments, StockReceiptDocuments, WarehouseMovementDocuments, StockBalanceRegistries, StockCurrentBalanceRegistries, StockInventoryDocumentItems, StockInventoryDocumentItemComponents, StockItems, StockItemBalanceRegistries, StockItemCurrentBalanceRegistries, StockItemMovementRegistries, ObjectStatuses, StockReceiptDocumentItemComponents, StockMovementDocumentItemComponents, StockMovementDocumentItems, StockMovementDocuments, ExternalDocumentTypes, StockMovementRegistries, StockNomenclatureSetDocumentItemComponents, StockNomenclatureSetDocumentItems, StockReceiptDocumentItems, StockUnwrapDocumentItemComponents, StockUnwrapDocumentItems, StockUnwrapDocuments, StockWriteoffDocumentItemComponents, StockWriteoffDocumentItems, StockWriteoffDocuments, SupplierStockBalanceRegistries, SupplierStockCurrentBalanceRegistries, SupplierStockMovementRegistries, TaskMaterialComponents, TaskMaterials, ProductTypes } from "./schema";

export const AssetAttributeValuesRelations = relations(AssetAttributeValues, ({one}) => ({
	AssetAttribute: one(AssetAttributes, {
		fields: [AssetAttributeValues.AssetAttributeId],
		references: [AssetAttributes.Id]
	}),
	Asset: one(Assets, {
		fields: [AssetAttributeValues.AssetId],
		references: [Assets.Id]
	}),
}));

export const AssetAttributesRelations = relations(AssetAttributes, ({many}) => ({
	AssetAttributeValues: many(AssetAttributeValues),
	AssetClassAttributes: many(AssetClassAttributes),
	MovementCountTypes: many(MovementCountTypes),
}));

export const AssetsRelations = relations(Assets, ({one, many}) => ({
	AssetAttributeValues: many(AssetAttributeValues),
	AssetBalanceRegistries: many(AssetBalanceRegistries),
	AssetCurrentBalanceRegistries: many(AssetCurrentBalanceRegistries),
	AssetFiles: many(AssetFiles),
	AssetMovementCountRegistries: many(AssetMovementCountRegistries),
	AssetMovementDocumentItems: many(AssetMovementDocumentItems),
	AssetMovementRegistries: many(AssetMovementRegistries),
	AssetReceiptDocumentItems: many(AssetReceiptDocumentItems),
	AssetWriteOffDocumentItems: many(AssetWriteOffDocumentItems),
	AccountingType: one(AccountingTypes, {
		fields: [Assets.AccountingTypeId],
		references: [AccountingTypes.Id]
	}),
	AssetClass: one(AssetClasses, {
		fields: [Assets.AssetClassId],
		references: [AssetClasses.Id]
	}),
	AssetGroup: one(AssetGroups, {
		fields: [Assets.AssetGroupId],
		references: [AssetGroups.Id]
	}),
	AssetStatus: one(AssetStatuses, {
		fields: [Assets.AssetStatusId],
		references: [AssetStatuses.Id]
	}),
	Asset: one(Assets, {
		fields: [Assets.ParentId],
		references: [Assets.Id],
		relationName: "Assets_ParentId_Assets_Id"
	}),
	Assets: many(Assets, {
		relationName: "Assets_ParentId_Assets_Id"
	}),
	AssetType: one(AssetTypes, {
		fields: [Assets.AssetTypeId],
		references: [AssetTypes.Id]
	}),
	UnitsOfMeasure: one(UnitsOfMeasure, {
		fields: [Assets.NormalWeightUnitOfMeasureId],
		references: [UnitsOfMeasure.Id]
	}),
	InventoryDocumentItems: many(InventoryDocumentItems),
	WarehouseMovementDocuments: many(WarehouseMovementDocuments),
}));

export const AssetBalanceRegistriesRelations = relations(AssetBalanceRegistries, ({one, many}) => ({
	Asset: one(Assets, {
		fields: [AssetBalanceRegistries.AssetId],
		references: [Assets.Id]
	}),
	AssetCurrentBalanceRegistries: many(AssetCurrentBalanceRegistries),
}));

export const AssetClassAttributesRelations = relations(AssetClassAttributes, ({one}) => ({
	AssetAttribute: one(AssetAttributes, {
		fields: [AssetClassAttributes.AssetAttributeId],
		references: [AssetAttributes.Id]
	}),
	AssetClass: one(AssetClasses, {
		fields: [AssetClassAttributes.AssetClassId],
		references: [AssetClasses.Id]
	}),
}));

export const AssetClassesRelations = relations(AssetClasses, ({one, many}) => ({
	AssetClassAttributes: many(AssetClassAttributes),
	AssetClass: one(AssetClasses, {
		fields: [AssetClasses.ParentId],
		references: [AssetClasses.Id],
		relationName: "AssetClasses_ParentId_AssetClasses_Id"
	}),
	AssetClasses: many(AssetClasses, {
		relationName: "AssetClasses_ParentId_AssetClasses_Id"
	}),
	AssetProvisionDocumentItems: many(AssetProvisionDocumentItems),
	Assets: many(Assets),
}));

export const AssetCurrentBalanceRegistriesRelations = relations(AssetCurrentBalanceRegistries, ({one}) => ({
	AssetBalanceRegistry: one(AssetBalanceRegistries, {
		fields: [AssetCurrentBalanceRegistries.AssetBalanceRegistryId],
		references: [AssetBalanceRegistries.Id]
	}),
	Asset: one(Assets, {
		fields: [AssetCurrentBalanceRegistries.AssetId],
		references: [Assets.Id]
	}),
}));

export const AssetFilesRelations = relations(AssetFiles, ({one}) => ({
	Asset: one(Assets, {
		fields: [AssetFiles.AssetId],
		references: [Assets.Id]
	}),
}));

export const AssetMovementCountRegistriesRelations = relations(AssetMovementCountRegistries, ({one}) => ({
	AssetMovementRegistry_FromAssetMovementRegistryId: one(AssetMovementRegistries, {
		fields: [AssetMovementCountRegistries.FromAssetMovementRegistryId],
		references: [AssetMovementRegistries.Id],
		relationName: "AssetMovementCountRegistries_FromAssetMovementRegistryId_AssetMovementRegistries_Id"
	}),
	AssetMovementRegistry_ToAssetMovementRegistryId: one(AssetMovementRegistries, {
		fields: [AssetMovementCountRegistries.ToAssetMovementRegistryId],
		references: [AssetMovementRegistries.Id],
		relationName: "AssetMovementCountRegistries_ToAssetMovementRegistryId_AssetMovementRegistries_Id"
	}),
	Asset: one(Assets, {
		fields: [AssetMovementCountRegistries.AssetId],
		references: [Assets.Id]
	}),
	MovementCountTypeCondition: one(MovementCountTypeConditions, {
		fields: [AssetMovementCountRegistries.MovementCountTypeConditionId],
		references: [MovementCountTypeConditions.Id]
	}),
}));

export const AssetMovementRegistriesRelations = relations(AssetMovementRegistries, ({one, many}) => ({
	AssetMovementCountRegistries_FromAssetMovementRegistryId: many(AssetMovementCountRegistries, {
		relationName: "AssetMovementCountRegistries_FromAssetMovementRegistryId_AssetMovementRegistries_Id"
	}),
	AssetMovementCountRegistries_ToAssetMovementRegistryId: many(AssetMovementCountRegistries, {
		relationName: "AssetMovementCountRegistries_ToAssetMovementRegistryId_AssetMovementRegistries_Id"
	}),
	Asset: one(Assets, {
		fields: [AssetMovementRegistries.AssetId],
		references: [Assets.Id]
	}),
}));

export const MovementCountTypeConditionsRelations = relations(MovementCountTypeConditions, ({one, many}) => ({
	AssetMovementCountRegistries: many(AssetMovementCountRegistries),
	MovementCountType: one(MovementCountTypes, {
		fields: [MovementCountTypeConditions.MovementCountTypeId],
		references: [MovementCountTypes.Id]
	}),
}));

export const AssetMovementDocumentItemsRelations = relations(AssetMovementDocumentItems, ({one}) => ({
	AssetMovementDocument: one(AssetMovementDocuments, {
		fields: [AssetMovementDocumentItems.DocumentId],
		references: [AssetMovementDocuments.Id]
	}),
	Asset: one(Assets, {
		fields: [AssetMovementDocumentItems.AssetId],
		references: [Assets.Id]
	}),
}));

export const AssetMovementDocumentsRelations = relations(AssetMovementDocuments, ({one, many}) => ({
	AssetMovementDocumentItems: many(AssetMovementDocumentItems),
	WarehouseManagement: one(WarehouseManagements, {
		fields: [AssetMovementDocuments.WarehouseManagementId],
		references: [WarehouseManagements.Id]
	}),
}));

export const WarehouseManagementsRelations = relations(WarehouseManagements, ({many}) => ({
	AssetMovementDocuments: many(AssetMovementDocuments),
	AssetReceiptDocuments: many(AssetReceiptDocuments),
	AssetWriteOffDocuments: many(AssetWriteOffDocuments),
	InventoryDocuments: many(InventoryDocuments),
	StockInventoryDocuments: many(StockInventoryDocuments),
	StockMovementDocuments: many(StockMovementDocuments),
	StockNomenclatureSetDocuments: many(StockNomenclatureSetDocuments),
	StockReceiptDocuments: many(StockReceiptDocuments),
	StockUnwrapDocuments: many(StockUnwrapDocuments),
	StockWriteoffDocuments: many(StockWriteoffDocuments),
}));

export const AssetProvisionDocumentItemsRelations = relations(AssetProvisionDocumentItems, ({one}) => ({
	AssetClass: one(AssetClasses, {
		fields: [AssetProvisionDocumentItems.AssetClassId],
		references: [AssetClasses.Id]
	}),
	AssetProvisionDocument: one(AssetProvisionDocuments, {
		fields: [AssetProvisionDocumentItems.DocumentId],
		references: [AssetProvisionDocuments.Id]
	}),
	AssetType: one(AssetTypes, {
		fields: [AssetProvisionDocumentItems.AssetTypeId],
		references: [AssetTypes.Id]
	}),
}));

export const AssetProvisionDocumentsRelations = relations(AssetProvisionDocuments, ({many}) => ({
	AssetProvisionDocumentItems: many(AssetProvisionDocumentItems),
	AssetProvisionDocumentResponsibleUsers: many(AssetProvisionDocumentResponsibleUsers),
}));

export const AssetTypesRelations = relations(AssetTypes, ({many}) => ({
	AssetProvisionDocumentItems: many(AssetProvisionDocumentItems),
	Assets: many(Assets),
}));

export const AssetProvisionDocumentResponsibleUsersRelations = relations(AssetProvisionDocumentResponsibleUsers, ({one}) => ({
	AssetProvisionDocument: one(AssetProvisionDocuments, {
		fields: [AssetProvisionDocumentResponsibleUsers.DocumentId],
		references: [AssetProvisionDocuments.Id]
	}),
}));

export const AssetReceiptDocumentItemsRelations = relations(AssetReceiptDocumentItems, ({one}) => ({
	AssetReceiptDocument: one(AssetReceiptDocuments, {
		fields: [AssetReceiptDocumentItems.DocumentId],
		references: [AssetReceiptDocuments.Id]
	}),
	Asset: one(Assets, {
		fields: [AssetReceiptDocumentItems.AssetId],
		references: [Assets.Id]
	}),
}));

export const AssetReceiptDocumentsRelations = relations(AssetReceiptDocuments, ({one, many}) => ({
	AssetReceiptDocumentItems: many(AssetReceiptDocumentItems),
	WarehouseManagement: one(WarehouseManagements, {
		fields: [AssetReceiptDocuments.WarehouseManagementId],
		references: [WarehouseManagements.Id]
	}),
}));

export const AssetWriteOffDocumentItemsRelations = relations(AssetWriteOffDocumentItems, ({one}) => ({
	Asset: one(Assets, {
		fields: [AssetWriteOffDocumentItems.AssetId],
		references: [Assets.Id]
	}),
	AssetWriteOffDocument: one(AssetWriteOffDocuments, {
		fields: [AssetWriteOffDocumentItems.DocumentId],
		references: [AssetWriteOffDocuments.Id]
	}),
}));

export const AssetWriteOffDocumentsRelations = relations(AssetWriteOffDocuments, ({one, many}) => ({
	AssetWriteOffDocumentItems: many(AssetWriteOffDocumentItems),
	WarehouseManagement: one(WarehouseManagements, {
		fields: [AssetWriteOffDocuments.WarehouseManagementId],
		references: [WarehouseManagements.Id]
	}),
}));

export const AccountingTypesRelations = relations(AccountingTypes, ({many}) => ({
	Assets: many(Assets),
}));

export const AssetGroupsRelations = relations(AssetGroups, ({many}) => ({
	Assets: many(Assets),
}));

export const AssetStatusesRelations = relations(AssetStatuses, ({many}) => ({
	Assets: many(Assets),
}));

export const UnitsOfMeasureRelations = relations(UnitsOfMeasure, ({many}) => ({
	Assets: many(Assets),
	Nomenclatures: many(Nomenclatures),
	Shipments: many(Shipments),
	StockAccountingGroups: many(StockAccountingGroups),
	StockInventoryDocumentItems: many(StockInventoryDocumentItems),
	StockItemBalanceRegistries: many(StockItemBalanceRegistries),
	StockItemMovementRegistries: many(StockItemMovementRegistries),
	StockItems: many(StockItems),
	StockNomenclatureSetDocuments: many(StockNomenclatureSetDocuments),
	StockReceiptDocumentItems: many(StockReceiptDocumentItems),
	StockUnwrapDocumentItems: many(StockUnwrapDocumentItems),
	WarehouseMovementDocuments: many(WarehouseMovementDocuments),
}));

export const CodesRelations = relations(Codes, ({one}) => ({
	CodeType: one(CodeTypes, {
		fields: [Codes.CodeTypeId],
		references: [CodeTypes.Id]
	}),
}));

export const CodeTypesRelations = relations(CodeTypes, ({many}) => ({
	Codes: many(Codes),
}));

export const ContainerItemRegistriesRelations = relations(ContainerItemRegistries, ({one}) => ({
	Container: one(Containers, {
		fields: [ContainerItemRegistries.ContainerId],
		references: [Containers.Id]
	}),
}));

export const ContainersRelations = relations(Containers, ({one, many}) => ({
	ContainerItemRegistries: many(ContainerItemRegistries),
	ContainerItems: many(ContainerItems),
	ContainerType: one(ContainerTypes, {
		fields: [Containers.ContainerTypeId],
		references: [ContainerTypes.Id]
	}),
}));

export const ContainerItemsRelations = relations(ContainerItems, ({one}) => ({
	Container: one(Containers, {
		fields: [ContainerItems.ContainerId],
		references: [Containers.Id]
	}),
}));

export const ContainerTypesRelations = relations(ContainerTypes, ({one, many}) => ({
	ContainerType: one(ContainerTypes, {
		fields: [ContainerTypes.ParentId],
		references: [ContainerTypes.Id],
		relationName: "ContainerTypes_ParentId_ContainerTypes_Id"
	}),
	ContainerTypes: many(ContainerTypes, {
		relationName: "ContainerTypes_ParentId_ContainerTypes_Id"
	}),
	Containers: many(Containers),
}));

export const CustomerStockBalanceRegistriesRelations = relations(CustomerStockBalanceRegistries, ({one, many}) => ({
	Company: one(Companies, {
		fields: [CustomerStockBalanceRegistries.CompanyId],
		references: [Companies.Id]
	}),
	StockAccountingGroup: one(StockAccountingGroups, {
		fields: [CustomerStockBalanceRegistries.StockAccountingGroupId],
		references: [StockAccountingGroups.Id]
	}),
	CustomerStockCurrentBalanceRegistries: many(CustomerStockCurrentBalanceRegistries),
}));

export const CompaniesRelations = relations(Companies, ({many}) => ({
	CustomerStockBalanceRegistries: many(CustomerStockBalanceRegistries),
	CustomerStockCurrentBalanceRegistries: many(CustomerStockCurrentBalanceRegistries),
	CustomerStockMovementRegistries: many(CustomerStockMovementRegistries),
	Nomenclatures: many(Nomenclatures),
	PartnerContracts: many(PartnerContracts),
	StockReceiptDocuments: many(StockReceiptDocuments),
	StockWriteoffDocuments: many(StockWriteoffDocuments),
	SupplierStockBalanceRegistries: many(SupplierStockBalanceRegistries),
	SupplierStockCurrentBalanceRegistries: many(SupplierStockCurrentBalanceRegistries),
	SupplierStockMovementRegistries: many(SupplierStockMovementRegistries),
}));

export const StockAccountingGroupsRelations = relations(StockAccountingGroups, ({one, many}) => ({
	CustomerStockBalanceRegistries: many(CustomerStockBalanceRegistries),
	CustomerStockCurrentBalanceRegistries: many(CustomerStockCurrentBalanceRegistries),
	CustomerStockMovementRegistries: many(CustomerStockMovementRegistries),
	Nomenclature: one(Nomenclatures, {
		fields: [StockAccountingGroups.NomenclatureId],
		references: [Nomenclatures.Id]
	}),
	Shipment: one(Shipments, {
		fields: [StockAccountingGroups.ShipmentId],
		references: [Shipments.Id]
	}),
	UnitsOfMeasure: one(UnitsOfMeasure, {
		fields: [StockAccountingGroups.UnitOfMeasureId],
		references: [UnitsOfMeasure.Id]
	}),
	StockBalanceRegistries: many(StockBalanceRegistries),
	StockCurrentBalanceRegistries: many(StockCurrentBalanceRegistries),
	StockItems: many(StockItems),
	StockMovementDocumentItems: many(StockMovementDocumentItems),
	StockMovementRegistries: many(StockMovementRegistries),
	StockNomenclatureSetDocumentItems: many(StockNomenclatureSetDocumentItems),
	StockUnwrapDocuments: many(StockUnwrapDocuments),
	StockWriteoffDocumentItems: many(StockWriteoffDocumentItems),
	SupplierStockBalanceRegistries: many(SupplierStockBalanceRegistries),
	SupplierStockCurrentBalanceRegistries: many(SupplierStockCurrentBalanceRegistries),
	SupplierStockMovementRegistries: many(SupplierStockMovementRegistries),
	TaskMaterials: many(TaskMaterials),
}));

export const CustomerStockCurrentBalanceRegistriesRelations = relations(CustomerStockCurrentBalanceRegistries, ({one}) => ({
	Company: one(Companies, {
		fields: [CustomerStockCurrentBalanceRegistries.CompanyId],
		references: [Companies.Id]
	}),
	CustomerStockBalanceRegistry: one(CustomerStockBalanceRegistries, {
		fields: [CustomerStockCurrentBalanceRegistries.CustomerStockBalanceRegistryId],
		references: [CustomerStockBalanceRegistries.Id]
	}),
	StockAccountingGroup: one(StockAccountingGroups, {
		fields: [CustomerStockCurrentBalanceRegistries.StockAccountingGroupId],
		references: [StockAccountingGroups.Id]
	}),
}));

export const CustomerStockMovementRegistriesRelations = relations(CustomerStockMovementRegistries, ({one}) => ({
	Company: one(Companies, {
		fields: [CustomerStockMovementRegistries.CompanyId],
		references: [Companies.Id]
	}),
	StockAccountingGroup: one(StockAccountingGroups, {
		fields: [CustomerStockMovementRegistries.StockAccountingGroupId],
		references: [StockAccountingGroups.Id]
	}),
}));

export const DocumentTypeStatusAccessesRelations = relations(DocumentTypeStatusAccesses, ({one}) => ({
	DocumentTypeStatus: one(DocumentTypeStatuses, {
		fields: [DocumentTypeStatusAccesses.DocumentTypeStatusId],
		references: [DocumentTypeStatuses.Id]
	}),
}));

export const DocumentTypeStatusesRelations = relations(DocumentTypeStatuses, ({one, many}) => ({
	DocumentTypeStatusAccesses: many(DocumentTypeStatusAccesses),
	DocumentStatus: one(DocumentStatuses, {
		fields: [DocumentTypeStatuses.DocumentStatusId],
		references: [DocumentStatuses.Id]
	}),
	DocumentType: one(DocumentTypes, {
		fields: [DocumentTypeStatuses.DocumentTypeId],
		references: [DocumentTypes.Id]
	}),
}));

export const DocumentStatusesRelations = relations(DocumentStatuses, ({many}) => ({
	DocumentTypeStatuses: many(DocumentTypeStatuses),
}));

export const DocumentTypesRelations = relations(DocumentTypes, ({many}) => ({
	DocumentTypeStatuses: many(DocumentTypeStatuses),
}));

export const FileEntityTypesRelations = relations(FileEntityTypes, ({one, many}) => ({
	FileType: one(FileTypes, {
		fields: [FileEntityTypes.FileTypeId],
		references: [FileTypes.Id]
	}),
	InventoryFiles: many(InventoryFiles),
}));

export const FileTypesRelations = relations(FileTypes, ({many}) => ({
	FileEntityTypes: many(FileEntityTypes),
}));

export const HangfireJobParameterRelations = relations(HangfireJobParameter, ({one}) => ({
	HangfireJob: one(HangfireJob, {
		fields: [HangfireJobParameter.JobId],
		references: [HangfireJob.Id]
	}),
}));

export const HangfireJobRelations = relations(HangfireJob, ({many}) => ({
	HangfireJobParameters: many(HangfireJobParameter),
	HangfireJobStates: many(HangfireJobState),
	HangfireStates: many(HangfireState),
}));

export const HangfireJobStateRelations = relations(HangfireJobState, ({one}) => ({
	HangfireJob: one(HangfireJob, {
		fields: [HangfireJobState.JobId],
		references: [HangfireJob.Id]
	}),
}));

export const HangfireStateRelations = relations(HangfireState, ({one}) => ({
	HangfireJob: one(HangfireJob, {
		fields: [HangfireState.JobId],
		references: [HangfireJob.Id]
	}),
}));

export const InventoryCommissionPeopleRelations = relations(InventoryCommissionPeople, ({one}) => ({
	InventoryCommissionPosition: one(InventoryCommissionPositions, {
		fields: [InventoryCommissionPeople.InventoryCommissionPositionId],
		references: [InventoryCommissionPositions.Id]
	}),
	InventoryDocument: one(InventoryDocuments, {
		fields: [InventoryCommissionPeople.InventoryDocumentId],
		references: [InventoryDocuments.Id]
	}),
	StockInventoryDocument: one(StockInventoryDocuments, {
		fields: [InventoryCommissionPeople.StockInventoryDocumentId],
		references: [StockInventoryDocuments.Id]
	}),
}));

export const InventoryCommissionPositionsRelations = relations(InventoryCommissionPositions, ({many}) => ({
	InventoryCommissionPeople: many(InventoryCommissionPeople),
}));

export const InventoryDocumentsRelations = relations(InventoryDocuments, ({one, many}) => ({
	InventoryCommissionPeople: many(InventoryCommissionPeople),
	InventoryDocumentItems: many(InventoryDocumentItems),
	WarehouseManagement: one(WarehouseManagements, {
		fields: [InventoryDocuments.WarehouseManagementId],
		references: [WarehouseManagements.Id]
	}),
}));

export const StockInventoryDocumentsRelations = relations(StockInventoryDocuments, ({one, many}) => ({
	InventoryCommissionPeople: many(InventoryCommissionPeople),
	StockInventoryDocumentItems: many(StockInventoryDocumentItems),
	WarehouseManagement: one(WarehouseManagements, {
		fields: [StockInventoryDocuments.WarehouseManagementId],
		references: [WarehouseManagements.Id]
	}),
}));

export const InventoryDocumentItemFilesRelations = relations(InventoryDocumentItemFiles, ({one}) => ({
	InventoryDocumentItem: one(InventoryDocumentItems, {
		fields: [InventoryDocumentItemFiles.InventoryDocumentItemId],
		references: [InventoryDocumentItems.Id]
	}),
}));

export const InventoryDocumentItemsRelations = relations(InventoryDocumentItems, ({one, many}) => ({
	InventoryDocumentItemFiles: many(InventoryDocumentItemFiles),
	Asset: one(Assets, {
		fields: [InventoryDocumentItems.AssetId],
		references: [Assets.Id]
	}),
	InventoryDocumentItem: one(InventoryDocumentItems, {
		fields: [InventoryDocumentItems.ParentId],
		references: [InventoryDocumentItems.Id],
		relationName: "InventoryDocumentItems_ParentId_InventoryDocumentItems_Id"
	}),
	InventoryDocumentItems: many(InventoryDocumentItems, {
		relationName: "InventoryDocumentItems_ParentId_InventoryDocumentItems_Id"
	}),
	InventoryDocument: one(InventoryDocuments, {
		fields: [InventoryDocumentItems.DocumentId],
		references: [InventoryDocuments.Id]
	}),
}));

export const InventoryFilesRelations = relations(InventoryFiles, ({one}) => ({
	FileEntityType: one(FileEntityTypes, {
		fields: [InventoryFiles.FileEntityTypeId],
		references: [FileEntityTypes.Id]
	}),
}));

export const MovementCountTypesRelations = relations(MovementCountTypes, ({one, many}) => ({
	MovementCountTypeConditions: many(MovementCountTypeConditions),
	AssetAttribute: one(AssetAttributes, {
		fields: [MovementCountTypes.AssetAttributeId],
		references: [AssetAttributes.Id]
	}),
}));

export const NomenclatureAttributeValuesRelations = relations(NomenclatureAttributeValues, ({one}) => ({
	NomenclatureAttribute: one(NomenclatureAttributes, {
		fields: [NomenclatureAttributeValues.NomenclatureAttributeId],
		references: [NomenclatureAttributes.Id]
	}),
	Nomenclature: one(Nomenclatures, {
		fields: [NomenclatureAttributeValues.NomenclatureId],
		references: [Nomenclatures.Id]
	}),
}));

export const NomenclatureAttributesRelations = relations(NomenclatureAttributes, ({one, many}) => ({
	NomenclatureAttributeValues: many(NomenclatureAttributeValues),
	NomenclatureGroup: one(NomenclatureGroups, {
		fields: [NomenclatureAttributes.NomenclatureGroupId],
		references: [NomenclatureGroups.Id]
	}),
}));

export const NomenclaturesRelations = relations(Nomenclatures, ({one, many}) => ({
	NomenclatureAttributeValues: many(NomenclatureAttributeValues),
	NomenclaturePeriodStandards: many(NomenclaturePeriodStandards),
	Company: one(Companies, {
		fields: [Nomenclatures.ProducerId],
		references: [Companies.Id]
	}),
	NomenclatureGroup: one(NomenclatureGroups, {
		fields: [Nomenclatures.NomenclatureGroupId],
		references: [NomenclatureGroups.Id]
	}),
	StockNomenclatureSetDocument: one(StockNomenclatureSetDocuments, {
		fields: [Nomenclatures.StockNomenclatureSetDocumentId],
		references: [StockNomenclatureSetDocuments.Id]
	}),
	UnitsOfMeasure: one(UnitsOfMeasure, {
		fields: [Nomenclatures.DefaultUnitOfMeasureId],
		references: [UnitsOfMeasure.Id]
	}),
	Shipments: many(Shipments),
	StockAccountingGroups: many(StockAccountingGroups),
	StockInventoryDocumentItems: many(StockInventoryDocumentItems),
	StockReceiptDocumentItems: many(StockReceiptDocumentItems),
	StockUnwrapDocumentItems: many(StockUnwrapDocumentItems),
	WarehouseMovementDocuments: many(WarehouseMovementDocuments),
}));

export const NomenclatureGroupsRelations = relations(NomenclatureGroups, ({one, many}) => ({
	NomenclatureAttributes: many(NomenclatureAttributes),
	NomenclatureGroup: one(NomenclatureGroups, {
		fields: [NomenclatureGroups.ParentId],
		references: [NomenclatureGroups.Id],
		relationName: "NomenclatureGroups_ParentId_NomenclatureGroups_Id"
	}),
	NomenclatureGroups: many(NomenclatureGroups, {
		relationName: "NomenclatureGroups_ParentId_NomenclatureGroups_Id"
	}),
	Nomenclatures: many(Nomenclatures),
	StockNomenclatureSetDocuments: many(StockNomenclatureSetDocuments),
}));

export const NomenclaturePeriodStandardsRelations = relations(NomenclaturePeriodStandards, ({one}) => ({
	Nomenclature: one(Nomenclatures, {
		fields: [NomenclaturePeriodStandards.NomenclatureId],
		references: [Nomenclatures.Id]
	}),
}));

export const StockNomenclatureSetDocumentsRelations = relations(StockNomenclatureSetDocuments, ({one, many}) => ({
	Nomenclatures: many(Nomenclatures),
	StockNomenclatureSetDocumentItems: many(StockNomenclatureSetDocumentItems),
	NomenclatureGroup: one(NomenclatureGroups, {
		fields: [StockNomenclatureSetDocuments.NomenclatureGroupId],
		references: [NomenclatureGroups.Id]
	}),
	Shipment: one(Shipments, {
		fields: [StockNomenclatureSetDocuments.ShipmentId],
		references: [Shipments.Id]
	}),
	UnitsOfMeasure: one(UnitsOfMeasure, {
		fields: [StockNomenclatureSetDocuments.UnitOfMeasureId],
		references: [UnitsOfMeasure.Id]
	}),
	WarehouseManagement: one(WarehouseManagements, {
		fields: [StockNomenclatureSetDocuments.WarehouseManagementId],
		references: [WarehouseManagements.Id]
	}),
}));

export const PartnerContractsRelations = relations(PartnerContracts, ({one, many}) => ({
	Company: one(Companies, {
		fields: [PartnerContracts.CompanyId],
		references: [Companies.Id]
	}),
	StockReceiptDocuments: many(StockReceiptDocuments),
}));

export const RouteNodeLinksRelations = relations(RouteNodeLinks, ({one}) => ({
	RouteNode_FinishRouteNodeId: one(RouteNodes, {
		fields: [RouteNodeLinks.FinishRouteNodeId],
		references: [RouteNodes.Id],
		relationName: "RouteNodeLinks_FinishRouteNodeId_RouteNodes_Id"
	}),
	RouteNode_StartRouteNodeId: one(RouteNodes, {
		fields: [RouteNodeLinks.StartRouteNodeId],
		references: [RouteNodes.Id],
		relationName: "RouteNodeLinks_StartRouteNodeId_RouteNodes_Id"
	}),
	Route: one(Routes, {
		fields: [RouteNodeLinks.RouteId],
		references: [Routes.Id]
	}),
}));

export const RouteNodesRelations = relations(RouteNodes, ({one, many}) => ({
	RouteNodeLinks_FinishRouteNodeId: many(RouteNodeLinks, {
		relationName: "RouteNodeLinks_FinishRouteNodeId_RouteNodes_Id"
	}),
	RouteNodeLinks_StartRouteNodeId: many(RouteNodeLinks, {
		relationName: "RouteNodeLinks_StartRouteNodeId_RouteNodes_Id"
	}),
	Route: one(Routes, {
		fields: [RouteNodes.RouteId],
		references: [Routes.Id]
	}),
}));

export const RoutesRelations = relations(Routes, ({many}) => ({
	RouteNodeLinks: many(RouteNodeLinks),
	RouteNodes: many(RouteNodes),
	RouteProgresses: many(RouteProgresses),
}));

export const RouteProgressesRelations = relations(RouteProgresses, ({one}) => ({
	Route: one(Routes, {
		fields: [RouteProgresses.RouteId],
		references: [Routes.Id]
	}),
}));

export const ShipmentsRelations = relations(Shipments, ({one, many}) => ({
	Nomenclature: one(Nomenclatures, {
		fields: [Shipments.NomenclatureId],
		references: [Nomenclatures.Id]
	}),
	StockReceiptDocument: one(StockReceiptDocuments, {
		fields: [Shipments.StockReceiptDocumentId],
		references: [StockReceiptDocuments.Id],
		relationName: "Shipments_StockReceiptDocumentId_StockReceiptDocuments_Id"
	}),
	UnitsOfMeasure: one(UnitsOfMeasure, {
		fields: [Shipments.UnitOfMeasureId],
		references: [UnitsOfMeasure.Id]
	}),
	WarehouseMovementDocument: one(WarehouseMovementDocuments, {
		fields: [Shipments.WarehouseMovementDocumentsId],
		references: [WarehouseMovementDocuments.Id],
		relationName: "Shipments_WarehouseMovementDocumentsId_WarehouseMovementDocuments_Id"
	}),
	StockAccountingGroups: many(StockAccountingGroups),
	StockInventoryDocumentItems: many(StockInventoryDocumentItems),
	StockNomenclatureSetDocuments: many(StockNomenclatureSetDocuments),
	StockReceiptDocuments: many(StockReceiptDocuments, {
		relationName: "StockReceiptDocuments_ShipmentId_Shipments_Id"
	}),
	WarehouseMovementDocuments: many(WarehouseMovementDocuments, {
		relationName: "WarehouseMovementDocuments_ShipmentId_Shipments_Id"
	}),
}));

export const StockReceiptDocumentsRelations = relations(StockReceiptDocuments, ({one, many}) => ({
	Shipments: many(Shipments, {
		relationName: "Shipments_StockReceiptDocumentId_StockReceiptDocuments_Id"
	}),
	StockReceiptDocumentItems: many(StockReceiptDocumentItems),
	Company: one(Companies, {
		fields: [StockReceiptDocuments.CompanyId],
		references: [Companies.Id]
	}),
	ExternalDocumentType: one(ExternalDocumentTypes, {
		fields: [StockReceiptDocuments.ExternalDocumentTypeId],
		references: [ExternalDocumentTypes.Id]
	}),
	PartnerContract: one(PartnerContracts, {
		fields: [StockReceiptDocuments.PartnerContractId],
		references: [PartnerContracts.Id]
	}),
	Shipment: one(Shipments, {
		fields: [StockReceiptDocuments.ShipmentId],
		references: [Shipments.Id],
		relationName: "StockReceiptDocuments_ShipmentId_Shipments_Id"
	}),
	WarehouseManagement: one(WarehouseManagements, {
		fields: [StockReceiptDocuments.WarehouseManagementId],
		references: [WarehouseManagements.Id]
	}),
}));

export const WarehouseMovementDocumentsRelations = relations(WarehouseMovementDocuments, ({one, many}) => ({
	Shipments: many(Shipments, {
		relationName: "Shipments_WarehouseMovementDocumentsId_WarehouseMovementDocuments_Id"
	}),
	Asset: one(Assets, {
		fields: [WarehouseMovementDocuments.AssetId],
		references: [Assets.Id]
	}),
	Nomenclature: one(Nomenclatures, {
		fields: [WarehouseMovementDocuments.NomenclatureId],
		references: [Nomenclatures.Id]
	}),
	ProductType: one(ProductTypes, {
		fields: [WarehouseMovementDocuments.ProductTypeId],
		references: [ProductTypes.Id]
	}),
	Shipment: one(Shipments, {
		fields: [WarehouseMovementDocuments.ShipmentId],
		references: [Shipments.Id],
		relationName: "WarehouseMovementDocuments_ShipmentId_Shipments_Id"
	}),
	UnitsOfMeasure: one(UnitsOfMeasure, {
		fields: [WarehouseMovementDocuments.LoadUnitOfMeasureId],
		references: [UnitsOfMeasure.Id]
	}),
}));

export const StockBalanceRegistriesRelations = relations(StockBalanceRegistries, ({one, many}) => ({
	StockAccountingGroup: one(StockAccountingGroups, {
		fields: [StockBalanceRegistries.StockAccountingGroupId],
		references: [StockAccountingGroups.Id]
	}),
	StockCurrentBalanceRegistries: many(StockCurrentBalanceRegistries),
}));

export const StockCurrentBalanceRegistriesRelations = relations(StockCurrentBalanceRegistries, ({one}) => ({
	StockAccountingGroup: one(StockAccountingGroups, {
		fields: [StockCurrentBalanceRegistries.StockAccountingGroupId],
		references: [StockAccountingGroups.Id]
	}),
	StockBalanceRegistry: one(StockBalanceRegistries, {
		fields: [StockCurrentBalanceRegistries.StockBalanceRegistryId],
		references: [StockBalanceRegistries.Id]
	}),
}));

export const StockInventoryDocumentItemComponentsRelations = relations(StockInventoryDocumentItemComponents, ({one}) => ({
	StockInventoryDocumentItem: one(StockInventoryDocumentItems, {
		fields: [StockInventoryDocumentItemComponents.DocumentItemId],
		references: [StockInventoryDocumentItems.Id]
	}),
	StockItem: one(StockItems, {
		fields: [StockInventoryDocumentItemComponents.StockItemId],
		references: [StockItems.Id]
	}),
}));

export const StockInventoryDocumentItemsRelations = relations(StockInventoryDocumentItems, ({one, many}) => ({
	StockInventoryDocumentItemComponents: many(StockInventoryDocumentItemComponents),
	Nomenclature: one(Nomenclatures, {
		fields: [StockInventoryDocumentItems.NomenclatureId],
		references: [Nomenclatures.Id]
	}),
	Shipment: one(Shipments, {
		fields: [StockInventoryDocumentItems.ShipmentId],
		references: [Shipments.Id]
	}),
	StockInventoryDocument: one(StockInventoryDocuments, {
		fields: [StockInventoryDocumentItems.DocumentId],
		references: [StockInventoryDocuments.Id]
	}),
	UnitsOfMeasure: one(UnitsOfMeasure, {
		fields: [StockInventoryDocumentItems.UnitOfMeasureId],
		references: [UnitsOfMeasure.Id]
	}),
}));

export const StockItemsRelations = relations(StockItems, ({one, many}) => ({
	StockInventoryDocumentItemComponents: many(StockInventoryDocumentItemComponents),
	StockItemBalanceRegistries: many(StockItemBalanceRegistries),
	StockItemCurrentBalanceRegistries: many(StockItemCurrentBalanceRegistries),
	StockItemMovementRegistries: many(StockItemMovementRegistries),
	ObjectStatus: one(ObjectStatuses, {
		fields: [StockItems.ObjectStatusId],
		references: [ObjectStatuses.Id]
	}),
	StockAccountingGroup: one(StockAccountingGroups, {
		fields: [StockItems.StockAccountingGroupId],
		references: [StockAccountingGroups.Id]
	}),
	StockReceiptDocumentItemComponent: one(StockReceiptDocumentItemComponents, {
		fields: [StockItems.StockReceiptDocumentItemComponentId],
		references: [StockReceiptDocumentItemComponents.Id]
	}),
	UnitsOfMeasure: one(UnitsOfMeasure, {
		fields: [StockItems.DetailUoMId],
		references: [UnitsOfMeasure.Id]
	}),
	StockMovementDocumentItemComponents: many(StockMovementDocumentItemComponents),
	StockNomenclatureSetDocumentItemComponents: many(StockNomenclatureSetDocumentItemComponents),
	StockUnwrapDocumentItemComponents: many(StockUnwrapDocumentItemComponents),
	StockUnwrapDocumentItems: many(StockUnwrapDocumentItems),
	StockWriteoffDocumentItemComponents: many(StockWriteoffDocumentItemComponents),
	TaskMaterialComponents: many(TaskMaterialComponents),
}));

export const StockItemBalanceRegistriesRelations = relations(StockItemBalanceRegistries, ({one, many}) => ({
	StockItem: one(StockItems, {
		fields: [StockItemBalanceRegistries.StockItemId],
		references: [StockItems.Id]
	}),
	UnitsOfMeasure: one(UnitsOfMeasure, {
		fields: [StockItemBalanceRegistries.DetailUoMId],
		references: [UnitsOfMeasure.Id]
	}),
	StockItemCurrentBalanceRegistries: many(StockItemCurrentBalanceRegistries),
}));

export const StockItemCurrentBalanceRegistriesRelations = relations(StockItemCurrentBalanceRegistries, ({one}) => ({
	StockItemBalanceRegistry: one(StockItemBalanceRegistries, {
		fields: [StockItemCurrentBalanceRegistries.StockItemBalanceRegistryId],
		references: [StockItemBalanceRegistries.Id]
	}),
	StockItem: one(StockItems, {
		fields: [StockItemCurrentBalanceRegistries.StockItemId],
		references: [StockItems.Id]
	}),
}));

export const StockItemMovementRegistriesRelations = relations(StockItemMovementRegistries, ({one}) => ({
	StockItem: one(StockItems, {
		fields: [StockItemMovementRegistries.StockItemId],
		references: [StockItems.Id]
	}),
	UnitsOfMeasure: one(UnitsOfMeasure, {
		fields: [StockItemMovementRegistries.DetailUoMId],
		references: [UnitsOfMeasure.Id]
	}),
}));

export const ObjectStatusesRelations = relations(ObjectStatuses, ({many}) => ({
	StockItems: many(StockItems),
}));

export const StockReceiptDocumentItemComponentsRelations = relations(StockReceiptDocumentItemComponents, ({one, many}) => ({
	StockItems: many(StockItems),
	StockReceiptDocumentItem: one(StockReceiptDocumentItems, {
		fields: [StockReceiptDocumentItemComponents.DocumentItemId],
		references: [StockReceiptDocumentItems.Id]
	}),
}));

export const StockMovementDocumentItemComponentsRelations = relations(StockMovementDocumentItemComponents, ({one}) => ({
	StockItem: one(StockItems, {
		fields: [StockMovementDocumentItemComponents.StockItemId],
		references: [StockItems.Id]
	}),
	StockMovementDocumentItem: one(StockMovementDocumentItems, {
		fields: [StockMovementDocumentItemComponents.DocumentItemId],
		references: [StockMovementDocumentItems.Id]
	}),
}));

export const StockMovementDocumentItemsRelations = relations(StockMovementDocumentItems, ({one, many}) => ({
	StockMovementDocumentItemComponents: many(StockMovementDocumentItemComponents),
	StockAccountingGroup: one(StockAccountingGroups, {
		fields: [StockMovementDocumentItems.StockAccountingGroupId],
		references: [StockAccountingGroups.Id]
	}),
	StockMovementDocument: one(StockMovementDocuments, {
		fields: [StockMovementDocumentItems.DocumentId],
		references: [StockMovementDocuments.Id]
	}),
}));

export const StockMovementDocumentsRelations = relations(StockMovementDocuments, ({one, many}) => ({
	StockMovementDocumentItems: many(StockMovementDocumentItems),
	ExternalDocumentType: one(ExternalDocumentTypes, {
		fields: [StockMovementDocuments.ExternalDocumentTypeId],
		references: [ExternalDocumentTypes.Id]
	}),
	WarehouseManagement: one(WarehouseManagements, {
		fields: [StockMovementDocuments.WarehouseManagementId],
		references: [WarehouseManagements.Id]
	}),
}));

export const ExternalDocumentTypesRelations = relations(ExternalDocumentTypes, ({many}) => ({
	StockMovementDocuments: many(StockMovementDocuments),
	StockReceiptDocuments: many(StockReceiptDocuments),
	StockWriteoffDocuments: many(StockWriteoffDocuments),
}));

export const StockMovementRegistriesRelations = relations(StockMovementRegistries, ({one}) => ({
	StockAccountingGroup: one(StockAccountingGroups, {
		fields: [StockMovementRegistries.StockAccountingGroupId],
		references: [StockAccountingGroups.Id]
	}),
}));

export const StockNomenclatureSetDocumentItemComponentsRelations = relations(StockNomenclatureSetDocumentItemComponents, ({one}) => ({
	StockItem: one(StockItems, {
		fields: [StockNomenclatureSetDocumentItemComponents.StockItemId],
		references: [StockItems.Id]
	}),
	StockNomenclatureSetDocumentItem: one(StockNomenclatureSetDocumentItems, {
		fields: [StockNomenclatureSetDocumentItemComponents.DocumentItemId],
		references: [StockNomenclatureSetDocumentItems.Id]
	}),
}));

export const StockNomenclatureSetDocumentItemsRelations = relations(StockNomenclatureSetDocumentItems, ({one, many}) => ({
	StockNomenclatureSetDocumentItemComponents: many(StockNomenclatureSetDocumentItemComponents),
	StockAccountingGroup: one(StockAccountingGroups, {
		fields: [StockNomenclatureSetDocumentItems.StockAccountingGroupId],
		references: [StockAccountingGroups.Id]
	}),
	StockNomenclatureSetDocument: one(StockNomenclatureSetDocuments, {
		fields: [StockNomenclatureSetDocumentItems.DocumentId],
		references: [StockNomenclatureSetDocuments.Id]
	}),
}));

export const StockReceiptDocumentItemsRelations = relations(StockReceiptDocumentItems, ({one, many}) => ({
	StockReceiptDocumentItemComponents: many(StockReceiptDocumentItemComponents),
	Nomenclature: one(Nomenclatures, {
		fields: [StockReceiptDocumentItems.NomenclatureId],
		references: [Nomenclatures.Id]
	}),
	StockReceiptDocument: one(StockReceiptDocuments, {
		fields: [StockReceiptDocumentItems.DocumentId],
		references: [StockReceiptDocuments.Id]
	}),
	UnitsOfMeasure: one(UnitsOfMeasure, {
		fields: [StockReceiptDocumentItems.UnitOfMeasureId],
		references: [UnitsOfMeasure.Id]
	}),
}));

export const StockUnwrapDocumentItemComponentsRelations = relations(StockUnwrapDocumentItemComponents, ({one}) => ({
	StockItem: one(StockItems, {
		fields: [StockUnwrapDocumentItemComponents.StockItemId],
		references: [StockItems.Id]
	}),
	StockUnwrapDocumentItem: one(StockUnwrapDocumentItems, {
		fields: [StockUnwrapDocumentItemComponents.DocumentItemId],
		references: [StockUnwrapDocumentItems.Id]
	}),
}));

export const StockUnwrapDocumentItemsRelations = relations(StockUnwrapDocumentItems, ({one, many}) => ({
	StockUnwrapDocumentItemComponents: many(StockUnwrapDocumentItemComponents),
	Nomenclature: one(Nomenclatures, {
		fields: [StockUnwrapDocumentItems.NomenclatureId],
		references: [Nomenclatures.Id]
	}),
	StockItem: one(StockItems, {
		fields: [StockUnwrapDocumentItems.StockItemId],
		references: [StockItems.Id]
	}),
	StockUnwrapDocument: one(StockUnwrapDocuments, {
		fields: [StockUnwrapDocumentItems.DocumentId],
		references: [StockUnwrapDocuments.Id]
	}),
	UnitsOfMeasure: one(UnitsOfMeasure, {
		fields: [StockUnwrapDocumentItems.UnitOfMeasureId],
		references: [UnitsOfMeasure.Id]
	}),
}));

export const StockUnwrapDocumentsRelations = relations(StockUnwrapDocuments, ({one, many}) => ({
	StockUnwrapDocumentItems: many(StockUnwrapDocumentItems),
	StockAccountingGroup: one(StockAccountingGroups, {
		fields: [StockUnwrapDocuments.StockAccountingGroupId],
		references: [StockAccountingGroups.Id]
	}),
	WarehouseManagement: one(WarehouseManagements, {
		fields: [StockUnwrapDocuments.WarehouseManagementId],
		references: [WarehouseManagements.Id]
	}),
}));

export const StockWriteoffDocumentItemComponentsRelations = relations(StockWriteoffDocumentItemComponents, ({one}) => ({
	StockItem: one(StockItems, {
		fields: [StockWriteoffDocumentItemComponents.StockItemId],
		references: [StockItems.Id]
	}),
	StockWriteoffDocumentItem: one(StockWriteoffDocumentItems, {
		fields: [StockWriteoffDocumentItemComponents.DocumentItemId],
		references: [StockWriteoffDocumentItems.Id]
	}),
}));

export const StockWriteoffDocumentItemsRelations = relations(StockWriteoffDocumentItems, ({one, many}) => ({
	StockWriteoffDocumentItemComponents: many(StockWriteoffDocumentItemComponents),
	StockAccountingGroup: one(StockAccountingGroups, {
		fields: [StockWriteoffDocumentItems.StockAccountingGroupId],
		references: [StockAccountingGroups.Id]
	}),
	StockWriteoffDocument: one(StockWriteoffDocuments, {
		fields: [StockWriteoffDocumentItems.DocumentId],
		references: [StockWriteoffDocuments.Id]
	}),
}));

export const StockWriteoffDocumentsRelations = relations(StockWriteoffDocuments, ({one, many}) => ({
	StockWriteoffDocumentItems: many(StockWriteoffDocumentItems),
	Company: one(Companies, {
		fields: [StockWriteoffDocuments.CompanyId],
		references: [Companies.Id]
	}),
	ExternalDocumentType: one(ExternalDocumentTypes, {
		fields: [StockWriteoffDocuments.ExternalDocumentTypeId],
		references: [ExternalDocumentTypes.Id]
	}),
	WarehouseManagement: one(WarehouseManagements, {
		fields: [StockWriteoffDocuments.WarehouseManagementId],
		references: [WarehouseManagements.Id]
	}),
}));

export const SupplierStockBalanceRegistriesRelations = relations(SupplierStockBalanceRegistries, ({one, many}) => ({
	Company: one(Companies, {
		fields: [SupplierStockBalanceRegistries.CompanyId],
		references: [Companies.Id]
	}),
	StockAccountingGroup: one(StockAccountingGroups, {
		fields: [SupplierStockBalanceRegistries.StockAccountingGroupId],
		references: [StockAccountingGroups.Id]
	}),
	SupplierStockCurrentBalanceRegistries: many(SupplierStockCurrentBalanceRegistries),
}));

export const SupplierStockCurrentBalanceRegistriesRelations = relations(SupplierStockCurrentBalanceRegistries, ({one}) => ({
	Company: one(Companies, {
		fields: [SupplierStockCurrentBalanceRegistries.CompanyId],
		references: [Companies.Id]
	}),
	StockAccountingGroup: one(StockAccountingGroups, {
		fields: [SupplierStockCurrentBalanceRegistries.StockAccountingGroupId],
		references: [StockAccountingGroups.Id]
	}),
	SupplierStockBalanceRegistry: one(SupplierStockBalanceRegistries, {
		fields: [SupplierStockCurrentBalanceRegistries.SupplierStockBalanceRegistryId],
		references: [SupplierStockBalanceRegistries.Id]
	}),
}));

export const SupplierStockMovementRegistriesRelations = relations(SupplierStockMovementRegistries, ({one}) => ({
	Company: one(Companies, {
		fields: [SupplierStockMovementRegistries.CompanyId],
		references: [Companies.Id]
	}),
	StockAccountingGroup: one(StockAccountingGroups, {
		fields: [SupplierStockMovementRegistries.StockAccountingGroupId],
		references: [StockAccountingGroups.Id]
	}),
}));

export const TaskMaterialComponentsRelations = relations(TaskMaterialComponents, ({one}) => ({
	StockItem: one(StockItems, {
		fields: [TaskMaterialComponents.StockItemId],
		references: [StockItems.Id]
	}),
	TaskMaterial: one(TaskMaterials, {
		fields: [TaskMaterialComponents.DocumentItemId],
		references: [TaskMaterials.Id]
	}),
}));

export const TaskMaterialsRelations = relations(TaskMaterials, ({one, many}) => ({
	TaskMaterialComponents: many(TaskMaterialComponents),
	StockAccountingGroup: one(StockAccountingGroups, {
		fields: [TaskMaterials.StockAccountingGroupId],
		references: [StockAccountingGroups.Id]
	}),
}));

export const ProductTypesRelations = relations(ProductTypes, ({many}) => ({
	WarehouseMovementDocuments: many(WarehouseMovementDocuments),
}));