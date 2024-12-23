export const schema = {
    "type": "VerticalLayout",
    "elements": [
        {
            "type": "Control",
            "scope": "#/properties/Id",
            "options": {
                "readOnly": true
            }
        },
        {
            "type": "Control",
            "scope": "#/properties/Code"
        },
        {
            "type": "Control",
            "scope": "#/properties/Name"
        },
        {
            "type": "Control",
            "scope": "#/properties/EtlProcessTypeId",
            "label": "Process Type",
        },
        {
            "type": "Control",
            "scope": "#/properties/EtlProcessScript"
        },
        {
            "type": "Control",
            "scope": "#/properties/ProcedureName"
        },
        {
            "type": "Control",
            "scope": "#/properties/ProcedureParams"
        },
        {
            "type": "Control",
            "scope": "#/properties/CronSchedule"
        },
        {
            "type": "Control",
            "scope": "#/properties/TransformationOptions"
        },
        {
            "type": "Control",
            "scope": "#/properties/ProcessStatus"
        }
    ]
}
