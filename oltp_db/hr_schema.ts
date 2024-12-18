import { tinyint, time, mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, unique, binary, varchar, index, foreignKey, int, longtext, datetime, double, bigint, decimal, char, text, json, mysqlView } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const ActionLogConfig = mysqlTable("ActionLogConfig", {
	Id: binary({ length: 16 }).notNull(),
	EntityType: varchar({ length: 255 }),
	ActionType: varchar({ length: 255 }),
	Enabled: tinyint().notNull(),
},
(table) => {
	return {
		ActionLogConfig_Id: primaryKey({ columns: [table.Id], name: "ActionLogConfig_Id"}),
		IX_ActionLogConfig_EntityType_ActionType: unique("IX_ActionLogConfig_EntityType_ActionType").on(table.EntityType, table.ActionType),
	}
});

export const ActionLogs = mysqlTable("ActionLogs", {
	Id: int().autoincrement().notNull(),
	ModuleName: longtext().notNull(),
	UserId: int().references(() => Users.Id, { onDelete: "restrict" } ),
	EntityId: longtext(),
	ActionTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	ActionType: longtext().notNull(),
	Details: longtext(),
	EntityType: longtext(),
},
(table) => {
	return {
		IX_ActionLogs_UserId: index("IX_ActionLogs_UserId").on(table.UserId),
		ActionLogs_Id: primaryKey({ columns: [table.Id], name: "ActionLogs_Id"}),
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

export const Countries = mysqlTable("Countries", {
	Id: binary({ length: 16 }).notNull(),
	CodeISO: longtext(),
	CodeDigital: longtext(),
	Name: longtext(),
	IsRemoved: tinyint().default(0).notNull(),
},
(table) => {
	return {
		Countries_Id: primaryKey({ columns: [table.Id], name: "Countries_Id"}),
	}
});

export const CurrentGeoLocations = mysqlTable("CurrentGeoLocations", {
	Id: binary({ length: 16 }).notNull(),
	AppType: longtext().notNull(),
	EntityType: varchar({ length: 255 }).notNull(),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	GeoLocationId: int().notNull().references(() => GeoLocations.Id, { onDelete: "cascade" } ),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_CurrentGeoLocations_GeoLocationId: index("IX_CurrentGeoLocations_GeoLocationId").on(table.GeoLocationId),
		CurrentGeoLocations_Id: primaryKey({ columns: [table.Id], name: "CurrentGeoLocations_Id"}),
		IX_CurrentGeoLocations_EntityType_EntityGuidId: unique("IX_CurrentGeoLocations_EntityType_EntityGuidId").on(table.EntityType, table.EntityGuidId),
		IX_CurrentGeoLocations_EntityType_EntityIntId: unique("IX_CurrentGeoLocations_EntityType_EntityIntId").on(table.EntityType, table.EntityIntId),
	}
});

export const EntityTypes = mysqlTable("EntityTypes", {
	Id: varchar({ length: 255 }).notNull(),
	EntityName: longtext(),
	ModuleName: longtext(),
	TableName: longtext(),
},
(table) => {
	return {
		EntityTypes_Id: primaryKey({ columns: [table.Id], name: "EntityTypes_Id"}),
	}
});

export const ExternalUserRoles = mysqlTable("ExternalUserRoles", {
	ExternalUserId: varchar({ length: 255 }).notNull(),
	RoleId: int().notNull().references(() => Roles.Id, { onDelete: "cascade" } ),
	RoleId1: int().references(() => Roles.Id),
},
(table) => {
	return {
		IX_ExternalUserRoles_RoleId: index("IX_ExternalUserRoles_RoleId").on(table.RoleId),
		IX_ExternalUserRoles_RoleId1: index("IX_ExternalUserRoles_RoleId1").on(table.RoleId1),
		ExternalUserRoles_ExternalUserId_RoleId: primaryKey({ columns: [table.ExternalUserId, table.RoleId], name: "ExternalUserRoles_ExternalUserId_RoleId"}),
	}
});

export const GeoActionLogs = mysqlTable("GeoActionLogs", {
	Id: int().autoincrement().notNull(),
	ActionType: longtext().notNull(),
	OccuredAt: datetime({ mode: 'string', fsp: 6 }).notNull(),
	UserId: int().notNull().references(() => Users.Id, { onDelete: "cascade" } ),
	ConnectedGeoId: int().notNull().references(() => GeoLocations.Id, { onDelete: "restrict" } ),
},
(table) => {
	return {
		IX_GeoActionLogs_ConnectedGeoId: index("IX_GeoActionLogs_ConnectedGeoId").on(table.ConnectedGeoId),
		IX_GeoActionLogs_UserId: index("IX_GeoActionLogs_UserId").on(table.UserId),
		GeoActionLogs_Id: primaryKey({ columns: [table.Id], name: "GeoActionLogs_Id"}),
	}
});

export const GeoLocations = mysqlTable("GeoLocations", {
	Id: int().autoincrement().notNull(),
	Lat: double().notNull(),
	Lng: double().notNull(),
	Accuracy: double(),
	RegisteredAt: datetime({ mode: 'string', fsp: 6 }).notNull(),
	AppType: longtext().notNull(),
	EntityType: longtext().notNull(),
	EntityGuidId: binary({ length: 16 }),
	EntityIntId: int(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	GeoEntityType: varchar({ length: 15 }).notNull(),
	DependentEntityId: binary({ length: 16 }),
	Details: longtext(),
},
(table) => {
	return {
		GeoLocations_Id: primaryKey({ columns: [table.Id], name: "GeoLocations_Id"}),
	}
});

export const LocationAccesses = mysqlTable("LocationAccesses", {
	Id: binary({ length: 16 }).notNull(),
	LocationId: int().notNull().references(() => Locations.Id, { onDelete: "restrict" } ),
	Discriminator: longtext().notNull(),
	GrantedOrgUnitId: int().references(() => OrgUnits.Id, { onDelete: "restrict" } ),
	UserId: int().references(() => Users.Id, { onDelete: "restrict" } ),
	ExternalUserId: longtext(),
},
(table) => {
	return {
		IX_LocationAccesses_GrantedOrgUnitId: index("IX_LocationAccesses_GrantedOrgUnitId").on(table.GrantedOrgUnitId),
		IX_LocationAccesses_LocationId: index("IX_LocationAccesses_LocationId").on(table.LocationId),
		IX_LocationAccesses_UserId: index("IX_LocationAccesses_UserId").on(table.UserId),
		LocationAccesses_Id: primaryKey({ columns: [table.Id], name: "LocationAccesses_Id"}),
		IX_LocationAccesses_LocationId_GrantedOrgUnitId: unique("IX_LocationAccesses_LocationId_GrantedOrgUnitId").on(table.LocationId, table.GrantedOrgUnitId),
		IX_LocationAccesses_LocationId_UserId: unique("IX_LocationAccesses_LocationId_UserId").on(table.LocationId, table.UserId),
	}
});

export const LocationAccesses_tracking = mysqlTable("LocationAccesses_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		LocationAccesses_tracking_Id: primaryKey({ columns: [table.Id], name: "LocationAccesses_tracking_Id"}),
	}
});

export const LocationInfo = mysqlTable("LocationInfo", {
	Id: binary({ length: 16 }).notNull(),
	LocationId: int().notNull().references(() => Locations.Id, { onDelete: "restrict" } ),
	ResponsibleUserId: int().references(() => Users.Id, { onDelete: "restrict" } ),
	XIndex: longtext(),
	YIndex: longtext(),
	ZIndex: longtext(),
	Length: decimal({ precision: 65, scale: 30 }),
	Width: decimal({ precision: 65, scale: 30 }),
	Height: decimal({ precision: 65, scale: 30 }),
	Volume: decimal({ precision: 65, scale: 30 }),
	LiftingCapacity: decimal({ precision: 65, scale: 30 }),
},
(table) => {
	return {
		IX_LocationInfo_ResponsibleUserId: index("IX_LocationInfo_ResponsibleUserId").on(table.ResponsibleUserId),
		LocationInfo_Id: primaryKey({ columns: [table.Id], name: "LocationInfo_Id"}),
		IX_LocationInfo_LocationId: unique("IX_LocationInfo_LocationId").on(table.LocationId),
	}
});

export const LocationInfo_tracking = mysqlTable("LocationInfo_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		LocationInfo_tracking_Id: primaryKey({ columns: [table.Id], name: "LocationInfo_tracking_Id"}),
	}
});

export const LocationOrgUnit = mysqlTable("LocationOrgUnit", {
	LocationsId: int().notNull().references(() => Locations.Id, { onDelete: "cascade" } ),
	OrgUnitsId: int().notNull().references(() => OrgUnits.Id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		IX_LocationOrgUnit_OrgUnitsId: index("IX_LocationOrgUnit_OrgUnitsId").on(table.OrgUnitsId),
		LocationOrgUnit_LocationsId_OrgUnitsId: primaryKey({ columns: [table.LocationsId, table.OrgUnitsId], name: "LocationOrgUnit_LocationsId_OrgUnitsId"}),
	}
});

export const LocationTypes = mysqlTable("LocationTypes", {
	Id: varchar({ length: 255 }).notNull(),
	Name: longtext(),
	IsSystem: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		LocationTypes_Id: primaryKey({ columns: [table.Id], name: "LocationTypes_Id"}),
	}
});

export const LocationTypes_tracking = mysqlTable("LocationTypes_tracking", {
	Id: varchar({ length: 255 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		LocationTypes_tracking_Id: primaryKey({ columns: [table.Id], name: "LocationTypes_tracking_Id"}),
	}
});

export const Locations = mysqlTable("Locations", {
	Id: int().autoincrement().notNull(),
	Description: longtext().notNull(),
	ParentId: int(),
	HierarchyLevel: int().notNull(),
	OrgUnitId: int().references(() => OrgUnits.Id, { onDelete: "restrict" } ),
	CenterPointLat: double(),
	CenterPointLong: double(),
	Radius: double(),
	CodeFromExtAcctSys: longtext(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	CreatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	LocationTypeId: varchar({ length: 255 }).references(() => LocationTypes.Id, { onDelete: "restrict" } ),
	Enabled: tinyint().default(1).notNull(),
	IsTracking: tinyint().default(0).notNull(),
},
(table) => {
	return {
		IX_Locations_LocationTypeId: index("IX_Locations_LocationTypeId").on(table.LocationTypeId),
		IX_Locations_OrgUnitId: index("IX_Locations_OrgUnitId").on(table.OrgUnitId),
		IX_Locations_ParentId: index("IX_Locations_ParentId").on(table.ParentId),
		FK_Locations_Locations_ParentId: foreignKey({
			columns: [table.ParentId],
			foreignColumns: [table.Id],
			name: "FK_Locations_Locations_ParentId"
		}).onDelete("restrict"),
		Locations_Id: primaryKey({ columns: [table.Id], name: "Locations_Id"}),
	}
});

export const Locations_tracking = mysqlTable("Locations_tracking", {
	Id: int().notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		Locations_tracking_Id: primaryKey({ columns: [table.Id], name: "Locations_tracking_Id"}),
	}
});

export const OrgUnitAccesses = mysqlTable("OrgUnitAccesses", {
	Id: binary({ length: 16 }).notNull(),
	OrgUnitId: int().notNull().references(() => OrgUnits.Id, { onDelete: "restrict" } ),
	UserId: int().references(() => Users.Id, { onDelete: "restrict" } ),
	IsPrimaryOrgUnit: tinyint(),
	HasChildrenAccess: tinyint().notNull(),
	Discriminator: longtext().notNull(),
	GrantedOrgUnitId: int().references(() => OrgUnits.Id, { onDelete: "restrict" } ),
	ExternalUserId: longtext(),
},
(table) => {
	return {
		IX_OrgUnitAccesses_GrantedOrgUnitId: index("IX_OrgUnitAccesses_GrantedOrgUnitId").on(table.GrantedOrgUnitId),
		IX_OrgUnitAccesses_OrgUnitId: index("IX_OrgUnitAccesses_OrgUnitId").on(table.OrgUnitId),
		IX_OrgUnitAccesses_UserId: index("IX_OrgUnitAccesses_UserId").on(table.UserId),
		OrgUnitAccesses_Id: primaryKey({ columns: [table.Id], name: "OrgUnitAccesses_Id"}),
		IX_OrgUnitAccesses_OrgUnitId_GrantedOrgUnitId: unique("IX_OrgUnitAccesses_OrgUnitId_GrantedOrgUnitId").on(table.OrgUnitId, table.GrantedOrgUnitId),
		IX_OrgUnitAccesses_OrgUnitId_UserId: unique("IX_OrgUnitAccesses_OrgUnitId_UserId").on(table.OrgUnitId, table.UserId),
	}
});

export const OrgUnitAccesses_tracking = mysqlTable("OrgUnitAccesses_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		OrgUnitAccesses_tracking_Id: primaryKey({ columns: [table.Id], name: "OrgUnitAccesses_tracking_Id"}),
	}
});

export const OrgUnitCalendars = mysqlTable("OrgUnitCalendars", {
	Id: int().autoincrement().notNull(),
	OrgUnitId: int().notNull().references(() => OrgUnits.Id, { onDelete: "restrict" } ),
	CalDate: datetime({ mode: 'string', fsp: 6 }).notNull(),
	IsWorking: tinyint().notNull(),
	Description: longtext(),
	EndTime: time({ fsp: 6 }),
	LunchBreakEnd: time({ fsp: 6 }),
	LunchBreakStart: time({ fsp: 6 }),
	SecondBreakEnd: time({ fsp: 6 }),
	SecondBreakStart: time({ fsp: 6 }),
	StartTime: time({ fsp: 6 }),
},
(table) => {
	return {
		OrgUnitCalendars_Id: primaryKey({ columns: [table.Id], name: "OrgUnitCalendars_Id"}),
		IX_OrgUnitCalendars_OrgUnitId_CalDate: unique("IX_OrgUnitCalendars_OrgUnitId_CalDate").on(table.OrgUnitId, table.CalDate),
	}
});

export const OrgUnits = mysqlTable("OrgUnits", {
	Id: int().autoincrement().notNull(),
	Description: longtext().notNull(),
	ParentId: int(),
	CodeFromExtAcctSys: longtext(),
	HierarchyLevel: int().notNull(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	CreatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Prefix: varchar({ length: 2 }),
	BIN: varchar({ length: 200 }),
	CostCenter: longtext(),
	Enabled: tinyint().default(1).notNull(),
	ExternalId: binary({ length: 16 }),
	Code: longtext(),
	Group: longtext(),
	KBE: longtext(),
	PersonType: longtext(),
	StartDate: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_OrgUnits_ParentId: index("IX_OrgUnits_ParentId").on(table.ParentId),
		FK_OrgUnits_OrgUnits_ParentId: foreignKey({
			columns: [table.ParentId],
			foreignColumns: [table.Id],
			name: "FK_OrgUnits_OrgUnits_ParentId"
		}).onDelete("restrict"),
		OrgUnits_Id: primaryKey({ columns: [table.Id], name: "OrgUnits_Id"}),
		IX_OrgUnits_BIN: unique("IX_OrgUnits_BIN").on(table.BIN),
	}
});

export const OrgUnits_tracking = mysqlTable("OrgUnits_tracking", {
	Id: int().notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		OrgUnits_tracking_Id: primaryKey({ columns: [table.Id], name: "OrgUnits_tracking_Id"}),
	}
});

export const PhoneInfo = mysqlTable("PhoneInfo", {
	Id: int().autoincrement().notNull(),
	Vendor: varchar({ length: 20 }).notNull(),
	Model: varchar({ length: 20 }).notNull(),
	IMEI: char({ length: 15 }),
},
(table) => {
	return {
		PhoneInfo_Id: primaryKey({ columns: [table.Id], name: "PhoneInfo_Id"}),
		IX_PhoneInfo_IMEI: unique("IX_PhoneInfo_IMEI").on(table.IMEI),
	}
});

export const Positions = mysqlTable("Positions", {
	Id: int().autoincrement().notNull(),
	Code: longtext(),
	Name: longtext(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	CreatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	CodeFromExtAcctSys: varchar({ length: 255 }),
	CostCenter: longtext(),
},
(table) => {
	return {
		Positions_Id: primaryKey({ columns: [table.Id], name: "Positions_Id"}),
		IX_Positions_CodeFromExtAcctSys: unique("IX_Positions_CodeFromExtAcctSys").on(table.CodeFromExtAcctSys),
	}
});

export const Positions_tracking = mysqlTable("Positions_tracking", {
	Id: int().notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		Positions_tracking_Id: primaryKey({ columns: [table.Id], name: "Positions_tracking_Id"}),
	}
});

export const ProfilePictures = mysqlTable("ProfilePictures", {
	Id: binary({ length: 16 }).notNull(),
	MimeType: longtext(),
	FilePath: longtext(),
	OriginalFileName: longtext(),
	UserId: int().notNull().references(() => Users.Id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		IX_ProfilePictures_UserId: index("IX_ProfilePictures_UserId").on(table.UserId),
		ProfilePictures_Id: primaryKey({ columns: [table.Id], name: "ProfilePictures_Id"}),
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

export const Qualifications = mysqlTable("Qualifications", {
	Id: int().autoincrement().notNull(),
	Code: varchar({ length: 255 }),
	Name: varchar({ length: 256 }).notNull(),
	Level: int(),
	CodeFromExtAcctSys: longtext(),
	ExternalId: binary({ length: 16 }),
},
(table) => {
	return {
		Qualifications_Id: primaryKey({ columns: [table.Id], name: "Qualifications_Id"}),
		IX_Qualifications_Code_Level: unique("IX_Qualifications_Code_Level").on(table.Code, table.Level),
	}
});

export const RoleClaims = mysqlTable("RoleClaims", {
	Id: int().autoincrement().notNull(),
	RoleId: int().notNull().references(() => Roles.Id, { onDelete: "cascade" } ),
	ClaimType: longtext(),
	ClaimValue: longtext(),
},
(table) => {
	return {
		IX_RoleClaims_RoleId: index("IX_RoleClaims_RoleId").on(table.RoleId),
		RoleClaims_Id: primaryKey({ columns: [table.Id], name: "RoleClaims_Id"}),
	}
});

export const RoleClaims_tracking = mysqlTable("RoleClaims_tracking", {
	Id: int().notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		RoleClaims_tracking_Id: primaryKey({ columns: [table.Id], name: "RoleClaims_tracking_Id"}),
	}
});

export const Roles = mysqlTable("Roles", {
	Id: int().autoincrement().notNull(),
	Name: varchar({ length: 255 }),
	Created: datetime({ mode: 'string', fsp: 6 }),
	CreatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
},
(table) => {
	return {
		Roles_Id: primaryKey({ columns: [table.Id], name: "Roles_Id"}),
		IX_Roles_Name: unique("IX_Roles_Name").on(table.Name),
	}
});

export const Roles_tracking = mysqlTable("Roles_tracking", {
	Id: int().notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		Roles_tracking_Id: primaryKey({ columns: [table.Id], name: "Roles_tracking_Id"}),
	}
});

export const Signatures = mysqlTable("Signatures", {
	Id: binary({ length: 16 }).notNull(),
	DocRole: longtext(),
	UserPositionId: binary({ length: 16 }).notNull().references(() => UserPositions.Id, { onDelete: "restrict" } ),
	UserId: int().notNull().references(() => Users.Id, { onDelete: "restrict" } ),
	IsAccepted: tinyint().notNull(),
	IsRemoved: tinyint().notNull(),
},
(table) => {
	return {
		IX_Signatures_UserId_UserPositionId: index("IX_Signatures_UserId_UserPositionId").on(table.UserId, table.UserPositionId),
		IX_Signatures_UserPositionId: index("IX_Signatures_UserPositionId").on(table.UserPositionId),
		Signatures_Id: primaryKey({ columns: [table.Id], name: "Signatures_Id"}),
	}
});

export const SyncProfiles = mysqlTable("SyncProfiles", {
	Id: int().autoincrement().notNull(),
	UserId: int().references(() => Users.Id),
	RoleId: int().references(() => Roles.Id),
	OrgUnitId: int().references(() => OrgUnits.Id),
	SyncFilterQuery: longtext(),
},
(table) => {
	return {
		IX_SyncProfiles_OrgUnitId: index("IX_SyncProfiles_OrgUnitId").on(table.OrgUnitId),
		IX_SyncProfiles_RoleId: index("IX_SyncProfiles_RoleId").on(table.RoleId),
		IX_SyncProfiles_UserId: index("IX_SyncProfiles_UserId").on(table.UserId),
		SyncProfiles_Id: primaryKey({ columns: [table.Id], name: "SyncProfiles_Id"}),
	}
});

export const SystemConfig = mysqlTable("SystemConfig", {
	Id: int().autoincrement().notNull(),
	Category: varchar({ length: 255 }),
	Code: varchar({ length: 255 }),
	Value: longtext(),
	IsRemoved: tinyint().notNull(),
},
(table) => {
	return {
		SystemConfig_Id: primaryKey({ columns: [table.Id], name: "SystemConfig_Id"}),
		IX_SystemConfig_Code_Category: unique("IX_SystemConfig_Code_Category").on(table.Code, table.Category),
	}
});

export const SystemLogs = mysqlTable("SystemLogs", {
	Id: binary({ length: 16 }).notNull(),
	Module: longtext(),
	Service: longtext(),
	EntityId: longtext(),
	EntityType: longtext(),
	Message: longtext(),
	Date: datetime({ mode: 'string', fsp: 6 }).notNull(),
},
(table) => {
	return {
		SystemLogs_Id: primaryKey({ columns: [table.Id], name: "SystemLogs_Id"}),
	}
});

export const TempUserCodes = mysqlTable("TempUserCodes", {
	Id: int().autoincrement().notNull(),
	ExternalUserId: longtext(),
	Email: longtext(),
	Code: varchar({ length: 255 }),
	SentTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		TempUserCodes_Id: primaryKey({ columns: [table.Id], name: "TempUserCodes_Id"}),
		IX_TempUserCodes_Code: unique("IX_TempUserCodes_Code").on(table.Code),
	}
});

export const UserConfigs = mysqlTable("UserConfigs", {
	Id: int().autoincrement().notNull(),
	Type: varchar({ length: 255 }),
	UserId: int().notNull().references(() => Users.Id, { onDelete: "restrict" } ),
	Config: longtext(),
	IsGlobal: tinyint().default(0).notNull(),
	Updated: datetime({ mode: 'string', fsp: 6 }).default('0001-01-01 00:00:00.000000').notNull(),
},
(table) => {
	return {
		IX_UserConfigs_UserId: index("IX_UserConfigs_UserId").on(table.UserId),
		UserConfigs_Id: primaryKey({ columns: [table.Id], name: "UserConfigs_Id"}),
		IX_UserConfigs_Type_UserId: unique("IX_UserConfigs_Type_UserId").on(table.Type, table.UserId),
	}
});

export const UserEmploymentJournals = mysqlTable("UserEmploymentJournals", {
	Id: binary({ length: 16 }).notNull(),
	UserId: int().notNull().references(() => Users.Id, { onDelete: "cascade" } ),
	OrgUnitId: int().references(() => OrgUnits.Id),
	LocationId: int().references(() => Locations.Id),
	OrderDocumentId: binary({ length: 16 }),
	TaskId: binary({ length: 16 }),
	PeriodBegin: datetime({ mode: 'string', fsp: 6 }),
	PeriodEnd: datetime({ mode: 'string', fsp: 6 }),
	Description: longtext(),
	RecordAuthorId: int().notNull().references(() => Users.Id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		IX_UserEmploymentJournals_LocationId: index("IX_UserEmploymentJournals_LocationId").on(table.LocationId),
		IX_UserEmploymentJournals_OrgUnitId: index("IX_UserEmploymentJournals_OrgUnitId").on(table.OrgUnitId),
		IX_UserEmploymentJournals_RecordAuthorId: index("IX_UserEmploymentJournals_RecordAuthorId").on(table.RecordAuthorId),
		IX_UserEmploymentJournals_UserId: index("IX_UserEmploymentJournals_UserId").on(table.UserId),
		UserEmploymentJournals_Id: primaryKey({ columns: [table.Id], name: "UserEmploymentJournals_Id"}),
	}
});

export const UserPositions = mysqlTable("UserPositions", {
	Id: binary({ length: 16 }).notNull(),
	PositionId: int().notNull().references(() => Positions.Id, { onDelete: "cascade" } ),
	UserId: int().notNull().references(() => Users.Id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		IX_UserPositions_PositionId: index("IX_UserPositions_PositionId").on(table.PositionId),
		UserPositions_Id: primaryKey({ columns: [table.Id], name: "UserPositions_Id"}),
		IX_UserPositions_UserId_PositionId: unique("IX_UserPositions_UserId_PositionId").on(table.UserId, table.PositionId),
	}
});

export const UserPositions_tracking = mysqlTable("UserPositions_tracking", {
	Id: binary({ length: 16 }).notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		UserPositions_tracking_Id: primaryKey({ columns: [table.Id], name: "UserPositions_tracking_Id"}),
	}
});

export const UserQualifications = mysqlTable("UserQualifications", {
	Id: int().autoincrement().notNull(),
	UserId: int().notNull().references(() => Users.Id, { onDelete: "restrict" } ),
	QualificationId: int().notNull().references(() => Qualifications.Id, { onDelete: "restrict" } ),
},
(table) => {
	return {
		IX_UserQualifications_QualificationId: index("IX_UserQualifications_QualificationId").on(table.QualificationId),
		UserQualifications_Id: primaryKey({ columns: [table.Id], name: "UserQualifications_Id"}),
		IX_UserQualifications_UserId_QualificationId: unique("IX_UserQualifications_UserId_QualificationId").on(table.UserId, table.QualificationId),
	}
});

export const UserRoles = mysqlTable("UserRoles", {
	UserId: int().notNull().references(() => Users.Id, { onDelete: "cascade" } ),
	RoleId: int().notNull().references(() => Roles.Id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		IX_UserRoles_RoleId: index("IX_UserRoles_RoleId").on(table.RoleId),
		UserRoles_UserId_RoleId: primaryKey({ columns: [table.UserId, table.RoleId], name: "UserRoles_UserId_RoleId"}),
	}
});

export const UserRoles_tracking = mysqlTable("UserRoles_tracking", {
	UserId: int().notNull(),
	RoleId: int().notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		UserRoles_tracking_UserId_RoleId: primaryKey({ columns: [table.UserId, table.RoleId], name: "UserRoles_tracking_UserId_RoleId"}),
	}
});

export const UserWorkTeams = mysqlTable("UserWorkTeams", {
	Id: int().autoincrement().notNull(),
	UserId: int().notNull().references(() => Users.Id, { onDelete: "cascade" } ),
	WorkTeamId: int().notNull().references(() => WorkTeams.Id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		IX_UserWorkTeams_UserId: index("IX_UserWorkTeams_UserId").on(table.UserId),
		IX_UserWorkTeams_WorkTeamId: index("IX_UserWorkTeams_WorkTeamId").on(table.WorkTeamId),
		UserWorkTeams_Id: primaryKey({ columns: [table.Id], name: "UserWorkTeams_Id"}),
	}
});

export const Users = mysqlTable("Users", {
	Id: int().autoincrement().notNull(),
	ExternalUserId: varchar({ length: 255 }),
	FullName: varchar({ length: 256 }).notNull(),
	PersonnelNumber: varchar({ length: 256 }),
	Birthdate: datetime({ mode: 'string', fsp: 6 }).notNull(),
	IIN: char({ length: 12 }),
	PhoneNumber: longtext(),
	PhoneInfoId: int().references(() => PhoneInfo.Id, { onDelete: "restrict" } ),
	LocationId: int().references(() => Locations.Id, { onDelete: "restrict" } ),
	CurrentUiOrgUnitId: int().references(() => OrgUnits.Id),
	CurrentUiLocationId: int(),
	ExternalUserEnabled: tinyint().default(0).notNull(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	CreatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	CodeFromExtAcctSys: varchar({ length: 255 }),
	Enabled: tinyint().default(1).notNull(),
	FavoritesJson: json(),
	ExternalId: binary({ length: 16 }),
},
(table) => {
	return {
		IIN: index("IIN").on(table.IIN),
		IX_Users_CurrentUiOrgUnitId: index("IX_Users_CurrentUiOrgUnitId").on(table.CurrentUiOrgUnitId),
		IX_Users_LocationId: index("IX_Users_LocationId").on(table.LocationId),
		Users_Id: primaryKey({ columns: [table.Id], name: "Users_Id"}),
		IX_Users_CodeFromExtAcctSys: unique("IX_Users_CodeFromExtAcctSys").on(table.CodeFromExtAcctSys),
		IX_Users_ExternalId: unique("IX_Users_ExternalId").on(table.ExternalId),
		IX_Users_ExternalUserId: unique("IX_Users_ExternalUserId").on(table.ExternalUserId),
		IX_Users_PersonnelNumber: unique("IX_Users_PersonnelNumber").on(table.PersonnelNumber),
		IX_Users_PhoneInfoId: unique("IX_Users_PhoneInfoId").on(table.PhoneInfoId),
	}
});

export const Users_tracking = mysqlTable("Users_tracking", {
	Id: int().notNull(),
	update_scope_id: varchar({ length: 36 }),
	timestamp: bigint({ mode: "number" }),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("sync_row_is_tombstone").notNull(),
	last_change_datetime: datetime({ mode: 'string'}),
},
(table) => {
	return {
		Users_tracking_Id: primaryKey({ columns: [table.Id], name: "Users_tracking_Id"}),
	}
});

export const WorkTeams = mysqlTable("WorkTeams", {
	Id: int().autoincrement().notNull(),
	Name: varchar({ length: 256 }).notNull(),
	Code: varchar({ length: 256 }).notNull(),
	HoursPerDay: int().default(0).notNull(),
},
(table) => {
	return {
		WorkTeams_Id: primaryKey({ columns: [table.Id], name: "WorkTeams_Id"}),
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

export const sys_FileMigrations = mysqlTable("sys_FileMigrations", {
	Id: int().autoincrement().notNull(),
	FileName: longtext().notNull(),
	FileModificationDT: datetime({ mode: 'string'}),
	MigrationDT: datetime({ mode: 'string'}),
},
(table) => {
	return {
		sys_FileMigrations_Id: primaryKey({ columns: [table.Id], name: "sys_FileMigrations_Id"}),
		idx_FileMigrations_FileName: unique("idx_FileMigrations_FileName").on(table.FileName),
	}
});
export const EqRepairJournalView = mysqlView("EqRepairJournalView", {
	AssetName: longtext(),
	AssetClassDescription: longtext(),
	AssetTypeName: longtext(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`a\`.\`Name\` AS \`AssetName\`,\`ac\`.\`Description\` AS \`AssetClassDescription\`,\`at\`.\`Name\` AS \`AssetTypeName\` from (((\`infrastructure\`.\`EqRepairJournal\` \`st\` left join \`inventory\`.\`Assets\` \`a\` on((\`st\`.\`AssetId\` = \`a\`.\`Id\`))) left join \`inventory\`.\`AssetClasses\` \`ac\` on((\`st\`.\`AssetClassId\` = \`ac\`.\`Id\`))) left join \`inventory\`.\`AssetTypes\` \`at\` on((\`st\`.\`AssetTypeId\` = \`at\`.\`Id\`)))`);

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
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`dn\`.\`DocNumber\` AS \`OrderDocumentDocNumber\`,\`ac\`.\`Description\` AS \`TaskDescription\`,\`ms\`.\`Id\` AS \`Id\`,\`ms\`.\`UserId\` AS \`UserId\`,\`ms\`.\`OrgUnitId\` AS \`OrgUnitId\`,\`ms\`.\`LocationId\` AS \`LocationId\`,\`ms\`.\`OrderDocumentId\` AS \`OrderDocumentId\`,\`ms\`.\`TaskId\` AS \`TaskId\`,\`ms\`.\`PeriodBegin\` AS \`PeriodBegin\`,\`ms\`.\`PeriodEnd\` AS \`PeriodEnd\`,\`ms\`.\`Description\` AS \`Description\`,\`ms\`.\`RecordAuthorId\` AS \`RecordAuthorId\` from ((\`hr\`.\`UserEmploymentJournals\` \`ms\` left join \`docworkflow\`.\`OrderDocuments\` \`dn\` on((\`ms\`.\`OrderDocumentId\` = \`dn\`.\`Id\`))) left join \`infrastructure\`.\`Tasks\` \`ac\` on((\`ms\`.\`TaskId\` = \`ac\`.\`Id\`)))`);