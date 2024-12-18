-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `ActionLogConfig` (
	`Id` binary(16) NOT NULL,
	`EntityType` varchar(255),
	`ActionType` varchar(255),
	`Enabled` tinyint(1) NOT NULL,
	CONSTRAINT `ActionLogConfig_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `IX_ActionLogConfig_EntityType_ActionType` UNIQUE(`EntityType`,`ActionType`)
);
--> statement-breakpoint
CREATE TABLE `ActionLogs` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`ModuleName` longtext NOT NULL,
	`UserId` int,
	`EntityId` longtext,
	`ActionTime` datetime(6) NOT NULL,
	`ActionType` longtext NOT NULL,
	`Details` longtext,
	`EntityType` longtext,
	CONSTRAINT `ActionLogs_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `ColumnChangesLogs` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`TableName` varchar(255) NOT NULL,
	`RowGuid` binary(16) NOT NULL,
	`ColumnName` varchar(255) NOT NULL,
	`LastChangedOn` datetime(6) NOT NULL,
	CONSTRAINT `ColumnChangesLogs_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `IX_ColumnChangesLogs_RowGuid_TableName_ColumnName` UNIQUE(`RowGuid`,`TableName`,`ColumnName`)
);
--> statement-breakpoint
CREATE TABLE `Countries` (
	`Id` binary(16) NOT NULL,
	`CodeISO` longtext,
	`CodeDigital` longtext,
	`Name` longtext,
	`IsRemoved` tinyint(1) NOT NULL DEFAULT 0,
	CONSTRAINT `Countries_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `CurrentGeoLocations` (
	`Id` binary(16) NOT NULL,
	`AppType` longtext NOT NULL,
	`EntityType` varchar(255) NOT NULL,
	`EntityGuidId` binary(16),
	`EntityIntId` int,
	`GeoLocationId` int NOT NULL,
	`CreatedById` int,
	`Created` datetime(6),
	`UpdatedById` int,
	`Updated` datetime(6),
	CONSTRAINT `CurrentGeoLocations_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `IX_CurrentGeoLocations_EntityType_EntityGuidId` UNIQUE(`EntityType`,`EntityGuidId`),
	CONSTRAINT `IX_CurrentGeoLocations_EntityType_EntityIntId` UNIQUE(`EntityType`,`EntityIntId`)
);
--> statement-breakpoint
CREATE TABLE `EntityTypes` (
	`Id` varchar(255) NOT NULL,
	`EntityName` longtext,
	`ModuleName` longtext,
	`TableName` longtext,
	CONSTRAINT `EntityTypes_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `ExternalUserRoles` (
	`ExternalUserId` varchar(255) NOT NULL,
	`RoleId` int NOT NULL,
	`RoleId1` int,
	CONSTRAINT `ExternalUserRoles_ExternalUserId_RoleId` PRIMARY KEY(`ExternalUserId`,`RoleId`)
);
--> statement-breakpoint
CREATE TABLE `GeoActionLogs` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`ActionType` longtext NOT NULL,
	`OccuredAt` datetime(6) NOT NULL,
	`UserId` int NOT NULL,
	`ConnectedGeoId` int NOT NULL,
	CONSTRAINT `GeoActionLogs_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `GeoLocations` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`Lat` double NOT NULL,
	`Lng` double NOT NULL,
	`Accuracy` double,
	`RegisteredAt` datetime(6) NOT NULL,
	`AppType` longtext NOT NULL,
	`EntityType` longtext NOT NULL,
	`EntityGuidId` binary(16),
	`EntityIntId` int,
	`CreatedById` int,
	`Created` datetime(6),
	`UpdatedById` int,
	`Updated` datetime(6),
	`GeoEntityType` varchar(15) NOT NULL,
	`DependentEntityId` binary(16),
	`Details` longtext,
	CONSTRAINT `GeoLocations_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `LocationAccesses` (
	`Id` binary(16) NOT NULL,
	`LocationId` int NOT NULL,
	`Discriminator` longtext NOT NULL,
	`GrantedOrgUnitId` int,
	`UserId` int,
	`ExternalUserId` longtext,
	CONSTRAINT `LocationAccesses_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `IX_LocationAccesses_LocationId_GrantedOrgUnitId` UNIQUE(`LocationId`,`GrantedOrgUnitId`),
	CONSTRAINT `IX_LocationAccesses_LocationId_UserId` UNIQUE(`LocationId`,`UserId`)
);
--> statement-breakpoint
CREATE TABLE `LocationAccesses_tracking` (
	`Id` binary(16) NOT NULL,
	`update_scope_id` varchar(36),
	`timestamp` bigint,
	`sync_row_is_tombstone` bit(1) NOT NULL DEFAULT 'b''0''',
	`last_change_datetime` datetime,
	CONSTRAINT `LocationAccesses_tracking_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `LocationInfo` (
	`Id` binary(16) NOT NULL,
	`LocationId` int NOT NULL,
	`ResponsibleUserId` int,
	`XIndex` longtext,
	`YIndex` longtext,
	`ZIndex` longtext,
	`Length` decimal(65,30),
	`Width` decimal(65,30),
	`Height` decimal(65,30),
	`Volume` decimal(65,30),
	`LiftingCapacity` decimal(65,30),
	CONSTRAINT `LocationInfo_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `IX_LocationInfo_LocationId` UNIQUE(`LocationId`)
);
--> statement-breakpoint
CREATE TABLE `LocationInfo_tracking` (
	`Id` binary(16) NOT NULL,
	`update_scope_id` varchar(36),
	`timestamp` bigint,
	`sync_row_is_tombstone` bit(1) NOT NULL DEFAULT 'b''0''',
	`last_change_datetime` datetime,
	CONSTRAINT `LocationInfo_tracking_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `LocationOrgUnit` (
	`LocationsId` int NOT NULL,
	`OrgUnitsId` int NOT NULL,
	CONSTRAINT `LocationOrgUnit_LocationsId_OrgUnitsId` PRIMARY KEY(`LocationsId`,`OrgUnitsId`)
);
--> statement-breakpoint
CREATE TABLE `LocationTypes` (
	`Id` varchar(255) NOT NULL,
	`Name` longtext,
	`IsSystem` tinyint(1) NOT NULL,
	`CreatedById` int,
	`Created` datetime(6),
	`UpdatedById` int,
	`Updated` datetime(6),
	CONSTRAINT `LocationTypes_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `LocationTypes_tracking` (
	`Id` varchar(255) NOT NULL,
	`update_scope_id` varchar(36),
	`timestamp` bigint,
	`sync_row_is_tombstone` bit(1) NOT NULL DEFAULT 'b''0''',
	`last_change_datetime` datetime,
	CONSTRAINT `LocationTypes_tracking_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `Locations` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`Description` longtext NOT NULL,
	`ParentId` int,
	`HierarchyLevel` int NOT NULL,
	`OrgUnitId` int,
	`CenterPointLat` double,
	`CenterPointLong` double,
	`Radius` double,
	`CodeFromExtAcctSys` longtext,
	`Created` datetime(6),
	`CreatedById` int,
	`Updated` datetime(6),
	`UpdatedById` int,
	`LocationTypeId` varchar(255),
	`Enabled` tinyint(1) NOT NULL DEFAULT 1,
	`IsTracking` tinyint(1) NOT NULL DEFAULT 0,
	CONSTRAINT `Locations_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `Locations_tracking` (
	`Id` int NOT NULL,
	`update_scope_id` varchar(36),
	`timestamp` bigint,
	`sync_row_is_tombstone` bit(1) NOT NULL DEFAULT 'b''0''',
	`last_change_datetime` datetime,
	CONSTRAINT `Locations_tracking_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `OrgUnitAccesses` (
	`Id` binary(16) NOT NULL,
	`OrgUnitId` int NOT NULL,
	`UserId` int,
	`IsPrimaryOrgUnit` tinyint(1),
	`HasChildrenAccess` tinyint(1) NOT NULL,
	`Discriminator` longtext NOT NULL,
	`GrantedOrgUnitId` int,
	`ExternalUserId` longtext,
	CONSTRAINT `OrgUnitAccesses_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `IX_OrgUnitAccesses_OrgUnitId_GrantedOrgUnitId` UNIQUE(`OrgUnitId`,`GrantedOrgUnitId`),
	CONSTRAINT `IX_OrgUnitAccesses_OrgUnitId_UserId` UNIQUE(`OrgUnitId`,`UserId`)
);
--> statement-breakpoint
CREATE TABLE `OrgUnitAccesses_tracking` (
	`Id` binary(16) NOT NULL,
	`update_scope_id` varchar(36),
	`timestamp` bigint,
	`sync_row_is_tombstone` bit(1) NOT NULL DEFAULT 'b''0''',
	`last_change_datetime` datetime,
	CONSTRAINT `OrgUnitAccesses_tracking_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `OrgUnitCalendars` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`OrgUnitId` int NOT NULL,
	`CalDate` datetime(6) NOT NULL,
	`IsWorking` tinyint(1) NOT NULL,
	`Description` longtext,
	`EndTime` time(6),
	`LunchBreakEnd` time(6),
	`LunchBreakStart` time(6),
	`SecondBreakEnd` time(6),
	`SecondBreakStart` time(6),
	`StartTime` time(6),
	CONSTRAINT `OrgUnitCalendars_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `IX_OrgUnitCalendars_OrgUnitId_CalDate` UNIQUE(`OrgUnitId`,`CalDate`)
);
--> statement-breakpoint
CREATE TABLE `OrgUnits` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`Description` longtext NOT NULL,
	`ParentId` int,
	`CodeFromExtAcctSys` longtext,
	`HierarchyLevel` int NOT NULL,
	`Created` datetime(6),
	`CreatedById` int,
	`Updated` datetime(6),
	`UpdatedById` int,
	`Prefix` varchar(2),
	`BIN` varchar(200),
	`CostCenter` longtext,
	`Enabled` tinyint(1) NOT NULL DEFAULT 1,
	`ExternalId` binary(16),
	`Code` longtext,
	`Group` longtext,
	`KBE` longtext,
	`PersonType` longtext,
	`StartDate` datetime(6),
	CONSTRAINT `OrgUnits_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `IX_OrgUnits_BIN` UNIQUE(`BIN`)
);
--> statement-breakpoint
CREATE TABLE `OrgUnits_tracking` (
	`Id` int NOT NULL,
	`update_scope_id` varchar(36),
	`timestamp` bigint,
	`sync_row_is_tombstone` bit(1) NOT NULL DEFAULT 'b''0''',
	`last_change_datetime` datetime,
	CONSTRAINT `OrgUnits_tracking_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `PhoneInfo` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`Vendor` varchar(20) NOT NULL,
	`Model` varchar(20) NOT NULL,
	`IMEI` char(15),
	CONSTRAINT `PhoneInfo_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `IX_PhoneInfo_IMEI` UNIQUE(`IMEI`)
);
--> statement-breakpoint
CREATE TABLE `Positions` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`Code` longtext,
	`Name` longtext,
	`Created` datetime(6),
	`CreatedById` int,
	`Updated` datetime(6),
	`UpdatedById` int,
	`CodeFromExtAcctSys` varchar(255),
	`CostCenter` longtext,
	CONSTRAINT `Positions_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `IX_Positions_CodeFromExtAcctSys` UNIQUE(`CodeFromExtAcctSys`)
);
--> statement-breakpoint
CREATE TABLE `Positions_tracking` (
	`Id` int NOT NULL,
	`update_scope_id` varchar(36),
	`timestamp` bigint,
	`sync_row_is_tombstone` bit(1) NOT NULL DEFAULT 'b''0''',
	`last_change_datetime` datetime,
	CONSTRAINT `Positions_tracking_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `ProfilePictures` (
	`Id` binary(16) NOT NULL,
	`MimeType` longtext,
	`FilePath` longtext,
	`OriginalFileName` longtext,
	`UserId` int NOT NULL,
	CONSTRAINT `ProfilePictures_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `ProvisionInfoTable` (
	`Id` varchar(256) NOT NULL,
	`MigrationId` text,
	`SyncConfiguration` text,
	`SyncConfigurationId` text,
	CONSTRAINT `ProvisionInfoTable_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `Qualifications` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`Code` varchar(255),
	`Name` varchar(256) NOT NULL,
	`Level` int,
	`CodeFromExtAcctSys` longtext,
	`ExternalId` binary(16),
	CONSTRAINT `Qualifications_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `IX_Qualifications_Code_Level` UNIQUE(`Code`,`Level`)
);
--> statement-breakpoint
CREATE TABLE `RoleClaims` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`RoleId` int NOT NULL,
	`ClaimType` longtext,
	`ClaimValue` longtext,
	CONSTRAINT `RoleClaims_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `RoleClaims_tracking` (
	`Id` int NOT NULL,
	`update_scope_id` varchar(36),
	`timestamp` bigint,
	`sync_row_is_tombstone` bit(1) NOT NULL DEFAULT 'b''0''',
	`last_change_datetime` datetime,
	CONSTRAINT `RoleClaims_tracking_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `Roles` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`Name` varchar(255),
	`Created` datetime(6),
	`CreatedById` int,
	`Updated` datetime(6),
	`UpdatedById` int,
	CONSTRAINT `Roles_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `IX_Roles_Name` UNIQUE(`Name`)
);
--> statement-breakpoint
CREATE TABLE `Roles_tracking` (
	`Id` int NOT NULL,
	`update_scope_id` varchar(36),
	`timestamp` bigint,
	`sync_row_is_tombstone` bit(1) NOT NULL DEFAULT 'b''0''',
	`last_change_datetime` datetime,
	CONSTRAINT `Roles_tracking_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `Signatures` (
	`Id` binary(16) NOT NULL,
	`DocRole` longtext,
	`UserPositionId` binary(16) NOT NULL,
	`UserId` int NOT NULL,
	`IsAccepted` tinyint(1) NOT NULL,
	`IsRemoved` tinyint(1) NOT NULL,
	CONSTRAINT `Signatures_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `SyncProfiles` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`UserId` int,
	`RoleId` int,
	`OrgUnitId` int,
	`SyncFilterQuery` longtext,
	CONSTRAINT `SyncProfiles_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `SystemConfig` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`Category` varchar(255),
	`Code` varchar(255),
	`Value` longtext,
	`IsRemoved` tinyint(1) NOT NULL,
	CONSTRAINT `SystemConfig_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `IX_SystemConfig_Code_Category` UNIQUE(`Code`,`Category`)
);
--> statement-breakpoint
CREATE TABLE `SystemLogs` (
	`Id` binary(16) NOT NULL,
	`Module` longtext,
	`Service` longtext,
	`EntityId` longtext,
	`EntityType` longtext,
	`Message` longtext,
	`Date` datetime(6) NOT NULL,
	CONSTRAINT `SystemLogs_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `TempUserCodes` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`ExternalUserId` longtext,
	`Email` longtext,
	`Code` varchar(255),
	`SentTime` datetime(6) NOT NULL,
	`CreatedById` int,
	`Created` datetime(6),
	`UpdatedById` int,
	`Updated` datetime(6),
	CONSTRAINT `TempUserCodes_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `IX_TempUserCodes_Code` UNIQUE(`Code`)
);
--> statement-breakpoint
CREATE TABLE `UserConfigs` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`Type` varchar(255),
	`UserId` int NOT NULL,
	`Config` longtext,
	`IsGlobal` tinyint(1) NOT NULL DEFAULT 0,
	`Updated` datetime(6) NOT NULL DEFAULT '0001-01-01 00:00:00.000000',
	CONSTRAINT `UserConfigs_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `IX_UserConfigs_Type_UserId` UNIQUE(`Type`,`UserId`)
);
--> statement-breakpoint
CREATE TABLE `UserEmploymentJournals` (
	`Id` binary(16) NOT NULL,
	`UserId` int NOT NULL,
	`OrgUnitId` int,
	`LocationId` int,
	`OrderDocumentId` binary(16),
	`TaskId` binary(16),
	`PeriodBegin` datetime(6),
	`PeriodEnd` datetime(6),
	`Description` longtext,
	`RecordAuthorId` int NOT NULL,
	CONSTRAINT `UserEmploymentJournals_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `UserPositions` (
	`Id` binary(16) NOT NULL,
	`PositionId` int NOT NULL,
	`UserId` int NOT NULL,
	CONSTRAINT `UserPositions_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `IX_UserPositions_UserId_PositionId` UNIQUE(`UserId`,`PositionId`)
);
--> statement-breakpoint
CREATE TABLE `UserPositions_tracking` (
	`Id` binary(16) NOT NULL,
	`update_scope_id` varchar(36),
	`timestamp` bigint,
	`sync_row_is_tombstone` bit(1) NOT NULL DEFAULT 'b''0''',
	`last_change_datetime` datetime,
	CONSTRAINT `UserPositions_tracking_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `UserQualifications` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`UserId` int NOT NULL,
	`QualificationId` int NOT NULL,
	CONSTRAINT `UserQualifications_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `IX_UserQualifications_UserId_QualificationId` UNIQUE(`UserId`,`QualificationId`)
);
--> statement-breakpoint
CREATE TABLE `UserRoles` (
	`UserId` int NOT NULL,
	`RoleId` int NOT NULL,
	CONSTRAINT `UserRoles_UserId_RoleId` PRIMARY KEY(`UserId`,`RoleId`)
);
--> statement-breakpoint
CREATE TABLE `UserRoles_tracking` (
	`UserId` int NOT NULL,
	`RoleId` int NOT NULL,
	`update_scope_id` varchar(36),
	`timestamp` bigint,
	`sync_row_is_tombstone` bit(1) NOT NULL DEFAULT 'b''0''',
	`last_change_datetime` datetime,
	CONSTRAINT `UserRoles_tracking_UserId_RoleId` PRIMARY KEY(`UserId`,`RoleId`)
);
--> statement-breakpoint
CREATE TABLE `UserWorkTeams` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`UserId` int NOT NULL,
	`WorkTeamId` int NOT NULL,
	CONSTRAINT `UserWorkTeams_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`ExternalUserId` varchar(255),
	`FullName` varchar(256) NOT NULL,
	`PersonnelNumber` varchar(256),
	`Birthdate` datetime(6) NOT NULL,
	`IIN` char(12),
	`PhoneNumber` longtext,
	`PhoneInfoId` int,
	`LocationId` int,
	`CurrentUiOrgUnitId` int,
	`CurrentUiLocationId` int,
	`ExternalUserEnabled` tinyint(1) NOT NULL DEFAULT 0,
	`Created` datetime(6),
	`CreatedById` int,
	`Updated` datetime(6),
	`UpdatedById` int,
	`CodeFromExtAcctSys` varchar(255),
	`Enabled` tinyint(1) NOT NULL DEFAULT 1,
	`FavoritesJson` json,
	`ExternalId` binary(16),
	CONSTRAINT `Users_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `IX_Users_CodeFromExtAcctSys` UNIQUE(`CodeFromExtAcctSys`),
	CONSTRAINT `IX_Users_ExternalId` UNIQUE(`ExternalId`),
	CONSTRAINT `IX_Users_ExternalUserId` UNIQUE(`ExternalUserId`),
	CONSTRAINT `IX_Users_PersonnelNumber` UNIQUE(`PersonnelNumber`),
	CONSTRAINT `IX_Users_PhoneInfoId` UNIQUE(`PhoneInfoId`)
);
--> statement-breakpoint
CREATE TABLE `Users_tracking` (
	`Id` int NOT NULL,
	`update_scope_id` varchar(36),
	`timestamp` bigint,
	`sync_row_is_tombstone` bit(1) NOT NULL DEFAULT 'b''0''',
	`last_change_datetime` datetime,
	CONSTRAINT `Users_tracking_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `WorkTeams` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`Name` varchar(256) NOT NULL,
	`Code` varchar(256) NOT NULL,
	`HoursPerDay` int NOT NULL DEFAULT 0,
	CONSTRAINT `WorkTeams_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `__EFMigrationsHistory` (
	`MigrationId` varchar(95) NOT NULL,
	`ProductVersion` varchar(32) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `__EFMigrationsHistoryOld` (
	`MigrationId` varchar(95) NOT NULL,
	`ProductVersion` varchar(32) NOT NULL,
	CONSTRAINT `__EFMigrationsHistoryOld_MigrationId` PRIMARY KEY(`MigrationId`)
);
--> statement-breakpoint
CREATE TABLE `scope_info_history` (
	`sync_scope_id` varchar(36) NOT NULL,
	`sync_scope_name` varchar(100) NOT NULL,
	`scope_last_sync_timestamp` bigint,
	`scope_last_sync_duration` bigint,
	`scope_last_sync` datetime,
	CONSTRAINT `scope_info_history_sync_scope_id` PRIMARY KEY(`sync_scope_id`)
);
--> statement-breakpoint
CREATE TABLE `scope_info_server` (
	`sync_scope_name` varchar(100) NOT NULL,
	`sync_scope_schema` longtext,
	`sync_scope_setup` longtext,
	`sync_scope_version` varchar(10),
	`sync_scope_last_clean_timestamp` bigint,
	CONSTRAINT `scope_info_server_sync_scope_name` PRIMARY KEY(`sync_scope_name`)
);
--> statement-breakpoint
CREATE TABLE `sys_FileMigrations` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`FileName` longtext NOT NULL,
	`FileModificationDT` datetime,
	`MigrationDT` datetime,
	CONSTRAINT `sys_FileMigrations_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `idx_FileMigrations_FileName` UNIQUE(`FileName`)
);
--> statement-breakpoint
ALTER TABLE `ActionLogs` ADD CONSTRAINT `FK_ActionLogs_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `CurrentGeoLocations` ADD CONSTRAINT `FK_CurrentGeoLocations_GeoLocations_GeoLocationId` FOREIGN KEY (`GeoLocationId`) REFERENCES `GeoLocations`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ExternalUserRoles` ADD CONSTRAINT `FK_ExternalUserRoles_Roles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `Roles`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ExternalUserRoles` ADD CONSTRAINT `FK_ExternalUserRoles_Roles_RoleId1` FOREIGN KEY (`RoleId1`) REFERENCES `Roles`(`Id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `GeoActionLogs` ADD CONSTRAINT `FK_GeoActionLogs_GeoLocations_ConnectedGeoId` FOREIGN KEY (`ConnectedGeoId`) REFERENCES `GeoLocations`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `GeoActionLogs` ADD CONSTRAINT `FK_GeoActionLogs_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `LocationAccesses` ADD CONSTRAINT `FK_LocationAccesses_Locations_LocationId` FOREIGN KEY (`LocationId`) REFERENCES `Locations`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `LocationAccesses` ADD CONSTRAINT `FK_LocationAccesses_OrgUnits_GrantedOrgUnitId` FOREIGN KEY (`GrantedOrgUnitId`) REFERENCES `OrgUnits`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `LocationAccesses` ADD CONSTRAINT `FK_LocationAccesses_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `LocationInfo` ADD CONSTRAINT `FK_LocationInfo_Locations_LocationId` FOREIGN KEY (`LocationId`) REFERENCES `Locations`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `LocationInfo` ADD CONSTRAINT `FK_LocationInfo_Users_ResponsibleUserId` FOREIGN KEY (`ResponsibleUserId`) REFERENCES `Users`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `LocationOrgUnit` ADD CONSTRAINT `FK_LocationOrgUnit_Locations_LocationsId` FOREIGN KEY (`LocationsId`) REFERENCES `Locations`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `LocationOrgUnit` ADD CONSTRAINT `FK_LocationOrgUnit_OrgUnits_OrgUnitsId` FOREIGN KEY (`OrgUnitsId`) REFERENCES `OrgUnits`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Locations` ADD CONSTRAINT `FK_Locations_Locations_ParentId` FOREIGN KEY (`ParentId`) REFERENCES `Locations`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Locations` ADD CONSTRAINT `FK_Locations_LocationTypes_LocationTypeId` FOREIGN KEY (`LocationTypeId`) REFERENCES `LocationTypes`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Locations` ADD CONSTRAINT `FK_Locations_OrgUnits_OrgUnitId` FOREIGN KEY (`OrgUnitId`) REFERENCES `OrgUnits`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `OrgUnitAccesses` ADD CONSTRAINT `FK_OrgUnitAccesses_OrgUnits_GrantedOrgUnitId` FOREIGN KEY (`GrantedOrgUnitId`) REFERENCES `OrgUnits`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `OrgUnitAccesses` ADD CONSTRAINT `FK_OrgUnitAccesses_OrgUnits_OrgUnitId` FOREIGN KEY (`OrgUnitId`) REFERENCES `OrgUnits`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `OrgUnitAccesses` ADD CONSTRAINT `FK_OrgUnitAccesses_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `OrgUnitCalendars` ADD CONSTRAINT `FK_OrgUnitCalendars_OrgUnits_OrgUnitId` FOREIGN KEY (`OrgUnitId`) REFERENCES `OrgUnits`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `OrgUnits` ADD CONSTRAINT `FK_OrgUnits_OrgUnits_ParentId` FOREIGN KEY (`ParentId`) REFERENCES `OrgUnits`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ProfilePictures` ADD CONSTRAINT `FK_ProfilePictures_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `RoleClaims` ADD CONSTRAINT `FK_RoleClaims_Roles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `Roles`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Signatures` ADD CONSTRAINT `FK_Signatures_UserPositions_UserPositionId` FOREIGN KEY (`UserPositionId`) REFERENCES `UserPositions`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Signatures` ADD CONSTRAINT `FK_Signatures_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `SyncProfiles` ADD CONSTRAINT `FK_SyncProfiles_OrgUnits_OrgUnitId` FOREIGN KEY (`OrgUnitId`) REFERENCES `OrgUnits`(`Id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `SyncProfiles` ADD CONSTRAINT `FK_SyncProfiles_Roles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `Roles`(`Id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `SyncProfiles` ADD CONSTRAINT `FK_SyncProfiles_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserConfigs` ADD CONSTRAINT `FK_UserConfigs_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserEmploymentJournals` ADD CONSTRAINT `FK_UserEmploymentJournals_Locations_LocationId` FOREIGN KEY (`LocationId`) REFERENCES `Locations`(`Id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserEmploymentJournals` ADD CONSTRAINT `FK_UserEmploymentJournals_OrgUnits_OrgUnitId` FOREIGN KEY (`OrgUnitId`) REFERENCES `OrgUnits`(`Id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserEmploymentJournals` ADD CONSTRAINT `FK_UserEmploymentJournals_Users_RecordAuthorId` FOREIGN KEY (`RecordAuthorId`) REFERENCES `Users`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserEmploymentJournals` ADD CONSTRAINT `FK_UserEmploymentJournals_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserPositions` ADD CONSTRAINT `FK_UserPositions_Positions_PositionId` FOREIGN KEY (`PositionId`) REFERENCES `Positions`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserPositions` ADD CONSTRAINT `FK_UserPositions_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserQualifications` ADD CONSTRAINT `FK_UserQualifications_Qualifications_QualificationId` FOREIGN KEY (`QualificationId`) REFERENCES `Qualifications`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserQualifications` ADD CONSTRAINT `FK_UserQualifications_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserRoles` ADD CONSTRAINT `FK_UserRoles_Roles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `Roles`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserRoles` ADD CONSTRAINT `FK_UserRoles_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserWorkTeams` ADD CONSTRAINT `FK_UserWorkTeams_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserWorkTeams` ADD CONSTRAINT `FK_UserWorkTeams_WorkTeams_WorkTeamId` FOREIGN KEY (`WorkTeamId`) REFERENCES `WorkTeams`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Users` ADD CONSTRAINT `FK_Users_Locations_LocationId` FOREIGN KEY (`LocationId`) REFERENCES `Locations`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Users` ADD CONSTRAINT `FK_Users_OrgUnits_CurrentUiOrgUnitId` FOREIGN KEY (`CurrentUiOrgUnitId`) REFERENCES `OrgUnits`(`Id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Users` ADD CONSTRAINT `FK_Users_PhoneInfo_PhoneInfoId` FOREIGN KEY (`PhoneInfoId`) REFERENCES `PhoneInfo`(`Id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `IX_ActionLogs_UserId` ON `ActionLogs` (`UserId`);--> statement-breakpoint
CREATE INDEX `IX_CurrentGeoLocations_GeoLocationId` ON `CurrentGeoLocations` (`GeoLocationId`);--> statement-breakpoint
CREATE INDEX `IX_ExternalUserRoles_RoleId` ON `ExternalUserRoles` (`RoleId`);--> statement-breakpoint
CREATE INDEX `IX_ExternalUserRoles_RoleId1` ON `ExternalUserRoles` (`RoleId1`);--> statement-breakpoint
CREATE INDEX `IX_GeoActionLogs_ConnectedGeoId` ON `GeoActionLogs` (`ConnectedGeoId`);--> statement-breakpoint
CREATE INDEX `IX_GeoActionLogs_UserId` ON `GeoActionLogs` (`UserId`);--> statement-breakpoint
CREATE INDEX `IX_LocationAccesses_GrantedOrgUnitId` ON `LocationAccesses` (`GrantedOrgUnitId`);--> statement-breakpoint
CREATE INDEX `IX_LocationAccesses_LocationId` ON `LocationAccesses` (`LocationId`);--> statement-breakpoint
CREATE INDEX `IX_LocationAccesses_UserId` ON `LocationAccesses` (`UserId`);--> statement-breakpoint
CREATE INDEX `IX_LocationInfo_ResponsibleUserId` ON `LocationInfo` (`ResponsibleUserId`);--> statement-breakpoint
CREATE INDEX `IX_LocationOrgUnit_OrgUnitsId` ON `LocationOrgUnit` (`OrgUnitsId`);--> statement-breakpoint
CREATE INDEX `IX_Locations_LocationTypeId` ON `Locations` (`LocationTypeId`);--> statement-breakpoint
CREATE INDEX `IX_Locations_OrgUnitId` ON `Locations` (`OrgUnitId`);--> statement-breakpoint
CREATE INDEX `IX_Locations_ParentId` ON `Locations` (`ParentId`);--> statement-breakpoint
CREATE INDEX `IX_OrgUnitAccesses_GrantedOrgUnitId` ON `OrgUnitAccesses` (`GrantedOrgUnitId`);--> statement-breakpoint
CREATE INDEX `IX_OrgUnitAccesses_OrgUnitId` ON `OrgUnitAccesses` (`OrgUnitId`);--> statement-breakpoint
CREATE INDEX `IX_OrgUnitAccesses_UserId` ON `OrgUnitAccesses` (`UserId`);--> statement-breakpoint
CREATE INDEX `IX_OrgUnits_ParentId` ON `OrgUnits` (`ParentId`);--> statement-breakpoint
CREATE INDEX `IX_ProfilePictures_UserId` ON `ProfilePictures` (`UserId`);--> statement-breakpoint
CREATE INDEX `IX_RoleClaims_RoleId` ON `RoleClaims` (`RoleId`);--> statement-breakpoint
CREATE INDEX `IX_Signatures_UserId_UserPositionId` ON `Signatures` (`UserId`,`UserPositionId`);--> statement-breakpoint
CREATE INDEX `IX_Signatures_UserPositionId` ON `Signatures` (`UserPositionId`);--> statement-breakpoint
CREATE INDEX `IX_SyncProfiles_OrgUnitId` ON `SyncProfiles` (`OrgUnitId`);--> statement-breakpoint
CREATE INDEX `IX_SyncProfiles_RoleId` ON `SyncProfiles` (`RoleId`);--> statement-breakpoint
CREATE INDEX `IX_SyncProfiles_UserId` ON `SyncProfiles` (`UserId`);--> statement-breakpoint
CREATE INDEX `IX_UserConfigs_UserId` ON `UserConfigs` (`UserId`);--> statement-breakpoint
CREATE INDEX `IX_UserEmploymentJournals_LocationId` ON `UserEmploymentJournals` (`LocationId`);--> statement-breakpoint
CREATE INDEX `IX_UserEmploymentJournals_OrgUnitId` ON `UserEmploymentJournals` (`OrgUnitId`);--> statement-breakpoint
CREATE INDEX `IX_UserEmploymentJournals_RecordAuthorId` ON `UserEmploymentJournals` (`RecordAuthorId`);--> statement-breakpoint
CREATE INDEX `IX_UserEmploymentJournals_UserId` ON `UserEmploymentJournals` (`UserId`);--> statement-breakpoint
CREATE INDEX `IX_UserPositions_PositionId` ON `UserPositions` (`PositionId`);--> statement-breakpoint
CREATE INDEX `IX_UserQualifications_QualificationId` ON `UserQualifications` (`QualificationId`);--> statement-breakpoint
CREATE INDEX `IX_UserRoles_RoleId` ON `UserRoles` (`RoleId`);--> statement-breakpoint
CREATE INDEX `IX_UserWorkTeams_UserId` ON `UserWorkTeams` (`UserId`);--> statement-breakpoint
CREATE INDEX `IX_UserWorkTeams_WorkTeamId` ON `UserWorkTeams` (`WorkTeamId`);--> statement-breakpoint
CREATE INDEX `IIN` ON `Users` (`IIN`);--> statement-breakpoint
CREATE INDEX `IX_Users_CurrentUiOrgUnitId` ON `Users` (`CurrentUiOrgUnitId`);--> statement-breakpoint
CREATE INDEX `IX_Users_LocationId` ON `Users` (`LocationId`);--> statement-breakpoint
CREATE ALGORITHM = undefined
SQL SECURITY definer
VIEW `EqRepairJournalView` AS (select `a`.`Name` AS `AssetName`,`ac`.`Description` AS `AssetClassDescription`,`at`.`Name` AS `AssetTypeName` from (((`infrastructure`.`EqRepairJournal` `st` left join `inventory`.`Assets` `a` on((`st`.`AssetId` = `a`.`Id`))) left join `inventory`.`AssetClasses` `ac` on((`st`.`AssetClassId` = `ac`.`Id`))) left join `inventory`.`AssetTypes` `at` on((`st`.`AssetTypeId` = `at`.`Id`))));--> statement-breakpoint
CREATE ALGORITHM = undefined
SQL SECURITY definer
VIEW `UserEmploymentJournalView` AS (select `dn`.`DocNumber` AS `OrderDocumentDocNumber`,`ac`.`Description` AS `TaskDescription`,`ms`.`Id` AS `Id`,`ms`.`UserId` AS `UserId`,`ms`.`OrgUnitId` AS `OrgUnitId`,`ms`.`LocationId` AS `LocationId`,`ms`.`OrderDocumentId` AS `OrderDocumentId`,`ms`.`TaskId` AS `TaskId`,`ms`.`PeriodBegin` AS `PeriodBegin`,`ms`.`PeriodEnd` AS `PeriodEnd`,`ms`.`Description` AS `Description`,`ms`.`RecordAuthorId` AS `RecordAuthorId` from ((`hr`.`UserEmploymentJournals` `ms` left join `docworkflow`.`OrderDocuments` `dn` on((`ms`.`OrderDocumentId` = `dn`.`Id`))) left join `infrastructure`.`Tasks` `ac` on((`ms`.`TaskId` = `ac`.`Id`))));
*/