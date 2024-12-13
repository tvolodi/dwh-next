'use client';

import type { UISchemaElement } from "@jsonforms/core";

import React, { use, useEffect, useRef } from "react";
import { JsonForms, JsonFormsInitStateProps } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Badge } from "primereact/badge";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { PageMode } from "../lib/common/enums";

// Details component
// @param {object} data - data to be displayed
// @param {string} fullEntityName - full entity name including schema name: meta.DwhConfig

export function Details({
     data, 
     setData, 
     fullEntityName, 
     pageModeParam, 
     setIsListUpdateRequired, 
     setDetailsFormMode
    } : Readonly<{
        data: any, 
        setData: any, 
        fullEntityName: 
        string, pageModeParam: string, 
        setIsListUpdateRequired: any, 
        setDetailsFormMode: any
    }>) {
    
    var suppressHydrationWarning = true

    const savedData = data;

    console.log('Details. Data come  from list: ', data);
    console.log('fullEntityName: ', fullEntityName);
    console.log('pageModeParam: ', pageModeParam);

    const [ formData, setFormData] = React.useState(data);
    
    // Load schema for data description for the form
    const [ formDataSchema, setFormDataSchema ] = React.useState({})

    // Load schema for UI description for the form
    const [ formUiSchema, setFormUiSchema ] = React.useState<UISchemaElement>({ type: '' })

    const [ pageMode, setPageMode ] = React.useState(pageModeParam);
    const [ isFormReadOnly, setIsFormReadOnly ] = React.useState(() => {
        if(pageMode === PageMode.VIEW || pageMode === PageMode.DELETE) {
            return true;
        } else {
            return false;
        }
    });    

    const setFormMode = (pageMode: string) => {
        setPageMode(pageMode);
        if(pageMode === PageMode.VIEW || pageMode === PageMode.DELETE) {
            setIsFormReadOnly(true);
        } else {
            setIsFormReadOnly(false);
        }
    }

    useEffect(() => {
        const loadSchemas = async () => {
            setFormMode(pageModeParam);

            setFormData(data);        

            // Load schema for data description for the form
            console.log('Details. useEffect. formDataSchema: ', formDataSchema);
            // if(formDataSchema == null || Object.keys(formDataSchema).length === 0) {

            const dbSchemaName = fullEntityName?.split("_")[0];
            const entityName = fullEntityName?.split("_")[1];
            const dataSchemaModule = await import(`../lib/schemas/${dbSchemaName}/${entityName}.details.js`);
            console.log("dataSchemaModule: ", dataSchemaModule);
            const uiSchemaModule = await import(`../lib/schemas/${dbSchemaName}/${entityName}.detailsUi.js`);
            console.log("uiSchemaModule: ", uiSchemaModule);
            
            const dataSchema = dataSchemaModule.schema;
            // Load option items for select fields
            const dataProperties = dataSchema.properties;
            for(const key in dataProperties) {
                if(dataProperties[key].hasOwnProperty('ref') && dataProperties[key].ref !== '') {
                    const refEntityFullName = dataProperties[key].ref;
                    const refData = await fetch(`/api/getEntityItems?fullEntityName=${refEntityFullName}`);
                    const refDataJson = await refData.json();
                    const optionItems = [];
                    for(let i = 0; i < refDataJson.length; i++) {
                        const optionItem = {
                            const: refDataJson[i].Id,
                            title: refDataJson[i].Name
                        }
                        optionItems.push(optionItem);
                    }
                    dataProperties[key].oneOf = optionItems;
                }
            }

            const uiSchema = uiSchemaModule.schema;
            
            setFormDataSchema(dataSchema);
            setFormUiSchema(uiSchema);

        };

        loadSchemas();
    
    }, [pageModeParam, data, fullEntityName]);

    const toolbarLeft = (
        <React.Fragment>
            {(pageMode == PageMode.ADD ||
                pageMode == PageMode.EDIT)
             ? (
                <>
                    <Badge
                        value={pageMode}
                        severity="info"
                        className="p-mr-2"/>
                    <Button icon="pi pi-save" className="p-button-success p-mr-2" onClick={
                        (e) => handleSave('')}/>
                </>
            ) : null
            }
            <Button icon="pi pi-pencil" className="p-button-help p-mr-2" onClick={
                () => {
                    setFormMode(PageMode.EDIT);
                }
                // () => {
                //     router.push(`/workspace/dwh-config/${id}?mode=${PageMode.EDIT}`);
                // }
            }/>
            <Button icon="pi pi-trash" className="p-button-danger p-mr-2" onClick={
                () => {
                    confirmDelete();
                }
            }/>
        </React.Fragment>
    )

    async function handleSave(operationModePar: string) {

        console.log("operationModePar from handleSave: ", operationModePar);

        let operationMode = pageMode;
        if(operationModePar !== '') {
            operationMode = operationModePar;
        }
        
        console.log('Saving Data: ', formData);
        let dataToUpdate: { [key: string]: any } = {};
        let method = '';

        console.log('operationMode from handleSave: ', operationMode);

        if(operationMode === PageMode.ADD) {
            method = 'POST';
            dataToUpdate = formData;
        } else
        if(operationMode === PageMode.EDIT) {
            method = 'PUT';
            for(const key in formData) {
                if(formData[key] !== savedData[key]) {
                    dataToUpdate[key] = formData[key];
                }
            }
            dataToUpdate.Id = formData.Id;
        } else if(operationMode === PageMode.DELETE) {
            method = 'DELETE';
            dataToUpdate.Id = formData.Id;
        }
        // console.log("Details mode from handle save = ", detailsMode);
        console.log('Method from handleSave: ', method);
        console.log('Data to update from handleSave: ', dataToUpdate);
        console.log('Saved data from handleSave: ', savedData);

        const messageBody = JSON.stringify(dataToUpdate);
        
        console.log('Message body from handleSave: ', messageBody);

        const res = await fetch(`/api/processEntityItem?fullEntityName=${fullEntityName}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: messageBody,
        });

        console.log('Response from save: ', res);
        let resData = await res.json();

        console.log('Data from save: ', resData);
        if(operationMode === PageMode.DELETE) {
            resData = {};
        }

        setFormData(resData);
        setData(resData);
        setIsListUpdateRequired(true);
        setPageMode(PageMode.VIEW);
        setDetailsFormMode(PageMode.VIEW);


        // Trigger re-fetch
        // parentPageContext.setIsNeededUpdate(true);

        // Redirect to updated details page
        // router.push(`/workspace/dwh-config/${data.Id}?mode=${PageMode.VIEW}`);
    }

    const toast = useRef<Toast>(null);

    const confirmDelete = () => {
        
        setPageMode(PageMode.DELETE);
        
        console.log('PageMode from confirmDelete: ', pageMode);

        confirmDialog({
            message: 'Are you sure you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            accept: async () => {

                // alert('You have accepted');

                console.log('PageMode from confirmDelete 2: ', pageMode);

                const result = await handleSave(PageMode.DELETE);

                console.log('Result from confirmDelete: ', result);

                if(toast && toast.current && toast.current.show) {
                    toast.current?.show({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
                }
                // router.push(`/workspace/dwh-config/`);


            },
            reject: () => {
                if(toast && toast.current && toast.current.show) {
                    toast.current?.show({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
                }
                // alert('You have rejected');
            },
            acceptClassName: 'p-button-danger',
        })
    }


    return (
        <>
            <Toolbar start={toolbarLeft} />
            <Toast ref={toast} />
            <ConfirmDialog />
            <JsonForms
                schema={formDataSchema}
                uischema={formUiSchema}
                data={formData}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data, errors }) => {
                    console.log('Data: ', data, 'Errors: ', errors);
                    setFormData(data);
                }}
                readonly={isFormReadOnly}
            />
            {formData ? <pre>{`Data: ${JSON.stringify(formData, null, 2)}`}</pre> : null}
            <pre>`=======================================`</pre>
            {formDataSchema ? <pre>{`Data schema: ${JSON.stringify(formDataSchema, null, 2)}`}</pre> : null }

        </>
    );
}