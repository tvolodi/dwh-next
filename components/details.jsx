'use client';

import React, { use, useEffect } from "react";
import { JsonForms, JsonFormsInitStateProps } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';

export function Details({ data }) {

    var suppressHydrationWarning = true

    const savedData = data;

    console.log('Saved Data: ', savedData);

    const [changedData, setChangedData] = React.useState(savedData);

    useEffect(() => {
        setChangedData(savedData);
    }, [savedData]);

    const formSchema = {
        "type": "object",
        "properties": {
            "Id": {
                "type": ["integer", "string"]
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

    const formUISchema = {
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
                "scope": "#/properties/ParamValue"
            },
            {
                "type": "Control",
                "scope": "#/properties/ExtendedValue",
            },
            {
                "type": "Control",
                "scope": "#/properties/Notes"
            }
        ]
    }


    return (
        <>
            <JsonForms suppressHydrationWarning={true}
                schema={formSchema}
                uischema={formUISchema}
                data={changedData}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data, errors }) => {
                    console.log('Data: ', data, 'Errors: ', errors);
                    setChangedData(data);
                }}
                // readonly={formIsReadOnly}
            />
            {changedData ? <pre>{JSON.stringify(changedData, null, 2)}</pre> : null}

        </>
    );
}