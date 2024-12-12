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
        "ModuleId":{
            "type": "integer",
            "ref": "meta.Module",
            "oneOf": [{
                const: null,
                title: "Select Module"
            }
            ]            
        },
        "Notes": {
            "type": "string"
        }

    }
}
