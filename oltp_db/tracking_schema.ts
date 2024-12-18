import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, foreignKey, primaryKey, binary, datetime, int, unique, varchar, longtext, double, json, mysqlView } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const AvailableVehicles = mysqlTable("AvailableVehicles", {
	Id: binary({ length: 16 }).notNull(),
	VehicleId: binary({ length: 16 }).notNull().references(() => Vehicles.Id, { onDelete: "restrict" } ),
	ArrivalDate: datetime({ mode: 'string', fsp: 6 }).notNull(),
	DepartureDate: datetime({ mode: 'string', fsp: 6 }).notNull(),
	IsAvailable: tinyint().notNull(),
	ArrivalDocRef: binary({ length: 16 }).notNull(),
	DepartureDocRef: binary({ length: 16 }).notNull(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_AvailableVehicles_VehicleId: index("IX_AvailableVehicles_VehicleId").on(table.VehicleId),
		AvailableVehicles_Id: primaryKey({ columns: [table.Id], name: "AvailableVehicles_Id"}),
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

export const ComposedVehicleItems = mysqlTable("ComposedVehicleItems", {
	Id: int().autoincrement().notNull(),
	ComposedVehicleId: int().notNull().references(() => ComposedVehicles.Id, { onDelete: "restrict" } ),
	EntityGuidId: binary({ length: 16 }).default('0x').notNull(),
	ByObservation: tinyint().default(0).notNull(),
	ObservedComposedVehicleId: int().references(() => ComposedVehicles.Id),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	Created: datetime({ mode: 'string', fsp: 6 }).default('0001-01-01 00:00:00.000000').notNull(),
},
(table) => {
	return {
		IX_ComposedVehicleItems_ComposedVehicleId: index("IX_ComposedVehicleItems_ComposedVehicleId").on(table.ComposedVehicleId),
		IX_ComposedVehicleItems_ObservedComposedVehicleId: index("IX_ComposedVehicleItems_ObservedComposedVehicleId").on(table.ObservedComposedVehicleId),
		ComposedVehicleItems_Id: primaryKey({ columns: [table.Id], name: "ComposedVehicleItems_Id"}),
	}
});

export const ComposedVehicleJournals = mysqlTable("ComposedVehicleJournals", {
	Id: binary({ length: 16 }).notNull(),
	IsRemoved: tinyint().notNull(),
	AssetId: binary({ length: 16 }).notNull(),
	ComposedVehicleId: int().notNull().references(() => ComposedVehicles.Id, { onDelete: "restrict" } ),
	StartedOn: datetime({ mode: 'string', fsp: 6 }).notNull(),
	FinishedOn: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		ComposedVehicleJournals_Id: primaryKey({ columns: [table.Id], name: "ComposedVehicleJournals_Id"}),
	}
});

export const ComposedVehicleLog = mysqlTable("ComposedVehicleLog", {
	Id: binary({ length: 16 }).notNull(),
	ComposedVehicleId: int().references(() => ComposedVehicles.Id),
	ActualComposedVehicleId: int().references(() => ComposedVehicles.Id),
	AssetId: binary({ length: 16 }).notNull(),
	Found: tinyint().notNull(),
	RecordDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	ComposedVehicleItemId: int().references(() => ComposedVehicleItems.Id),
	IsResolved: tinyint().default(0).notNull(),
	TagCode: longtext(),
},
(table) => {
	return {
		IX_ComposedVehicleLog_ActualComposedVehicleId: index("IX_ComposedVehicleLog_ActualComposedVehicleId").on(table.ActualComposedVehicleId),
		IX_ComposedVehicleLog_ComposedVehicleId: index("IX_ComposedVehicleLog_ComposedVehicleId").on(table.ComposedVehicleId),
		IX_ComposedVehicleLog_ComposedVehicleItemId: index("IX_ComposedVehicleLog_ComposedVehicleItemId").on(table.ComposedVehicleItemId),
		ComposedVehicleLog_Id: primaryKey({ columns: [table.Id], name: "ComposedVehicleLog_Id"}),
	}
});

export const ComposedVehicles = mysqlTable("ComposedVehicles", {
	Id: int().autoincrement().notNull(),
	Code: varchar({ length: 255 }),
	Description: varchar({ length: 255 }),
	RouteId: binary({ length: 16 }).references(() => Routes.Id, { onDelete: "restrict" } ),
	StandardQuantity: int(),
},
(table) => {
	return {
		IX_ComposedVehicles_RouteId: index("IX_ComposedVehicles_RouteId").on(table.RouteId),
		ComposedVehicles_Id: primaryKey({ columns: [table.Id], name: "ComposedVehicles_Id"}),
		IX_ComposedVehicles_Code_Description: unique("IX_ComposedVehicles_Code_Description").on(table.Code, table.Description),
	}
});

export const ContainerItemRegistries = mysqlTable("ContainerItemRegistries", {
	Id: int().autoincrement().notNull(),
	RegistrationDate: datetime({ mode: 'string', fsp: 6 }).notNull(),
	ContainerId: binary({ length: 16 }).notNull().references(() => Containers.Id, { onDelete: "restrict" } ),
	Direction: longtext().notNull(),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	EntityType: longtext(),
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
	EntityType: longtext(),
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

export const CurrentTrackingRegistries = mysqlTable("CurrentTrackingRegistries", {
	Id: binary({ length: 16 }).notNull(),
	EntityGuidId: binary({ length: 16 }),
	EntityClassId: binary({ length: 16 }),
	EntityIntId: int(),
	EntityType: longtext().notNull(),
	TrackingRegistryId: binary({ length: 16 }).notNull().references(() => TrackingRegistries.Id, { onDelete: "restrict" } ),
},
(table) => {
	return {
		CurrentTrackingRegistries_Id: primaryKey({ columns: [table.Id], name: "CurrentTrackingRegistries_Id"}),
		IX_CurrentTrackingRegistries_TrackingRegistryId_EntityGuidId: unique("IX_CurrentTrackingRegistries_TrackingRegistryId_EntityGuidId").on(table.TrackingRegistryId, table.EntityGuidId),
		IX_CurrentTrackingRegistries_TrackingRegistryId_EntityIntId: unique("IX_CurrentTrackingRegistries_TrackingRegistryId_EntityIntId").on(table.TrackingRegistryId, table.EntityIntId),
	}
});

export const FreightLogs = mysqlTable("FreightLogs", {
	Id: int().autoincrement().notNull(),
	LocomativeNumber: longtext(),
	Message: longtext(),
	LogDate: datetime({ mode: 'string', fsp: 6 }).notNull(),
	ReportDate: datetime({ mode: 'string', fsp: 6 }).notNull(),
},
(table) => {
	return {
		FreightLogs_Id: primaryKey({ columns: [table.Id], name: "FreightLogs_Id"}),
	}
});

export const FreightTempDatas = mysqlTable("FreightTempDatas", {
	Id: int().autoincrement().notNull(),
	BranchType: int().notNull(),
	LocomotiveNumber: longtext(),
	WeightMeasurementTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	BruttoWeight: double().notNull(),
	AXLE_WEIGHT_1: double().notNull(),
	AXLE_WEIGHT_2: double().notNull(),
	AXLE_WEIGHT_3: double().notNull(),
	AXLE_WEIGHT_4: double().notNull(),
	AXLE_WEIGHT_5: double().notNull(),
	AXLE_WEIGHT_6: double().notNull(),
	AXLE_WEIGHT_7: double().notNull(),
	AXLE_WEIGHT_8: double().notNull(),
	NumberOfAxles: int().notNull(),
},
(table) => {
	return {
		FreightTempDatas_Id: primaryKey({ columns: [table.Id], name: "FreightTempDatas_Id"}),
	}
});

export const GeoTrackingData = mysqlTable("GeoTrackingData", {
	Id: int().autoincrement().notNull(),
	GeoZoneId: int().notNull().references(() => GeoZones.Id, { onDelete: "cascade" } ),
	AssetId: binary({ length: 16 }).notNull(),
	EventDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	EventType: int().notNull(),
	TrackingRegistryId: binary({ length: 16 }).references(() => TrackingRegistries.Id),
	MileageValue: double(),
},
(table) => {
	return {
		IX_GeoTrackingData_GeoZoneId: index("IX_GeoTrackingData_GeoZoneId").on(table.GeoZoneId),
		IX_GeoTrackingData_TrackingRegistryId: index("IX_GeoTrackingData_TrackingRegistryId").on(table.TrackingRegistryId),
		GeoTrackingData_Id: primaryKey({ columns: [table.Id], name: "GeoTrackingData_Id"}),
	}
});

export const GeoZones = mysqlTable("GeoZones", {
	Id: int().autoincrement().notNull(),
	Name: longtext(),
	LocationId: int().notNull(),
	RouteNodeId: int().notNull().references(() => RouteNodes.Id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		IX_GeoZones_RouteNodeId: index("IX_GeoZones_RouteNodeId").on(table.RouteNodeId),
		GeoZones_Id: primaryKey({ columns: [table.Id], name: "GeoZones_Id"}),
	}
});

export const ObjectTrackingStates = mysqlTable("ObjectTrackingStates", {
	Id: int().autoincrement().notNull(),
	AssetId: binary({ length: 16 }),
	LocationId: int(),
	Status: longtext(),
	EventDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
},
(table) => {
	return {
		ObjectTrackingStates_Id: primaryKey({ columns: [table.Id], name: "ObjectTrackingStates_Id"}),
	}
});

export const ProcessingDocumentStates = mysqlTable("ProcessingDocumentStates", {
	Id: int().autoincrement().notNull(),
	FileName: longtext(),
	FileExtension: longtext(),
	ProcessingJobType: longtext(),
	ProcessedDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	ExceptionMessage: longtext(),
	Issuccess: tinyint().default(0).notNull(),
},
(table) => {
	return {
		ProcessingDocumentStates_Id: primaryKey({ columns: [table.Id], name: "ProcessingDocumentStates_Id"}),
	}
});

export const RouteNodeJoins = mysqlTable("RouteNodeJoins", {
	Id: int().autoincrement().notNull(),
	RouteOrder: int(),
	RouteId: binary({ length: 16 }).notNull().references(() => Routes.Id, { onDelete: "cascade" } ),
	RouteNodeId: int().notNull().references(() => RouteNodes.Id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		IX_RouteNodeJoins_RouteId: index("IX_RouteNodeJoins_RouteId").on(table.RouteId),
		IX_RouteNodeJoins_RouteNodeId: index("IX_RouteNodeJoins_RouteNodeId").on(table.RouteNodeId),
		RouteNodeJoins_Id: primaryKey({ columns: [table.Id], name: "RouteNodeJoins_Id"}),
	}
});

export const RouteNodeLinks = mysqlTable("RouteNodeLinks", {
	Id: int().autoincrement().notNull(),
	RouteId: binary({ length: 16 }).notNull().references(() => Routes.Id),
	StartRouteNodeId: int().notNull().references(() => RouteNodes.Id, { onDelete: "restrict" } ),
	FinishRouteNodeId: int().notNull().references(() => RouteNodes.Id, { onDelete: "restrict" } ),
	RouteNodeLinkDistance: double().notNull(),
	RouteNodeLinkOrder: int().default(0).notNull(),
	UnitOfMeasureId: binary({ length: 16 }).default('0x').notNull(),
},
(table) => {
	return {
		IX_RouteNodeLinks_FinishRouteNodeId: index("IX_RouteNodeLinks_FinishRouteNodeId").on(table.FinishRouteNodeId),
		IX_RouteNodeLinks_RouteId: index("IX_RouteNodeLinks_RouteId").on(table.RouteId),
		RouteNodeLinks_Id: primaryKey({ columns: [table.Id], name: "RouteNodeLinks_Id"}),
		IX_RouteNodeLinks_StartRouteNodeId_FinishRouteNodeId: unique("IX_RouteNodeLinks_StartRouteNodeId_FinishRouteNodeId").on(table.StartRouteNodeId, table.FinishRouteNodeId),
	}
});

export const RouteNodeTypes = mysqlTable("RouteNodeTypes", {
	Id: binary({ length: 16 }).notNull(),
	Code: varchar({ length: 255 }),
	Description: longtext(),
	IsRemoved: tinyint().notNull(),
},
(table) => {
	return {
		RouteNodeTypes_Id: primaryKey({ columns: [table.Id], name: "RouteNodeTypes_Id"}),
		IX_RouteNodeTypes_Code: unique("IX_RouteNodeTypes_Code").on(table.Code),
	}
});

export const RouteNodes = mysqlTable("RouteNodes", {
	Id: int().autoincrement().notNull(),
	InDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	OutDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	RouteId: binary({ length: 16 }),
	LocationId: int(),
	GpsLatitude: double(),
	GpsLongitude: double(),
	Radius: double(),
	RouteNodeTypeId: binary({ length: 16 }).default('0x').notNull(),
	Description: varchar({ length: 255 }),
},
(table) => {
	return {
		IX_RouteNodes_RouteNodeTypeId: index("IX_RouteNodes_RouteNodeTypeId").on(table.RouteNodeTypeId),
		RouteNodes_Id: primaryKey({ columns: [table.Id], name: "RouteNodes_Id"}),
		IX_RouteNodes_Description: unique("IX_RouteNodes_Description").on(table.Description),
	}
});

export const RouteProgresses = mysqlTable("RouteProgresses", {
	Id: binary({ length: 16 }).notNull(),
	RouteId: binary({ length: 16 }).notNull().references(() => Routes.Id, { onDelete: "restrict" } ),
	StartDateTime: datetime({ mode: 'string', fsp: 6 }),
	FinishDateTime: datetime({ mode: 'string', fsp: 6 }),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	EntityType: longtext(),
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
	DirectBranch: double(),
	ReverseBranch: double(),
},
(table) => {
	return {
		Routes_Id: primaryKey({ columns: [table.Id], name: "Routes_Id"}),
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
	EntityType: longtext(),
	EntityClassId: binary({ length: 16 }),
	LinkedData: json(),
},
(table) => {
	return {
		TrackingRegistries_Id: primaryKey({ columns: [table.Id], name: "TrackingRegistries_Id"}),
	}
});

export const VehicleAttributeTypes = mysqlTable("VehicleAttributeTypes", {
	Id: int().autoincrement().notNull(),
	Code: varchar({ length: 255 }),
	Description: longtext(),
},
(table) => {
	return {
		VehicleAttributeTypes_Id: primaryKey({ columns: [table.Id], name: "VehicleAttributeTypes_Id"}),
		IX_VehicleAttributeTypes_Code: unique("IX_VehicleAttributeTypes_Code").on(table.Code),
	}
});

export const VehicleAttributeValues = mysqlTable("VehicleAttributeValues", {
	Id: binary({ length: 16 }).notNull(),
	VehicleTypeAttributeTypeId: binary({ length: 16 }).notNull().references(() => VehicleTypeAttributeTypes.Id, { onDelete: "cascade" } ),
	VehicleId: binary({ length: 16 }).notNull().references(() => Vehicles.Id, { onDelete: "cascade" } ),
	AttributeValue: longtext(),
},
(table) => {
	return {
		IX_VehicleAttributeValues_VehicleId: index("IX_VehicleAttributeValues_VehicleId").on(table.VehicleId),
		IX_VehicleAttributeValues_VehicleTypeAttributeTypeId: index("IX_VehicleAttributeValues_VehicleTypeAttributeTypeId").on(table.VehicleTypeAttributeTypeId),
		VehicleAttributeValues_Id: primaryKey({ columns: [table.Id], name: "VehicleAttributeValues_Id"}),
	}
});

export const VehicleTypeAttributeTypes = mysqlTable("VehicleTypeAttributeTypes", {
	Id: binary({ length: 16 }).notNull(),
	VehicleAttributeTypeId: int().notNull().references(() => VehicleAttributeTypes.Id, { onDelete: "cascade" } ),
	VehicleTypeId: int().notNull().references(() => VehicleTypes.Id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		IX_VehicleTypeAttributeTypes_VehicleAttributeTypeId: index("IX_VehicleTypeAttributeTypes_VehicleAttributeTypeId").on(table.VehicleAttributeTypeId),
		IX_VehicleTypeAttributeTypes_VehicleTypeId: index("IX_VehicleTypeAttributeTypes_VehicleTypeId").on(table.VehicleTypeId),
		VehicleTypeAttributeTypes_Id: primaryKey({ columns: [table.Id], name: "VehicleTypeAttributeTypes_Id"}),
	}
});

export const VehicleTypes = mysqlTable("VehicleTypes", {
	Id: int().autoincrement().notNull(),
	Description: longtext().notNull(),
	AssetClassId: binary({ length: 16 }),
	Code: varchar({ length: 255 }),
	Tonnage: double(),
	VolumeSize: double(),
},
(table) => {
	return {
		VehicleTypes_Id: primaryKey({ columns: [table.Id], name: "VehicleTypes_Id"}),
		IX_VehicleTypes_Code: unique("IX_VehicleTypes_Code").on(table.Code),
	}
});

export const Vehicles = mysqlTable("Vehicles", {
	Id: binary({ length: 16 }).notNull(),
	FixedAssetId: binary({ length: 16 }).notNull(),
	PlateNumber: longtext(),
	Description: longtext(),
	VehicleTypeId: int().notNull().references(() => VehicleTypes.Id, { onDelete: "cascade" } ),
	IsOwned: tinyint().default(0).notNull(),
	OwnerId: binary({ length: 16 }),
},
(table) => {
	return {
		IX_Vehicles_VehicleTypeId: index("IX_Vehicles_VehicleTypeId").on(table.VehicleTypeId),
		Vehicles_Id: primaryKey({ columns: [table.Id], name: "Vehicles_Id"}),
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
export const AvailableVehicleView = mysqlView("AvailableVehicleView", {
	Id: binary({ length: 16 }).notNull(),
	VehicleId: binary({ length: 16 }).notNull(),
	ArrivalDate: datetime({ mode: 'string', fsp: 6 }).notNull(),
	DepartureDate: datetime({ mode: 'string', fsp: 6 }).notNull(),
	IsAvailable: tinyint().notNull(),
	ArrivalDocRef: binary({ length: 16 }).notNull(),
	ArrivalDocNumber: longtext(),
	DepartureDocRef: binary({ length: 16 }).notNull(),
	DepartureDocNumber: longtext(),
	IsRemoved: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`av\`.\`Id\` AS \`Id\`,\`av\`.\`VehicleId\` AS \`VehicleId\`,\`av\`.\`ArrivalDate\` AS \`ArrivalDate\`,\`av\`.\`DepartureDate\` AS \`DepartureDate\`,\`av\`.\`IsAvailable\` AS \`IsAvailable\`,\`av\`.\`ArrivalDocRef\` AS \`ArrivalDocRef\`,\`odArrival\`.\`DocNumber\` AS \`ArrivalDocNumber\`,\`av\`.\`DepartureDocRef\` AS \`DepartureDocRef\`,\`odDeparture\`.\`DocNumber\` AS \`DepartureDocNumber\`,\`av\`.\`IsRemoved\` AS \`IsRemoved\`,\`av\`.\`CreatedById\` AS \`CreatedById\`,\`av\`.\`Created\` AS \`Created\`,\`av\`.\`UpdatedById\` AS \`UpdatedById\`,\`av\`.\`Updated\` AS \`Updated\` from ((\`tracking\`.\`AvailableVehicles\` \`av\` left join \`docworkflow\`.\`OrderDocuments\` \`odArrival\` on((\`av\`.\`ArrivalDocRef\` = \`odArrival\`.\`Id\`))) left join \`docworkflow\`.\`OrderDocuments\` \`odDeparture\` on((\`av\`.\`DepartureDocRef\` = \`odDeparture\`.\`Id\`)))`);

export const ComposedVehicleItemView = mysqlView("ComposedVehicleItemView", {
	Id: int().default(0).notNull(),
	ComposedVehicleId: int().notNull(),
	EntityGuidId: binary({ length: 16 }).default('0x').notNull(),
	ByObservation: tinyint().default(0).notNull(),
	ObservedComposedVehicleId: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	AssetName: longtext(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`er\`.\`Id\` AS \`Id\`,\`er\`.\`ComposedVehicleId\` AS \`ComposedVehicleId\`,\`er\`.\`EntityGuidId\` AS \`EntityGuidId\`,\`er\`.\`ByObservation\` AS \`ByObservation\`,\`er\`.\`ObservedComposedVehicleId\` AS \`ObservedComposedVehicleId\`,\`er\`.\`Updated\` AS \`Updated\`,\`an\`.\`Name\` AS \`AssetName\` from (\`tracking\`.\`ComposedVehicleItems\` \`er\` left join \`inventory\`.\`Assets\` \`an\` on((\`er\`.\`EntityGuidId\` = \`an\`.\`Id\`)))`);

export const ComposedVehicleJournalView = mysqlView("ComposedVehicleJournalView", {
	AssetName: longtext(),
	ComposedVehicleDescription: varchar({ length: 255 }),
	Id: binary({ length: 16 }).notNull(),
	IsRemoved: tinyint().notNull(),
	AssetId: binary({ length: 16 }).notNull(),
	ComposedVehicleId: int().notNull(),
	StartedOn: datetime({ mode: 'string', fsp: 6 }).notNull(),
	FinishedOn: datetime({ mode: 'string', fsp: 6 }),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`a\`.\`Name\` AS \`AssetName\`,\`OR REPLACE \`.\`Description\` AS \`ComposedVehicleDescription\`,\`OR REPLACE j\`.\`Id\` AS \`Id\`,\`OR REPLACE j\`.\`IsRemoved\` AS \`IsRemoved\`,\`OR REPLACE j\`.\`AssetId\` AS \`AssetId\`,\`OR REPLACE j\`.\`ComposedVehicleId\` AS \`ComposedVehicleId\`,\`OR REPLACE j\`.\`StartedOn\` AS \`StartedOn\`,\`OR REPLACE j\`.\`FinishedOn\` AS \`FinishedOn\` from ((\`tracking\`.\`ComposedVehicleJournals\` \`OR REPLACE j\` left join \`tracking\`.\`ComposedVehicles\` \`OR REPLACE \` on((\`OR REPLACE j\`.\`ComposedVehicleId\` = \`OR REPLACE \`.\`Id\`))) left join \`inventory\`.\`Assets\` \`a\` on((\`OR REPLACE j\`.\`AssetId\` = \`a\`.\`Id\`)))`);

export const ComposedVehicleLogView = mysqlView("ComposedVehicleLogView", {
	AssetName: longtext(),
	Id: binary({ length: 16 }).notNull(),
	ComposedVehicleId: int(),
	ActualComposedVehicleId: int(),
	AssetId: binary({ length: 16 }).notNull(),
	Found: tinyint().notNull(),
	RecordDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	ComposedVehicleItemId: int(),
	IsResolved: tinyint().default(0).notNull(),
	TagCode: longtext(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`a\`.\`Name\` AS \`AssetName\`,\`OR REPLACE j\`.\`Id\` AS \`Id\`,\`OR REPLACE j\`.\`ComposedVehicleId\` AS \`ComposedVehicleId\`,\`OR REPLACE j\`.\`ActualComposedVehicleId\` AS \`ActualComposedVehicleId\`,\`OR REPLACE j\`.\`AssetId\` AS \`AssetId\`,\`OR REPLACE j\`.\`Found\` AS \`Found\`,\`OR REPLACE j\`.\`RecordDateTime\` AS \`RecordDateTime\`,\`OR REPLACE j\`.\`ComposedVehicleItemId\` AS \`ComposedVehicleItemId\`,\`OR REPLACE j\`.\`IsResolved\` AS \`IsResolved\`,\`OR REPLACE j\`.\`TagCode\` AS \`TagCode\` from (\`tracking\`.\`ComposedVehicleLog\` \`OR REPLACE j\` left join \`inventory\`.\`Assets\` \`a\` on((\`OR REPLACE j\`.\`AssetId\` = \`a\`.\`Id\`)))`);

export const GeoTrackingDataView = mysqlView("GeoTrackingDataView", {
	Id: int().default(0).notNull(),
	GeoZoneId: int().notNull(),
	AssetId: binary({ length: 16 }).notNull(),
	EventDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	EventType: int().notNull(),
	TrackingRegistryId: binary({ length: 16 }),
	MileageValue: double(),
	AssetName: longtext(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`er\`.\`Id\` AS \`Id\`,\`er\`.\`GeoZoneId\` AS \`GeoZoneId\`,\`er\`.\`AssetId\` AS \`AssetId\`,\`er\`.\`EventDateTime\` AS \`EventDateTime\`,\`er\`.\`EventType\` AS \`EventType\`,\`er\`.\`TrackingRegistryId\` AS \`TrackingRegistryId\`,\`er\`.\`MileageValue\` AS \`MileageValue\`,\`an\`.\`Name\` AS \`AssetName\` from (\`tracking\`.\`GeoTrackingData\` \`er\` left join \`inventory\`.\`Assets\` \`an\` on((\`er\`.\`AssetId\` = \`an\`.\`Id\`)))`);

export const GeoZonesView = mysqlView("GeoZonesView", {
	Id: int().default(0).notNull(),
	Name: longtext(),
	LocationId: int().notNull(),
	RouteNodeId: int().notNull(),
	LocationDescription: longtext(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`er\`.\`Id\` AS \`Id\`,\`er\`.\`Name\` AS \`Name\`,\`er\`.\`LocationId\` AS \`LocationId\`,\`er\`.\`RouteNodeId\` AS \`RouteNodeId\`,\`ld\`.\`Description\` AS \`LocationDescription\` from (\`tracking\`.\`GeoZones\` \`er\` left join \`hr\`.\`Locations\` \`ld\` on((\`er\`.\`LocationId\` = \`ld\`.\`Id\`)))`);

export const RouteNodeLinkView = mysqlView("RouteNodeLinkView", {
	StartRouteNodeDescription: longtext(),
	FinishRouteNodeDescription: longtext(),
	UnitOfMeasureName: varchar({ length: 200 }),
	Id: int().default(0).notNull(),
	RouteId: binary({ length: 16 }).notNull(),
	StartRouteNodeId: int().notNull(),
	FinishRouteNodeId: int().notNull(),
	RouteNodeLinkDistance: double().notNull(),
	RouteNodeLinkOrder: int().default(0).notNull(),
	UnitOfMeasureId: binary({ length: 16 }).default('0x').notNull(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select concat(\`start_loc\`.\`Description\`,'; ������: ',\`start_rn\`.\`GpsLatitude\`,'; �������: ',\`start_rn\`.\`GpsLongitude\`,'; ������: ',\`start_rn\`.\`Radius\`) AS \`StartRouteNodeDescription\`,concat(\`finish_loc\`.\`Description\`,'; ������: ',\`finish_rn\`.\`GpsLatitude\`,'; �������: ',\`finish_rn\`.\`GpsLongitude\`,'; ������: ',\`finish_rn\`.\`Radius\`) AS \`FinishRouteNodeDescription\`,\`uom\`.\`Name\` AS \`UnitOfMeasureName\`,\`rnl\`.\`Id\` AS \`Id\`,\`rnl\`.\`RouteId\` AS \`RouteId\`,\`rnl\`.\`StartRouteNodeId\` AS \`StartRouteNodeId\`,\`rnl\`.\`FinishRouteNodeId\` AS \`FinishRouteNodeId\`,\`rnl\`.\`RouteNodeLinkDistance\` AS \`RouteNodeLinkDistance\`,\`rnl\`.\`RouteNodeLinkOrder\` AS \`RouteNodeLinkOrder\`,\`rnl\`.\`UnitOfMeasureId\` AS \`UnitOfMeasureId\` from (((((\`tracking\`.\`RouteNodeLinks\` \`rnl\` left join \`tracking\`.\`RouteNodes\` \`finish_rn\` on((\`rnl\`.\`FinishRouteNodeId\` = \`finish_rn\`.\`Id\`))) left join \`hr\`.\`Locations\` \`finish_loc\` on((\`finish_rn\`.\`LocationId\` = \`finish_loc\`.\`Id\`))) left join \`tracking\`.\`RouteNodes\` \`start_rn\` on((\`rnl\`.\`StartRouteNodeId\` = \`start_rn\`.\`Id\`))) left join \`hr\`.\`Locations\` \`start_loc\` on((\`start_rn\`.\`LocationId\` = \`start_loc\`.\`Id\`))) left join \`inventory\`.\`UnitsOfMeasure\` \`uom\` on((\`rnl\`.\`UnitOfMeasureId\` = \`uom\`.\`Id\`)))`);

export const RouteNodeView = mysqlView("RouteNodeView", {
	LocationDescription: longtext(),
	Id: int().default(0).notNull(),
	InDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	OutDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	RouteId: binary({ length: 16 }),
	LocationId: int(),
	GpsLatitude: double(),
	GpsLongitude: double(),
	Radius: double(),
	RouteNodeTypeId: binary({ length: 16 }).default('0x').notNull(),
	Description: varchar({ length: 255 }),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`ld\`.\`Description\` AS \`LocationDescription\`,\`ms\`.\`Id\` AS \`Id\`,\`ms\`.\`InDateTime\` AS \`InDateTime\`,\`ms\`.\`OutDateTime\` AS \`OutDateTime\`,\`ms\`.\`RouteId\` AS \`RouteId\`,\`ms\`.\`LocationId\` AS \`LocationId\`,\`ms\`.\`GpsLatitude\` AS \`GpsLatitude\`,\`ms\`.\`GpsLongitude\` AS \`GpsLongitude\`,\`ms\`.\`Radius\` AS \`Radius\`,\`ms\`.\`RouteNodeTypeId\` AS \`RouteNodeTypeId\`,\`ms\`.\`Description\` AS \`Description\` from (\`tracking\`.\`RouteNodes\` \`ms\` left join \`hr\`.\`Locations\` \`ld\` on((\`ms\`.\`LocationId\` = \`ld\`.\`Id\`)))`);

export const TrackingRegistryView = mysqlView("TrackingRegistryView", {
	EntityName: longtext(),
	EntityClassName: longtext(),
	LocationDescription: longtext(),
	Id: binary({ length: 16 }).notNull(),
	LocationId: int(),
	GpsLatitude: double(),
	GpsLongitude: double(),
	Radius: double(),
	RegistrationDateTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	EntityType: longtext(),
	EntityClassId: binary({ length: 16 }),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`a\`.\`Name\` AS \`EntityName\`,\`ac\`.\`Description\` AS \`EntityClassName\`,\`l\`.\`Description\` AS \`LocationDescription\`,\`tr\`.\`Id\` AS \`Id\`,\`tr\`.\`LocationId\` AS \`LocationId\`,\`tr\`.\`GpsLatitude\` AS \`GpsLatitude\`,\`tr\`.\`GpsLongitude\` AS \`GpsLongitude\`,\`tr\`.\`Radius\` AS \`Radius\`,\`tr\`.\`RegistrationDateTime\` AS \`RegistrationDateTime\`,\`tr\`.\`EntityGuidId\` AS \`EntityGuidId\`,\`tr\`.\`EntityIntId\` AS \`EntityIntId\`,\`tr\`.\`EntityType\` AS \`EntityType\`,\`tr\`.\`EntityClassId\` AS \`EntityClassId\` from (((\`tracking\`.\`TrackingRegistries\` \`tr\` left join \`inventory\`.\`Assets\` \`a\` on(((\`tr\`.\`EntityType\` = 'Asset') and (\`tr\`.\`EntityGuidId\` = \`a\`.\`Id\`)))) left join \`inventory\`.\`AssetClasses\` \`ac\` on(((\`tr\`.\`EntityType\` = 'Asset') and (\`tr\`.\`EntityClassId\` = \`ac\`.\`Id\`)))) left join \`hr\`.\`Locations\` \`l\` on((\`tr\`.\`LocationId\` = \`l\`.\`Id\`)))`);

export const VehicleTypeView = mysqlView("VehicleTypeView", {
	AssetClassDescription: longtext(),
	Id: int().default(0).notNull(),
	Description: longtext().notNull(),
	AssetClassId: binary({ length: 16 }),
	Code: varchar({ length: 255 }),
	Tonnage: double(),
	VolumeSize: double(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`ac\`.\`Description\` AS \`AssetClassDescription\`,\`ms\`.\`Id\` AS \`Id\`,\`ms\`.\`Description\` AS \`Description\`,\`ms\`.\`AssetClassId\` AS \`AssetClassId\`,\`ms\`.\`Code\` AS \`Code\`,\`ms\`.\`Tonnage\` AS \`Tonnage\`,\`ms\`.\`VolumeSize\` AS \`VolumeSize\` from (\`tracking\`.\`VehicleTypes\` \`ms\` left join \`inventory\`.\`AssetClasses\` \`ac\` on((\`ms\`.\`AssetClassId\` = \`ac\`.\`Id\`)))`);

export const VehicleView = mysqlView("VehicleView", {
	Id: binary({ length: 16 }).notNull(),
	EntityName: longtext(),
	SerialNumber: longtext(),
	PlateNumber: longtext(),
	VehicleTypeId: int().default(0).notNull(),
	VehicleTypeDescription: longtext().notNull(),
	ExpiredTimeFromLastWorkOrder: varchar({ length: 19 }).default(').notNull(),
	TotalMileage: varchar({ length: 255 }),
	TypesOfMaintenanceId: binary({ length: 16 }),
	MaintenancePriority: int().default(0),
	TypesOfMaintenanceDescription: longtext(),
	ComparisonType: longtext(),
	MinValue: double(),
	MaxValue: double(),
	MinAlertValue: double(),
	MaxAlertValue: double(),
	ComposedVehicleId: int(),
	IsRemoved: tinyint().notNull(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`a\`.\`Id\` AS \`Id\`,\`a\`.\`Name\` AS \`EntityName\`,\`a\`.\`SerialNumber\` AS \`SerialNumber\`,\`a\`.\`StateNumber\` AS \`PlateNumber\`,\`vt\`.\`Id\` AS \`VehicleTypeId\`,\`vt\`.\`Description\` AS \`VehicleTypeDescription\`,'0000-00-00 00:00:00' AS \`ExpiredTimeFromLastWorkOrder\`,\`er\`.\`Value\` AS \`TotalMileage\`,\`tom\`.\`Id\` AS \`TypesOfMaintenanceId\`,\`tom\`.\`MaintenancePriority\` AS \`MaintenancePriority\`,\`tom\`.\`Description\` AS \`TypesOfMaintenanceDescription\`,\`ers\`.\`ComparisonType\` AS \`ComparisonType\`,\`ers\`.\`MinValue\` AS \`MinValue\`,\`ers\`.\`MaxValue\` AS \`MaxValue\`,\`ers\`.\`MinAlertValue\` AS \`MinAlertValue\`,\`ers\`.\`MaxAlertValue\` AS \`MaxAlertValue\`,\`OR REPLACE i\`.\`ComposedVehicleId\` AS \`ComposedVehicleId\`,\`a\`.\`IsRemoved\` AS \`IsRemoved\` from ((((((\`inventory\`.\`Assets\` \`a\` join \`tracking\`.\`VehicleTypes\` \`vt\` on((\`vt\`.\`AssetClassId\` = \`a\`.\`AssetClassId\`))) left join \`infrastructure\`.\`CurrentEntityReadings\` \`cer\` on(((\`a\`.\`Id\` = \`cer\`.\`EntityGuidId\`) and (\`cer\`.\`ReadingTypeId\` = (select \`r\`.\`Id\` from \`infrastructure\`.\`ReadingTypes\` \`r\` where (\`r\`.\`Code\` = 'MILEAGE')))))) left join \`infrastructure\`.\`EntityReadings\` \`er\` on((\`cer\`.\`EntityReadingId\` = \`er\`.\`Id\`))) left join \`infrastructure\`.\`TypesOfMaintenance\` \`tom\` on((\`a\`.\`AssetClassId\` = \`tom\`.\`AssetClassId\`))) left join \`infrastructure\`.\`EqReadingsStandards\` \`ers\` on((\`tom\`.\`EqReadingsStandardId\` = \`ers\`.\`Id\`))) left join \`tracking\`.\`ComposedVehicleItems\` \`OR REPLACE i\` on((\`a\`.\`Id\` = \`OR REPLACE i\`.\`EntityGuidId\`))) where (\`a\`.\`IsRemoved\` = 0)`);