import { relations } from "drizzle-orm/relations";
import { ActuatorTypes, ActuatorModels, Actuators, AreaPoints, Ports, Areas, AreaDistances, AreaRegistrations, RuleTemplates, AreaTypes, RfidLogs, AssetMileageLogs, Controllers, ControllerLogs, ControllerTypes, CurrentAssetMileages, CurrentHealthChecks, HardwareControllers, HardwareControllerModels, IODevices, IODeviceLogs, MqttLogs, MaintenanceRegulations, PassingMaintenances, Rules, Sensors, SensorAndAssetBindings, SensorGroups, SensorTypes, SensorModels, MeasurementTypes, SensorReadings, MeasureUnits, WeaponStorages } from "./schema";

export const ActuatorModelsRelations = relations(ActuatorModels, ({one, many}) => ({
	ActuatorType: one(ActuatorTypes, {
		fields: [ActuatorModels.ActuatorTypeId],
		references: [ActuatorTypes.Id]
	}),
	Actuators: many(Actuators),
}));

export const ActuatorTypesRelations = relations(ActuatorTypes, ({many}) => ({
	ActuatorModels: many(ActuatorModels),
}));

export const ActuatorsRelations = relations(Actuators, ({one}) => ({
	ActuatorModel: one(ActuatorModels, {
		fields: [Actuators.ActuatorModelId],
		references: [ActuatorModels.Id]
	}),
	AreaPoint: one(AreaPoints, {
		fields: [Actuators.AreaPointId],
		references: [AreaPoints.Id]
	}),
	Port: one(Ports, {
		fields: [Actuators.PortId],
		references: [Ports.Id]
	}),
}));

export const AreaPointsRelations = relations(AreaPoints, ({one, many}) => ({
	Actuators: many(Actuators),
	Area: one(Areas, {
		fields: [AreaPoints.AreaId],
		references: [Areas.Id]
	}),
	Sensors: many(Sensors),
	WeaponStorages: many(WeaponStorages),
}));

export const PortsRelations = relations(Ports, ({one, many}) => ({
	Actuators: many(Actuators),
	HardwareController: one(HardwareControllers, {
		fields: [Ports.HardwareControllerId],
		references: [HardwareControllers.Id]
	}),
	Sensors: many(Sensors),
}));

export const AreaDistancesRelations = relations(AreaDistances, ({one}) => ({
	Area: one(Areas, {
		fields: [AreaDistances.AreaId],
		references: [Areas.Id]
	}),
}));

export const AreasRelations = relations(Areas, ({one, many}) => ({
	AreaDistances: many(AreaDistances),
	AreaPoints: many(AreaPoints),
	AreaRegistrations: many(AreaRegistrations),
	AreaType: one(AreaTypes, {
		fields: [Areas.AreaTypeId],
		references: [AreaTypes.Id]
	}),
	Rules: many(Rules),
}));

export const AreaRegistrationsRelations = relations(AreaRegistrations, ({one, many}) => ({
	Area: one(Areas, {
		fields: [AreaRegistrations.AreaId],
		references: [Areas.Id]
	}),
	HardwareControllers: many(HardwareControllers),
}));

export const AreaTypesRelations = relations(AreaTypes, ({one, many}) => ({
	RuleTemplate: one(RuleTemplates, {
		fields: [AreaTypes.RuleTemplateId],
		references: [RuleTemplates.Id]
	}),
	Areas: many(Areas),
}));

export const RuleTemplatesRelations = relations(RuleTemplates, ({many}) => ({
	AreaTypes: many(AreaTypes),
	Rules: many(Rules),
}));

export const AssetMileageLogsRelations = relations(AssetMileageLogs, ({one, many}) => ({
	RfidLog: one(RfidLogs, {
		fields: [AssetMileageLogs.RfidLogId],
		references: [RfidLogs.Id]
	}),
	CurrentAssetMileages: many(CurrentAssetMileages),
}));

export const RfidLogsRelations = relations(RfidLogs, ({one, many}) => ({
	AssetMileageLogs: many(AssetMileageLogs),
	IODeviceLog: one(IODeviceLogs, {
		fields: [RfidLogs.IODeviceLogId],
		references: [IODeviceLogs.Id]
	}),
}));

export const ControllerLogsRelations = relations(ControllerLogs, ({one, many}) => ({
	Controller: one(Controllers, {
		fields: [ControllerLogs.ControllerId],
		references: [Controllers.Id],
		relationName: "ControllerLogs_ControllerId_Controllers_Id"
	}),
	Controllers: many(Controllers, {
		relationName: "Controllers_LastLogInfoId_ControllerLogs_Id"
	}),
	CurrentHealthChecks: many(CurrentHealthChecks),
}));

export const ControllersRelations = relations(Controllers, ({one, many}) => ({
	ControllerLogs: many(ControllerLogs, {
		relationName: "ControllerLogs_ControllerId_Controllers_Id"
	}),
	ControllerLog: one(ControllerLogs, {
		fields: [Controllers.LastLogInfoId],
		references: [ControllerLogs.Id],
		relationName: "Controllers_LastLogInfoId_ControllerLogs_Id"
	}),
	Controller: one(Controllers, {
		fields: [Controllers.ParentId],
		references: [Controllers.Id],
		relationName: "Controllers_ParentId_Controllers_Id"
	}),
	Controllers: many(Controllers, {
		relationName: "Controllers_ParentId_Controllers_Id"
	}),
	ControllerType: one(ControllerTypes, {
		fields: [Controllers.ControllerTypeId],
		references: [ControllerTypes.Id]
	}),
	CurrentHealthChecks: many(CurrentHealthChecks),
	IODevices: many(IODevices),
	MqttLogs: many(MqttLogs),
}));

export const ControllerTypesRelations = relations(ControllerTypes, ({many}) => ({
	Controllers: many(Controllers),
}));

export const CurrentAssetMileagesRelations = relations(CurrentAssetMileages, ({one}) => ({
	AssetMileageLog: one(AssetMileageLogs, {
		fields: [CurrentAssetMileages.AssetMileageLogId],
		references: [AssetMileageLogs.Id]
	}),
}));

export const CurrentHealthChecksRelations = relations(CurrentHealthChecks, ({one}) => ({
	ControllerLog: one(ControllerLogs, {
		fields: [CurrentHealthChecks.ControllerLogId],
		references: [ControllerLogs.Id]
	}),
	Controller: one(Controllers, {
		fields: [CurrentHealthChecks.ControllerId],
		references: [Controllers.Id]
	}),
}));

export const HardwareControllersRelations = relations(HardwareControllers, ({one, many}) => ({
	AreaRegistration: one(AreaRegistrations, {
		fields: [HardwareControllers.AreaRegistrationId],
		references: [AreaRegistrations.Id]
	}),
	HardwareControllerModel: one(HardwareControllerModels, {
		fields: [HardwareControllers.HardwareControllerModelId],
		references: [HardwareControllerModels.Id]
	}),
	Ports: many(Ports),
}));

export const HardwareControllerModelsRelations = relations(HardwareControllerModels, ({many}) => ({
	HardwareControllers: many(HardwareControllers),
}));

export const IODeviceLogsRelations = relations(IODeviceLogs, ({one, many}) => ({
	IODevice: one(IODevices, {
		fields: [IODeviceLogs.IODeviceId],
		references: [IODevices.Id]
	}),
	RfidLogs: many(RfidLogs),
}));

export const IODevicesRelations = relations(IODevices, ({one, many}) => ({
	IODeviceLogs: many(IODeviceLogs),
	Controller: one(Controllers, {
		fields: [IODevices.ControllerId],
		references: [Controllers.Id]
	}),
}));

export const MqttLogsRelations = relations(MqttLogs, ({one}) => ({
	Controller: one(Controllers, {
		fields: [MqttLogs.ControllerId],
		references: [Controllers.Id]
	}),
}));

export const PassingMaintenancesRelations = relations(PassingMaintenances, ({one}) => ({
	MaintenanceRegulation: one(MaintenanceRegulations, {
		fields: [PassingMaintenances.LastMaintenanceRegulationId],
		references: [MaintenanceRegulations.Id]
	}),
}));

export const MaintenanceRegulationsRelations = relations(MaintenanceRegulations, ({many}) => ({
	PassingMaintenances: many(PassingMaintenances),
}));

export const RulesRelations = relations(Rules, ({one}) => ({
	Area: one(Areas, {
		fields: [Rules.AreaId],
		references: [Areas.Id]
	}),
	RuleTemplate: one(RuleTemplates, {
		fields: [Rules.RuleTemplateId],
		references: [RuleTemplates.Id]
	}),
}));

export const SensorAndAssetBindingsRelations = relations(SensorAndAssetBindings, ({one}) => ({
	Sensor: one(Sensors, {
		fields: [SensorAndAssetBindings.SensorId],
		references: [Sensors.Id]
	}),
}));

export const SensorsRelations = relations(Sensors, ({one, many}) => ({
	SensorAndAssetBindings: many(SensorAndAssetBindings),
	SensorReadings: many(SensorReadings),
	AreaPoint: one(AreaPoints, {
		fields: [Sensors.AreaPointId],
		references: [AreaPoints.Id]
	}),
	Port: one(Ports, {
		fields: [Sensors.PortId],
		references: [Ports.Id]
	}),
	SensorGroup: one(SensorGroups, {
		fields: [Sensors.SensorGroupId],
		references: [SensorGroups.Id]
	}),
	SensorModel: one(SensorModels, {
		fields: [Sensors.SensorModelId],
		references: [SensorModels.Id]
	}),
	WeaponStorages: many(WeaponStorages),
}));

export const SensorGroupsRelations = relations(SensorGroups, ({one, many}) => ({
	SensorGroup: one(SensorGroups, {
		fields: [SensorGroups.ParentSensorGroupId],
		references: [SensorGroups.Id],
		relationName: "SensorGroups_ParentSensorGroupId_SensorGroups_Id"
	}),
	SensorGroups: many(SensorGroups, {
		relationName: "SensorGroups_ParentSensorGroupId_SensorGroups_Id"
	}),
	Sensors: many(Sensors),
}));

export const SensorModelsRelations = relations(SensorModels, ({one, many}) => ({
	SensorType: one(SensorTypes, {
		fields: [SensorModels.SensorTypeId],
		references: [SensorTypes.Id]
	}),
	Sensors: many(Sensors),
}));

export const SensorTypesRelations = relations(SensorTypes, ({many}) => ({
	SensorModels: many(SensorModels),
}));

export const SensorReadingsRelations = relations(SensorReadings, ({one}) => ({
	MeasurementType: one(MeasurementTypes, {
		fields: [SensorReadings.MeasurementTypeId],
		references: [MeasurementTypes.Id]
	}),
	MeasureUnit: one(MeasureUnits, {
		fields: [SensorReadings.MeasureUnitId],
		references: [MeasureUnits.Id]
	}),
	Sensor: one(Sensors, {
		fields: [SensorReadings.SensorId],
		references: [Sensors.Id]
	}),
}));

export const MeasurementTypesRelations = relations(MeasurementTypes, ({many}) => ({
	SensorReadings: many(SensorReadings),
}));

export const MeasureUnitsRelations = relations(MeasureUnits, ({many}) => ({
	SensorReadings: many(SensorReadings),
}));

export const WeaponStoragesRelations = relations(WeaponStorages, ({one}) => ({
	AreaPoint: one(AreaPoints, {
		fields: [WeaponStorages.AreaPointId],
		references: [AreaPoints.Id]
	}),
	Sensor: one(Sensors, {
		fields: [WeaponStorages.SensorId],
		references: [Sensors.Id]
	}),
}));