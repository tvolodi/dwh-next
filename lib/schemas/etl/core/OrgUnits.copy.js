/// allTargetFields: true - try to fill all target fields
/// attributes: [
///     targetField={ 
///         source: "sourceField", 
///         },
/// ] - list of attributes to copy. If allTargetFields is true, this list alternates default processing of fields
export const schema = {
    sourceDB: "mysql",
    sourceSchema: "hr",
    sourceEntity: "OrgUnits",
    targetDB: "pg",
    targetSchema: "core",
    targetEntity: "core_OrgUnit",
    allTargetFields: true,
    attributes: [],
}
