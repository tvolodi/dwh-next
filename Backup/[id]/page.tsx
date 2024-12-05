'use client'

import Form from 'next/form';

import { JsonForms, JsonFormsInitStateProps } from '@jsonforms/react';
import { person } from '@jsonforms/examples';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';

import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { useParams, useSearchParams } from 'next/navigation';
import React, { use, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { DwhConfigPageContext } from '../layout__';
import { Badge } from 'primereact/badge';

import { PageMode } from '@/lib/common/enums';

import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { debug } from 'console';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

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

    const router = useRouter();
    const urlSearchParams = useSearchParams();
    const urlParams = useParams();

    let id = 0;

    if(urlParams !== null) {
        id = parseInt(urlParams.id as string);
    }

    // const { data, error, mutate, isValidating, isLoading } = useSWR(`/api/dwh-config/details/`, fetcher);
    // if(isLoading) return <div>Loading...</div>
    // if(error) return <div>Error loading data</div>
    // console.log('Data from SWR: ', data);


    // console.log('URL Params: ', urlParams);

    // Use the parent page context to determine the details mode if it is master-detail page
    const parentPageContext : any = React.useContext(DwhConfigPageContext);

    // console.log('URL Params: ', urlSearchParams);
    // console.log('Parent Page Context: ', parentPageContext);


    function getDetailsMode() {
        if(urlSearchParams) {
            if(urlSearchParams.has('mode')) {
                return urlSearchParams.get('mode');
            }
        }
        return PageMode.VIEW;
    }

    // Get page mode from URL
    let pageMode: string|null = getDetailsMode()

    // console.log('Page Mode: ', pageMode);

    const [detailsMode, setDetailsMode] = React.useState(pageMode);
    const [changedDetailsData, setChangedDetailsData] = React.useState({} as any);
    const [ formIsReadOnly, setFormIsReadOnly ] = React.useState(() => {
        if(pageMode === PageMode.VIEW || pageMode === PageMode.DELETE) {
            return true;
        }
        return false;
    });

    // Determine mode from URL

    useEffect(() => {
        console.log('Page Mode from UseEffect: ', pageMode);
        if(pageMode === PageMode.VIEW || pageMode === PageMode.DELETE) {
            setFormIsReadOnly(true);
        } else {
            setFormIsReadOnly(false);
        }

        if(parentPageContext && parentPageContext.selectedData) {
            console.log('Parent Page Context: ', parentPageContext);
            console.log('Set page data from Parent Page Context: ');
            setChangedDetailsData(parentPageContext.selectedData);

        } else {
            if (id === 0) {
                console.log('Adding new record');
                setChangedDetailsData({
                    "Id": "",
                    "Code": "",
                    "Name": "",
                    "ParamValue": "",
                    "ExtendedValue": "",
                    "Notes": ""
                })
            } else {

                fetch(`/api/dwh-config/details/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log('Data from useEffect 2: ', data);
                        setChangedDetailsData(data);
                    })
            }
        }
    }, [urlSearchParams])

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

    async function handleSave() {
        console.log('Saving Data: ', changedDetailsData);
        let method = 'POST';
        if(pageMode === PageMode.EDIT) {
            method = 'PUT';
        } else if(pageMode === PageMode.DELETE) {
            method = 'DELETE';
        }
        console.log("Details mode from handle save = ", detailsMode);
        console.log('Method from handleSave: ', method);

        const res = await fetch('/workspace/dwh-config/api/', {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changedDetailsData),
        });

        console.log('Response from save: ', res);
        const data = await res.json();

        console.log('Data from save: ', data);

        // Trigger re-fetch
        parentPageContext.setIsNeededUpdate(true);

        // Redirect to updated details page
        router.push(`/workspace/dwh-config/${data.Id}?mode=${PageMode.VIEW}`);
    }

    const schema = formSchema; // person.schema;
    const uischema = formUISchema; // person.uischema;

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
                    <Button icon="pi pi-save" className="p-button-success p-mr-2" onClick={handleSave}/>
                </>
            ) : null
            }
            <Button icon="pi pi-pencil" className="p-button-help p-mr-2" onClick={
                () => {
                    router.push(`/workspace/dwh-config/${id}?mode=${PageMode.EDIT}`);
                }
            }/>
            <Button icon="pi pi-trash" className="p-button-danger p-mr-2" onClick={
                () => {
                    confirmDelete();
                }
            }/>
        </React.Fragment>
    )

    const toast = useRef<Toast>(null);

    const confirmDelete = () => {
        confirmDialog({
            message: 'Are you sure you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            accept: async () => {

                alert('You have accepted');

                pageMode = PageMode.DELETE;
                await handleSave();

                if(toast && toast.current && toast.current.show) {
                    toast.current?.show({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
                }
                router.push(`/workspace/dwh-config/`);


            },
            reject: () => {
                if(toast && toast.current && toast.current.show) {
                    toast.current?.show({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
                }
                alert('You have rejected');
            },
            acceptClassName: 'p-button-danger',
        })
    }

    return (
        <div>
            <Button onClick={() => {
                        parentPageContext.setIsNeededUpdate(true);
                    }}>Refresh</Button>
            <h1><u>DWH Config Details:</u></h1>
            <Toolbar start={toolbarLeft} />
            <Toast ref={toast} />
            <ConfirmDialog />

            {/* <h3>{`${JSON.stringify(detailsData)}`}</h3> */}
            <JsonForms
                schema={schema}
                uischema={uischema}
                data={changedDetailsData}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data, errors }) => {
                    console.log('Data: ', data, 'Errors: ', errors);
                    setChangedDetailsData(data);
                }}
                readonly={formIsReadOnly}
            />
        </div>
    );
}