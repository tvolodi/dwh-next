import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, binary, longtext, int, datetime, varchar, bigint, index, foreignKey, unique, decimal, double, float, text, mysqlView } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const AccountingTypes = mysqlTable("AccountingTypes", {
	Id: binary({ length: 16 }).notNull(),
	Description: longtext().notNull(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		AccountingTypes_Id: primaryKey({ columns: [table.Id], name: "AccountingTypes_Id"}),
	}
});

export const AccountingTypes_tracking = mysqlTable("AccountingTypes_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		AccountingTypes_tracking_Id: primaryKey({ columns: [table.Id], name: "AccountingTypes_tracking_Id"}),
	}
});

export const AssetAttributeValues = mysqlTable("AssetAttributeValues", {
	Id: int().autoincrement().notNull(),
	AssetAttributeId: binary({ length: 16 }).notNull().references(() => AssetAttributes.Id, { onDelete: "restrict" } ),
	AssetId: binary({ length: 16 }).notNull().references(() => Assets.Id, { onDelete: "restrict" } ),
	Value: longtext(),
	IsRemoved: tinyint().notNull(),
},
(table) => {
	return {
		IX_AssetAttributeValues_AssetAttributeId: index("IX_AssetAttributeValues_AssetAttributeId").on(table.AssetAttributeId),
		IX_AssetAttributeValues_AssetId: index("IX_AssetAttributeValues_AssetId").on(table.AssetId),
		AssetAttributeValues_Id: primaryKey({ columns: [table.Id], name: "AssetAttributeValues_Id"}),
	}
});

export const AssetAttributeValues_tracking = mysqlTable("AssetAttributeValues_tracking", {
	Id: int().notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		AssetAttributeValues_tracking_Id: primaryKey({ columns: [table.Id], name: "AssetAttributeValues_tracking_Id"}),
	}
});

export const AssetAttributes = mysqlTable("AssetAttributes", {
	Id: binary({ length: 16 }).notNull(),
	Description: varchar({ length: 255 }).notNull(),
	IsRemoved: tinyint().notNull(),
	Removed: datetime({ mode: 'string', fsp: 6 }).default('0001-01-01 00:00:00.000000'),
	RemovedById: int(),
},
(table) => {
	return {
		AssetAttributes_Id: primaryKey({ columns: [table.Id], name: "AssetAttributes_Id"}),
		IX_AssetAttributes_Description_Removed: unique("IX_AssetAttributes_Description_Removed").on(table.Description, table.Removed),
	}
});

export const AssetAttributes_tracking = mysqlTable("AssetAttributes_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		AssetAttributes_tracking_Id: primaryKey({ columns: [table.Id], name: "AssetAttributes_tracking_Id"}),
	}
});

export const AssetBalanceRegistries = mysqlTable("AssetBalanceRegistries", {
	Id: int().autoincrement().notNull(),
	AssetId: binary({ length: 16 }).notNull().references(() => Assets.Id, { onDelete: "cascade" } ),
	OrgUnitId: int(),
	CustodianUserId: int(),
	UtilizerUserId: int(),
	LocationId: int(),
	InitPrice: decimal({ precision: 33, scale: 5 }).notNull(),
	Depreciation: decimal({ precision: 33, scale: 5 }).notNull(),
	ResidualCost: decimal({ precision: 33, scale: 5 }).notNull(),
	AccountingQuantity: int().notNull(),
	ActualQuantity: int(),
	DocumentTypeId: longtext(),
	DocumentId: binary({ length: 16 }),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_AssetBalanceRegistries_AssetId: index("IX_AssetBalanceRegistries_AssetId").on(table.AssetId),
		AssetBalanceRegistries_Id: primaryKey({ columns: [table.Id], name: "AssetBalanceRegistries_Id"}),
	}
});

export const AssetClassAttributes = mysqlTable("AssetClassAttributes", {
	Id: binary({ length: 16 }).notNull(),
	AssetClassId: binary({ length: 16 }).notNull().references(() => AssetClasses.Id, { onDelete: "cascade" } ),
	AssetAttributeId: binary({ length: 16 }).notNull().references(() => AssetAttributes.Id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		IX_AssetClassAttributes_AssetClassId: index("IX_AssetClassAttributes_AssetClassId").on(table.AssetClassId),
		AssetClassAttributes_Id: primaryKey({ columns: [table.Id], name: "AssetClassAttributes_Id"}),
		IX_AssetClassAttributes_AssetAttributeId_AssetClassId: unique("IX_AssetClassAttributes_AssetAttributeId_AssetClassId").on(table.AssetAttributeId, table.AssetClassId),
	}
});

export const AssetClasses = mysqlTable("AssetClasses", {
	Id: binary({ length: 16 }).notNull(),
	Description: longtext(),
	CodeFromExtAcctSys: varchar({ length: 255 }),
	ParentId: binary({ length: 16 }),
	InheritParentalAttributes: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsRemoved: tinyint().default(0).notNull(),
	IsVisible: tinyint().default(1).notNull(),
},
(table) => {
	return {
		IX_AssetClasses_ParentId: index("IX_AssetClasses_ParentId").on(table.ParentId),
		FK_AssetClasses_AssetClasses_ParentId: foreignKey({
			columns: [table.ParentId],
			foreignColumns: [table.Id],
			name: "FK_AssetClasses_AssetClasses_ParentId"
		}).onDelete("restrict"),
		AssetClasses_Id: primaryKey({ columns: [table.Id], name: "AssetClasses_Id"}),
		IX_AssetClasses_CodeFromExtAcctSys: unique("IX_AssetClasses_CodeFromExtAcctSys").on(table.CodeFromExtAcctSys),
	}
});

export const AssetClasses_tracking = mysqlTable("AssetClasses_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		AssetClasses_tracking_Id: primaryKey({ columns: [table.Id], name: "AssetClasses_tracking_Id"}),
	}
});

export const AssetCurrentBalanceRegistries = mysqlTable("AssetCurrentBalanceRegistries", {
	Id: binary({ length: 16 }).notNull(),
	AssetId: binary({ length: 16 }).notNull().references(() => Assets.Id, { onDelete: "cascade" } ),
	AssetBalanceRegistryId: int().notNull().references(() => AssetBalanceRegistries.Id, { onDelete: "cascade" } ),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_AssetCurrentBalanceRegistries_AssetBalanceRegistryId: index("IX_AssetCurrentBalanceRegistries_AssetBalanceRegistryId").on(table.AssetBalanceRegistryId),
		IX_AssetCurrentBalanceRegistries_AssetId: index("IX_AssetCurrentBalanceRegistries_AssetId").on(table.AssetId),
		AssetCurrentBalanceRegistries_Id: primaryKey({ columns: [table.Id], name: "AssetCurrentBalanceRegistries_Id"}),
	}
});

export const AssetFiles = mysqlTable("AssetFiles", {
	Id: binary({ length: 16 }).notNull(),
	Path: longtext(),
	AssetId: binary({ length: 16 }).notNull().references(() => Assets.Id, { onDelete: "cascade" } ),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	MimeType: longtext(),
},
(table) => {
	return {
		IX_AssetFiles_AssetId: index("IX_AssetFiles_AssetId").on(table.AssetId),
		AssetFiles_Id: primaryKey({ columns: [table.Id], name: "AssetFiles_Id"}),
	}
});

export const AssetGroups = mysqlTable("AssetGroups", {
	Id: binary({ length: 16 }).notNull(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	FixedAssetCode: longtext(),
	AccountingDetails: longtext(),
	IncomingValue: int().notNull(),
	AcceptedForAccounting: datetime({ mode: 'string', fsp: 6 }).notNull(),
	CurrentValue: double().notNull(),
	UserId: int().notNull(),
	AmortizationRate: double().notNull(),
},
(table) => {
	return {
		AssetGroups_Id: primaryKey({ columns: [table.Id], name: "AssetGroups_Id"}),
	}
});

export const AssetMovementCountRegistries = mysqlTable("AssetMovementCountRegistries", {
	Id: binary({ length: 16 }).notNull(),
	AssetId: binary({ length: 16 }).notNull().references(() => Assets.Id, { onDelete: "restrict" } ),
	MovementCountTypeConditionId: binary({ length: 16 }).notNull().references(() => MovementCountTypeConditions.Id, { onDelete: "restrict" } ),
	FromAssetMovementRegistryId: int().references(() => AssetMovementRegistries.Id, { onDelete: "restrict" } ),
	ToAssetMovementRegistryId: int().notNull().references(() => AssetMovementRegistries.Id, { onDelete: "restrict" } ),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_AssetMovementCountRegistries_AssetId: index("IX_AssetMovementCountRegistries_AssetId").on(table.AssetId),
		IX_AssetMovementCountRegistries_FromAssetMovementRegistryId: index("IX_AssetMovementCountRegistries_FromAssetMovementRegistryId").on(table.FromAssetMovementRegistryId),
		IX_AssetMovementCountRegistries_MovementCountTypeConditionId: index("IX_AssetMovementCountRegistries_MovementCountTypeConditionId").on(table.MovementCountTypeConditionId),
		IX_AssetMovementCountRegistries_ToAssetMovementRegistryId: index("IX_AssetMovementCountRegistries_ToAssetMovementRegistryId").on(table.ToAssetMovementRegistryId),
		AssetMovementCountRegistries_Id: primaryKey({ columns: [table.Id], name: "AssetMovementCountRegistries_Id"}),
	}
});

export const AssetMovementDocumentItems = mysqlTable("AssetMovementDocumentItems", {
	Id: binary({ length: 16 }).notNull(),
	AssetId: binary({ length: 16 }).notNull().references(() => Assets.Id, { onDelete: "cascade" } ),
	AccountingQuantity: int().notNull(),
	ActualQuantity: int().notNull(),
	DocumentId: binary({ length: 16 }).notNull().references(() => AssetMovementDocuments.Id, { onDelete: "cascade" } ),
	RefKeyFromRegistry: int(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	FromLocationId: int(),
	ToLocationId: int(),
	FromUtilizerUserId: int(),
	ToUtilizerUserId: int(),
},
(table) => {
	return {
		IX_AssetMovementDocumentItems_AssetId: index("IX_AssetMovementDocumentItems_AssetId").on(table.AssetId),
		IX_AssetMovementDocumentItems_DocumentId: index("IX_AssetMovementDocumentItems_DocumentId").on(table.DocumentId),
		AssetMovementDocumentItems_Id: primaryKey({ columns: [table.Id], name: "AssetMovementDocumentItems_Id"}),
	}
});

export const AssetMovementDocumentItems_tracking = mysqlTable("AssetMovementDocumentItems_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		AssetMovementDocumentItems_tracking_Id: primaryKey({ columns: [table.Id], name: "AssetMovementDocumentItems_tracking_Id"}),
	}
});

export const AssetMovementDocuments = mysqlTable("AssetMovementDocuments", {
	Id: binary({ length: 16 }).notNull(),
	Number: longtext(),
	Description: longtext(),
	Date: datetime({ mode: 'string', fsp: 6 }).notNull(),
	FromOrgUnitId: int().notNull(),
	FromCustodianUserId: int().notNull(),
	ToOrgUnitId: int().notNull(),
	ToCustodianUserId: int().notNull(),
	DocumentStatusId: longtext(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsRemoved: tinyint().notNull(),
	WarehouseManagementId: binary({ length: 16 }).references(() => WarehouseManagements.Id, { onDelete: "set null" } ),
	DocumentStatusNewId: binary({ length: 16 }).default('0x').notNull(),
	AccountingCode: longtext(),
},
(table) => {
	return {
		IX_AssetMovementDocuments_WarehouseManagementId: index("IX_AssetMovementDocuments_WarehouseManagementId").on(table.WarehouseManagementId),
		AssetMovementDocuments_Id: primaryKey({ columns: [table.Id], name: "AssetMovementDocuments_Id"}),
	}
});

export const AssetMovementDocuments_tracking = mysqlTable("AssetMovementDocuments_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		AssetMovementDocuments_tracking_Id: primaryKey({ columns: [table.Id], name: "AssetMovementDocuments_tracking_Id"}),
	}
});

export const AssetMovementRegistries = mysqlTable("AssetMovementRegistries", {
	Id: int().autoincrement().notNull(),
	AssetId: binary({ length: 16 }).notNull().references(() => Assets.Id, { onDelete: "cascade" } ),
	OrgUnitId: int(),
	CustodianUserId: int(),
	UtilizerUserId: int(),
	LocationId: int(),
	AccountingQuantity: int().notNull(),
	ActualQuantity: int(),
	DocumentTypeId: longtext(),
	DocumentId: binary({ length: 16 }),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_AssetMovementRegistries_AssetId: index("IX_AssetMovementRegistries_AssetId").on(table.AssetId),
		AssetMovementRegistries_Id: primaryKey({ columns: [table.Id], name: "AssetMovementRegistries_Id"}),
	}
});

export const AssetProvisionDocumentItems = mysqlTable("AssetProvisionDocumentItems", {
	Id: binary({ length: 16 }).notNull(),
	DocumentId: binary({ length: 16 }).notNull().references(() => AssetProvisionDocuments.Id, { onDelete: "cascade" } ),
	AssetClassId: binary({ length: 16 }).references(() => AssetClasses.Id, { onDelete: "restrict" } ),
	AssetName: longtext(),
	Quantity: int().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	AssetTypeId: binary({ length: 16 }).references(() => AssetTypes.Id, { onDelete: "restrict" } ),
},
(table) => {
	return {
		IX_AssetProvisionDocumentItems_AssetClassId: index("IX_AssetProvisionDocumentItems_AssetClassId").on(table.AssetClassId),
		IX_AssetProvisionDocumentItems_AssetTypeId: index("IX_AssetProvisionDocumentItems_AssetTypeId").on(table.AssetTypeId),
		IX_AssetProvisionDocumentItems_DocumentId: index("IX_AssetProvisionDocumentItems_DocumentId").on(table.DocumentId),
		AssetProvisionDocumentItems_Id: primaryKey({ columns: [table.Id], name: "AssetProvisionDocumentItems_Id"}),
	}
});

export const AssetProvisionDocumentResponsibleUsers = mysqlTable("AssetProvisionDocumentResponsibleUsers", {
	Id: binary({ length: 16 }).notNull(),
	DocumentId: binary({ length: 16 }).notNull().references(() => AssetProvisionDocuments.Id, { onDelete: "cascade" } ),
	ResponsibleUserId: int().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		AssetProvisionDocumentResponsibleUsers_Id: primaryKey({ columns: [table.Id], name: "AssetProvisionDocumentResponsibleUsers_Id"}),
		"IX_AssetProvisionDocumentResponsibleUsers_DocumentId_Responsibl~": unique("IX_AssetProvisionDocumentResponsibleUsers_DocumentId_Responsibl~").on(table.DocumentId, table.ResponsibleUserId),
	}
});

export const AssetProvisionDocuments = mysqlTable("AssetProvisionDocuments", {
	Id: binary({ length: 16 }).notNull(),
	RequisitionNumber: longtext(),
	Description: longtext(),
	Date: datetime({ mode: 'string', fsp: 6 }).notNull(),
	OrgUnitId: int().notNull(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsConsidered: tinyint().default(1).notNull(),
},
(table) => {
	return {
		AssetProvisionDocuments_Id: primaryKey({ columns: [table.Id], name: "AssetProvisionDocuments_Id"}),
	}
});

export const AssetReceiptDocumentItems = mysqlTable("AssetReceiptDocumentItems", {
	Id: binary({ length: 16 }).notNull(),
	AssetId: binary({ length: 16 }).notNull().references(() => Assets.Id, { onDelete: "cascade" } ),
	InitPrice: decimal({ precision: 33, scale: 5 }).notNull(),
	Depreciation: decimal({ precision: 33, scale: 5 }).notNull(),
	AccountingQuantity: int().notNull(),
	ActualQuantity: int().notNull(),
	DocumentId: binary({ length: 16 }).notNull().references(() => AssetReceiptDocuments.Id, { onDelete: "cascade" } ),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	LocationId: int(),
	UtilizerUserId: int(),
	RowNumber: int().default(0).notNull(),
},
(table) => {
	return {
		IX_AssetReceiptDocumentItems_AssetId: index("IX_AssetReceiptDocumentItems_AssetId").on(table.AssetId),
		IX_AssetReceiptDocumentItems_DocumentId: index("IX_AssetReceiptDocumentItems_DocumentId").on(table.DocumentId),
		AssetReceiptDocumentItems_Id: primaryKey({ columns: [table.Id], name: "AssetReceiptDocumentItems_Id"}),
	}
});

export const AssetReceiptDocuments = mysqlTable("AssetReceiptDocuments", {
	Id: binary({ length: 16 }).notNull(),
	Number: longtext(),
	Description: longtext(),
	Date: datetime({ mode: 'string', fsp: 6 }).notNull(),
	CustodianUserId: int().notNull(),
	DocAuthorId: int().notNull(),
	ApprovedByUserId: int(),
	DocumentStatusId: longtext(),
	IsRemoved: tinyint().notNull(),
	OrgUnitId: int(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	WarehouseManagementId: binary({ length: 16 }).references(() => WarehouseManagements.Id, { onDelete: "set null" } ),
	DocumentStatusNewId: binary({ length: 16 }).default('0x').notNull(),
	AccountingCode: longtext(),
},
(table) => {
	return {
		IX_AssetReceiptDocuments_WarehouseManagementId: index("IX_AssetReceiptDocuments_WarehouseManagementId").on(table.WarehouseManagementId),
		AssetReceiptDocuments_Id: primaryKey({ columns: [table.Id], name: "AssetReceiptDocuments_Id"}),
	}
});

export const AssetStatuses = mysqlTable("AssetStatuses", {
	Id: varchar({ length: 255 }).notNull(),
	Description: varchar({ length: 200 }),
},
(table) => {
	return {
		AssetStatuses_Id: primaryKey({ columns: [table.Id], name: "AssetStatuses_Id"}),
	}
});

export const AssetStatuses_tracking = mysqlTable("AssetStatuses_tracking", {
	Id: varchar({ length: 255 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		AssetStatuses_tracking_Id: primaryKey({ columns: [table.Id], name: "AssetStatuses_tracking_Id"}),
	}
});

export const AssetTypes = mysqlTable("AssetTypes", {
	Id: binary({ length: 16 }).notNull(),
	Name: longtext(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	Description: longtext(),
},
(table) => {
	return {
		AssetTypes_Id: primaryKey({ columns: [table.Id], name: "AssetTypes_Id"}),
	}
});

export const AssetTypes_tracking = mysqlTable("AssetTypes_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		AssetTypes_tracking_Id: primaryKey({ columns: [table.Id], name: "AssetTypes_tracking_Id"}),
	}
});

export const AssetWriteOffDocumentItems = mysqlTable("AssetWriteOffDocumentItems", {
	Id: binary({ length: 16 }).notNull(),
	AssetId: binary({ length: 16 }).notNull().references(() => Assets.Id, { onDelete: "restrict" } ),
	LocationId: int(),
	UtilizerUserId: int(),
	DocumentId: binary({ length: 16 }).notNull().references(() => AssetWriteOffDocuments.Id, { onDelete: "restrict" } ),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_AssetWriteOffDocumentItems_AssetId: index("IX_AssetWriteOffDocumentItems_AssetId").on(table.AssetId),
		IX_AssetWriteOffDocumentItems_DocumentId: index("IX_AssetWriteOffDocumentItems_DocumentId").on(table.DocumentId),
		AssetWriteOffDocumentItems_Id: primaryKey({ columns: [table.Id], name: "AssetWriteOffDocumentItems_Id"}),
	}
});

export const AssetWriteOffDocuments = mysqlTable("AssetWriteOffDocuments", {
	Id: binary({ length: 16 }).notNull(),
	Number: longtext().notNull(),
	Description: longtext().notNull(),
	Date: datetime({ mode: 'string', fsp: 6 }).notNull(),
	OrgUnitId: int(),
	CustodianUserId: int().notNull(),
	DocAuthorId: int().notNull(),
	ApprovedByUserId: int(),
	DocumentStatusId: longtext().notNull(),
	OrderNumber: longtext(),
	WarehouseManagementId: binary({ length: 16 }).references(() => WarehouseManagements.Id, { onDelete: "set null" } ),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	DocumentStatusNewId: binary({ length: 16 }).default('0x').notNull(),
},
(table) => {
	return {
		IX_AssetWriteOffDocuments_WarehouseManagementId: index("IX_AssetWriteOffDocuments_WarehouseManagementId").on(table.WarehouseManagementId),
		AssetWriteOffDocuments_Id: primaryKey({ columns: [table.Id], name: "AssetWriteOffDocuments_Id"}),
	}
});

export const Assets = mysqlTable("Assets", {
	Id: binary({ length: 16 }).notNull(),
	Name: longtext(),
	InventoryNumber: varchar({ length: 255 }),
	SubInventoryNumber: longtext(),
	CommissioningDate: datetime({ mode: 'string', fsp: 6 }),
	IssueDate: datetime({ mode: 'string', fsp: 6 }),
	SerialNumber: longtext(),
	MaintenancePeriod: int(),
	InitPrice: decimal({ precision: 33, scale: 5 }),
	Depreciation: decimal({ precision: 33, scale: 5 }),
	CodeFromExtAcctSys: varchar({ length: 255 }),
	Description: varchar({ length: 500 }),
	AssetClassId: binary({ length: 16 }).references(() => AssetClasses.Id, { onDelete: "restrict" } ),
	AssetStatusId: varchar({ length: 255 }).references(() => AssetStatuses.Id, { onDelete: "restrict" } ),
	AccountingTypeId: binary({ length: 16 }).notNull().references(() => AccountingTypes.Id, { onDelete: "restrict" } ),
	LocationNote: longtext(),
	Manufacturer: longtext(),
	Model: longtext(),
	Nameplate: longtext(),
	Notes: longtext(),
	Latitude: double(),
	Longitude: double(),
	ParentId: binary({ length: 16 }),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	LocationId: int(),
	OrgUnitId: int(),
	CustodianUserId: int(),
	UtilizerUserId: int(),
	AssetTypeId: binary({ length: 16 }).references(() => AssetTypes.Id, { onDelete: "restrict" } ),
	AccumulatedDepreciation: decimal({ precision: 33, scale: 5 }),
	BalanceAccount: longtext(),
	CadastralNumber: longtext(),
	CostCenter: longtext(),
	LiquidationValue: decimal({ precision: 33, scale: 5 }),
	ObjectStatusId: longtext().notNull(),
	StateNumber: longtext(),
	NormalWeight: double().notNull(),
	NormalWeightUnitOfMeasureId: binary({ length: 16 }).references(() => UnitsOfMeasure.Id, { onDelete: "restrict" } ),
	Photos: longtext(),
	ComponentTypeId: binary({ length: 16 }),
	AssetGroupId: binary({ length: 16 }).references(() => AssetGroups.Id, { onDelete: "restrict" } ),
},
(table) => {
	return {
		IX_Assets_AccountingTypeId: index("IX_Assets_AccountingTypeId").on(table.AccountingTypeId),
		IX_Assets_AssetClassId: index("IX_Assets_AssetClassId").on(table.AssetClassId),
		IX_Assets_AssetGroupId: index("IX_Assets_AssetGroupId").on(table.AssetGroupId),
		IX_Assets_AssetStatusId: index("IX_Assets_AssetStatusId").on(table.AssetStatusId),
		IX_Assets_AssetTypeId: index("IX_Assets_AssetTypeId").on(table.AssetTypeId),
		IX_Assets_NormalWeightUnitOfMeasureId: index("IX_Assets_NormalWeightUnitOfMeasureId").on(table.NormalWeightUnitOfMeasureId),
		IX_Assets_ParentId: index("IX_Assets_ParentId").on(table.ParentId),
		FK_Assets_Assets_ParentId: foreignKey({
			columns: [table.ParentId],
			foreignColumns: [table.Id],
			name: "FK_Assets_Assets_ParentId"
		}).onDelete("restrict"),
		Assets_Id: primaryKey({ columns: [table.Id], name: "Assets_Id"}),
		IX_Assets_CodeFromExtAcctSys: unique("IX_Assets_CodeFromExtAcctSys").on(table.CodeFromExtAcctSys),
		IX_Assets_InventoryNumber: unique("IX_Assets_InventoryNumber").on(table.InventoryNumber),
	}
});

export const Assets_tracking = mysqlTable("Assets_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		Assets_tracking_Id: primaryKey({ columns: [table.Id], name: "Assets_tracking_Id"}),
	}
});

export const CodeTypes = mysqlTable("CodeTypes", {
	Id: int().autoincrement().notNull(),
	Name: varchar({ length: 255 }),
	Description: longtext(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_CodeTypes_Name: index("IX_CodeTypes_Name").on(table.Name),
		CodeTypes_Id: primaryKey({ columns: [table.Id], name: "CodeTypes_Id"}),
	}
});

export const CodeTypes_tracking = mysqlTable("CodeTypes_tracking", {
	Id: int().notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		CodeTypes_tracking_Id: primaryKey({ columns: [table.Id], name: "CodeTypes_tracking_Id"}),
	}
});

export const Codes = mysqlTable("Codes", {
	Id: binary({ length: 16 }).notNull(),
	CodeTypeId: int().notNull().references(() => CodeTypes.Id, { onDelete: "cascade" } ),
	Status: longtext().notNull(),
	Position: longtext().notNull(),
	CodeString: varchar({ length: 255 }).notNull(),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	EntityType: varchar({ length: 255 }).notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	BindingDate: datetime({ mode: 'string', fsp: 6 }),
	UnbindingDate: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_Codes_CodeString_CodeTypeId_EntityType: index("IX_Codes_CodeString_CodeTypeId_EntityType").on(table.CodeString, table.CodeTypeId, table.EntityType),
		IX_Codes_CodeTypeId: index("IX_Codes_CodeTypeId").on(table.CodeTypeId),
		IX_Codes_EntityGuidId: index("IX_Codes_EntityGuidId").on(table.EntityGuidId),
		Codes_Id: primaryKey({ columns: [table.Id], name: "Codes_Id"}),
		IX_Codes_CodeString_CodeTypeId: unique("IX_Codes_CodeString_CodeTypeId").on(table.CodeString, table.CodeTypeId),
	}
});

export const Codes_tracking = mysqlTable("Codes_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		Codes_tracking_Id: primaryKey({ columns: [table.Id], name: "Codes_tracking_Id"}),
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

export const Companies = mysqlTable("Companies", {
	Id: binary({ length: 16 }).notNull(),
	BIN: varchar({ length: 200 }).notNull(),
	FullName: varchar({ length: 200 }).notNull(),
	Alias: varchar({ length: 200 }),
	IsRemoved: tinyint().notNull(),
	Code: varchar({ length: 200 }),
	IsBuyer: tinyint().default(0).notNull(),
	PersonType: varchar({ length: 200 }),
	RNN: varchar({ length: 200 }),
	ResidentCountry: varchar({ length: 200 }),
	Group: varchar({ length: 200 }),
},
(table) => {
	return {
		Companies_Id: primaryKey({ columns: [table.Id], name: "Companies_Id"}),
		IX_Companies_BIN: unique("IX_Companies_BIN").on(table.BIN),
	}
});

export const Companies_tracking = mysqlTable("Companies_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		Companies_tracking_Id: primaryKey({ columns: [table.Id], name: "Companies_tracking_Id"}),
	}
});

export const ContainerItemRegistries = mysqlTable("ContainerItemRegistries", {
	Id: int().autoincrement().notNull(),
	RegistrationDate: datetime({ mode: 'string', fsp: 6 }).notNull(),
	ContainerId: binary({ length: 16 }).notNull().references(() => Containers.Id, { onDelete: "restrict" } ),
	Direction: longtext().notNull(),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	EntityType: longtext().notNull(),
	OrgUnitId: int(),
	LocationId: int(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsRemoved: tinyint().notNull(),
},
(table) => {
	return {
		IX_ContainerItemRegistries_ContainerId: index("IX_ContainerItemRegistries_ContainerId").on(table.ContainerId),
		ContainerItemRegistries_Id: primaryKey({ columns: [table.Id], name: "ContainerItemRegistries_Id"}),
	}
});

export const ContainerItems = mysqlTable("ContainerItems", {
	Id: binary({ length: 16 }).notNull(),
	ContainerId: binary({ length: 16 }).notNull().references(() => Containers.Id, { onDelete: "restrict" } ),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	EntityType: longtext().notNull(),
},
(table) => {
	return {
		IX_ContainerItems_ContainerId: index("IX_ContainerItems_ContainerId").on(table.ContainerId),
		ContainerItems_Id: primaryKey({ columns: [table.Id], name: "ContainerItems_Id"}),
	}
});

export const ContainerTypes = mysqlTable("ContainerTypes", {
	Id: int().autoincrement().notNull(),
	Name: longtext(),
	IsTransport: tinyint().notNull(),
	ParentId: int(),
},
(table) => {
	return {
		IX_ContainerTypes_ParentId: index("IX_ContainerTypes_ParentId").on(table.ParentId),
		FK_ContainerTypes_ContainerTypes_ParentId: foreignKey({
			columns: [table.ParentId],
			foreignColumns: [table.Id],
			name: "FK_ContainerTypes_ContainerTypes_ParentId"
		}).onDelete("restrict"),
		ContainerTypes_Id: primaryKey({ columns: [table.Id], name: "ContainerTypes_Id"}),
	}
});

export const Containers = mysqlTable("Containers", {
	Id: binary({ length: 16 }).notNull(),
	Name: longtext(),
	InUse: tinyint().notNull(),
	LocationId: int(),
	OrgUnitId: int(),
	ContainerTypeId: int().notNull().references(() => ContainerTypes.Id, { onDelete: "restrict" } ),
},
(table) => {
	return {
		IX_Containers_ContainerTypeId: index("IX_Containers_ContainerTypeId").on(table.ContainerTypeId),
		Containers_Id: primaryKey({ columns: [table.Id], name: "Containers_Id"}),
	}
});

export const CustodianInventoryDocuments = mysqlTable("CustodianInventoryDocuments", {
	Id: binary({ length: 16 }).notNull(),
	ExternalDocId: binary({ length: 16 }).notNull(),
	CustodianUserId: int().notNull(),
	Created: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		CustodianInventoryDocuments_Id: primaryKey({ columns: [table.Id], name: "CustodianInventoryDocuments_Id"}),
	}
});

export const CustomerStockBalanceRegistries = mysqlTable("CustomerStockBalanceRegistries", {
	Id: int().autoincrement().notNull(),
	StockAccountingGroupId: binary({ length: 16 }).notNull().references(() => StockAccountingGroups.Id, { onDelete: "cascade" } ),
	CompanyId: binary({ length: 16 }).references(() => Companies.Id, { onDelete: "restrict" } ),
	DocumentTypeId: longtext(),
	DocumentId: binary({ length: 16 }),
	PostDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	Quantity: decimal({ precision: 12, scale: 2 }).notNull(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_CustomerStockBalanceRegistries_CompanyId: index("IX_CustomerStockBalanceRegistries_CompanyId").on(table.CompanyId),
		IX_CustomerStockBalanceRegistries_StockAccountingGroupId: index("IX_CustomerStockBalanceRegistries_StockAccountingGroupId").on(table.StockAccountingGroupId),
		CustomerStockBalanceRegistries_Id: primaryKey({ columns: [table.Id], name: "CustomerStockBalanceRegistries_Id"}),
	}
});

export const CustomerStockCurrentBalanceRegistries = mysqlTable("CustomerStockCurrentBalanceRegistries", {
	Id: binary({ length: 16 }).notNull(),
	StockAccountingGroupId: binary({ length: 16 }).notNull().references(() => StockAccountingGroups.Id, { onDelete: "cascade" } ),
	CompanyId: binary({ length: 16 }).references(() => Companies.Id, { onDelete: "restrict" } ),
	CustomerStockBalanceRegistryId: int().notNull().references(() => CustomerStockBalanceRegistries.Id, { onDelete: "cascade" } ),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_CustomerStockCurrentBalanceRegistries_CompanyId: index("IX_CustomerStockCurrentBalanceRegistries_CompanyId").on(table.CompanyId),
		"IX_CustomerStockCurrentBalanceRegistries_CustomerStockBalanceRe~": index("IX_CustomerStockCurrentBalanceRegistries_CustomerStockBalanceRe~").on(table.CustomerStockBalanceRegistryId),
		IX_CustomerStockCurrentBalanceRegistries_StockAccountingGroupId: index("IX_CustomerStockCurrentBalanceRegistries_StockAccountingGroupId").on(table.StockAccountingGroupId),
		CustomerStockCurrentBalanceRegistries_Id: primaryKey({ columns: [table.Id], name: "CustomerStockCurrentBalanceRegistries_Id"}),
	}
});

export const CustomerStockMovementRegistries = mysqlTable("CustomerStockMovementRegistries", {
	Id: int().autoincrement().notNull(),
	StockAccountingGroupId: binary({ length: 16 }).notNull().references(() => StockAccountingGroups.Id, { onDelete: "cascade" } ),
	CompanyId: binary({ length: 16 }).references(() => Companies.Id, { onDelete: "restrict" } ),
	DocumentTypeId: longtext(),
	DocumentId: binary({ length: 16 }),
	PostDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	Quantity: decimal({ precision: 12, scale: 2 }).notNull(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_CustomerStockMovementRegistries_CompanyId: index("IX_CustomerStockMovementRegistries_CompanyId").on(table.CompanyId),
		IX_CustomerStockMovementRegistries_StockAccountingGroupId: index("IX_CustomerStockMovementRegistries_StockAccountingGroupId").on(table.StockAccountingGroupId),
		CustomerStockMovementRegistries_Id: primaryKey({ columns: [table.Id], name: "CustomerStockMovementRegistries_Id"}),
	}
});

export const DocumentStatuses = mysqlTable("DocumentStatuses", {
	Id: varchar({ length: 255 }).notNull(),
	Name: varchar({ length: 200 }),
	IsSystemRecord: tinyint().notNull(),
	IsRemoved: tinyint().notNull(),
},
(table) => {
	return {
		DocumentStatuses_Id: primaryKey({ columns: [table.Id], name: "DocumentStatuses_Id"}),
	}
});

export const DocumentStatuses_tracking = mysqlTable("DocumentStatuses_tracking", {
	Id: varchar({ length: 255 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		DocumentStatuses_tracking_Id: primaryKey({ columns: [table.Id], name: "DocumentStatuses_tracking_Id"}),
	}
});

export const DocumentTypeStatusAccesses = mysqlTable("DocumentTypeStatusAccesses", {
	Id: binary({ length: 16 }).notNull(),
	RoleId: int().notNull(),
	DocumentTypeStatusId: binary({ length: 16 }).notNull().references(() => DocumentTypeStatuses.Id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		IX_DocumentTypeStatusAccesses_DocumentTypeStatusId: index("IX_DocumentTypeStatusAccesses_DocumentTypeStatusId").on(table.DocumentTypeStatusId),
		DocumentTypeStatusAccesses_Id: primaryKey({ columns: [table.Id], name: "DocumentTypeStatusAccesses_Id"}),
	}
});

export const DocumentTypeStatusAccesses_tracking = mysqlTable("DocumentTypeStatusAccesses_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		DocumentTypeStatusAccesses_tracking_Id: primaryKey({ columns: [table.Id], name: "DocumentTypeStatusAccesses_tracking_Id"}),
	}
});

export const DocumentTypeStatuses = mysqlTable("DocumentTypeStatuses", {
	Id: binary({ length: 16 }).notNull(),
	DocumentTypeId: varchar({ length: 255 }).notNull().references(() => DocumentTypes.Id, { onDelete: "cascade" } ),
	DocumentStatusId: varchar({ length: 255 }).notNull().references(() => DocumentStatuses.Id, { onDelete: "cascade" } ),
	IsSystemRecord: tinyint().notNull(),
},
(table) => {
	return {
		IX_DocumentTypeStatuses_DocumentStatusId: index("IX_DocumentTypeStatuses_DocumentStatusId").on(table.DocumentStatusId),
		IX_DocumentTypeStatuses_DocumentTypeId: index("IX_DocumentTypeStatuses_DocumentTypeId").on(table.DocumentTypeId),
		DocumentTypeStatuses_Id: primaryKey({ columns: [table.Id], name: "DocumentTypeStatuses_Id"}),
	}
});

export const DocumentTypeStatuses_tracking = mysqlTable("DocumentTypeStatuses_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		DocumentTypeStatuses_tracking_Id: primaryKey({ columns: [table.Id], name: "DocumentTypeStatuses_tracking_Id"}),
	}
});

export const DocumentTypes = mysqlTable("DocumentTypes", {
	Id: varchar({ length: 255 }).notNull(),
	IsRemoved: tinyint().notNull(),
},
(table) => {
	return {
		DocumentTypes_Id: primaryKey({ columns: [table.Id], name: "DocumentTypes_Id"}),
	}
});

export const DocumentTypes_tracking = mysqlTable("DocumentTypes_tracking", {
	Id: varchar({ length: 255 }).notNull(),
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

export const ExternalDocumentTypes = mysqlTable("ExternalDocumentTypes", {
	Id: int().autoincrement().notNull(),
	Code: longtext(),
	Name: longtext(),
	IsRemoved: tinyint().notNull(),
},
(table) => {
	return {
		ExternalDocumentTypes_Id: primaryKey({ columns: [table.Id], name: "ExternalDocumentTypes_Id"}),
	}
});

export const FileEntityTypes = mysqlTable("FileEntityTypes", {
	Id: binary({ length: 16 }).notNull(),
	FileEntityId: varchar({ length: 255 }).notNull(),
	FileTypeId: varchar({ length: 255 }).notNull().references(() => FileTypes.Id, { onDelete: "restrict" } ),
},
(table) => {
	return {
		IX_FileEntityTypes_FileTypeId: index("IX_FileEntityTypes_FileTypeId").on(table.FileTypeId),
		FileEntityTypes_Id: primaryKey({ columns: [table.Id], name: "FileEntityTypes_Id"}),
		IX_FileEntityTypes_FileEntityId_FileTypeId: unique("IX_FileEntityTypes_FileEntityId_FileTypeId").on(table.FileEntityId, table.FileTypeId),
	}
});

export const FileEntityTypes_tracking = mysqlTable("FileEntityTypes_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		FileEntityTypes_tracking_Id: primaryKey({ columns: [table.Id], name: "FileEntityTypes_tracking_Id"}),
	}
});

export const FileTypes = mysqlTable("FileTypes", {
	Id: varchar({ length: 255 }).notNull(),
	Description: varchar({ length: 255 }).notNull(),
},
(table) => {
	return {
		FileTypes_Id: primaryKey({ columns: [table.Id], name: "FileTypes_Id"}),
		IX_FileTypes_Description: unique("IX_FileTypes_Description").on(table.Description),
	}
});

export const FileTypes_tracking = mysqlTable("FileTypes_tracking", {
	Id: varchar({ length: 255 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		FileTypes_tracking_Id: primaryKey({ columns: [table.Id], name: "FileTypes_tracking_Id"}),
	}
});

export const HangfireAggregatedCounter = mysqlTable("HangfireAggregatedCounter", {
	Id: int().autoincrement().notNull(),
	Key: varchar({ length: 100 }).notNull(),
	Value: int().notNull(),
	ExpireAt: datetime({ mode: 'string'}),
},
(table) => {
	return {
		HangfireAggregatedCounter_Id: primaryKey({ columns: [table.Id], name: "HangfireAggregatedCounter_Id"}),
		IX_HangfireCounterAggregated_Key: unique("IX_HangfireCounterAggregated_Key").on(table.Key),
	}
});

export const HangfireCounter = mysqlTable("HangfireCounter", {
	Id: int().autoincrement().notNull(),
	Key: varchar({ length: 100 }).notNull(),
	Value: int().notNull(),
	ExpireAt: datetime({ mode: 'string'}),
},
(table) => {
	return {
		IX_HangfireCounter_Key: index("IX_HangfireCounter_Key").on(table.Key),
		HangfireCounter_Id: primaryKey({ columns: [table.Id], name: "HangfireCounter_Id"}),
	}
});

export const HangfireDistributedLock = mysqlTable("HangfireDistributedLock", {
	Resource: varchar({ length: 100 }).notNull(),
	CreatedAt: datetime({ mode: 'string', fsp: 6 }).notNull(),
});

export const HangfireHash = mysqlTable("HangfireHash", {
	Id: int().autoincrement().notNull(),
	Key: varchar({ length: 100 }).notNull(),
	Field: varchar({ length: 40 }).notNull(),
	Value: longtext(),
	ExpireAt: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		HangfireHash_Id: primaryKey({ columns: [table.Id], name: "HangfireHash_Id"}),
		IX_HangfireHash_Key_Field: unique("IX_HangfireHash_Key_Field").on(table.Key, table.Field),
	}
});

export const HangfireJob = mysqlTable("HangfireJob", {
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
		IX_HangfireJob_StateName: index("IX_HangfireJob_StateName").on(table.StateName),
		HangfireJob_Id: primaryKey({ columns: [table.Id], name: "HangfireJob_Id"}),
	}
});

export const HangfireJobParameter = mysqlTable("HangfireJobParameter", {
	Id: int().autoincrement().notNull(),
	JobId: int().notNull().references(() => HangfireJob.Id, { onDelete: "cascade", onUpdate: "cascade" } ),
	Name: varchar({ length: 40 }).notNull(),
	Value: longtext(),
},
(table) => {
	return {
		HangfireJobParameter_Id: primaryKey({ columns: [table.Id], name: "HangfireJobParameter_Id"}),
		IX_HangfireJobParameter_JobId_Name: unique("IX_HangfireJobParameter_JobId_Name").on(table.JobId, table.Name),
	}
});

export const HangfireJobQueue = mysqlTable("HangfireJobQueue", {
	Id: int().autoincrement().notNull(),
	JobId: int().notNull(),
	FetchedAt: datetime({ mode: 'string', fsp: 6 }),
	Queue: varchar({ length: 50 }).notNull(),
	FetchToken: varchar({ length: 36 }),
},
(table) => {
	return {
		IX_HangfireJobQueue_QueueAndFetchedAt: index("IX_HangfireJobQueue_QueueAndFetchedAt").on(table.Queue, table.FetchedAt),
		HangfireJobQueue_Id: primaryKey({ columns: [table.Id], name: "HangfireJobQueue_Id"}),
	}
});

export const HangfireJobState = mysqlTable("HangfireJobState", {
	Id: int().autoincrement().notNull(),
	JobId: int().notNull().references(() => HangfireJob.Id, { onDelete: "cascade", onUpdate: "cascade" } ),
	CreatedAt: datetime({ mode: 'string', fsp: 6 }).notNull(),
	Name: varchar({ length: 20 }).notNull(),
	Reason: varchar({ length: 100 }),
	Data: longtext(),
},
(table) => {
	return {
		HangfireJobState_Id: primaryKey({ columns: [table.Id], name: "HangfireJobState_Id"}),
	}
});

export const HangfireList = mysqlTable("HangfireList", {
	Id: int().autoincrement().notNull(),
	Key: varchar({ length: 100 }).notNull(),
	Value: longtext(),
	ExpireAt: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		HangfireList_Id: primaryKey({ columns: [table.Id], name: "HangfireList_Id"}),
	}
});

export const HangfireServer = mysqlTable("HangfireServer", {
	Id: varchar({ length: 100 }).notNull(),
	Data: longtext().notNull(),
	LastHeartbeat: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		HangfireServer_Id: primaryKey({ columns: [table.Id], name: "HangfireServer_Id"}),
	}
});

export const HangfireSet = mysqlTable("HangfireSet", {
	Id: int().autoincrement().notNull(),
	Key: varchar({ length: 100 }).notNull(),
	Value: varchar({ length: 256 }).notNull(),
	Score: float().notNull(),
	ExpireAt: datetime({ mode: 'string'}),
},
(table) => {
	return {
		HangfireSet_Id: primaryKey({ columns: [table.Id], name: "HangfireSet_Id"}),
		IX_HangfireSet_Key_Value: unique("IX_HangfireSet_Key_Value").on(table.Key, table.Value),
	}
});

export const HangfireState = mysqlTable("HangfireState", {
	Id: int().autoincrement().notNull(),
	JobId: int().notNull().references(() => HangfireJob.Id, { onDelete: "cascade", onUpdate: "cascade" } ),
	Name: varchar({ length: 20 }).notNull(),
	Reason: varchar({ length: 100 }),
	CreatedAt: datetime({ mode: 'string', fsp: 6 }).notNull(),
	Data: longtext(),
},
(table) => {
	return {
		HangfireState_Id: primaryKey({ columns: [table.Id], name: "HangfireState_Id"}),
	}
});

export const InventoryCommissionPeople = mysqlTable("InventoryCommissionPeople", {
	Id: int().autoincrement().notNull(),
	FullName: longtext().notNull(),
	PersonnelNumber: longtext(),
	InventoryCommissionPositionId: int().notNull().references(() => InventoryCommissionPositions.Id, { onDelete: "cascade" } ),
	UserId: int(),
	InventoryDocumentId: binary({ length: 16 }).references(() => InventoryDocuments.Id, { onDelete: "restrict" } ),
	StockInventoryDocumentId: binary({ length: 16 }).references(() => StockInventoryDocuments.Id, { onDelete: "restrict" } ),
},
(table) => {
	return {
		IX_InventoryCommissionPeople_InventoryCommissionPositionId: index("IX_InventoryCommissionPeople_InventoryCommissionPositionId").on(table.InventoryCommissionPositionId),
		IX_InventoryCommissionPeople_InventoryDocumentId: index("IX_InventoryCommissionPeople_InventoryDocumentId").on(table.InventoryDocumentId),
		IX_InventoryCommissionPeople_StockInventoryDocumentId: index("IX_InventoryCommissionPeople_StockInventoryDocumentId").on(table.StockInventoryDocumentId),
		InventoryCommissionPeople_Id: primaryKey({ columns: [table.Id], name: "InventoryCommissionPeople_Id"}),
	}
});

export const InventoryCommissionPositions = mysqlTable("InventoryCommissionPositions", {
	Id: int().autoincrement().notNull(),
	Description: longtext(),
},
(table) => {
	return {
		InventoryCommissionPositions_Id: primaryKey({ columns: [table.Id], name: "InventoryCommissionPositions_Id"}),
	}
});

export const InventoryDocumentItemFiles = mysqlTable("InventoryDocumentItemFiles", {
	Id: binary({ length: 16 }).notNull(),
	Path: longtext(),
	InventoryDocumentItemId: binary({ length: 16 }).notNull().references(() => InventoryDocumentItems.Id, { onDelete: "cascade" } ),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	MimeType: longtext(),
},
(table) => {
	return {
		IX_InventoryDocumentItemFiles_InventoryDocumentItemId: index("IX_InventoryDocumentItemFiles_InventoryDocumentItemId").on(table.InventoryDocumentItemId),
		InventoryDocumentItemFiles_Id: primaryKey({ columns: [table.Id], name: "InventoryDocumentItemFiles_Id"}),
	}
});

export const InventoryDocumentItemFiles_tracking = mysqlTable("InventoryDocumentItemFiles_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		InventoryDocumentItemFiles_tracking_Id: primaryKey({ columns: [table.Id], name: "InventoryDocumentItemFiles_tracking_Id"}),
	}
});

export const InventoryDocumentItems = mysqlTable("InventoryDocumentItems", {
	Id: binary({ length: 16 }).notNull(),
	DocumentId: binary({ length: 16 }).notNull().references(() => InventoryDocuments.Id, { onDelete: "cascade" } ),
	AssetId: binary({ length: 16 }).notNull().references(() => Assets.Id, { onDelete: "cascade" } ),
	Description: varchar({ length: 200 }),
	InitPrice: decimal({ precision: 33, scale: 5 }).notNull(),
	Depreciation: decimal({ precision: 33, scale: 5 }).notNull(),
	RefKeyFromRegistry: int(),
	CustodianUserId: int().notNull(),
	IsExtraItem: tinyint().notNull(),
	FoundAt: datetime({ mode: 'string', fsp: 6 }),
	ReasonOfManualInventory: longtext(),
	AccountingQuantity: int().notNull(),
	ReceiptedQuantity: int().notNull(),
	WriteOffQuantity: int().notNull(),
	ActualQuantity: int().notNull(),
	FoundQuantity: int().notNull(),
	IsFixed: tinyint().notNull(),
	FixedDate: datetime({ mode: 'string', fsp: 6 }),
	ParentId: binary({ length: 16 }),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	LocationId: int(),
	UtilizerUserId: int(),
},
(table) => {
	return {
		IX_InventoryDocumentItems_AssetId: index("IX_InventoryDocumentItems_AssetId").on(table.AssetId),
		IX_InventoryDocumentItems_DocumentId: index("IX_InventoryDocumentItems_DocumentId").on(table.DocumentId),
		IX_InventoryDocumentItems_ParentId: index("IX_InventoryDocumentItems_ParentId").on(table.ParentId),
		FK_InventoryDocumentItems_InventoryDocumentItems_ParentId: foreignKey({
			columns: [table.ParentId],
			foreignColumns: [table.Id],
			name: "FK_InventoryDocumentItems_InventoryDocumentItems_ParentId"
		}).onDelete("restrict"),
		InventoryDocumentItems_Id: primaryKey({ columns: [table.Id], name: "InventoryDocumentItems_Id"}),
	}
});

export const InventoryDocumentItems_tracking = mysqlTable("InventoryDocumentItems_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		InventoryDocumentItems_tracking_Id: primaryKey({ columns: [table.Id], name: "InventoryDocumentItems_tracking_Id"}),
	}
});

export const InventoryDocuments = mysqlTable("InventoryDocuments", {
	Id: binary({ length: 16 }).notNull(),
	OrderNumber: longtext(),
	OrderDate: datetime({ mode: 'string', fsp: 6 }),
	AsOfDate: datetime({ mode: 'string', fsp: 6 }).notNull(),
	InventoryStartDate: datetime({ mode: 'string', fsp: 6 }).notNull(),
	InventoryExpirationDate: datetime({ mode: 'string', fsp: 6 }),
	Date: datetime({ mode: 'string', fsp: 6 }).notNull(),
	Number: longtext(),
	Description: longtext(),
	CustodianUserId: int().notNull(),
	DocumentStatusId: longtext(),
	IsRemoved: tinyint().notNull(),
	OrgUnitId: int(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	WarehouseManagementId: binary({ length: 16 }).references(() => WarehouseManagements.Id, { onDelete: "set null" } ),
	DocumentStatusNewId: binary({ length: 16 }).default('0x').notNull(),
},
(table) => {
	return {
		IX_InventoryDocuments_WarehouseManagementId: index("IX_InventoryDocuments_WarehouseManagementId").on(table.WarehouseManagementId),
		InventoryDocuments_Id: primaryKey({ columns: [table.Id], name: "InventoryDocuments_Id"}),
	}
});

export const InventoryDocuments_tracking = mysqlTable("InventoryDocuments_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		InventoryDocuments_tracking_Id: primaryKey({ columns: [table.Id], name: "InventoryDocuments_tracking_Id"}),
	}
});

export const InventoryFiles = mysqlTable("InventoryFiles", {
	Id: binary({ length: 16 }).notNull(),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	Path: longtext().notNull(),
	MimeType: longtext(),
	FileEntityTypeId: binary({ length: 16 }).notNull().references(() => FileEntityTypes.Id, { onDelete: "restrict" } ),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_InventoryFiles_FileEntityTypeId: index("IX_InventoryFiles_FileEntityTypeId").on(table.FileEntityTypeId),
		InventoryFiles_Id: primaryKey({ columns: [table.Id], name: "InventoryFiles_Id"}),
	}
});

export const InventoryFiles_tracking = mysqlTable("InventoryFiles_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		InventoryFiles_tracking_Id: primaryKey({ columns: [table.Id], name: "InventoryFiles_tracking_Id"}),
	}
});

export const LocationCurrentVolumeRegistries = mysqlTable("LocationCurrentVolumeRegistries", {
	Id: int().autoincrement().notNull(),
	LocationId: int().notNull(),
	OccupiedVolume: decimal({ precision: 12, scale: 2 }).notNull(),
	WeightAmount: decimal({ precision: 12, scale: 2 }).notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		LocationCurrentVolumeRegistries_Id: primaryKey({ columns: [table.Id], name: "LocationCurrentVolumeRegistries_Id"}),
	}
});

export const MovementCountTypeConditions = mysqlTable("MovementCountTypeConditions", {
	Id: binary({ length: 16 }).notNull(),
	MovementCountTypeId: varchar({ length: 255 }).notNull().references(() => MovementCountTypes.Id, { onDelete: "restrict" } ),
	Exclude: tinyint().default(0).notNull(),
	FromOrgUnitId: int(),
	ToOrgUnitId: int(),
	FromCustodianUserId: int(),
	ToCustodianUserId: int(),
	FromLocationId: int(),
	ToLocationId: int(),
	FromUtilizerUserId: int(),
	ToUtilizerUserId: int(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_MovementCountTypeConditions_MovementCountTypeId: index("IX_MovementCountTypeConditions_MovementCountTypeId").on(table.MovementCountTypeId),
		MovementCountTypeConditions_Id: primaryKey({ columns: [table.Id], name: "MovementCountTypeConditions_Id"}),
		"IX_MovementCountTypeConditions_FromOrgUnitId_ToOrgUnitId_FromCu~": unique("IX_MovementCountTypeConditions_FromOrgUnitId_ToOrgUnitId_FromCu~").on(table.FromOrgUnitId, table.ToOrgUnitId, table.FromCustodianUserId, table.ToCustodianUserId, table.FromLocationId, table.ToLocationId, table.FromUtilizerUserId, table.ToUtilizerUserId),
	}
});

export const MovementCountTypes = mysqlTable("MovementCountTypes", {
	Id: varchar({ length: 255 }).notNull(),
	Description: varchar({ length: 255 }).notNull(),
	Enabled: tinyint().default(1),
	AssetAttributeId: binary({ length: 16 }).notNull().references(() => AssetAttributes.Id, { onDelete: "restrict" } ),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		MovementCountTypes_Id: primaryKey({ columns: [table.Id], name: "MovementCountTypes_Id"}),
		IX_MovementCountTypes_AssetAttributeId: unique("IX_MovementCountTypes_AssetAttributeId").on(table.AssetAttributeId),
		IX_MovementCountTypes_Description: unique("IX_MovementCountTypes_Description").on(table.Description),
	}
});

export const NomenclatureAttributeValues = mysqlTable("NomenclatureAttributeValues", {
	Id: binary({ length: 16 }).notNull(),
	NomenclatureAttributeId: binary({ length: 16 }).notNull().references(() => NomenclatureAttributes.Id, { onDelete: "cascade" } ),
	NomenclatureId: binary({ length: 16 }).notNull().references(() => Nomenclatures.Id, { onDelete: "cascade" } ),
	Value: longtext(),
	IsRemoved: tinyint().notNull(),
},
(table) => {
	return {
		IX_NomenclatureAttributeValues_NomenclatureAttributeId: index("IX_NomenclatureAttributeValues_NomenclatureAttributeId").on(table.NomenclatureAttributeId),
		IX_NomenclatureAttributeValues_NomenclatureId: index("IX_NomenclatureAttributeValues_NomenclatureId").on(table.NomenclatureId),
		NomenclatureAttributeValues_Id: primaryKey({ columns: [table.Id], name: "NomenclatureAttributeValues_Id"}),
	}
});

export const NomenclatureAttributeValues_tracking = mysqlTable("NomenclatureAttributeValues_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		NomenclatureAttributeValues_tracking_Id: primaryKey({ columns: [table.Id], name: "NomenclatureAttributeValues_tracking_Id"}),
	}
});

export const NomenclatureAttributes = mysqlTable("NomenclatureAttributes", {
	Id: binary({ length: 16 }).notNull(),
	Description: longtext().notNull(),
	NomenclatureGroupId: binary({ length: 16 }).notNull().references(() => NomenclatureGroups.Id, { onDelete: "cascade" } ),
	IsRemoved: tinyint().notNull(),
},
(table) => {
	return {
		IX_NomenclatureAttributes_NomenclatureGroupId: index("IX_NomenclatureAttributes_NomenclatureGroupId").on(table.NomenclatureGroupId),
		NomenclatureAttributes_Id: primaryKey({ columns: [table.Id], name: "NomenclatureAttributes_Id"}),
	}
});

export const NomenclatureAttributes_tracking = mysqlTable("NomenclatureAttributes_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		NomenclatureAttributes_tracking_Id: primaryKey({ columns: [table.Id], name: "NomenclatureAttributes_tracking_Id"}),
	}
});

export const NomenclatureGroups = mysqlTable("NomenclatureGroups", {
	Id: binary({ length: 16 }).notNull(),
	Name: varchar({ length: 200 }),
	ParentId: binary({ length: 16 }),
	CodeFromExtAcctSys: varchar({ length: 255 }),
	InheritParentalAttributes: tinyint().notNull(),
	IsRemoved: tinyint().notNull(),
	OrgUnitId: int(),
},
(table) => {
	return {
		IX_NomenclatureGroups_CodeFromExtAcctSys: index("IX_NomenclatureGroups_CodeFromExtAcctSys").on(table.CodeFromExtAcctSys),
		IX_NomenclatureGroups_ParentId: index("IX_NomenclatureGroups_ParentId").on(table.ParentId),
		FK_NomenclatureGroups_NomenclatureGroups_ParentId: foreignKey({
			columns: [table.ParentId],
			foreignColumns: [table.Id],
			name: "FK_NomenclatureGroups_NomenclatureGroups_ParentId"
		}).onDelete("restrict"),
		NomenclatureGroups_Id: primaryKey({ columns: [table.Id], name: "NomenclatureGroups_Id"}),
	}
});

export const NomenclatureGroups_tracking = mysqlTable("NomenclatureGroups_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		NomenclatureGroups_tracking_Id: primaryKey({ columns: [table.Id], name: "NomenclatureGroups_tracking_Id"}),
	}
});

export const NomenclaturePeriodStandards = mysqlTable("NomenclaturePeriodStandards", {
	Id: binary({ length: 16 }).notNull(),
	OrgUnitId: int(),
	NomenclatureId: binary({ length: 16 }).notNull().references(() => Nomenclatures.Id, { onDelete: "cascade" } ),
	StdQnt: double().notNull(),
	UnitOfMeasureId: binary({ length: 16 }).default('0x').notNull(),
},
(table) => {
	return {
		IX_NomenclaturePeriodStandards_NomenclatureId: index("IX_NomenclaturePeriodStandards_NomenclatureId").on(table.NomenclatureId),
		IX_NomenclaturePeriodStandards_UnitOfMeasureId: index("IX_NomenclaturePeriodStandards_UnitOfMeasureId").on(table.UnitOfMeasureId),
		NomenclaturePeriodStandards_Id: primaryKey({ columns: [table.Id], name: "NomenclaturePeriodStandards_Id"}),
	}
});

export const Nomenclatures = mysqlTable("Nomenclatures", {
	Id: binary({ length: 16 }).notNull(),
	Number: varchar({ length: 200 }).notNull(),
	FullName: varchar({ length: 200 }).notNull(),
	Alias: varchar({ length: 200 }),
	NomenclatureGroupId: binary({ length: 16 }).notNull().references(() => NomenclatureGroups.Id, { onDelete: "cascade" } ),
	StockKeepingUnit: varchar({ length: 200 }).notNull(),
	ProducerId: binary({ length: 16 }).references(() => Companies.Id, { onDelete: "restrict" } ),
	DefaultUnitOfMeasureId: binary({ length: 16 }).references(() => UnitsOfMeasure.Id, { onDelete: "restrict" } ),
	IsMadeByNomenclatureSetDocument: tinyint().notNull(),
	StockNomenclatureSetDocumentId: binary({ length: 16 }).references(() => StockNomenclatureSetDocuments.Id, { onDelete: "restrict" } ),
	CodeFromExtAcctSys: varchar({ length: 255 }),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	Height: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	Length: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	Weight: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	Width: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	Volume: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	KPVEDCode: longtext(),
	ReportingUnit: longtext(),
	TNVEDCode: longtext(),
	TRUCode: longtext(),
	UnitOfStock: longtext(),
},
(table) => {
	return {
		IX_Nomenclatures_CodeFromExtAcctSys: index("IX_Nomenclatures_CodeFromExtAcctSys").on(table.CodeFromExtAcctSys),
		IX_Nomenclatures_DefaultUnitOfMeasureId: index("IX_Nomenclatures_DefaultUnitOfMeasureId").on(table.DefaultUnitOfMeasureId),
		IX_Nomenclatures_NomenclatureGroupId: index("IX_Nomenclatures_NomenclatureGroupId").on(table.NomenclatureGroupId),
		IX_Nomenclatures_ProducerId: index("IX_Nomenclatures_ProducerId").on(table.ProducerId),
		IX_Nomenclatures_StockNomenclatureSetDocumentId: index("IX_Nomenclatures_StockNomenclatureSetDocumentId").on(table.StockNomenclatureSetDocumentId),
		Nomenclatures_Id: primaryKey({ columns: [table.Id], name: "Nomenclatures_Id"}),
	}
});

export const Nomenclatures_tracking = mysqlTable("Nomenclatures_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		Nomenclatures_tracking_Id: primaryKey({ columns: [table.Id], name: "Nomenclatures_tracking_Id"}),
	}
});

export const ObjectStatuses = mysqlTable("ObjectStatuses", {
	Id: int().autoincrement().notNull(),
	Code: int().notNull(),
	Description: varchar({ length: 200 }),
	IsRemoved: tinyint().notNull(),
},
(table) => {
	return {
		ObjectStatuses_Id: primaryKey({ columns: [table.Id], name: "ObjectStatuses_Id"}),
	}
});

export const OrgUnitBarcodes = mysqlTable("OrgUnitBarcodes", {
	Id: int().autoincrement().notNull(),
	OrgUnitId: int(),
	LastBarcode: longtext(),
},
(table) => {
	return {
		OrgUnitBarcodes_Id: primaryKey({ columns: [table.Id], name: "OrgUnitBarcodes_Id"}),
	}
});

export const OrgUnitEntitySequences = mysqlTable("OrgUnitEntitySequences", {
	Id: int().autoincrement().notNull(),
	OrgUnitId: int(),
	Entity: longtext(),
	Sequence: int().notNull(),
},
(table) => {
	return {
		OrgUnitEntitySequences_Id: primaryKey({ columns: [table.Id], name: "OrgUnitEntitySequences_Id"}),
	}
});

export const PartnerContracts = mysqlTable("PartnerContracts", {
	Id: binary({ length: 16 }).notNull(),
	Name: longtext(),
	Code: longtext(),
	CompanyId: binary({ length: 16 }).references(() => Companies.Id, { onDelete: "restrict" } ),
	ContractType: longtext(),
	Number: int(),
	StartDate: datetime({ mode: 'string', fsp: 6 }),
	EndDate: datetime({ mode: 'string', fsp: 6 }),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_PartnerContracts_CompanyId: index("IX_PartnerContracts_CompanyId").on(table.CompanyId),
		PartnerContracts_Id: primaryKey({ columns: [table.Id], name: "PartnerContracts_Id"}),
	}
});

export const ProductTypes = mysqlTable("ProductTypes", {
	Id: int().autoincrement().notNull(),
	Code: longtext(),
	Description: longtext(),
},
(table) => {
	return {
		ProductTypes_Id: primaryKey({ columns: [table.Id], name: "ProductTypes_Id"}),
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

export const RouteNodeLinks = mysqlTable("RouteNodeLinks", {
	Id: int().autoincrement().notNull(),
	RouteId: binary({ length: 16 }).notNull().references(() => Routes.Id),
	StartRouteNodeId: int().notNull().references(() => RouteNodes.Id, { onDelete: "restrict" } ),
	FinishRouteNodeId: int().notNull().references(() => RouteNodes.Id, { onDelete: "restrict" } ),
},
(table) => {
	return {
		IX_RouteNodeLinks_FinishRouteNodeId: index("IX_RouteNodeLinks_FinishRouteNodeId").on(table.FinishRouteNodeId),
		IX_RouteNodeLinks_RouteId: index("IX_RouteNodeLinks_RouteId").on(table.RouteId),
		RouteNodeLinks_Id: primaryKey({ columns: [table.Id], name: "RouteNodeLinks_Id"}),
		IX_RouteNodeLinks_StartRouteNodeId_FinishRouteNodeId: unique("IX_RouteNodeLinks_StartRouteNodeId_FinishRouteNodeId").on(table.StartRouteNodeId, table.FinishRouteNodeId),
	}
});

export const RouteNodes = mysqlTable("RouteNodes", {
	Id: int().autoincrement().notNull(),
	IsPrimary: tinyint().notNull(),
	InDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	OutDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	RouteId: binary({ length: 16 }).notNull().references(() => Routes.Id, { onDelete: "restrict" } ),
	LocationId: int(),
	GpsLatitude: double(),
	GpsLongitude: double(),
	Radius: double(),
},
(table) => {
	return {
		IX_RouteNodes_RouteId: index("IX_RouteNodes_RouteId").on(table.RouteId),
		RouteNodes_Id: primaryKey({ columns: [table.Id], name: "RouteNodes_Id"}),
	}
});

export const RouteProgresses = mysqlTable("RouteProgresses", {
	Id: binary({ length: 16 }).notNull(),
	RouteId: binary({ length: 16 }).notNull().references(() => Routes.Id, { onDelete: "restrict" } ),
	StartDateTime: datetime({ mode: 'string', fsp: 6 }),
	FinishDateTime: datetime({ mode: 'string', fsp: 6 }),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	EntityType: longtext().notNull(),
},
(table) => {
	return {
		IX_RouteProgresses_RouteId: index("IX_RouteProgresses_RouteId").on(table.RouteId),
		RouteProgresses_Id: primaryKey({ columns: [table.Id], name: "RouteProgresses_Id"}),
	}
});

export const Routes = mysqlTable("Routes", {
	Id: binary({ length: 16 }).notNull(),
	Name: longtext(),
},
(table) => {
	return {
		Routes_Id: primaryKey({ columns: [table.Id], name: "Routes_Id"}),
	}
});

export const Shipments = mysqlTable("Shipments", {
	Id: int().autoincrement().notNull(),
	Number: varchar({ length: 200 }),
	Name: varchar({ length: 200 }),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsRemoved: tinyint().notNull(),
	ExpirationDate: datetime({ mode: 'string', fsp: 6 }).default('0001-01-01 00:00:00.000000').notNull(),
	ManufactureDate: datetime({ mode: 'string', fsp: 6 }).default('0001-01-01 00:00:00.000000').notNull(),
	ShelfLife: int().default(0).notNull(),
	UnitOfMeasureId: binary({ length: 16 }).default('0xC34957AAD16C394B9A40B06497AC7C23').notNull().references(() => UnitsOfMeasure.Id, { onDelete: "cascade" } ),
	AccountNumber: longtext(),
	IncomeDate: datetime({ mode: 'string', fsp: 6 }),
	NomenclatureId: binary({ length: 16 }).references(() => Nomenclatures.Id, { onDelete: "cascade" } ),
	StockReceiptDocumentId: binary({ length: 16 }).references((): AnyMySqlColumn => StockReceiptDocuments.Id, { onDelete: "cascade" } ),
	WarehouseMovementDocumentsId: binary({ length: 16 }).references((): AnyMySqlColumn => WarehouseMovementDocuments.Id, { onDelete: "cascade" } ),
	WriteOffDate: datetime({ mode: 'string', fsp: 6 }),
	DocumentRef: binary({ length: 16 }),
},
(table) => {
	return {
		IX_Shipments_NomenclatureId: index("IX_Shipments_NomenclatureId").on(table.NomenclatureId),
		IX_Shipments_StockReceiptDocumentId: index("IX_Shipments_StockReceiptDocumentId").on(table.StockReceiptDocumentId),
		IX_Shipments_UnitOfMeasureId: index("IX_Shipments_UnitOfMeasureId").on(table.UnitOfMeasureId),
		IX_Shipments_WarehouseMovementDocumentsId: index("IX_Shipments_WarehouseMovementDocumentsId").on(table.WarehouseMovementDocumentsId),
		Shipments_Id: primaryKey({ columns: [table.Id], name: "Shipments_Id"}),
	}
});

export const Shipments_tracking = mysqlTable("Shipments_tracking", {
	Id: int().notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		Shipments_tracking_Id: primaryKey({ columns: [table.Id], name: "Shipments_tracking_Id"}),
	}
});

export const StockAccountingGroups = mysqlTable("StockAccountingGroups", {
	Id: binary({ length: 16 }).notNull(),
	UnitOfMeasureId: binary({ length: 16 }).notNull().references(() => UnitsOfMeasure.Id, { onDelete: "cascade" } ),
	NomenclatureId: binary({ length: 16 }).notNull().references(() => Nomenclatures.Id, { onDelete: "cascade" } ),
	ShipmentId: int().notNull().references(() => Shipments.Id, { onDelete: "cascade" } ),
	IsRemoved: tinyint().notNull(),
	LocationId: int(),
	OrgUnitId: int(),
	CustodianUserId: int().notNull(),
	GlAccount: longtext().default(sql`('')`),
},
(table) => {
	return {
		IX_StockAccountingGroups_NomenclatureId: index("IX_StockAccountingGroups_NomenclatureId").on(table.NomenclatureId),
		IX_StockAccountingGroups_ShipmentId: index("IX_StockAccountingGroups_ShipmentId").on(table.ShipmentId),
		IX_StockAccountingGroups_UnitOfMeasureId: index("IX_StockAccountingGroups_UnitOfMeasureId").on(table.UnitOfMeasureId),
		StockAccountingGroups_Id: primaryKey({ columns: [table.Id], name: "StockAccountingGroups_Id"}),
	}
});

export const StockAccountingGroups_tracking = mysqlTable("StockAccountingGroups_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockAccountingGroups_tracking_Id: primaryKey({ columns: [table.Id], name: "StockAccountingGroups_tracking_Id"}),
	}
});

export const StockBalanceRegistries = mysqlTable("StockBalanceRegistries", {
	Id: int().autoincrement().notNull(),
	StockAccountingGroupId: binary({ length: 16 }).notNull().references(() => StockAccountingGroups.Id, { onDelete: "cascade" } ),
	DocumentTypeId: longtext(),
	DocumentId: binary({ length: 16 }),
	PostDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	Quantity: decimal({ precision: 12, scale: 2 }).notNull(),
	AvrgPrice: decimal({ precision: 12, scale: 2 }).notNull(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_StockBalanceRegistries_StockAccountingGroupId: index("IX_StockBalanceRegistries_StockAccountingGroupId").on(table.StockAccountingGroupId),
		StockBalanceRegistries_Id: primaryKey({ columns: [table.Id], name: "StockBalanceRegistries_Id"}),
	}
});

export const StockBalanceRegistries_tracking = mysqlTable("StockBalanceRegistries_tracking", {
	Id: int().notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockBalanceRegistries_tracking_Id: primaryKey({ columns: [table.Id], name: "StockBalanceRegistries_tracking_Id"}),
	}
});

export const StockCurrentBalanceRegistries = mysqlTable("StockCurrentBalanceRegistries", {
	Id: binary({ length: 16 }).notNull(),
	StockAccountingGroupId: binary({ length: 16 }).notNull().references(() => StockAccountingGroups.Id, { onDelete: "cascade" } ),
	StockBalanceRegistryId: int().notNull().references(() => StockBalanceRegistries.Id, { onDelete: "cascade" } ),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_StockCurrentBalanceRegistries_StockAccountingGroupId: index("IX_StockCurrentBalanceRegistries_StockAccountingGroupId").on(table.StockAccountingGroupId),
		IX_StockCurrentBalanceRegistries_StockBalanceRegistryId: index("IX_StockCurrentBalanceRegistries_StockBalanceRegistryId").on(table.StockBalanceRegistryId),
		StockCurrentBalanceRegistries_Id: primaryKey({ columns: [table.Id], name: "StockCurrentBalanceRegistries_Id"}),
	}
});

export const StockInventoryDocumentItemComponents = mysqlTable("StockInventoryDocumentItemComponents", {
	Id: binary({ length: 16 }).notNull(),
	DocumentItemId: binary({ length: 16 }).notNull().references(() => StockInventoryDocumentItems.Id, { onDelete: "cascade" } ),
	StockItemId: binary({ length: 16 }).notNull().references(() => StockItems.Id, { onDelete: "cascade" } ),
	RowNumber: int().notNull(),
	AccountingQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	ReceiptedQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	WriteOffQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	ActualQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	DetailQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	IsFixed: tinyint().notNull(),
	FixedDate: datetime({ mode: 'string', fsp: 6 }),
	IsFound: tinyint().notNull(),
	FoundAt: datetime({ mode: 'string', fsp: 6 }),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_StockInventoryDocumentItemComponents_DocumentItemId: index("IX_StockInventoryDocumentItemComponents_DocumentItemId").on(table.DocumentItemId),
		IX_StockInventoryDocumentItemComponents_StockItemId: index("IX_StockInventoryDocumentItemComponents_StockItemId").on(table.StockItemId),
		StockInventoryDocumentItemComponents_Id: primaryKey({ columns: [table.Id], name: "StockInventoryDocumentItemComponents_Id"}),
	}
});

export const StockInventoryDocumentItemComponents_tracking = mysqlTable("StockInventoryDocumentItemComponents_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockInventoryDocumentItemComponents_tracking_Id: primaryKey({ columns: [table.Id], name: "StockInventoryDocumentItemComponents_tracking_Id"}),
	}
});

export const StockInventoryDocumentItems = mysqlTable("StockInventoryDocumentItems", {
	Id: binary({ length: 16 }).notNull(),
	DocumentId: binary({ length: 16 }).notNull().references(() => StockInventoryDocuments.Id, { onDelete: "cascade" } ),
	RowNumber: int().notNull(),
	Note: longtext(),
	Status: longtext().notNull(),
	NomenclatureId: binary({ length: 16 }).notNull().references(() => Nomenclatures.Id, { onDelete: "cascade" } ),
	UnitOfMeasureId: binary({ length: 16 }).notNull().references(() => UnitsOfMeasure.Id, { onDelete: "cascade" } ),
	ShipmentId: int().notNull().references(() => Shipments.Id, { onDelete: "cascade" } ),
	AccountingQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	ReceiptedQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	WriteOffQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	ActualQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	FoundQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	IsFixed: tinyint().notNull(),
	FixedDate: datetime({ mode: 'string', fsp: 6 }),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	LocationId: int(),
},
(table) => {
	return {
		IX_StockInventoryDocumentItems_DocumentId: index("IX_StockInventoryDocumentItems_DocumentId").on(table.DocumentId),
		IX_StockInventoryDocumentItems_NomenclatureId: index("IX_StockInventoryDocumentItems_NomenclatureId").on(table.NomenclatureId),
		IX_StockInventoryDocumentItems_ShipmentId: index("IX_StockInventoryDocumentItems_ShipmentId").on(table.ShipmentId),
		IX_StockInventoryDocumentItems_UnitOfMeasureId: index("IX_StockInventoryDocumentItems_UnitOfMeasureId").on(table.UnitOfMeasureId),
		StockInventoryDocumentItems_Id: primaryKey({ columns: [table.Id], name: "StockInventoryDocumentItems_Id"}),
	}
});

export const StockInventoryDocumentItems_tracking = mysqlTable("StockInventoryDocumentItems_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockInventoryDocumentItems_tracking_Id: primaryKey({ columns: [table.Id], name: "StockInventoryDocumentItems_tracking_Id"}),
	}
});

export const StockInventoryDocuments = mysqlTable("StockInventoryDocuments", {
	Id: binary({ length: 16 }).notNull(),
	OrderNumber: longtext(),
	OrderDate: datetime({ mode: 'string', fsp: 6 }),
	AsOfDate: datetime({ mode: 'string', fsp: 6 }).notNull(),
	InventoryStartDate: datetime({ mode: 'string', fsp: 6 }).notNull(),
	InventoryExpirationDate: datetime({ mode: 'string', fsp: 6 }),
	Number: longtext(),
	Description: longtext(),
	Date: datetime({ mode: 'string', fsp: 6 }).notNull(),
	OrgUnitId: int(),
	CustodianUserId: int().notNull(),
	IsIncludeChildren: tinyint().notNull(),
	DocumentStatusId: longtext(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	WarehouseManagementId: binary({ length: 16 }).references(() => WarehouseManagements.Id, { onDelete: "set null" } ),
	DocumentStatusNewId: binary({ length: 16 }).default('0x').notNull(),
},
(table) => {
	return {
		IX_StockInventoryDocuments_WarehouseManagementId: index("IX_StockInventoryDocuments_WarehouseManagementId").on(table.WarehouseManagementId),
		StockInventoryDocuments_Id: primaryKey({ columns: [table.Id], name: "StockInventoryDocuments_Id"}),
	}
});

export const StockInventoryDocuments_tracking = mysqlTable("StockInventoryDocuments_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockInventoryDocuments_tracking_Id: primaryKey({ columns: [table.Id], name: "StockInventoryDocuments_tracking_Id"}),
	}
});

export const StockItemBalanceRegistries = mysqlTable("StockItemBalanceRegistries", {
	Id: int().autoincrement().notNull(),
	StockItemId: binary({ length: 16 }).notNull().references(() => StockItems.Id, { onDelete: "cascade" } ),
	DetailUoMId: binary({ length: 16 }).notNull().references(() => UnitsOfMeasure.Id, { onDelete: "cascade" } ),
	DetailQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	PostDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	DocumentTypeId: longtext(),
	DocumentId: binary({ length: 16 }),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_StockItemBalanceRegistries_DetailUoMId: index("IX_StockItemBalanceRegistries_DetailUoMId").on(table.DetailUoMId),
		IX_StockItemBalanceRegistries_StockItemId: index("IX_StockItemBalanceRegistries_StockItemId").on(table.StockItemId),
		StockItemBalanceRegistries_Id: primaryKey({ columns: [table.Id], name: "StockItemBalanceRegistries_Id"}),
	}
});

export const StockItemBalanceRegistries_tracking = mysqlTable("StockItemBalanceRegistries_tracking", {
	Id: int().notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockItemBalanceRegistries_tracking_Id: primaryKey({ columns: [table.Id], name: "StockItemBalanceRegistries_tracking_Id"}),
	}
});

export const StockItemCurrentBalanceRegistries = mysqlTable("StockItemCurrentBalanceRegistries", {
	Id: binary({ length: 16 }).notNull(),
	StockItemId: binary({ length: 16 }).notNull().references(() => StockItems.Id, { onDelete: "cascade" } ),
	StockItemBalanceRegistryId: int().notNull().references(() => StockItemBalanceRegistries.Id, { onDelete: "cascade" } ),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_StockItemCurrentBalanceRegistries_StockItemBalanceRegistryId: index("IX_StockItemCurrentBalanceRegistries_StockItemBalanceRegistryId").on(table.StockItemBalanceRegistryId),
		IX_StockItemCurrentBalanceRegistries_StockItemId: index("IX_StockItemCurrentBalanceRegistries_StockItemId").on(table.StockItemId),
		StockItemCurrentBalanceRegistries_Id: primaryKey({ columns: [table.Id], name: "StockItemCurrentBalanceRegistries_Id"}),
	}
});

export const StockItemMovementRegistries = mysqlTable("StockItemMovementRegistries", {
	Id: int().autoincrement().notNull(),
	StockItemId: binary({ length: 16 }).notNull().references(() => StockItems.Id, { onDelete: "cascade" } ),
	DetailUoMId: binary({ length: 16 }).notNull().references(() => UnitsOfMeasure.Id, { onDelete: "cascade" } ),
	DetailQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	PostDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	DocumentTypeId: longtext(),
	DocumentId: binary({ length: 16 }),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_StockItemMovementRegistries_DetailUoMId: index("IX_StockItemMovementRegistries_DetailUoMId").on(table.DetailUoMId),
		IX_StockItemMovementRegistries_StockItemId: index("IX_StockItemMovementRegistries_StockItemId").on(table.StockItemId),
		StockItemMovementRegistries_Id: primaryKey({ columns: [table.Id], name: "StockItemMovementRegistries_Id"}),
	}
});

export const StockItemMovementRegistries_tracking = mysqlTable("StockItemMovementRegistries_tracking", {
	Id: int().notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockItemMovementRegistries_tracking_Id: primaryKey({ columns: [table.Id], name: "StockItemMovementRegistries_tracking_Id"}),
	}
});

export const StockItems = mysqlTable("StockItems", {
	Id: binary({ length: 16 }).notNull(),
	StockAccountingGroupId: binary({ length: 16 }).notNull().references(() => StockAccountingGroups.Id, { onDelete: "cascade" } ),
	IsDetailAcct: tinyint().default(0).notNull(),
	DetailUoMId: binary({ length: 16 }).references(() => UnitsOfMeasure.Id, { onDelete: "restrict" } ),
	ObjectStatusId: int().references(() => ObjectStatuses.Id, { onDelete: "restrict" } ),
	IsRemoved: tinyint().notNull(),
	StockReceiptDocumentItemComponentId: binary({ length: 16 }).references(() => StockReceiptDocumentItemComponents.Id, { onDelete: "restrict" } ),
},
(table) => {
	return {
		IX_StockItems_DetailUoMId: index("IX_StockItems_DetailUoMId").on(table.DetailUoMId),
		IX_StockItems_ObjectStatusId: index("IX_StockItems_ObjectStatusId").on(table.ObjectStatusId),
		IX_StockItems_StockAccountingGroupId: index("IX_StockItems_StockAccountingGroupId").on(table.StockAccountingGroupId),
		StockItems_Id: primaryKey({ columns: [table.Id], name: "StockItems_Id"}),
		IX_StockItems_StockReceiptDocumentItemComponentId: unique("IX_StockItems_StockReceiptDocumentItemComponentId").on(table.StockReceiptDocumentItemComponentId),
	}
});

export const StockItems_tracking = mysqlTable("StockItems_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockItems_tracking_Id: primaryKey({ columns: [table.Id], name: "StockItems_tracking_Id"}),
	}
});

export const StockMovementDocumentItemComponents = mysqlTable("StockMovementDocumentItemComponents", {
	Id: binary({ length: 16 }).notNull(),
	DocumentItemId: binary({ length: 16 }).notNull().references(() => StockMovementDocumentItems.Id, { onDelete: "cascade" } ),
	StockItemId: binary({ length: 16 }).notNull().references(() => StockItems.Id, { onDelete: "cascade" } ),
	DetailQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
},
(table) => {
	return {
		IX_StockMovementDocumentItemComponents_DocumentItemId: index("IX_StockMovementDocumentItemComponents_DocumentItemId").on(table.DocumentItemId),
		IX_StockMovementDocumentItemComponents_StockItemId: index("IX_StockMovementDocumentItemComponents_StockItemId").on(table.StockItemId),
		StockMovementDocumentItemComponents_Id: primaryKey({ columns: [table.Id], name: "StockMovementDocumentItemComponents_Id"}),
	}
});

export const StockMovementDocumentItemComponents_tracking = mysqlTable("StockMovementDocumentItemComponents_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockMovementDocumentItemComponents_tracking_Id: primaryKey({ columns: [table.Id], name: "StockMovementDocumentItemComponents_tracking_Id"}),
	}
});

export const StockMovementDocumentItems = mysqlTable("StockMovementDocumentItems", {
	Id: binary({ length: 16 }).notNull(),
	DocumentId: binary({ length: 16 }).notNull().references(() => StockMovementDocuments.Id, { onDelete: "cascade" } ),
	StockAccountingGroupId: binary({ length: 16 }).notNull().references(() => StockAccountingGroups.Id, { onDelete: "cascade" } ),
	PlannedQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	ActualQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	Price: decimal({ precision: 12, scale: 2 }).notNull(),
	Amount: decimal({ precision: 12, scale: 2 }).notNull(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	ActualWeight: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	PlannedWeight: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	TotalVolume: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	ToLocationId: int(),
	FromLocationId: int(),
	Codes: longtext(),
},
(table) => {
	return {
		IX_StockMovementDocumentItems_DocumentId: index("IX_StockMovementDocumentItems_DocumentId").on(table.DocumentId),
		IX_StockMovementDocumentItems_StockAccountingGroupId: index("IX_StockMovementDocumentItems_StockAccountingGroupId").on(table.StockAccountingGroupId),
		StockMovementDocumentItems_Id: primaryKey({ columns: [table.Id], name: "StockMovementDocumentItems_Id"}),
	}
});

export const StockMovementDocumentItems_tracking = mysqlTable("StockMovementDocumentItems_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockMovementDocumentItems_tracking_Id: primaryKey({ columns: [table.Id], name: "StockMovementDocumentItems_tracking_Id"}),
	}
});

export const StockMovementDocuments = mysqlTable("StockMovementDocuments", {
	Id: binary({ length: 16 }).notNull(),
	Number: longtext(),
	Date: datetime({ mode: 'string', fsp: 6 }).notNull(),
	Description: longtext(),
	TotalAmount: decimal({ precision: 12, scale: 2 }).notNull(),
	FromOrgUnitId: int().notNull(),
	FromCustodianUserId: int().notNull(),
	ToOrgUnitId: int().notNull(),
	ToCustodianUserId: int().notNull(),
	DocumentStatusId: longtext(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	WarehouseManagementId: binary({ length: 16 }).references(() => WarehouseManagements.Id, { onDelete: "set null" } ),
	RefToBaseDocument: longtext(),
	ExternalDocumentTypeId: int().references(() => ExternalDocumentTypes.Id, { onDelete: "restrict" } ),
	DocumentStatusNewId: binary({ length: 16 }).default('0x').notNull(),
	FromLocationId: int().default(0).notNull(),
	ToLocationId: int().default(0).notNull(),
	AccountingCode: longtext(),
},
(table) => {
	return {
		IX_StockMovementDocuments_ExternalDocumentTypeId: index("IX_StockMovementDocuments_ExternalDocumentTypeId").on(table.ExternalDocumentTypeId),
		IX_StockMovementDocuments_WarehouseManagementId: index("IX_StockMovementDocuments_WarehouseManagementId").on(table.WarehouseManagementId),
		StockMovementDocuments_Id: primaryKey({ columns: [table.Id], name: "StockMovementDocuments_Id"}),
	}
});

export const StockMovementDocuments_tracking = mysqlTable("StockMovementDocuments_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockMovementDocuments_tracking_Id: primaryKey({ columns: [table.Id], name: "StockMovementDocuments_tracking_Id"}),
	}
});

export const StockMovementRegistries = mysqlTable("StockMovementRegistries", {
	Id: int().autoincrement().notNull(),
	StockAccountingGroupId: binary({ length: 16 }).notNull().references(() => StockAccountingGroups.Id, { onDelete: "cascade" } ),
	DocumentTypeId: longtext(),
	DocumentId: binary({ length: 16 }),
	PostDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	Quantity: decimal({ precision: 12, scale: 2 }).notNull(),
	Price: decimal({ precision: 12, scale: 2 }).notNull(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_StockMovementRegistries_StockAccountingGroupId: index("IX_StockMovementRegistries_StockAccountingGroupId").on(table.StockAccountingGroupId),
		StockMovementRegistries_Id: primaryKey({ columns: [table.Id], name: "StockMovementRegistries_Id"}),
	}
});

export const StockMovementRegistries_tracking = mysqlTable("StockMovementRegistries_tracking", {
	Id: int().notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockMovementRegistries_tracking_Id: primaryKey({ columns: [table.Id], name: "StockMovementRegistries_tracking_Id"}),
	}
});

export const StockNomenclatureSetDocumentItemComponents = mysqlTable("StockNomenclatureSetDocumentItemComponents", {
	Id: binary({ length: 16 }).notNull(),
	DocumentItemId: binary({ length: 16 }).notNull().references(() => StockNomenclatureSetDocumentItems.Id, { onDelete: "cascade" } ),
	StockItemId: binary({ length: 16 }).notNull().references(() => StockItems.Id, { onDelete: "cascade" } ),
	DetailQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_StockNomenclatureSetDocumentItemComponents_DocumentItemId: index("IX_StockNomenclatureSetDocumentItemComponents_DocumentItemId").on(table.DocumentItemId),
		IX_StockNomenclatureSetDocumentItemComponents_StockItemId: index("IX_StockNomenclatureSetDocumentItemComponents_StockItemId").on(table.StockItemId),
		StockNomenclatureSetDocumentItemComponents_Id: primaryKey({ columns: [table.Id], name: "StockNomenclatureSetDocumentItemComponents_Id"}),
	}
});

export const StockNomenclatureSetDocumentItemComponents_tracking = mysqlTable("StockNomenclatureSetDocumentItemComponents_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockNomenclatureSetDocumentItemComponents_tracking_Id: primaryKey({ columns: [table.Id], name: "StockNomenclatureSetDocumentItemComponents_tracking_Id"}),
	}
});

export const StockNomenclatureSetDocumentItems = mysqlTable("StockNomenclatureSetDocumentItems", {
	Id: binary({ length: 16 }).notNull(),
	DocumentId: binary({ length: 16 }).notNull().references(() => StockNomenclatureSetDocuments.Id, { onDelete: "cascade" } ),
	StockAccountingGroupId: binary({ length: 16 }).notNull().references(() => StockAccountingGroups.Id, { onDelete: "cascade" } ),
	ActualQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	ActualWeight: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	PlannedWeight: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	TotalVolume: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	LocationId: int(),
},
(table) => {
	return {
		IX_StockNomenclatureSetDocumentItems_DocumentId: index("IX_StockNomenclatureSetDocumentItems_DocumentId").on(table.DocumentId),
		IX_StockNomenclatureSetDocumentItems_StockAccountingGroupId: index("IX_StockNomenclatureSetDocumentItems_StockAccountingGroupId").on(table.StockAccountingGroupId),
		StockNomenclatureSetDocumentItems_Id: primaryKey({ columns: [table.Id], name: "StockNomenclatureSetDocumentItems_Id"}),
	}
});

export const StockNomenclatureSetDocumentItems_tracking = mysqlTable("StockNomenclatureSetDocumentItems_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockNomenclatureSetDocumentItems_tracking_Id: primaryKey({ columns: [table.Id], name: "StockNomenclatureSetDocumentItems_tracking_Id"}),
	}
});

export const StockNomenclatureSetDocuments = mysqlTable("StockNomenclatureSetDocuments", {
	Id: binary({ length: 16 }).notNull(),
	Number: longtext(),
	Date: datetime({ mode: 'string', fsp: 6 }).notNull(),
	Description: longtext(),
	OrgUnitId: int(),
	CustodianUserId: int().notNull(),
	UnitOfMeasureId: binary({ length: 16 }).notNull().references(() => UnitsOfMeasure.Id, { onDelete: "cascade" } ),
	ShipmentId: int().notNull().references(() => Shipments.Id, { onDelete: "cascade" } ),
	NomenclatureGroupId: binary({ length: 16 }).notNull().references(() => NomenclatureGroups.Id, { onDelete: "cascade" } ),
	NomenclatureSetCode: longtext(),
	NomenclatureSetName: longtext(),
	NomenclatureStockKeepingUnit: longtext(),
	Quantity: int().notNull(),
	DocumentStatusId: longtext(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	WarehouseManagementId: binary({ length: 16 }).references(() => WarehouseManagements.Id, { onDelete: "set null" } ),
	DocumentStatusNewId: binary({ length: 16 }).default('0x').notNull(),
},
(table) => {
	return {
		IX_StockNomenclatureSetDocuments_NomenclatureGroupId: index("IX_StockNomenclatureSetDocuments_NomenclatureGroupId").on(table.NomenclatureGroupId),
		IX_StockNomenclatureSetDocuments_ShipmentId: index("IX_StockNomenclatureSetDocuments_ShipmentId").on(table.ShipmentId),
		IX_StockNomenclatureSetDocuments_UnitOfMeasureId: index("IX_StockNomenclatureSetDocuments_UnitOfMeasureId").on(table.UnitOfMeasureId),
		IX_StockNomenclatureSetDocuments_WarehouseManagementId: index("IX_StockNomenclatureSetDocuments_WarehouseManagementId").on(table.WarehouseManagementId),
		StockNomenclatureSetDocuments_Id: primaryKey({ columns: [table.Id], name: "StockNomenclatureSetDocuments_Id"}),
	}
});

export const StockNomenclatureSetDocuments_tracking = mysqlTable("StockNomenclatureSetDocuments_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockNomenclatureSetDocuments_tracking_Id: primaryKey({ columns: [table.Id], name: "StockNomenclatureSetDocuments_tracking_Id"}),
	}
});

export const StockReceiptDocumentItemComponents = mysqlTable("StockReceiptDocumentItemComponents", {
	Id: binary({ length: 16 }).notNull(),
	DocumentItemId: binary({ length: 16 }).notNull().references(() => StockReceiptDocumentItems.Id, { onDelete: "cascade" } ),
	IsDetailAcct: tinyint().notNull(),
	DetailQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_StockReceiptDocumentItemComponents_DocumentItemId: index("IX_StockReceiptDocumentItemComponents_DocumentItemId").on(table.DocumentItemId),
		StockReceiptDocumentItemComponents_Id: primaryKey({ columns: [table.Id], name: "StockReceiptDocumentItemComponents_Id"}),
	}
});

export const StockReceiptDocumentItemComponents_tracking = mysqlTable("StockReceiptDocumentItemComponents_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockReceiptDocumentItemComponents_tracking_Id: primaryKey({ columns: [table.Id], name: "StockReceiptDocumentItemComponents_tracking_Id"}),
	}
});

export const StockReceiptDocumentItems = mysqlTable("StockReceiptDocumentItems", {
	Id: binary({ length: 16 }).notNull(),
	DocumentId: binary({ length: 16 }).notNull().references(() => StockReceiptDocuments.Id, { onDelete: "cascade" } ),
	NomenclatureId: binary({ length: 16 }).notNull().references(() => Nomenclatures.Id, { onDelete: "cascade" } ),
	UnitOfMeasureId: binary({ length: 16 }).notNull().references(() => UnitsOfMeasure.Id, { onDelete: "cascade" } ),
	Quantity: decimal({ precision: 12, scale: 2 }).notNull(),
	Price: decimal({ precision: 12, scale: 2 }).notNull(),
	Amount: decimal({ precision: 12, scale: 2 }).notNull(),
	ShipmentId: int(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	ActualWeight: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	PlannedQuantity: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	PlannedWeight: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	TotalVolume: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	LocationId: int(),
	Codes: longtext(),
},
(table) => {
	return {
		IX_StockReceiptDocumentItems_DocumentId: index("IX_StockReceiptDocumentItems_DocumentId").on(table.DocumentId),
		IX_StockReceiptDocumentItems_NomenclatureId: index("IX_StockReceiptDocumentItems_NomenclatureId").on(table.NomenclatureId),
		IX_StockReceiptDocumentItems_UnitOfMeasureId: index("IX_StockReceiptDocumentItems_UnitOfMeasureId").on(table.UnitOfMeasureId),
		StockReceiptDocumentItems_Id: primaryKey({ columns: [table.Id], name: "StockReceiptDocumentItems_Id"}),
	}
});

export const StockReceiptDocumentItems_tracking = mysqlTable("StockReceiptDocumentItems_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockReceiptDocumentItems_tracking_Id: primaryKey({ columns: [table.Id], name: "StockReceiptDocumentItems_tracking_Id"}),
	}
});

export const StockReceiptDocuments = mysqlTable("StockReceiptDocuments", {
	Id: binary({ length: 16 }).notNull(),
	Description: longtext(),
	Number: longtext(),
	Date: datetime({ mode: 'string', fsp: 6 }).notNull(),
	CompanyId: binary({ length: 16 }).references(() => Companies.Id, { onDelete: "restrict" } ),
	OrgUnitId: int(),
	CustodianUserId: int().notNull(),
	TotalAmount: decimal({ precision: 12, scale: 2 }).notNull(),
	IsSingleShipment: tinyint().notNull(),
	ShipmentId: int().references((): AnyMySqlColumn => Shipments.Id, { onDelete: "restrict" } ),
	DocumentStatusId: longtext(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	WarehouseManagementId: binary({ length: 16 }).references(() => WarehouseManagements.Id, { onDelete: "set null" } ),
	AccompDocNumber: longtext(),
	OffsettingAccount: longtext(),
	OperationType: longtext(),
	PaymentDocNumber: longtext(),
	RefToBaseDocument: longtext(),
	AttorneyPowerDate: datetime({ mode: 'string', fsp: 6 }),
	AttorneyPowerNumber: longtext(),
	ExternalDocumentTypeId: int().references(() => ExternalDocumentTypes.Id, { onDelete: "restrict" } ),
	AttorneyPowerThroughWhom: longtext(),
	VATAmount: decimal({ precision: 12, scale: 2 }),
	DocumentStatusNewId: binary({ length: 16 }).default('0x').notNull(),
	AccountingCode: longtext(),
	PartnerContractId: binary({ length: 16 }).references(() => PartnerContracts.Id, { onDelete: "restrict" } ),
},
(table) => {
	return {
		IX_StockReceiptDocuments_CompanyId: index("IX_StockReceiptDocuments_CompanyId").on(table.CompanyId),
		IX_StockReceiptDocuments_ExternalDocumentTypeId: index("IX_StockReceiptDocuments_ExternalDocumentTypeId").on(table.ExternalDocumentTypeId),
		IX_StockReceiptDocuments_PartnerContractId: index("IX_StockReceiptDocuments_PartnerContractId").on(table.PartnerContractId),
		IX_StockReceiptDocuments_ShipmentId: index("IX_StockReceiptDocuments_ShipmentId").on(table.ShipmentId),
		IX_StockReceiptDocuments_WarehouseManagementId: index("IX_StockReceiptDocuments_WarehouseManagementId").on(table.WarehouseManagementId),
		StockReceiptDocuments_Id: primaryKey({ columns: [table.Id], name: "StockReceiptDocuments_Id"}),
	}
});

export const StockReceiptDocuments_tracking = mysqlTable("StockReceiptDocuments_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockReceiptDocuments_tracking_Id: primaryKey({ columns: [table.Id], name: "StockReceiptDocuments_tracking_Id"}),
	}
});

export const StockUnwrapDocumentItemComponents = mysqlTable("StockUnwrapDocumentItemComponents", {
	Id: binary({ length: 16 }).notNull(),
	DocumentItemId: binary({ length: 16 }).notNull().references(() => StockUnwrapDocumentItems.Id, { onDelete: "cascade" } ),
	RowNumber: int().notNull(),
	DetailQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	StockItemId: binary({ length: 16 }).references(() => StockItems.Id, { onDelete: "restrict" } ),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_StockUnwrapDocumentItemComponents_DocumentItemId: index("IX_StockUnwrapDocumentItemComponents_DocumentItemId").on(table.DocumentItemId),
		IX_StockUnwrapDocumentItemComponents_StockItemId: index("IX_StockUnwrapDocumentItemComponents_StockItemId").on(table.StockItemId),
		StockUnwrapDocumentItemComponents_Id: primaryKey({ columns: [table.Id], name: "StockUnwrapDocumentItemComponents_Id"}),
	}
});

export const StockUnwrapDocumentItemComponents_tracking = mysqlTable("StockUnwrapDocumentItemComponents_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockUnwrapDocumentItemComponents_tracking_Id: primaryKey({ columns: [table.Id], name: "StockUnwrapDocumentItemComponents_tracking_Id"}),
	}
});

export const StockUnwrapDocumentItems = mysqlTable("StockUnwrapDocumentItems", {
	Id: binary({ length: 16 }).notNull(),
	DocumentId: binary({ length: 16 }).notNull().references(() => StockUnwrapDocuments.Id, { onDelete: "cascade" } ),
	RowNumber: int().notNull(),
	NomenclatureId: binary({ length: 16 }).notNull().references(() => Nomenclatures.Id, { onDelete: "cascade" } ),
	UnitOfMeasureId: binary({ length: 16 }).notNull().references(() => UnitsOfMeasure.Id, { onDelete: "cascade" } ),
	StockItemId: binary({ length: 16 }).references(() => StockItems.Id, { onDelete: "restrict" } ),
	QuantityToUnwrap: decimal({ precision: 12, scale: 2 }).notNull(),
	UnwrappedQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	IsObject: tinyint().notNull(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_StockUnwrapDocumentItems_DocumentId: index("IX_StockUnwrapDocumentItems_DocumentId").on(table.DocumentId),
		IX_StockUnwrapDocumentItems_NomenclatureId: index("IX_StockUnwrapDocumentItems_NomenclatureId").on(table.NomenclatureId),
		IX_StockUnwrapDocumentItems_StockItemId: index("IX_StockUnwrapDocumentItems_StockItemId").on(table.StockItemId),
		IX_StockUnwrapDocumentItems_UnitOfMeasureId: index("IX_StockUnwrapDocumentItems_UnitOfMeasureId").on(table.UnitOfMeasureId),
		StockUnwrapDocumentItems_Id: primaryKey({ columns: [table.Id], name: "StockUnwrapDocumentItems_Id"}),
	}
});

export const StockUnwrapDocumentItems_tracking = mysqlTable("StockUnwrapDocumentItems_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockUnwrapDocumentItems_tracking_Id: primaryKey({ columns: [table.Id], name: "StockUnwrapDocumentItems_tracking_Id"}),
	}
});

export const StockUnwrapDocuments = mysqlTable("StockUnwrapDocuments", {
	Id: binary({ length: 16 }).notNull(),
	Number: longtext(),
	Date: datetime({ mode: 'string', fsp: 6 }).notNull(),
	Description: longtext(),
	StockAccountingGroupId: binary({ length: 16 }).notNull().references(() => StockAccountingGroups.Id, { onDelete: "cascade" } ),
	DocumentStatusId: longtext(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	WarehouseManagementId: binary({ length: 16 }).references(() => WarehouseManagements.Id, { onDelete: "set null" } ),
	DocumentStatusNewId: binary({ length: 16 }).default('0x').notNull(),
},
(table) => {
	return {
		IX_StockUnwrapDocuments_StockAccountingGroupId: index("IX_StockUnwrapDocuments_StockAccountingGroupId").on(table.StockAccountingGroupId),
		IX_StockUnwrapDocuments_WarehouseManagementId: index("IX_StockUnwrapDocuments_WarehouseManagementId").on(table.WarehouseManagementId),
		StockUnwrapDocuments_Id: primaryKey({ columns: [table.Id], name: "StockUnwrapDocuments_Id"}),
	}
});

export const StockUnwrapDocuments_tracking = mysqlTable("StockUnwrapDocuments_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockUnwrapDocuments_tracking_Id: primaryKey({ columns: [table.Id], name: "StockUnwrapDocuments_tracking_Id"}),
	}
});

export const StockWriteoffDocumentItemComponents = mysqlTable("StockWriteoffDocumentItemComponents", {
	Id: binary({ length: 16 }).notNull(),
	DocumentItemId: binary({ length: 16 }).notNull().references(() => StockWriteoffDocumentItems.Id, { onDelete: "cascade" } ),
	StockItemId: binary({ length: 16 }).notNull().references(() => StockItems.Id, { onDelete: "cascade" } ),
	DetailQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
},
(table) => {
	return {
		IX_StockWriteoffDocumentItemComponents_DocumentItemId: index("IX_StockWriteoffDocumentItemComponents_DocumentItemId").on(table.DocumentItemId),
		IX_StockWriteoffDocumentItemComponents_StockItemId: index("IX_StockWriteoffDocumentItemComponents_StockItemId").on(table.StockItemId),
		StockWriteoffDocumentItemComponents_Id: primaryKey({ columns: [table.Id], name: "StockWriteoffDocumentItemComponents_Id"}),
	}
});

export const StockWriteoffDocumentItemComponents_tracking = mysqlTable("StockWriteoffDocumentItemComponents_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockWriteoffDocumentItemComponents_tracking_Id: primaryKey({ columns: [table.Id], name: "StockWriteoffDocumentItemComponents_tracking_Id"}),
	}
});

export const StockWriteoffDocumentItems = mysqlTable("StockWriteoffDocumentItems", {
	Id: binary({ length: 16 }).notNull(),
	DocumentId: binary({ length: 16 }).notNull().references(() => StockWriteoffDocuments.Id, { onDelete: "cascade" } ),
	StockAccountingGroupId: binary({ length: 16 }).notNull().references(() => StockAccountingGroups.Id, { onDelete: "cascade" } ),
	PlannedQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	ActualQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	Price: decimal({ precision: 12, scale: 2 }).notNull(),
	Amount: decimal({ precision: 12, scale: 2 }).notNull(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	ActualWeight: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	PlannedWeight: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	TotalVolume: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	LocationId: int(),
	Codes: longtext(),
	ShouldUnbindCodes: tinyint().default(0).notNull(),
},
(table) => {
	return {
		IX_StockWriteoffDocumentItems_DocumentId: index("IX_StockWriteoffDocumentItems_DocumentId").on(table.DocumentId),
		IX_StockWriteoffDocumentItems_StockAccountingGroupId: index("IX_StockWriteoffDocumentItems_StockAccountingGroupId").on(table.StockAccountingGroupId),
		StockWriteoffDocumentItems_Id: primaryKey({ columns: [table.Id], name: "StockWriteoffDocumentItems_Id"}),
	}
});

export const StockWriteoffDocumentItems_tracking = mysqlTable("StockWriteoffDocumentItems_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockWriteoffDocumentItems_tracking_Id: primaryKey({ columns: [table.Id], name: "StockWriteoffDocumentItems_tracking_Id"}),
	}
});

export const StockWriteoffDocuments = mysqlTable("StockWriteoffDocuments", {
	Id: binary({ length: 16 }).notNull(),
	Number: longtext(),
	Date: datetime({ mode: 'string', fsp: 6 }).notNull(),
	Description: longtext(),
	TotalAmount: decimal({ precision: 12, scale: 2 }).notNull(),
	OrgUnitId: int(),
	CustodianUserId: int().notNull(),
	DocumentStatusId: longtext(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	WarehouseManagementId: binary({ length: 16 }).references(() => WarehouseManagements.Id, { onDelete: "set null" } ),
	RefToBaseDocument: longtext(),
	AttorneyPowerDate: datetime({ mode: 'string', fsp: 6 }),
	AttorneyPowerNumber: longtext(),
	CompanyId: binary({ length: 16 }).references(() => Companies.Id, { onDelete: "restrict" } ),
	Recipient: longtext(),
	ExternalDocumentTypeId: int().references(() => ExternalDocumentTypes.Id, { onDelete: "restrict" } ),
	AttorneyPowerThroughWhom: longtext(),
	VATAmount: decimal({ precision: 12, scale: 2 }),
	DocumentStatusNewId: binary({ length: 16 }).default('0x').notNull(),
	AccountingCode: longtext(),
},
(table) => {
	return {
		IX_StockWriteoffDocuments_CompanyId: index("IX_StockWriteoffDocuments_CompanyId").on(table.CompanyId),
		IX_StockWriteoffDocuments_ExternalDocumentTypeId: index("IX_StockWriteoffDocuments_ExternalDocumentTypeId").on(table.ExternalDocumentTypeId),
		IX_StockWriteoffDocuments_WarehouseManagementId: index("IX_StockWriteoffDocuments_WarehouseManagementId").on(table.WarehouseManagementId),
		StockWriteoffDocuments_Id: primaryKey({ columns: [table.Id], name: "StockWriteoffDocuments_Id"}),
	}
});

export const StockWriteoffDocuments_tracking = mysqlTable("StockWriteoffDocuments_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		StockWriteoffDocuments_tracking_Id: primaryKey({ columns: [table.Id], name: "StockWriteoffDocuments_tracking_Id"}),
	}
});

export const SupplierStockBalanceRegistries = mysqlTable("SupplierStockBalanceRegistries", {
	Id: int().autoincrement().notNull(),
	CompanyId: binary({ length: 16 }).references(() => Companies.Id, { onDelete: "restrict" } ),
	StockAccountingGroupId: binary({ length: 16 }).notNull().references(() => StockAccountingGroups.Id, { onDelete: "cascade" } ),
	DocumentId: binary({ length: 16 }),
	DocumentTypeId: longtext(),
	PostDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	Quantity: decimal({ precision: 12, scale: 2 }).notNull(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_SupplierStockBalanceRegistries_CompanyId: index("IX_SupplierStockBalanceRegistries_CompanyId").on(table.CompanyId),
		IX_SupplierStockBalanceRegistries_StockAccountingGroupId: index("IX_SupplierStockBalanceRegistries_StockAccountingGroupId").on(table.StockAccountingGroupId),
		SupplierStockBalanceRegistries_Id: primaryKey({ columns: [table.Id], name: "SupplierStockBalanceRegistries_Id"}),
	}
});

export const SupplierStockCurrentBalanceRegistries = mysqlTable("SupplierStockCurrentBalanceRegistries", {
	Id: binary({ length: 16 }).notNull(),
	StockAccountingGroupId: binary({ length: 16 }).notNull().references(() => StockAccountingGroups.Id, { onDelete: "cascade" } ),
	CompanyId: binary({ length: 16 }).references(() => Companies.Id, { onDelete: "restrict" } ),
	SupplierStockBalanceRegistryId: int().notNull().references(() => SupplierStockBalanceRegistries.Id, { onDelete: "cascade" } ),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_SupplierStockCurrentBalanceRegistries_CompanyId: index("IX_SupplierStockCurrentBalanceRegistries_CompanyId").on(table.CompanyId),
		IX_SupplierStockCurrentBalanceRegistries_StockAccountingGroupId: index("IX_SupplierStockCurrentBalanceRegistries_StockAccountingGroupId").on(table.StockAccountingGroupId),
		"IX_SupplierStockCurrentBalanceRegistries_SupplierStockBalanceRe~": index("IX_SupplierStockCurrentBalanceRegistries_SupplierStockBalanceRe~").on(table.SupplierStockBalanceRegistryId),
		SupplierStockCurrentBalanceRegistries_Id: primaryKey({ columns: [table.Id], name: "SupplierStockCurrentBalanceRegistries_Id"}),
	}
});

export const SupplierStockMovementRegistries = mysqlTable("SupplierStockMovementRegistries", {
	Id: int().autoincrement().notNull(),
	CompanyId: binary({ length: 16 }).references(() => Companies.Id, { onDelete: "restrict" } ),
	StockAccountingGroupId: binary({ length: 16 }).notNull().references(() => StockAccountingGroups.Id, { onDelete: "cascade" } ),
	DocumentId: binary({ length: 16 }),
	DocumentTypeId: longtext(),
	PostDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	Quantity: decimal({ precision: 12, scale: 2 }).notNull(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_SupplierStockMovementRegistries_CompanyId: index("IX_SupplierStockMovementRegistries_CompanyId").on(table.CompanyId),
		IX_SupplierStockMovementRegistries_StockAccountingGroupId: index("IX_SupplierStockMovementRegistries_StockAccountingGroupId").on(table.StockAccountingGroupId),
		SupplierStockMovementRegistries_Id: primaryKey({ columns: [table.Id], name: "SupplierStockMovementRegistries_Id"}),
	}
});

export const SystemRecords = mysqlTable("SystemRecords", {
	Id: int().autoincrement().notNull(),
	TableName: longtext(),
	RecordId: longtext(),
},
(table) => {
	return {
		SystemRecords_Id: primaryKey({ columns: [table.Id], name: "SystemRecords_Id"}),
	}
});

export const TaskMaterialComponents = mysqlTable("TaskMaterialComponents", {
	Id: binary({ length: 16 }).notNull(),
	DocumentItemId: binary({ length: 16 }).notNull().references(() => TaskMaterials.Id, { onDelete: "cascade" } ),
	StockItemId: binary({ length: 16 }).notNull().references(() => StockItems.Id, { onDelete: "cascade" } ),
	DetailQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	RowGuid: binary({ length: 16 }).notNull(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_TaskMaterialComponents_DocumentItemId: index("IX_TaskMaterialComponents_DocumentItemId").on(table.DocumentItemId),
		IX_TaskMaterialComponents_StockItemId: index("IX_TaskMaterialComponents_StockItemId").on(table.StockItemId),
		TaskMaterialComponents_Id: primaryKey({ columns: [table.Id], name: "TaskMaterialComponents_Id"}),
	}
});

export const TaskMaterials = mysqlTable("TaskMaterials", {
	Id: binary({ length: 16 }).notNull(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	RowGuid: binary({ length: 16 }).notNull(),
	DocumentId: binary({ length: 16 }).notNull(),
	RowNo: int().notNull(),
	StockAccountingGroupId: binary({ length: 16 }).notNull().references(() => StockAccountingGroups.Id, { onDelete: "cascade" } ),
	PlannedQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	ActualQuantity: decimal({ precision: 12, scale: 2 }).notNull(),
	Notes: longtext(),
	ActualWeight: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	PlannedWeight: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	TotalVolume: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
},
(table) => {
	return {
		IX_TaskMaterials_StockAccountingGroupId: index("IX_TaskMaterials_StockAccountingGroupId").on(table.StockAccountingGroupId),
		TaskMaterials_Id: primaryKey({ columns: [table.Id], name: "TaskMaterials_Id"}),
	}
});

export const TaskMaterials_tracking = mysqlTable("TaskMaterials_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		TaskMaterials_tracking_Id: primaryKey({ columns: [table.Id], name: "TaskMaterials_tracking_Id"}),
	}
});

export const TrackingRegistries = mysqlTable("TrackingRegistries", {
	Id: binary({ length: 16 }).notNull(),
	LocationId: int(),
	GpsLatitude: double(),
	GpsLongitude: double(),
	Radius: double(),
	RegistrationDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	EntityType: longtext().notNull(),
},
(table) => {
	return {
		TrackingRegistries_Id: primaryKey({ columns: [table.Id], name: "TrackingRegistries_Id"}),
	}
});

export const UnitsOfMeasure = mysqlTable("UnitsOfMeasure", {
	Id: binary({ length: 16 }).notNull(),
	Name: varchar({ length: 200 }).notNull(),
	IsRemoved: tinyint().notNull(),
	IsPieceAccounting: tinyint().notNull(),
},
(table) => {
	return {
		UnitsOfMeasure_Id: primaryKey({ columns: [table.Id], name: "UnitsOfMeasure_Id"}),
	}
});

export const UnitsOfMeasure_tracking = mysqlTable("UnitsOfMeasure_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		UnitsOfMeasure_tracking_Id: primaryKey({ columns: [table.Id], name: "UnitsOfMeasure_tracking_Id"}),
	}
});

export const WarehouseManagements = mysqlTable("WarehouseManagements", {
	Id: binary({ length: 16 }).notNull(),
	Code: longtext(),
	JobName: longtext(),
},
(table) => {
	return {
		WarehouseManagements_Id: primaryKey({ columns: [table.Id], name: "WarehouseManagements_Id"}),
	}
});

export const WarehouseMovementDocuments = mysqlTable("WarehouseMovementDocuments", {
	Id: binary({ length: 16 }).notNull(),
	DocumentId: binary({ length: 16 }),
	StartLocationId: int(),
	FinishLocationId: int(),
	LoadQuantity: double().notNull(),
	LoadUnitOfMeasureId: binary({ length: 16 }).references(() => UnitsOfMeasure.Id),
	AssetId: binary({ length: 16 }).references(() => Assets.Id),
	NomenclatureId: binary({ length: 16 }).references(() => Nomenclatures.Id),
	ProductTypeId: int().references(() => ProductTypes.Id),
	ShipmentId: int().references((): AnyMySqlColumn => Shipments.Id),
},
(table) => {
	return {
		IX_WarehouseMovementDocuments_AssetId: index("IX_WarehouseMovementDocuments_AssetId").on(table.AssetId),
		IX_WarehouseMovementDocuments_LoadUnitOfMeasureId: index("IX_WarehouseMovementDocuments_LoadUnitOfMeasureId").on(table.LoadUnitOfMeasureId),
		IX_WarehouseMovementDocuments_NomenclatureId: index("IX_WarehouseMovementDocuments_NomenclatureId").on(table.NomenclatureId),
		IX_WarehouseMovementDocuments_ProductTypeId: index("IX_WarehouseMovementDocuments_ProductTypeId").on(table.ProductTypeId),
		IX_WarehouseMovementDocuments_ShipmentId: index("IX_WarehouseMovementDocuments_ShipmentId").on(table.ShipmentId),
		WarehouseMovementDocuments_Id: primaryKey({ columns: [table.Id], name: "WarehouseMovementDocuments_Id"}),
	}
});

export const _MigrationsHistoryForDocManagement = mysqlTable("_MigrationsHistoryForDocManagement", {
	MigrationId: varchar({ length: 95 }).notNull(),
	ProductVersion: varchar({ length: 32 }).notNull(),
},
(table) => {
	return {
		_MigrationsHistoryForDocManagement_MigrationId: primaryKey({ columns: [table.MigrationId], name: "_MigrationsHistoryForDocManagement_MigrationId"}),
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
export const AssetMovementDocumentItemView = mysqlView("AssetMovementDocumentItemView", {
	Id: binary({ length: 16 }).notNull(),
	AssetId: binary({ length: 16 }).notNull(),
	AccountingQuantity: int().notNull(),
	ActualQuantity: int().notNull(),
	DocumentId: binary({ length: 16 }).notNull(),
	RefKeyFromRegistry: int(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	FromLocationId: int(),
	ToLocationId: int(),
	FromUtilizerUserId: int(),
	ToUtilizerUserId: int(),
	FromUtilizerUserName: varchar({ length: 256 }),
	ToUtilizerUserName: varchar({ length: 256 }),
	FromLocationDescription: longtext(),
	ToLocationDescription: longtext(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`am\`.\`Id\` AS \`Id\`,\`am\`.\`AssetId\` AS \`AssetId\`,\`am\`.\`AccountingQuantity\` AS \`AccountingQuantity\`,\`am\`.\`ActualQuantity\` AS \`ActualQuantity\`,\`am\`.\`DocumentId\` AS \`DocumentId\`,\`am\`.\`RefKeyFromRegistry\` AS \`RefKeyFromRegistry\`,\`am\`.\`IsRemoved\` AS \`IsRemoved\`,\`am\`.\`CreatedById\` AS \`CreatedById\`,\`am\`.\`Created\` AS \`Created\`,\`am\`.\`UpdatedById\` AS \`UpdatedById\`,\`am\`.\`Updated\` AS \`Updated\`,\`am\`.\`FromLocationId\` AS \`FromLocationId\`,\`am\`.\`ToLocationId\` AS \`ToLocationId\`,\`am\`.\`FromUtilizerUserId\` AS \`FromUtilizerUserId\`,\`am\`.\`ToUtilizerUserId\` AS \`ToUtilizerUserId\`,\`uFrom\`.\`FullName\` AS \`FromUtilizerUserName\`,\`uTo\`.\`FullName\` AS \`ToUtilizerUserName\`,\`lFrom\`.\`Description\` AS \`FromLocationDescription\`,\`lTo\`.\`Description\` AS \`ToLocationDescription\` from ((((\`inventory\`.\`AssetMovementDocumentItems\` \`am\` left join \`hr\`.\`Users\` \`uFrom\` on((\`am\`.\`FromUtilizerUserId\` = \`uFrom\`.\`Id\`))) left join \`hr\`.\`Users\` \`uTo\` on((\`am\`.\`ToUtilizerUserId\` = \`uTo\`.\`Id\`))) left join \`hr\`.\`Locations\` \`lFrom\` on((\`am\`.\`FromLocationId\` = \`lFrom\`.\`Id\`))) left join \`hr\`.\`Locations\` \`lTo\` on((\`am\`.\`ToLocationId\` = \`lTo\`.\`Id\`)))`);

export const AssetMovementDocumentView = mysqlView("AssetMovementDocumentView", {
	Id: binary({ length: 16 }).notNull(),
	Number: longtext(),
	Description: longtext(),
	AccountingCode: longtext(),
	Date: datetime({ mode: 'string', fsp: 6 }).notNull(),
	FromOrgUnitId: int().notNull(),
	FromCustodianUserId: int().notNull(),
	ToOrgUnitId: int().notNull(),
	ToCustodianUserId: int().notNull(),
	DocumentStatusId: longtext(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	IsRemoved: tinyint().notNull(),
	WarehouseManagementId: binary({ length: 16 }),
	DocumentStatusNewId: binary({ length: 16 }).default('0x').notNull(),
	FromOrgUnitDescription: longtext(),
	ToOrgUnitDescription: longtext(),
	FromCustodianUserName: varchar({ length: 256 }),
	ToCustodianUserName: varchar({ length: 256 }),
	DocStatusDescription: longtext(),
	WarehouseManagementCode: longtext(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`am\`.\`Id\` AS \`Id\`,\`am\`.\`Number\` AS \`Number\`,\`am\`.\`Description\` AS \`Description\`,\`am\`.\`AccountingCode\` AS \`AccountingCode\`,\`am\`.\`Date\` AS \`Date\`,\`am\`.\`FromOrgUnitId\` AS \`FromOrgUnitId\`,\`am\`.\`FromCustodianUserId\` AS \`FromCustodianUserId\`,\`am\`.\`ToOrgUnitId\` AS \`ToOrgUnitId\`,\`am\`.\`ToCustodianUserId\` AS \`ToCustodianUserId\`,\`am\`.\`DocumentStatusId\` AS \`DocumentStatusId\`,\`am\`.\`CreatedById\` AS \`CreatedById\`,\`am\`.\`Created\` AS \`Created\`,\`am\`.\`UpdatedById\` AS \`UpdatedById\`,\`am\`.\`Updated\` AS \`Updated\`,\`am\`.\`IsRemoved\` AS \`IsRemoved\`,\`am\`.\`WarehouseManagementId\` AS \`WarehouseManagementId\`,\`am\`.\`DocumentStatusNewId\` AS \`DocumentStatusNewId\`,\`ouFrom\`.\`Description\` AS \`FromOrgUnitDescription\`,\`ouTo\`.\`Description\` AS \`ToOrgUnitDescription\`,\`uFrom\`.\`FullName\` AS \`FromCustodianUserName\`,\`uTo\`.\`FullName\` AS \`ToCustodianUserName\`,\`ds\`.\`Description\` AS \`DocStatusDescription\`,\`wm\`.\`Code\` AS \`WarehouseManagementCode\` from ((((((\`inventory\`.\`AssetMovementDocuments\` \`am\` left join \`hr\`.\`OrgUnits\` \`ouFrom\` on((\`am\`.\`FromOrgUnitId\` = \`ouFrom\`.\`Id\`))) left join \`hr\`.\`OrgUnits\` \`ouTo\` on((\`am\`.\`ToOrgUnitId\` = \`ouTo\`.\`Id\`))) left join \`hr\`.\`Users\` \`uFrom\` on((\`am\`.\`FromCustodianUserId\` = \`uFrom\`.\`Id\`))) left join \`hr\`.\`Users\` \`uTo\` on((\`am\`.\`ToCustodianUserId\` = \`uTo\`.\`Id\`))) left join \`docworkflow\`.\`DocStatuses\` \`ds\` on((\`am\`.\`DocumentStatusNewId\` = \`ds\`.\`Id\`))) left join \`inventory\`.\`WarehouseManagements\` \`wm\` on((\`am\`.\`WarehouseManagementId\` = \`wm\`.\`Id\`)))`);

export const AssetReceiptDocumentItemView = mysqlView("AssetReceiptDocumentItemView", {
	Id: binary({ length: 16 }).notNull(),
	AssetId: binary({ length: 16 }).notNull(),
	InitPrice: decimal({ precision: 33, scale: 5 }).notNull(),
	Depreciation: decimal({ precision: 33, scale: 5 }).notNull(),
	AccountingQuantity: int().notNull(),
	ActualQuantity: int().notNull(),
	DocumentId: binary({ length: 16 }).notNull(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	LocationId: int(),
	UtilizerUserId: int(),
	RowNumber: int().default(0).notNull(),
	LocationDescription: longtext(),
	UtilizerUserName: varchar({ length: 256 }),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`am\`.\`Id\` AS \`Id\`,\`am\`.\`AssetId\` AS \`AssetId\`,\`am\`.\`InitPrice\` AS \`InitPrice\`,\`am\`.\`Depreciation\` AS \`Depreciation\`,\`am\`.\`AccountingQuantity\` AS \`AccountingQuantity\`,\`am\`.\`ActualQuantity\` AS \`ActualQuantity\`,\`am\`.\`DocumentId\` AS \`DocumentId\`,\`am\`.\`IsRemoved\` AS \`IsRemoved\`,\`am\`.\`CreatedById\` AS \`CreatedById\`,\`am\`.\`Created\` AS \`Created\`,\`am\`.\`UpdatedById\` AS \`UpdatedById\`,\`am\`.\`Updated\` AS \`Updated\`,\`am\`.\`LocationId\` AS \`LocationId\`,\`am\`.\`UtilizerUserId\` AS \`UtilizerUserId\`,\`am\`.\`RowNumber\` AS \`RowNumber\`,\`loc\`.\`Description\` AS \`LocationDescription\`,\`uTo\`.\`FullName\` AS \`UtilizerUserName\` from ((\`inventory\`.\`AssetReceiptDocumentItems\` \`am\` left join \`hr\`.\`Locations\` \`loc\` on((\`am\`.\`LocationId\` = \`loc\`.\`Id\`))) left join \`hr\`.\`Users\` \`uTo\` on((\`am\`.\`UtilizerUserId\` = \`uTo\`.\`Id\`)))`);

export const AssetReceiptDocumentView = mysqlView("AssetReceiptDocumentView", {
	Id: binary({ length: 16 }).notNull(),
	Number: longtext(),
	Description: longtext(),
	AccountingCode: longtext(),
	Date: datetime({ mode: 'string', fsp: 6 }).notNull(),
	CustodianUserId: int().notNull(),
	DocAuthorId: int().notNull(),
	ApprovedByUserId: int(),
	DocumentStatusId: longtext(),
	IsRemoved: tinyint().notNull(),
	OrgUnitId: int(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	WarehouseManagementId: binary({ length: 16 }),
	DocumentStatusNewId: binary({ length: 16 }).default('0x').notNull(),
	CustodianUserName: varchar({ length: 256 }),
	DocAuthorUserName: varchar({ length: 256 }),
	ApprovedByUserName: varchar({ length: 256 }),
	DocStatusDescription: longtext(),
	OrgUnitDescription: longtext(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`am\`.\`Id\` AS \`Id\`,\`am\`.\`Number\` AS \`Number\`,\`am\`.\`Description\` AS \`Description\`,\`am\`.\`AccountingCode\` AS \`AccountingCode\`,\`am\`.\`Date\` AS \`Date\`,\`am\`.\`CustodianUserId\` AS \`CustodianUserId\`,\`am\`.\`DocAuthorId\` AS \`DocAuthorId\`,\`am\`.\`ApprovedByUserId\` AS \`ApprovedByUserId\`,\`am\`.\`DocumentStatusId\` AS \`DocumentStatusId\`,\`am\`.\`IsRemoved\` AS \`IsRemoved\`,\`am\`.\`OrgUnitId\` AS \`OrgUnitId\`,\`am\`.\`CreatedById\` AS \`CreatedById\`,\`am\`.\`Created\` AS \`Created\`,\`am\`.\`UpdatedById\` AS \`UpdatedById\`,\`am\`.\`Updated\` AS \`Updated\`,\`am\`.\`WarehouseManagementId\` AS \`WarehouseManagementId\`,\`am\`.\`DocumentStatusNewId\` AS \`DocumentStatusNewId\`,\`cus\`.\`FullName\` AS \`CustodianUserName\`,\`uTo\`.\`FullName\` AS \`DocAuthorUserName\`,\`appr\`.\`FullName\` AS \`ApprovedByUserName\`,\`stat\`.\`Description\` AS \`DocStatusDescription\`,\`unit\`.\`Description\` AS \`OrgUnitDescription\` from (((((\`inventory\`.\`AssetReceiptDocuments\` \`am\` left join \`hr\`.\`Users\` \`cus\` on((\`am\`.\`CustodianUserId\` = \`cus\`.\`Id\`))) left join \`hr\`.\`Users\` \`uTo\` on((\`am\`.\`DocAuthorId\` = \`uTo\`.\`Id\`))) left join \`hr\`.\`Users\` \`appr\` on((\`am\`.\`ApprovedByUserId\` = \`appr\`.\`Id\`))) left join \`docworkflow\`.\`DocStatuses\` \`stat\` on((\`am\`.\`DocumentStatusNewId\` = \`stat\`.\`Id\`))) left join \`hr\`.\`OrgUnits\` \`unit\` on((\`am\`.\`OrgUnitId\` = \`unit\`.\`Id\`)))`);

export const NomenclaturePeriodStandardView = mysqlView("NomenclaturePeriodStandardView", {
	OrgUnitDescription: longtext(),
	Id: binary({ length: 16 }).notNull(),
	OrgUnitId: int(),
	NomenclatureId: binary({ length: 16 }).notNull(),
	StdQnt: double().notNull(),
	UnitOfMeasureId: binary({ length: 16 }).default('0x').notNull(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`a\`.\`Description\` AS \`OrgUnitDescription\`,\`OR REPLACE j\`.\`Id\` AS \`Id\`,\`OR REPLACE j\`.\`OrgUnitId\` AS \`OrgUnitId\`,\`OR REPLACE j\`.\`NomenclatureId\` AS \`NomenclatureId\`,\`OR REPLACE j\`.\`StdQnt\` AS \`StdQnt\`,\`OR REPLACE j\`.\`UnitOfMeasureId\` AS \`UnitOfMeasureId\` from (\`inventory\`.\`NomenclaturePeriodStandards\` \`OR REPLACE j\` left join \`hr\`.\`OrgUnits\` \`a\` on((\`OR REPLACE j\`.\`OrgUnitId\` = \`a\`.\`Id\`)))`);

export const NomenclatureView = mysqlView("NomenclatureView", {
	OrgUnitName: longtext(),
	Id: binary({ length: 16 }).notNull(),
	Number: varchar({ length: 200 }).notNull(),
	FullName: varchar({ length: 200 }).notNull(),
	Alias: varchar({ length: 200 }),
	UnitOfStock: longtext(),
	ReportingUnit: longtext(),
	TNVEDCode: longtext(),
	KPVEDCode: longtext(),
	TRUCode: longtext(),
	NomenclatureGroupId: binary({ length: 16 }).notNull(),
	StockKeepingUnit: varchar({ length: 200 }).notNull(),
	ProducerId: binary({ length: 16 }),
	DefaultUnitOfMeasureId: binary({ length: 16 }),
	IsMadeByNomenclatureSetDocument: tinyint().notNull(),
	StockNomenclatureSetDocumentId: binary({ length: 16 }),
	CodeFromExtAcctSys: varchar({ length: 255 }),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	Height: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	Length: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	Weight: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	Width: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
	Volume: decimal({ precision: 12, scale: 2 }).default('0.00').notNull(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`ou\`.\`Description\` AS \`OrgUnitName\`,\`n\`.\`Id\` AS \`Id\`,\`n\`.\`Number\` AS \`Number\`,\`n\`.\`FullName\` AS \`FullName\`,\`n\`.\`Alias\` AS \`Alias\`,\`n\`.\`UnitOfStock\` AS \`UnitOfStock\`,\`n\`.\`ReportingUnit\` AS \`ReportingUnit\`,\`n\`.\`TNVEDCode\` AS \`TNVEDCode\`,\`n\`.\`KPVEDCode\` AS \`KPVEDCode\`,\`n\`.\`TRUCode\` AS \`TRUCode\`,\`n\`.\`NomenclatureGroupId\` AS \`NomenclatureGroupId\`,\`n\`.\`StockKeepingUnit\` AS \`StockKeepingUnit\`,\`n\`.\`ProducerId\` AS \`ProducerId\`,\`n\`.\`DefaultUnitOfMeasureId\` AS \`DefaultUnitOfMeasureId\`,\`n\`.\`IsMadeByNomenclatureSetDocument\` AS \`IsMadeByNomenclatureSetDocument\`,\`n\`.\`StockNomenclatureSetDocumentId\` AS \`StockNomenclatureSetDocumentId\`,\`n\`.\`CodeFromExtAcctSys\` AS \`CodeFromExtAcctSys\`,\`n\`.\`IsRemoved\` AS \`IsRemoved\`,\`n\`.\`CreatedById\` AS \`CreatedById\`,\`n\`.\`Created\` AS \`Created\`,\`n\`.\`UpdatedById\` AS \`UpdatedById\`,\`n\`.\`Updated\` AS \`Updated\`,\`n\`.\`Height\` AS \`Height\`,\`n\`.\`Length\` AS \`Length\`,\`n\`.\`Weight\` AS \`Weight\`,\`n\`.\`Width\` AS \`Width\`,\`n\`.\`Volume\` AS \`Volume\` from ((\`inventory\`.\`Nomenclatures\` \`n\` left join \`inventory\`.\`NomenclatureGroups\` \`ng\` on((\`n\`.\`NomenclatureGroupId\` = \`ng\`.\`Id\`))) left join \`hr\`.\`OrgUnits\` \`ou\` on((\`ng\`.\`OrgUnitId\` = \`ou\`.\`Id\`)))`);