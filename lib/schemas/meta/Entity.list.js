export const schema = {
    "Id": {
        "type": "number",            
        "label": "ID",
        "sortable": true,      
    },
    "Code": {
        "type": "string",
        "label": "Code",
        "sortable": true,
    },
    "Name": {
        "type": "string",
        "label": "Name",
        "sortable": true,
    },
    "Module.Name": {
        "type": "string",        
        "label": "Module",
        "ref": "meta_Module",
        "sortable": true,
    },
    "Notes": {
        "type": "string",
        "label": "Notes",
        "sortable": true,
    }
}