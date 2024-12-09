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
        "ParamValue": {
            "type": "string"
        },
        "ExtendedValue": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "code": {
                        "type": "string"
                    },
                    "value": {
                        "type": "string"
                    }
                }
            }
        },
        "Notes": {
            "type": "string"
        }

    }
}
