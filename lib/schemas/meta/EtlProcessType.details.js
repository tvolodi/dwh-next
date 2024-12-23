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
        "Notes": {
            "type": ["string", "null"]
        }

    }
}
