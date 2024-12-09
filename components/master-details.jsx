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

export function MasterDetails({fullEntityName}) {

    const dbSchemaName = fullEntityName.split(".")[0];
    const entityName = fullEntityName.split(".")[1];

    const [dataGridSchema, setDataGridSchema] = React.useState({})

    const [selectedData, setSelectedData] = React.useState({});
    const [data, setData] = React.useState([]);
    const [ isListUpdateRequired, setIsListUpdateRequired ] = React.useState(true);
    const [ detailsFormMode, setDetailsFormMode ] = React.useState(PageMode.VIEW);

    

    React.useEffect(() => {
        if(isListUpdateRequired) {
            fetch("/workspace/dwh-config/api/")
                .then((res) => res.json())
                .then((data) => {
                    console.log("Data: ", data);
                    setData(data);
                    if(data.length > 0 && Object.keys(selectedData).length === 0) {
                        setSelectedData(data[0]);
                    }
                });
            setIsListUpdateRequired(false);
        }

        if(Object.keys(dataGridSchema).length === 0) {

            import(`../lib/schemas/${dbSchemaName}/${entityName}.list.js`)
            .then((module) => {
                console.log("Module: ", module);
                setDataGridSchema(module.schema);
            })

            // fetch(`http://localhost:3000/api/readSchemaFile?dbschema=${dbSchemaName}&entity=${entityName}&type=list`, {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            // })
            // .then((res) => res.json())
            // .then((data) => {
            //     console.log("Data: ", data);
            //     setDataGridSchema(data.schema);
            // });
        }
            
    }, [isListUpdateRequired, dataGridSchema]);

    const dataGridSchema1 = {
        Id: {
            type: "number",            
            label: "ID",
        },
        Code: {
            type: "string",
            label: "Code",
        },
        Name: {
            type: "string",
            label: "Name",
        },
        ParamValue: {
            type: "string",
            label: "Param Value",
        },
        Notes: {
            type: "string",
            label: "Notes",
        }
    }

    const toolbarLeft = (
        <React.Fragment>
            <Button icon="pi pi-plus" className="p-button-success p-mr-2" onClick={
                () => {
                    console.log("Add clicked");
                    setSelectedData({Id: null, Code: "", Name: "", ParamValue: "", Notes: ""});
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
