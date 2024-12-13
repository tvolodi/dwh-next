'use client';

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import { Splitter, SplitterPanel } from "primereact/splitter";
import { Toolbar } from "primereact/toolbar";
import React from "react";
import { Details } from "./details";
import { PageMode } from "@/lib/common/enums";


/// MasterDetails component
/// @param {string} fullEntityName - full entity name including schema name: meta.DwhConfig

export function MasterDetails({fullEntityName}: Readonly<{fullEntityName: string}>) {

    console.log("MasterDetails: ", fullEntityName);

    if(fullEntityName === undefined || fullEntityName === null || fullEntityName === "") {
        return;
    }

    const dbSchemaName = fullEntityName?.split("_")[0];
    const entityName = fullEntityName?.split("_")[1];

    const [dataGridSchema, setDataGridSchema] = React.useState<{ [key: string]: { type: string, label: string, ref: string } }>({})

    const [selectedData, setSelectedData] = React.useState({});
    const [data, setData] = React.useState([]);
    const [ isListUpdateRequired, setIsListUpdateRequired ] = React.useState(true);
    const [ detailsFormMode, setDetailsFormMode ] = React.useState(PageMode.VIEW);

    

    React.useEffect(() => {
        
        const loadData = async () => {

            // get dataSchema for the form if it is not loaded yet
            // It can be set during user data table setup, so we must not rewrite it
            let listSchema = dataGridSchema;
            if(Object.keys(listSchema).length === 0) {

                try {
                    const listSchemaModule = await import(`../lib/schemas/${dbSchemaName}/${entityName}.list.js`)
                    listSchema = listSchemaModule.schema;
                    console.log("listSchema: ", listSchema);
                    setDataGridSchema(listSchema);
                } catch (error) {
                    // Do nothing. Schema is already == {}
                }
            }

            // Define which columns to get from DB
            const columns = Object.keys(listSchema).map((key) => key).join(", ");

            // Define which foreign data to get from DB
            const include = [];
            for(const key in listSchema) {

                console.log("key: ", key);

                const colParamValues = listSchema[key];

                console.log("value: ", colParamValues);

                if(colParamValues.hasOwnProperty('ref')){
                    console.log("ref: ", colParamValues.ref);

                    const ref = colParamValues.ref;
                    include.push(ref);
                    const refColumns = Object.keys(ref).map((key) => key).join(", ");                    
                }
            }
            const reqBody = {
                include: include,
            }
            const result = await fetch(`/api/getEntityItems?fullEntityName=${fullEntityName}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(reqBody),
                });
            const data = await result.json();
            setData(data)
            if (data.length > 0 && Object.keys(selectedData).length === 0) {
                // Set position on the first row
                setSelectedData(data[0]);
            } else {
                // Clear old data
                setSelectedData({});
            }
            setIsListUpdateRequired(false);
        }
        loadData();
            
    }, [isListUpdateRequired, fullEntityName]);

    const toolbarLeft = (
        <React.Fragment>
            <h1><u>{fullEntityName}</u></h1>
            <Button icon="pi pi-plus" className="p-button-success p-mr-2" onClick={
                () => {
                    console.log("Add clicked");
                    setSelectedData({});
                    setDetailsFormMode(PageMode.ADD);

                }
            } />
            <Button icon="pi pi-pencil" className="p-button-help p-mr-2" />
            <Button icon="pi pi-trash" className="p-button-danger p-mr-2" />
            <Button icon="pi pi-refresh" className="p-button-info p-mr-2" />
            <Button icon="pi pi-search" className="p-button-warning p-mr-2" />
        </React.Fragment>
    )

  return (
    <div>
          <Splitter style={{ height: "800px", width: "1200px" }}>
              <SplitterPanel className="flex" size={45} minSize={10} style={{ overflow: 'auto' }}>
                  <div className="card">
                      <Toolbar start={toolbarLeft}></Toolbar>
                      <Button onClick={() => {                          
                            }}>Refresh</Button>
                      <DataTable  
                          selectionMode={"single"}
                          value={data}
                          selection={selectedData}
                          paginator
                          rows={10}
                          rowsPerPageOptions={[10, 15, 30, 50]}
                          onSelectionChange={(e) => {
                              if (e.value !== null && e.value !== undefined) {
                                  console.log("Selected Data 1: ", e.value);
                                  setSelectedData(e.value)
                              } else {
                                  console.log("Selected Data 2: ", e.value, e);
                                  console.log("Selected Data 3: ", selectedData);
                              }
                          }}
                          onRowSelect={(e) => {
                              console.log("Row Selected: ", e);
                          }}
                          dataKey="Id"
                      >
                        { Object.keys(dataGridSchema).map((key, i) => {
                            const colParamValues = dataGridSchema[key];
                            return (
                                <Column 
                                    field={key} 
                                    header={colParamValues.label} 
                                    key={i}
                                ></Column>
                            )
                        })}
                      </DataTable>
                  </div>
              </SplitterPanel>
              <SplitterPanel className="flex" size={10} minSize={6} style={{ overflow: 'auto' }}>

                    <Card>
                        <Details 
                            data={selectedData} 
                            setData={setSelectedData}
                            setIsListUpdateRequired={setIsListUpdateRequired}
                            fullEntityName={fullEntityName} 
                            pageModeParam={detailsFormMode} 
                            setDetailsFormMode={setDetailsFormMode}
                            />
                  </Card>

              </SplitterPanel>
          </Splitter>
    </div>
  );
}
