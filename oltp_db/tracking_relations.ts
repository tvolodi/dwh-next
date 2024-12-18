import { relations } from "drizzle-orm/relations";
import { Vehicles, AvailableVehicles, ComposedVehicles, ComposedVehicleItems, ComposedVehicleJournals, ComposedVehicleLog, Routes, Containers, ContainerItemRegistries, ContainerItems, ContainerTypes, TrackingRegistries, CurrentTrackingRegistries, GeoZones, GeoTrackingData, RouteNodes, RouteNodeJoins, RouteNodeLinks, RouteProgresses, VehicleAttributeValues, VehicleTypeAttributeTypes, VehicleAttributeTypes, VehicleTypes } from "./schema";

export const AvailableVehiclesRelations = relations(AvailableVehicles, ({one}) => ({
	Vehicle: one(Vehicles, {
		fields: [AvailableVehicles.VehicleId],
		references: [Vehicles.Id]
	}),
}));

export const VehiclesRelations = relations(Vehicles, ({one, many}) => ({
	AvailableVehicles: many(AvailableVehicles),
	VehicleAttributeValues: many(VehicleAttributeValues),
	VehicleType: one(VehicleTypes, {
		fields: [Vehicles.VehicleTypeId],
		references: [VehicleTypes.Id]
	}),
}));

export const ComposedVehicleItemsRelations = relations(ComposedVehicleItems, ({one, many}) => ({
	ComposedVehicle_ComposedVehicleId: one(ComposedVehicles, {
		fields: [ComposedVehicleItems.ComposedVehicleId],
		references: [ComposedVehicles.Id],
		relationName: "ComposedVehicleItems_ComposedVehicleId_ComposedVehicles_Id"
	}),
	ComposedVehicle_ObservedComposedVehicleId: one(ComposedVehicles, {
		fields: [ComposedVehicleItems.ObservedComposedVehicleId],
		references: [ComposedVehicles.Id],
		relationName: "ComposedVehicleItems_ObservedComposedVehicleId_ComposedVehicles_Id"
	}),
	ComposedVehicleLogs: many(ComposedVehicleLog),
}));

export const ComposedVehiclesRelations = relations(ComposedVehicles, ({one, many}) => ({
	ComposedVehicleItems_ComposedVehicleId: many(ComposedVehicleItems, {
		relationName: "ComposedVehicleItems_ComposedVehicleId_ComposedVehicles_Id"
	}),
	ComposedVehicleItems_ObservedComposedVehicleId: many(ComposedVehicleItems, {
		relationName: "ComposedVehicleItems_ObservedComposedVehicleId_ComposedVehicles_Id"
	}),
	ComposedVehicleJournals: many(ComposedVehicleJournals),
	ComposedVehicleLogs_ActualComposedVehicleId: many(ComposedVehicleLog, {
		relationName: "ComposedVehicleLog_ActualComposedVehicleId_ComposedVehicles_Id"
	}),
	ComposedVehicleLogs_ComposedVehicleId: many(ComposedVehicleLog, {
		relationName: "ComposedVehicleLog_ComposedVehicleId_ComposedVehicles_Id"
	}),
	Route: one(Routes, {
		fields: [ComposedVehicles.RouteId],
		references: [Routes.Id]
	}),
}));

export const ComposedVehicleJournalsRelations = relations(ComposedVehicleJournals, ({one}) => ({
	ComposedVehicle: one(ComposedVehicles, {
		fields: [ComposedVehicleJournals.ComposedVehicleId],
		references: [ComposedVehicles.Id]
	}),
}));

export const ComposedVehicleLogRelations = relations(ComposedVehicleLog, ({one}) => ({
	ComposedVehicleItem: one(ComposedVehicleItems, {
		fields: [ComposedVehicleLog.ComposedVehicleItemId],
		references: [ComposedVehicleItems.Id]
	}),
	ComposedVehicle_ActualComposedVehicleId: one(ComposedVehicles, {
		fields: [ComposedVehicleLog.ActualComposedVehicleId],
		references: [ComposedVehicles.Id],
		relationName: "ComposedVehicleLog_ActualComposedVehicleId_ComposedVehicles_Id"
	}),
	ComposedVehicle_ComposedVehicleId: one(ComposedVehicles, {
		fields: [ComposedVehicleLog.ComposedVehicleId],
		references: [ComposedVehicles.Id],
		relationName: "ComposedVehicleLog_ComposedVehicleId_ComposedVehicles_Id"
	}),
}));

export const RoutesRelations = relations(Routes, ({many}) => ({
	ComposedVehicles: many(ComposedVehicles),
	RouteNodeJoins: many(RouteNodeJoins),
	RouteNodeLinks: many(RouteNodeLinks),
	RouteProgresses: many(RouteProgresses),
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

export const CurrentTrackingRegistriesRelations = relations(CurrentTrackingRegistries, ({one}) => ({
	TrackingRegistry: one(TrackingRegistries, {
		fields: [CurrentTrackingRegistries.TrackingRegistryId],
		references: [TrackingRegistries.Id]
	}),
}));

export const TrackingRegistriesRelations = relations(TrackingRegistries, ({many}) => ({
	CurrentTrackingRegistries: many(CurrentTrackingRegistries),
	GeoTrackingData: many(GeoTrackingData),
}));

export const GeoTrackingDataRelations = relations(GeoTrackingData, ({one}) => ({
	GeoZone: one(GeoZones, {
		fields: [GeoTrackingData.GeoZoneId],
		references: [GeoZones.Id]
	}),
	TrackingRegistry: one(TrackingRegistries, {
		fields: [GeoTrackingData.TrackingRegistryId],
		references: [TrackingRegistries.Id]
	}),
}));

export const GeoZonesRelations = relations(GeoZones, ({one, many}) => ({
	GeoTrackingData: many(GeoTrackingData),
	RouteNode: one(RouteNodes, {
		fields: [GeoZones.RouteNodeId],
		references: [RouteNodes.Id]
	}),
}));

export const RouteNodesRelations = relations(RouteNodes, ({many}) => ({
	GeoZones: many(GeoZones),
	RouteNodeJoins: many(RouteNodeJoins),
	RouteNodeLinks_FinishRouteNodeId: many(RouteNodeLinks, {
		relationName: "RouteNodeLinks_FinishRouteNodeId_RouteNodes_Id"
	}),
	RouteNodeLinks_StartRouteNodeId: many(RouteNodeLinks, {
		relationName: "RouteNodeLinks_StartRouteNodeId_RouteNodes_Id"
	}),
}));

export const RouteNodeJoinsRelations = relations(RouteNodeJoins, ({one}) => ({
	RouteNode: one(RouteNodes, {
		fields: [RouteNodeJoins.RouteNodeId],
		references: [RouteNodes.Id]
	}),
	Route: one(Routes, {
		fields: [RouteNodeJoins.RouteId],
		references: [Routes.Id]
	}),
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

export const RouteProgressesRelations = relations(RouteProgresses, ({one}) => ({
	Route: one(Routes, {
		fields: [RouteProgresses.RouteId],
		references: [Routes.Id]
	}),
}));

export const VehicleAttributeValuesRelations = relations(VehicleAttributeValues, ({one}) => ({
	Vehicle: one(Vehicles, {
		fields: [VehicleAttributeValues.VehicleId],
		references: [Vehicles.Id]
	}),
	VehicleTypeAttributeType: one(VehicleTypeAttributeTypes, {
		fields: [VehicleAttributeValues.VehicleTypeAttributeTypeId],
		references: [VehicleTypeAttributeTypes.Id]
	}),
}));

export const VehicleTypeAttributeTypesRelations = relations(VehicleTypeAttributeTypes, ({one, many}) => ({
	VehicleAttributeValues: many(VehicleAttributeValues),
	VehicleAttributeType: one(VehicleAttributeTypes, {
		fields: [VehicleTypeAttributeTypes.VehicleAttributeTypeId],
		references: [VehicleAttributeTypes.Id]
	}),
	VehicleType: one(VehicleTypes, {
		fields: [VehicleTypeAttributeTypes.VehicleTypeId],
		references: [VehicleTypes.Id]
	}),
}));

export const VehicleAttributeTypesRelations = relations(VehicleAttributeTypes, ({many}) => ({
	VehicleTypeAttributeTypes: many(VehicleTypeAttributeTypes),
}));

export const VehicleTypesRelations = relations(VehicleTypes, ({many}) => ({
	VehicleTypeAttributeTypes: many(VehicleTypeAttributeTypes),
	Vehicles: many(Vehicles),
}));