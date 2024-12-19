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
            "scope": "#/properties/Notes"
        }
    ]
}