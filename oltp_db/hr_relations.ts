import { relations } from "drizzle-orm/relations";
import { Users, ActionLogs, GeoLocations, CurrentGeoLocations, Roles, ExternalUserRoles, GeoActionLogs, Locations, LocationAccesses, OrgUnits, LocationInfo, LocationOrgUnit, LocationTypes, OrgUnitAccesses, OrgUnitCalendars, ProfilePictures, RoleClaims, UserPositions, Signatures, SyncProfiles, UserConfigs, UserEmploymentJournals, Positions, Qualifications, UserQualifications, UserRoles, UserWorkTeams, WorkTeams, PhoneInfo } from "./schema";

export const ActionLogsRelations = relations(ActionLogs, ({one}) => ({
	User: one(Users, {
		fields: [ActionLogs.UserId],
		references: [Users.Id]
	}),
}));

export const UsersRelations = relations(Users, ({one, many}) => ({
	ActionLogs: many(ActionLogs),
	GeoActionLogs: many(GeoActionLogs),
	LocationAccesses: many(LocationAccesses),
	LocationInfos: many(LocationInfo),
	OrgUnitAccesses: many(OrgUnitAccesses),
	ProfilePictures: many(ProfilePictures),
	Signatures: many(Signatures),
	SyncProfiles: many(SyncProfiles),
	UserConfigs: many(UserConfigs),
	UserEmploymentJournals_RecordAuthorId: many(UserEmploymentJournals, {
		relationName: "UserEmploymentJournals_RecordAuthorId_Users_Id"
	}),
	UserEmploymentJournals_UserId: many(UserEmploymentJournals, {
		relationName: "UserEmploymentJournals_UserId_Users_Id"
	}),
	UserPositions: many(UserPositions),
	UserQualifications: many(UserQualifications),
	UserRoles: many(UserRoles),
	UserWorkTeams: many(UserWorkTeams),
	Location: one(Locations, {
		fields: [Users.LocationId],
		references: [Locations.Id]
	}),
	OrgUnit: one(OrgUnits, {
		fields: [Users.CurrentUiOrgUnitId],
		references: [OrgUnits.Id]
	}),
	PhoneInfo: one(PhoneInfo, {
		fields: [Users.PhoneInfoId],
		references: [PhoneInfo.Id]
	}),
}));

export const CurrentGeoLocationsRelations = relations(CurrentGeoLocations, ({one}) => ({
	GeoLocation: one(GeoLocations, {
		fields: [CurrentGeoLocations.GeoLocationId],
		references: [GeoLocations.Id]
	}),
}));

export const GeoLocationsRelations = relations(GeoLocations, ({many}) => ({
	CurrentGeoLocations: many(CurrentGeoLocations),
	GeoActionLogs: many(GeoActionLogs),
}));

export const ExternalUserRolesRelations = relations(ExternalUserRoles, ({one}) => ({
	Role_RoleId: one(Roles, {
		fields: [ExternalUserRoles.RoleId],
		references: [Roles.Id],
		relationName: "ExternalUserRoles_RoleId_Roles_Id"
	}),
	Role_RoleId1: one(Roles, {
		fields: [ExternalUserRoles.RoleId1],
		references: [Roles.Id],
		relationName: "ExternalUserRoles_RoleId1_Roles_Id"
	}),
}));

export const RolesRelations = relations(Roles, ({many}) => ({
	ExternalUserRoles_RoleId: many(ExternalUserRoles, {
		relationName: "ExternalUserRoles_RoleId_Roles_Id"
	}),
	ExternalUserRoles_RoleId1: many(ExternalUserRoles, {
		relationName: "ExternalUserRoles_RoleId1_Roles_Id"
	}),
	RoleClaims: many(RoleClaims),
	SyncProfiles: many(SyncProfiles),
	UserRoles: many(UserRoles),
}));

export const GeoActionLogsRelations = relations(GeoActionLogs, ({one}) => ({
	GeoLocation: one(GeoLocations, {
		fields: [GeoActionLogs.ConnectedGeoId],
		references: [GeoLocations.Id]
	}),
	User: one(Users, {
		fields: [GeoActionLogs.UserId],
		references: [Users.Id]
	}),
}));

export const LocationAccessesRelations = relations(LocationAccesses, ({one}) => ({
	Location: one(Locations, {
		fields: [LocationAccesses.LocationId],
		references: [Locations.Id]
	}),
	OrgUnit: one(OrgUnits, {
		fields: [LocationAccesses.GrantedOrgUnitId],
		references: [OrgUnits.Id]
	}),
	User: one(Users, {
		fields: [LocationAccesses.UserId],
		references: [Users.Id]
	}),
}));

export const LocationsRelations = relations(Locations, ({one, many}) => ({
	LocationAccesses: many(LocationAccesses),
	LocationInfos: many(LocationInfo),
	LocationOrgUnits: many(LocationOrgUnit),
	Location: one(Locations, {
		fields: [Locations.ParentId],
		references: [Locations.Id],
		relationName: "Locations_ParentId_Locations_Id"
	}),
	Locations: many(Locations, {
		relationName: "Locations_ParentId_Locations_Id"
	}),
	LocationType: one(LocationTypes, {
		fields: [Locations.LocationTypeId],
		references: [LocationTypes.Id]
	}),
	OrgUnit: one(OrgUnits, {
		fields: [Locations.OrgUnitId],
		references: [OrgUnits.Id]
	}),
	UserEmploymentJournals: many(UserEmploymentJournals),
	Users: many(Users),
}));

export const OrgUnitsRelations = relations(OrgUnits, ({one, many}) => ({
	LocationAccesses: many(LocationAccesses),
	LocationOrgUnits: many(LocationOrgUnit),
	Locations: many(Locations),
	OrgUnitAccesses_GrantedOrgUnitId: many(OrgUnitAccesses, {
		relationName: "OrgUnitAccesses_GrantedOrgUnitId_OrgUnits_Id"
	}),
	OrgUnitAccesses_OrgUnitId: many(OrgUnitAccesses, {
		relationName: "OrgUnitAccesses_OrgUnitId_OrgUnits_Id"
	}),
	OrgUnitCalendars: many(OrgUnitCalendars),
	OrgUnit: one(OrgUnits, {
		fields: [OrgUnits.ParentId],
		references: [OrgUnits.Id],
		relationName: "OrgUnits_ParentId_OrgUnits_Id"
	}),
	OrgUnits: many(OrgUnits, {
		relationName: "OrgUnits_ParentId_OrgUnits_Id"
	}),
	SyncProfiles: many(SyncProfiles),
	UserEmploymentJournals: many(UserEmploymentJournals),
	Users: many(Users),
}));

export const LocationInfoRelations = relations(LocationInfo, ({one}) => ({
	Location: one(Locations, {
		fields: [LocationInfo.LocationId],
		references: [Locations.Id]
	}),
	User: one(Users, {
		fields: [LocationInfo.ResponsibleUserId],
		references: [Users.Id]
	}),
}));

export const LocationOrgUnitRelations = relations(LocationOrgUnit, ({one}) => ({
	Location: one(Locations, {
		fields: [LocationOrgUnit.LocationsId],
		references: [Locations.Id]
	}),
	OrgUnit: one(OrgUnits, {
		fields: [LocationOrgUnit.OrgUnitsId],
		references: [OrgUnits.Id]
	}),
}));

export const LocationTypesRelations = relations(LocationTypes, ({many}) => ({
	Locations: many(Locations),
}));

export const OrgUnitAccessesRelations = relations(OrgUnitAccesses, ({one}) => ({
	OrgUnit_GrantedOrgUnitId: one(OrgUnits, {
		fields: [OrgUnitAccesses.GrantedOrgUnitId],
		references: [OrgUnits.Id],
		relationName: "OrgUnitAccesses_GrantedOrgUnitId_OrgUnits_Id"
	}),
	OrgUnit_OrgUnitId: one(OrgUnits, {
		fields: [OrgUnitAccesses.OrgUnitId],
		references: [OrgUnits.Id],
		relationName: "OrgUnitAccesses_OrgUnitId_OrgUnits_Id"
	}),
	User: one(Users, {
		fields: [OrgUnitAccesses.UserId],
		references: [Users.Id]
	}),
}));

export const OrgUnitCalendarsRelations = relations(OrgUnitCalendars, ({one}) => ({
	OrgUnit: one(OrgUnits, {
		fields: [OrgUnitCalendars.OrgUnitId],
		references: [OrgUnits.Id]
	}),
}));

export const ProfilePicturesRelations = relations(ProfilePictures, ({one}) => ({
	User: one(Users, {
		fields: [ProfilePictures.UserId],
		references: [Users.Id]
	}),
}));

export const RoleClaimsRelations = relations(RoleClaims, ({one}) => ({
	Role: one(Roles, {
		fields: [RoleClaims.RoleId],
		references: [Roles.Id]
	}),
}));

export const SignaturesRelations = relations(Signatures, ({one}) => ({
	UserPosition: one(UserPositions, {
		fields: [Signatures.UserPositionId],
		references: [UserPositions.Id]
	}),
	User: one(Users, {
		fields: [Signatures.UserId],
		references: [Users.Id]
	}),
}));

export const UserPositionsRelations = relations(UserPositions, ({one, many}) => ({
	Signatures: many(Signatures),
	Position: one(Positions, {
		fields: [UserPositions.PositionId],
		references: [Positions.Id]
	}),
	User: one(Users, {
		fields: [UserPositions.UserId],
		references: [Users.Id]
	}),
}));

export const SyncProfilesRelations = relations(SyncProfiles, ({one}) => ({
	OrgUnit: one(OrgUnits, {
		fields: [SyncProfiles.OrgUnitId],
		references: [OrgUnits.Id]
	}),
	Role: one(Roles, {
		fields: [SyncProfiles.RoleId],
		references: [Roles.Id]
	}),
	User: one(Users, {
		fields: [SyncProfiles.UserId],
		references: [Users.Id]
	}),
}));

export const UserConfigsRelations = relations(UserConfigs, ({one}) => ({
	User: one(Users, {
		fields: [UserConfigs.UserId],
		references: [Users.Id]
	}),
}));

export const UserEmploymentJournalsRelations = relations(UserEmploymentJournals, ({one}) => ({
	Location: one(Locations, {
		fields: [UserEmploymentJournals.LocationId],
		references: [Locations.Id]
	}),
	OrgUnit: one(OrgUnits, {
		fields: [UserEmploymentJournals.OrgUnitId],
		references: [OrgUnits.Id]
	}),
	User_RecordAuthorId: one(Users, {
		fields: [UserEmploymentJournals.RecordAuthorId],
		references: [Users.Id],
		relationName: "UserEmploymentJournals_RecordAuthorId_Users_Id"
	}),
	User_UserId: one(Users, {
		fields: [UserEmploymentJournals.UserId],
		references: [Users.Id],
		relationName: "UserEmploymentJournals_UserId_Users_Id"
	}),
}));

export const PositionsRelations = relations(Positions, ({many}) => ({
	UserPositions: many(UserPositions),
}));

export const UserQualificationsRelations = relations(UserQualifications, ({one}) => ({
	Qualification: one(Qualifications, {
		fields: [UserQualifications.QualificationId],
		references: [Qualifications.Id]
	}),
	User: one(Users, {
		fields: [UserQualifications.UserId],
		references: [Users.Id]
	}),
}));

export const QualificationsRelations = relations(Qualifications, ({many}) => ({
	UserQualifications: many(UserQualifications),
}));

export const UserRolesRelations = relations(UserRoles, ({one}) => ({
	Role: one(Roles, {
		fields: [UserRoles.RoleId],
		references: [Roles.Id]
	}),
	User: one(Users, {
		fields: [UserRoles.UserId],
		references: [Users.Id]
	}),
}));

export const UserWorkTeamsRelations = relations(UserWorkTeams, ({one}) => ({
	User: one(Users, {
		fields: [UserWorkTeams.UserId],
		references: [Users.Id]
	}),
	WorkTeam: one(WorkTeams, {
		fields: [UserWorkTeams.WorkTeamId],
		references: [WorkTeams.Id]
	}),
}));

export const WorkTeamsRelations = relations(WorkTeams, ({many}) => ({
	UserWorkTeams: many(UserWorkTeams),
}));

export const PhoneInfoRelations = relations(PhoneInfo, ({many}) => ({
	Users: many(Users),
}));