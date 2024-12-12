export const schema = {
    "Id": {
        "type": "number",            
        "label": "ID",        
    },
    "Code": {
        "type": "string",
        "label": "Code"
    },
    "Name": {
        "type": "string",
        "label": "Name"
    },
    "Module": {
        "type": "string",
        "ref": "meta.Module",
        "label": "Module",
        "columnAsValue": "Name"
    },
    "Notes": {
        "type": "string",
        "label": "Notes"
    }
}