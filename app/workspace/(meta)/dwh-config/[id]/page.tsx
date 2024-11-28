'use client'

import Form from 'next/form';

import { JsonForms, JsonFormsInitStateProps } from '@jsonforms/react';
import { person } from '@jsonforms/examples';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';

import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { DwhConfigPageContext } from '../layout';
import { Badge } from 'primereact/badge';

import { PageMode } from '@/lib/common/enums';

import { useRouter } from 'next/navigation';

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json());

export default function Page({
    params,
} : {
    params: {
        id: string;
        name: string;
    }
})
 {

    // Id       Int   Id       Int    @id @default(autoincrement())
    // Code    String @unique
    // Name    String?
    // ParamValue String?
    // ExtendedValue Json?
    // Notes   String?

    const router = useRouter();

    const urlParams = useSearchParams();

    // Use the parent page context to determine the details mode if it is master-detail page
    const parentPageContext : any = React.useContext(DwhConfigPageContext);

    console.log('URL Params: ', urlParams);
    console.log('Parent Page Context: ', parentPageContext);

    // Get page mode from URL
    let pageMode: string|null = PageMode.VIEW;
    if (urlParams !== null) {
        if (urlParams.has('mode')) {
            pageMode = urlParams.get('mode');
            // if(parentPageContext !== null && parentPageContext !== undefined) {
            //     parentPageContext.detailsMode.setDetailsMode(mode);
            // }
            // console.log('Mode: ', mode);
        }
    }

    console.log('Page Mode: ', pageMode);

    const [detailsMode, setDetailsMode] = React.useState(pageMode);

    // Determine mode from URL

    const formSchema = {
        type: "object",
        "properties": {
            "id": {
                "type": "integer"
            },
            "code": {
                "type": "string"
            },
            "name": {
                "type": "string"
            },
            "paramValue": {
                "type": "string"
            },
            "extendedValue": {
                "type": "object",
                "properties": {
                    "key": {
                        "type": "string"
                    },
                    "value": {
                        "type": "string"
                    }
                }
            },
            "notes": {
                "type": "string"
            }

        }
    }

    const formUISchema = {
        "type": "VerticalLayout",
        "elements": [
            {
                "type": "Control",
                "scope": "#/properties/id"
            },
            {
                "type": "Control",
                "scope": "#/properties/code"
            },
            {
                "type": "Control",
                "scope": "#/properties/name"
            },
            {
                "type": "Control",
                "scope": "#/properties/paramValue"
            },
            {
                "type": "Control",
                "scope": "#/properties/extendedValue"
            },
            {
                "type": "Control",
                "scope": "#/properties/notes"
            }
        ]
    }

    const formData = {
        "id": 1,
        "code": "code 1",
        "name": "name 1",
        "paramValue": "param1 Value",
        "extendedValue": "extended Value 1",
        "notes": "notes 1"
    }

    const schema = formSchema; // person.schema;
    const uischema = formUISchema; // person.uischema;
    const data = formData; //  person.data;

    // console.log('Schema: ', schema);
    // console.log('UISchema: ', uischema);
    // console.log('Data: ', data);

    const toolbarLeft = (
        <React.Fragment>            
            {(pageMode == PageMode.ADD || 
                pageMode == PageMode.EDIT)
             ? (
                <>
                    
                    <Badge
                        value="Editing"
                        severity="info"
                        className="p-mr-2"/>
                    <Button icon="pi pi-save" className="p-button-success p-mr-2" onClick={
                        () => {
                            fetch('/workspace/dwh-config/api/', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(formData),
                            }
                            )
                            // if (parentPageContext !== null && parentPageContext !== undefined)
                            //     console.log('Saving Data: ', data);
                            //     parentPageContext.detailsMode.setDetailsMode({ detailsMode: PageMode.VIEW });
                            router.push(`/workspace/dwh-config/0?mode=${PageMode.VIEW}`);
                        }
                    }/>
                </>
            ) : null
            }
            <Button icon="pi pi-pencil" className="p-button-help p-mr-2" onClick={
                () => {
                    router.push(`/workspace/dwh-config/0?mode=${PageMode.EDIT}`);
                }
            }/>
            <Button icon="pi pi-trash" className="p-button-danger p-mr-2" />
        </React.Fragment>
    )

    return (
        <div>
            <h1><u>DWH Config Details:</u></h1>
            <Toolbar start={toolbarLeft} />

            <JsonForms
                schema={schema}
                uischema={uischema}
                data={data}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data, errors }) => console.log('Data: ', data, 'Errors: ', errors)}
            />                
        </div>
    );
}