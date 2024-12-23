export const schema = {
    showDetails: true,
    items : {
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
        "EtlProcessType.Name": {
            "type": "string",        
            "label": "Type",
            "ref": "meta_EtlProcessType",
            "sortable": true,
        },
        "ProcessStatus": {
            "type": "string",
            "label": "Status",
            "sortable": true,
        },   
    }
}
