import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, foreignKey, primaryKey, int, longtext, datetime, binary, decimal, unique, double, varchar, json, smallint, bigint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const ActuatorModels = mysqlTable("ActuatorModels", {
	Id: int().autoincrement().notNull(),
	Name: longtext(),
	ActuatorTypeId: int().notNull().references(() => ActuatorTypes.Id, { onDelete: "cascade" } ),
	Config: longtext(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_ActuatorModels_ActuatorTypeId: index("IX_ActuatorModels_ActuatorTypeId").on(table.ActuatorTypeId),
		ActuatorModels_Id: primaryKey({ columns: [table.Id], name: "ActuatorModels_Id"}),
	}
});

export const ActuatorTypes = mysqlTable("ActuatorTypes", {
	Id: int().autoincrement().notNull(),
	Name: longtext(),
	Type: int(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		ActuatorTypes_Id: primaryKey({ columns: [table.Id], name: "ActuatorTypes_Id"}),
	}
});

export const Actuators = mysqlTable("Actuators", {
	Id: binary({ length: 16 }).notNull(),
	Name: longtext(),
	Number: int(),
	PortId: int().notNull().references(() => Ports.Id, { onDelete: "cascade" } ),
	AreaPointId: int().notNull().references(() => AreaPoints.Id, { onDelete: "cascade" } ),
	ActuatorModelId: int().notNull().references(() => ActuatorModels.Id, { onDelete: "cascade" } ),
	Activated: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_Actuators_ActuatorModelId: index("IX_Actuators_ActuatorModelId").on(table.ActuatorModelId),
		IX_Actuators_AreaPointId: index("IX_Actuators_AreaPointId").on(table.AreaPointId),
		IX_Actuators_PortId: index("IX_Actuators_PortId").on(table.PortId),
		Actuators_Id: primaryKey({ columns: [table.Id], name: "Actuators_Id"}),
	}
});

export const AreaDistances = mysqlTable("AreaDistances", {
	Id: int().autoincrement().notNull(),
	PreviousAreaId: int().notNull(),
	AreaId: int().notNull().references(() => Areas.Id, { onDelete: "cascade" } ),
	Distance: decimal({ precision: 12, scale: 2 }).notNull(),
	ExternalUnitOfMeasureId: int().notNull(),
},
(table) => {
	return {
		IX_AreaDistances_AreaId: index("IX_AreaDistances_AreaId").on(table.AreaId),
		AreaDistances_Id: primaryKey({ columns: [table.Id], name: "AreaDistances_Id"}),
	}
});

export const AreaPoints = mysqlTable("AreaPoints", {
	Id: int().autoincrement().notNull(),
	Name: longtext(),
	AreaId: int().notNull().references(() => Areas.Id, { onDelete: "cascade" } ),
	Activated: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_AreaPoints_AreaId: index("IX_AreaPoints_AreaId").on(table.AreaId),
		AreaPoints_Id: primaryKey({ columns: [table.Id], name: "AreaPoints_Id"}),
	}
});

export const AreaRegistrations = mysqlTable("AreaRegistrations", {
	Id: int().autoincrement().notNull(),
	Name: longtext(),
	AssetId: binary({ length: 16 }),
	AreaId: int().notNull().references(() => Areas.Id, { onDelete: "cascade" } ),
	RegistrationDate: datetime({ mode: 'string', fsp: 6 }).notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_AreaRegistrations_AreaId: index("IX_AreaRegistrations_AreaId").on(table.AreaId),
		AreaRegistrations_Id: primaryKey({ columns: [table.Id], name: "AreaRegistrations_Id"}),
	}
});

export const AreaTypes = mysqlTable("AreaTypes", {
	Id: int().autoincrement().notNull(),
	Type: longtext(),
	Name: longtext(),
	RuleTemplateId: int().notNull().references(() => RuleTemplates.Id, { onDelete: "cascade" } ),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_AreaTypes_RuleTemplateId: index("IX_AreaTypes_RuleTemplateId").on(table.RuleTemplateId),
		AreaTypes_Id: primaryKey({ columns: [table.Id], name: "AreaTypes_Id"}),
	}
});

export const Areas = mysqlTable("Areas", {
	Id: int().autoincrement().notNull(),
	Name: longtext(),
	AreaTypeId: int().notNull().references(() => AreaTypes.Id, { onDelete: "cascade" } ),
	LocationId: int(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_Areas_AreaTypeId: index("IX_Areas_AreaTypeId").on(table.AreaTypeId),
		Areas_Id: primaryKey({ columns: [table.Id], name: "Areas_Id"}),
	}
});

export const AssetMileageLogs = mysqlTable("AssetMileageLogs", {
	Id: binary({ length: 16 }).notNull(),
	AssetId: binary({ length: 16 }).notNull(),
	LocationId: int().notNull(),
	RfidLogId: binary({ length: 16 }).notNull().references(() => RfidLogs.Id, { onDelete: "restrict" } ),
	Value: double().notNull(),
	Handled: tinyint().notNull(),
	Time: datetime({ mode: 'string', fsp: 6 }).notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		AssetMileageLogs_Id: primaryKey({ columns: [table.Id], name: "AssetMileageLogs_Id"}),
		IX_AssetMileageLogs_RfidLogId: unique("IX_AssetMileageLogs_RfidLogId").on(table.RfidLogId),
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

export const ControllerLogs = mysqlTable("ControllerLogs", {
	Id: binary({ length: 16 }).notNull(),
	ControllerId: binary({ length: 16 }).references((): AnyMySqlColumn => Controllers.Id, { onDelete: "restrict" } ),
	Type: longtext().notNull(),
	Event: longtext(),
	Message: longtext(),
	Time: datetime({ mode: 'string', fsp: 6 }).notNull(),
	IpAddress: longtext(),
	MacAddress: longtext(),
	InfoJson: longtext(),
	NetworkJson: longtext(),
	PingStatus: tinyint().default(0).notNull(),
	Status: tinyint().default(0).notNull(),
},
(table) => {
	return {
		IX_ControllerLogs_ControllerId: index("IX_ControllerLogs_ControllerId").on(table.ControllerId),
		ControllerLogs_Id: primaryKey({ columns: [table.Id], name: "ControllerLogs_Id"}),
	}
});

export const ControllerTypes = mysqlTable("ControllerTypes", {
	Id: varchar({ length: 255 }).notNull(),
	Description: longtext().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		ControllerTypes_Id: primaryKey({ columns: [table.Id], name: "ControllerTypes_Id"}),
	}
});

export const Controllers = mysqlTable("Controllers", {
	Id: binary({ length: 16 }).notNull(),
	LocationId: int(),
	ControllerTypeId: varchar({ length: 255 }).notNull().references(() => ControllerTypes.Id, { onDelete: "restrict" } ),
	ParentId: binary({ length: 16 }),
	MacAddress: varchar({ length: 255 }),
	IpAddress: longtext(),
	SerialNumber: longtext(),
	Model: longtext(),
	Number: int(),
	Description: longtext(),
	AppSettings: longtext(),
	Enabled: tinyint().default(1).notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	LastLogInfoId: binary({ length: 16 }).references((): AnyMySqlColumn => ControllerLogs.Id, { onDelete: "restrict" } ),
	TopicActive: tinyint().default(0).notNull(),
	TopicMqtt: longtext(),
	HealthCheckPort: int(),
	Port: int(),
},
(table) => {
	return {
		IX_Controllers_ControllerTypeId: index("IX_Controllers_ControllerTypeId").on(table.ControllerTypeId),
		IX_Controllers_LastLogInfoId: index("IX_Controllers_LastLogInfoId").on(table.LastLogInfoId),
		IX_Controllers_ParentId: index("IX_Controllers_ParentId").on(table.ParentId),
		FK_Controllers_Controllers_ParentId: foreignKey({
			columns: [table.ParentId],
			foreignColumns: [table.Id],
			name: "FK_Controllers_Controllers_ParentId"
		}).onDelete("restrict"),
		Controllers_Id: primaryKey({ columns: [table.Id], name: "Controllers_Id"}),
		IX_Controllers_LocationId_Number: unique("IX_Controllers_LocationId_Number").on(table.LocationId, table.Number),
		IX_Controllers_MacAddress: unique("IX_Controllers_MacAddress").on(table.MacAddress),
	}
});

export const CurrentAssetMileages = mysqlTable("CurrentAssetMileages", {
	Id: binary({ length: 16 }).notNull(),
	AssetId: binary({ length: 16 }).notNull(),
	AssetMileageLogId: binary({ length: 16 }).notNull().references(() => AssetMileageLogs.Id, { onDelete: "restrict" } ),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		CurrentAssetMileages_Id: primaryKey({ columns: [table.Id], name: "CurrentAssetMileages_Id"}),
		IX_CurrentAssetMileages_AssetId: unique("IX_CurrentAssetMileages_AssetId").on(table.AssetId),
		IX_CurrentAssetMileages_AssetMileageLogId: unique("IX_CurrentAssetMileages_AssetMileageLogId").on(table.AssetMileageLogId),
	}
});

export const CurrentHealthChecks = mysqlTable("CurrentHealthChecks", {
	Id: binary({ length: 16 }).notNull(),
	ControllerId: binary({ length: 16 }).notNull().references(() => Controllers.Id, { onDelete: "restrict" } ),
	ControllerLogId: binary({ length: 16 }).notNull().references(() => ControllerLogs.Id),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		CurrentHealthChecks_Id: primaryKey({ columns: [table.Id], name: "CurrentHealthChecks_Id"}),
		IX_CurrentHealthChecks_ControllerId: unique("IX_CurrentHealthChecks_ControllerId").on(table.ControllerId),
		IX_CurrentHealthChecks_ControllerLogId: unique("IX_CurrentHealthChecks_ControllerLogId").on(table.ControllerLogId),
	}
});

export const EventQueueStates = mysqlTable("EventQueueStates", {
	Id: binary({ length: 16 }).notNull(),
	ProcessCode: longtext(),
	QueueCode: longtext(),
	QueueBody: json(),
	RegistrationTimestamp: datetime({ mode: 'string', fsp: 6 }).notNull(),
},
(table) => {
	return {
		EventQueueStates_Id: primaryKey({ columns: [table.Id], name: "EventQueueStates_Id"}),
	}
});

export const HardwareControllerModels = mysqlTable("HardwareControllerModels", {
	Id: int().autoincrement().notNull(),
	Model: longtext(),
	Config: longtext(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		HardwareControllerModels_Id: primaryKey({ columns: [table.Id], name: "HardwareControllerModels_Id"}),
	}
});

export const HardwareControllers = mysqlTable("HardwareControllers", {
	Id: int().autoincrement().notNull(),
	SerialNumber: int().notNull(),
	IP: longtext(),
	IPPortNumber: int().notNull(),
	HardwareControllerModelId: int().notNull().references(() => HardwareControllerModels.Id, { onDelete: "cascade" } ),
	AreaRegistrationId: int().notNull().references(() => AreaRegistrations.Id, { onDelete: "restrict" } ),
	Activated: tinyint().notNull(),
	ControllerParams: longtext(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_HardwareControllers_AreaRegistrationId: index("IX_HardwareControllers_AreaRegistrationId").on(table.AreaRegistrationId),
		IX_HardwareControllers_HardwareControllerModelId: index("IX_HardwareControllers_HardwareControllerModelId").on(table.HardwareControllerModelId),
		HardwareControllers_Id: primaryKey({ columns: [table.Id], name: "HardwareControllers_Id"}),
	}
});

export const IODeviceLogs = mysqlTable("IODeviceLogs", {
	Id: binary({ length: 16 }).notNull(),
	IODeviceId: binary({ length: 16 }).notNull().references(() => IODevices.Id, { onDelete: "restrict" } ),
	Time: datetime({ mode: 'string', fsp: 6 }).notNull(),
	Value: longtext().notNull(),
	Details: longtext(),
	LocationId: int().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_IODeviceLogs_IODeviceId: index("IX_IODeviceLogs_IODeviceId").on(table.IODeviceId),
		IODeviceLogs_Id: primaryKey({ columns: [table.Id], name: "IODeviceLogs_Id"}),
	}
});

export const IODevices = mysqlTable("IODevices", {
	Id: binary({ length: 16 }).notNull(),
	ControllerId: binary({ length: 16 }).notNull().references(() => Controllers.Id, { onDelete: "restrict" } ),
	SerialNumber: longtext(),
	Type: longtext().notNull(),
	Model: longtext(),
	Number: int().notNull(),
	Description: longtext(),
	UnitOfMeasureId: binary({ length: 16 }),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	LocationId: int(),
},
(table) => {
	return {
		IODevices_Id: primaryKey({ columns: [table.Id], name: "IODevices_Id"}),
		IX_IODevices_ControllerId_Number: unique("IX_IODevices_ControllerId_Number").on(table.ControllerId, table.Number),
	}
});

export const InventoryReporters = mysqlTable("InventoryReporters", {
	Id: int().autoincrement().notNull(),
	AssetId: binary({ length: 16 }),
	AssetName: longtext(),
	HardwareControllerId: int(),
	AreaRegistrationId: int(),
	AntennaID: smallint({ unsigned: true }).notNull(),
	LocationId: int(),
	Description: longtext(),
	PreviousPoint: longtext(),
	CurrentPoint: longtext(),
	Distance: decimal({ precision: 12, scale: 2 }).notNull(),
	CurrentMileage: decimal({ precision: 12, scale: 2 }).notNull(),
	TagID: longtext(),
	FirstSeenTimeStampSensor: datetime({ mode: 'string', fsp: 6 }).notNull(),
	LastSeenTimeStampSensor: datetime({ mode: 'string', fsp: 6 }).notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		InventoryReporters_Id: primaryKey({ columns: [table.Id], name: "InventoryReporters_Id"}),
	}
});

export const LocationDistances = mysqlTable("LocationDistances", {
	Id: binary({ length: 16 }).notNull(),
	LocationAId: int().notNull(),
	LocationBId: int().notNull(),
	Distance: double().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		LocationDistances_Id: primaryKey({ columns: [table.Id], name: "LocationDistances_Id"}),
		IX_LocationDistances_LocationAId_LocationBId: unique("IX_LocationDistances_LocationAId_LocationBId").on(table.LocationAId, table.LocationBId),
	}
});

export const MaintenanceRegulations = mysqlTable("MaintenanceRegulations", {
	Id: int().autoincrement().notNull(),
	Name: longtext(),
	Description: longtext(),
	MileageBeforeMaintenance: decimal({ precision: 12, scale: 2 }).notNull(),
	MaintenancePeriod: int(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		MaintenanceRegulations_Id: primaryKey({ columns: [table.Id], name: "MaintenanceRegulations_Id"}),
	}
});

export const MeasureUnits = mysqlTable("MeasureUnits", {
	Id: int().autoincrement().notNull(),
	Name: longtext(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		MeasureUnits_Id: primaryKey({ columns: [table.Id], name: "MeasureUnits_Id"}),
	}
});

export const MeasurementTypes = mysqlTable("MeasurementTypes", {
	Id: int().autoincrement().notNull(),
	Name: longtext(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		MeasurementTypes_Id: primaryKey({ columns: [table.Id], name: "MeasurementTypes_Id"}),
	}
});

export const MqttLogs = mysqlTable("MqttLogs", {
	Id: binary({ length: 16 }).notNull(),
	TID: longtext(),
	Antenna: int().notNull(),
	EventNum: int(),
	Format: longtext(),
	IdHex: longtext(),
	PeakRssi: longtext(),
	Reads: longtext(),
	UserDefined: longtext(),
	Timestamp: longtext(),
	Type: longtext(),
	AssetId: binary({ length: 16 }),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	ControllerId: binary({ length: 16 }).references(() => Controllers.Id, { onDelete: "restrict" } ),
	Count: bigint({ mode: "number" }),
	CustomCode: longtext(),
	Epc: longtext(),
	MqttConsumer: longtext(),
	Rssi: int(),
	SerialNumber: longtext(),
	TagReadData: datetime({ mode: 'string', fsp: 6 }),
	Topic: longtext(),
},
(table) => {
	return {
		IX_MqttLogs_ControllerId: index("IX_MqttLogs_ControllerId").on(table.ControllerId),
		MqttLogs_Id: primaryKey({ columns: [table.Id], name: "MqttLogs_Id"}),
	}
});

export const PassingMaintenances = mysqlTable("PassingMaintenances", {
	Id: int().autoincrement().notNull(),
	AssetId: binary({ length: 16 }),
	LastMaintenanceRegulationId: int().references(() => MaintenanceRegulations.Id, { onDelete: "restrict" } ),
	MaintenanceStatus: int().notNull(),
	CurrentMileage: decimal({ precision: 12, scale: 2 }),
	RemainingMileageBeforeMaintenance: decimal({ precision: 12, scale: 2 }),
	DailyAverageMileage: decimal({ precision: 12, scale: 2 }),
	LastMaintenanceMileage: decimal({ precision: 12, scale: 2 }),
	NextMaintenanceMileage: decimal({ precision: 12, scale: 2 }),
	JobId: binary({ length: 16 }),
	CurrentMileageDate: datetime({ mode: 'string', fsp: 6 }),
	ForecastDateForNextMaintenance: datetime({ mode: 'string', fsp: 6 }),
	LastMaintenanceDate: datetime({ mode: 'string', fsp: 6 }),
	ExternalUnitOfMeasureId: int(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_PassingMaintenances_LastMaintenanceRegulationId: index("IX_PassingMaintenances_LastMaintenanceRegulationId").on(table.LastMaintenanceRegulationId),
		PassingMaintenances_Id: primaryKey({ columns: [table.Id], name: "PassingMaintenances_Id"}),
	}
});

export const Ports = mysqlTable("Ports", {
	Id: int().autoincrement().notNull(),
	Number: int(),
	Type: longtext(),
	HardwareControllerId: int().notNull().references(() => HardwareControllers.Id, { onDelete: "cascade" } ),
	Protocol: longtext(),
	PortParams: longtext(),
	Activated: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_Ports_HardwareControllerId: index("IX_Ports_HardwareControllerId").on(table.HardwareControllerId),
		Ports_Id: primaryKey({ columns: [table.Id], name: "Ports_Id"}),
	}
});

export const RfidLogs = mysqlTable("RfidLogs", {
	Id: binary({ length: 16 }).notNull(),
	IODeviceLogId: binary({ length: 16 }).notNull().references(() => IODeviceLogs.Id, { onDelete: "restrict" } ),
	Handled: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
	AssetId: binary({ length: 16 }).default('0x').notNull(),
},
(table) => {
	return {
		RfidLogs_Id: primaryKey({ columns: [table.Id], name: "RfidLogs_Id"}),
		IX_RfidLogs_IODeviceLogId: unique("IX_RfidLogs_IODeviceLogId").on(table.IODeviceLogId),
	}
});

export const RuleTemplates = mysqlTable("RuleTemplates", {
	Id: int().autoincrement().notNull(),
	Code: int(),
	Description: longtext(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		RuleTemplates_Id: primaryKey({ columns: [table.Id], name: "RuleTemplates_Id"}),
	}
});

export const Rules = mysqlTable("Rules", {
	Id: int().autoincrement().notNull(),
	RuleTemplateId: int().notNull().references(() => RuleTemplates.Id, { onDelete: "cascade" } ),
	AreaId: int().notNull().references(() => Areas.Id, { onDelete: "cascade" } ),
	Status: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_Rules_AreaId: index("IX_Rules_AreaId").on(table.AreaId),
		IX_Rules_RuleTemplateId: index("IX_Rules_RuleTemplateId").on(table.RuleTemplateId),
		Rules_Id: primaryKey({ columns: [table.Id], name: "Rules_Id"}),
	}
});

export const SensorAndAssetBindings = mysqlTable("SensorAndAssetBindings", {
	Id: int().autoincrement().notNull(),
	AssetId: binary({ length: 16 }),
	SensorId: binary({ length: 16 }).references(() => Sensors.Id, { onDelete: "restrict" } ),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_SensorAndAssetBindings_SensorId: index("IX_SensorAndAssetBindings_SensorId").on(table.SensorId),
		SensorAndAssetBindings_Id: primaryKey({ columns: [table.Id], name: "SensorAndAssetBindings_Id"}),
	}
});

export const SensorGroups = mysqlTable("SensorGroups", {
	Id: binary({ length: 16 }).notNull(),
	Name: longtext(),
	ParentSensorGroupId: binary({ length: 16 }),
	ParentId: binary({ length: 16 }),
},
(table) => {
	return {
		IX_SensorGroups_ParentSensorGroupId: index("IX_SensorGroups_ParentSensorGroupId").on(table.ParentSensorGroupId),
		FK_SensorGroups_SensorGroups_ParentSensorGroupId: foreignKey({
			columns: [table.ParentSensorGroupId],
			foreignColumns: [table.Id],
			name: "FK_SensorGroups_SensorGroups_ParentSensorGroupId"
		}).onDelete("restrict"),
		SensorGroups_Id: primaryKey({ columns: [table.Id], name: "SensorGroups_Id"}),
	}
});

export const SensorModels = mysqlTable("SensorModels", {
	Id: int().autoincrement().notNull(),
	Name: longtext(),
	Config: longtext(),
	SensorTypeId: int().notNull().references(() => SensorTypes.Id, { onDelete: "cascade" } ),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_SensorModels_SensorTypeId: index("IX_SensorModels_SensorTypeId").on(table.SensorTypeId),
		SensorModels_Id: primaryKey({ columns: [table.Id], name: "SensorModels_Id"}),
	}
});

export const SensorReadings = mysqlTable("SensorReadings", {
	Id: binary({ length: 16 }).notNull(),
	SensorId: binary({ length: 16 }).notNull().references(() => Sensors.Id, { onDelete: "restrict" } ),
	MeasurementTypeId: int().notNull().references(() => MeasurementTypes.Id, { onDelete: "cascade" } ),
	MeasureUnitId: int().notNull().references(() => MeasureUnits.Id, { onDelete: "cascade" } ),
	MeasuredValue: double().notNull(),
	DateTimeOfMeasurement: datetime({ mode: 'string', fsp: 6 }).notNull(),
	IsTransferred: tinyint().notNull(),
	Alarm: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_SensorReadings_MeasurementTypeId: index("IX_SensorReadings_MeasurementTypeId").on(table.MeasurementTypeId),
		IX_SensorReadings_MeasureUnitId: index("IX_SensorReadings_MeasureUnitId").on(table.MeasureUnitId),
		IX_SensorReadings_SensorId: index("IX_SensorReadings_SensorId").on(table.SensorId),
		SensorReadings_Id: primaryKey({ columns: [table.Id], name: "SensorReadings_Id"}),
	}
});

export const SensorTypes = mysqlTable("SensorTypes", {
	Id: int().autoincrement().notNull(),
	Name: longtext(),
	Type: int(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		SensorTypes_Id: primaryKey({ columns: [table.Id], name: "SensorTypes_Id"}),
	}
});

export const Sensors = mysqlTable("Sensors", {
	Id: binary({ length: 16 }).notNull(),
	Name: longtext(),
	Number: longtext(),
	PortId: int().notNull().references(() => Ports.Id, { onDelete: "cascade" } ),
	AreaPointId: int().notNull().references(() => AreaPoints.Id, { onDelete: "cascade" } ),
	SensorModelId: int().notNull().references(() => SensorModels.Id, { onDelete: "cascade" } ),
	SensorGroupId: binary({ length: 16 }).notNull().references(() => SensorGroups.Id, { onDelete: "cascade" } ),
	Activated: tinyint().notNull(),
	SensorParams: longtext(),
	AssetId: binary({ length: 16 }),
	LocationId: int(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_Sensors_AreaPointId: index("IX_Sensors_AreaPointId").on(table.AreaPointId),
		IX_Sensors_PortId: index("IX_Sensors_PortId").on(table.PortId),
		IX_Sensors_SensorGroupId: index("IX_Sensors_SensorGroupId").on(table.SensorGroupId),
		IX_Sensors_SensorModelId: index("IX_Sensors_SensorModelId").on(table.SensorModelId),
		Sensors_Id: primaryKey({ columns: [table.Id], name: "Sensors_Id"}),
	}
});

export const TagReports = mysqlTable("TagReports", {
	Id: binary({ length: 16 }).notNull(),
	TagReport: json(),
},
(table) => {
	return {
		TagReports_Id: primaryKey({ columns: [table.Id], name: "TagReports_Id"}),
	}
});

export const ViewReporters = mysqlTable("ViewReporters", {
	Id: int().autoincrement().notNull(),
	AssetId: binary({ length: 16 }),
	AssetName: longtext(),
	LocationId1: int(),
	LocationId2: int(),
	ExitPermit: tinyint().notNull(),
	StateRegistrationNumber: longtext(),
	TagID: longtext(),
	AssetArrivalOrDeparture: datetime({ mode: 'string', fsp: 6 }).notNull(),
	LastSeenTimeStampSensor1: datetime({ mode: 'string', fsp: 6 }).notNull(),
	LastSeenTimeStampSensor2: datetime({ mode: 'string', fsp: 6 }).notNull(),
	AssetDepartureStatus: tinyint().notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		ViewReporters_Id: primaryKey({ columns: [table.Id], name: "ViewReporters_Id"}),
	}
});

export const WeaponStorages = mysqlTable("WeaponStorages", {
	Id: binary({ length: 16 }).notNull(),
	AssetId: binary({ length: 16 }),
	LocationId: int(),
	LocationName: longtext(),
	AreaPointId: int().notNull().references(() => AreaPoints.Id, { onDelete: "cascade" } ),
	AreaPointName: longtext(),
	SensorId: binary({ length: 16 }).notNull().references(() => Sensors.Id, { onDelete: "cascade" } ),
	WeaponTagId: longtext(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		IX_WeaponStorages_AreaPointId: index("IX_WeaponStorages_AreaPointId").on(table.AreaPointId),
		IX_WeaponStorages_SensorId: index("IX_WeaponStorages_SensorId").on(table.SensorId),
		WeaponStorages_Id: primaryKey({ columns: [table.Id], name: "WeaponStorages_Id"}),
	}
});

export const WeaponsAccountings = mysqlTable("WeaponsAccountings", {
	Id: int().autoincrement().notNull(),
	AssetId: binary({ length: 16 }),
	AssetName: longtext(),
	AssetDescription: longtext(),
	LocationId: int(),
	LocationName: longtext(),
	ExternalCustodianUserId: int(),
	ExternalCustodianName: longtext(),
	WeaponSerialNumber: longtext(),
	WeaponTagId: longtext(),
	WeaponStorageId: binary({ length: 16 }).notNull(),
	AreaPointName: longtext(),
	WeaponInTheRack: tinyint().notNull(),
	OwnOrAlienWeapon: tinyint().notNull(),
	WeaponFixationTime: datetime({ mode: 'string', fsp: 6 }).notNull(),
	CreatedById: int(),
	Created: datetime({ mode: 'string', fsp: 6 }),
	UpdatedById: int(),
	Updated: datetime({ mode: 'string', fsp: 6 }),
},
(table) => {
	return {
		WeaponsAccountings_Id: primaryKey({ columns: [table.Id], name: "WeaponsAccountings_Id"}),
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
