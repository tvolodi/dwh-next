'use client'

import Form from 'next/form';

import { JsonForms, JsonFormsInitStateProps } from '@jsonforms/react';
import { person } from '@jsonforms/examples';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';

import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { DwhConfigPageContext } from '../layout';
import { Badge } from 'primereact/badge';

import { PageMode } from '@/lib/common/enums';

import { useRouter } from 'next/navigation';
import useSWR from 'swr';

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
    const urlSearchParams = useSearchParams();
    const urlParams = useParams();
    
    let id = 0;

    if(urlParams !== null) {
        id = parseInt(urlParams.id as string);
    }
    
    console.log('URL Params: ', urlParams);
    

    // Use the parent page context to determine the details mode if it is master-detail page
    const parentPageContext : any = React.useContext(DwhConfigPageContext);

    console.log('URL Params: ', urlSearchParams);
    console.log('Parent Page Context: ', parentPageContext);

    // Get page mode from URL
    let pageMode: string|null = PageMode.VIEW;
    if (urlSearchParams !== null) {
        if (urlSearchParams.has('mode')) {
            pageMode = urlSearchParams.get('mode');
            // if(parentPageContext !== null && parentPageContext !== undefined) {
            //     parentPageContext.detailsMode.setDetailsMode(mode);
            // }
            // console.log('Mode: ', mode);
        }
    }

    console.log('Page Mode: ', pageMode);

    const [detailsMode, setDetailsMode] = React.useState(pageMode);

    // Determine mode from URL

    let detailsData = {};
    if(id === 0) {
        console.log('Adding new record');
        detailsData = {
            "Id": "",
            "Code": "",
            "Name": "",
            "ParamValue": "",
            "ExtendedValue": "",
            "Notes": ""
        }
    } else {
        const { data, error, isLoading } = useSWR(`/api/dwh-config/details/${id}`, fetcher);
        if(isLoading) return <div>Loading...</div>
        if(error) return <div>Error loading data</div>
        detailsData = data;
        console.log('Details Data: ', data);
    }

    const formSchema = {
        type: "object",
        "properties": {
            "Id": {
                "type": "integer"
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
                "scope": "#/properties/Id"
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
                "scope": "#/properties/ExtendedValue"
            },
            {
                "type": "Control",
                "scope": "#/properties/Notes"
            }
        ]
    }

    // const formData = {
    //     "Id": detailsMode === PageMode.ADD ? 0 : 1,
    //     "Code": "code 1",
    //     "Name": "name 1",
    //     "ParamValue": "param1 Value",
    //     "ExtendedValue": "extended Value 1",
    //     "Notes": "notes 1"
    // }

    const schema = formSchema; // person.schema;
    const uischema = formUISchema; // person.uischema;
    // const data = formData; //  person.data;

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
                            console.log('Saving Data: ', detailsData);
                            let method = 'POST';
                            if(detailsMode === PageMode.EDIT) {
                                method = 'PUT';
                            } else if(detailsMode === PageMode.DELETE) {
                                method = 'DELETE';
                            }
                            fetch('/workspace/dwh-config/api/', {
                                method: method,
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(detailsData),
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
                data={detailsData}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data, errors }) => console.log('Data: ', data, 'Errors: ', errors)}
            />                
        </div>
    );
}