import { on } from "events";
import { title } from "process";

export const schema = {
    "type": "object",
    "properties": {
        "Id": {
            "type": ["integer", "string", "null"]
        },
        "Code": {
            "type": "string"
        },
        "Name": {
            "type": "string"
        },
        "EtlProcessTypeId":{
            "type": "integer",
            "ref": "meta_EtlProcessType",
            "oneOf": [{
                const: null,
                title: "Select Process Type"
            }
            ]            
        },
        "EtlProcessScript": {
            "type": "string"
        },
        "ProcedureName": {
            "type": "string"
        },
        "ProcedureParams": {
            "type": "string"
        },
        "CronSchedule": {
            "type": "string"
        },
        "TransformationOptions": {
            "type": "string"
        },
        "ProcessStatus": {
            "type": "string",
            refEnum: "EtlProcessConfigStatus",
            oneOf: [{
                const: null,
                title: "Select Process Status"
            }]
        },
    }
}
