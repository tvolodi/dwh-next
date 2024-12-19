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
import { InputText } from "primereact/inputtext";


/// MasterDetails component
/// @param {string} fullEntityName - full entity name including schema name: meta.DwhConfig

export function MasterDetails({fullEntityName}) {

    console.log("MasterDetails fullEntityName: ", fullEntityName);

    if(fullEntityName === undefined || fullEntityName === null || fullEntityName === "") {
        return;
    }



    const dbSchemaName = fullEntityName?.split("_")[0];
    const entityName = fullEntityName?.split("_")[1];

    const [dataGridSchema, setDataGridSchema] = React.useState({
        showDetails: false,
        items: {}
    })


    const [selectedData, setSelectedData] = React.useState({});
    const [ multiSortMeta, setMultiSortMeta ] = React.useState(null);
    const [ sortField, setSortField ] = React.useState(null);
    const [ sortOrder, setSortOrder ] = React.useState(1);
    const [data, setData] = React.useState([]);
    const [ isListUpdateRequired, setIsListUpdateRequired ] = React.useState(true);
    const [ detailsFormMode, setDetailsFormMode ] = React.useState(PageMode.VIEW);

    const [ globalStringFilter, setGlobalStringFilter ] = React.useState("");



    React.useEffect(() => {
        
        console.log("MasterDetails useEffect. dataGridSchema", dataGridSchema);

        const loadData = async () => {

            // get dataSchema for the form if it is not loaded yet
            // It can be set during user data table setup, so we must not rewrite it
            let listSchema = dataGridSchema;

            try {
                console.log(`Try to load schema for ${dbSchemaName}/${entityName}.list.js`);
                const listSchemaModule = await import(`../lib/schemas/${dbSchemaName}/${entityName}.list.js`)
                listSchema = listSchemaModule.schema;
                console.log("listSchema: ", listSchema);
                setDataGridSchema(listSchema);
            } catch (error) {
                // Do nothing. Schema is already == {}
            }

            // Define which columns to get from DB
            const columns = Object.keys(listSchema).map((key) => key).join(", ");

            // Define which foreign data to get from DB
            const reqBody = { 
                include: [],
                filter: {                    
                }
            };

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
            reqBody.include = include;

            if(globalStringFilter !== "") {
                reqBody.filter.globalSearchString = globalStringFilter;
            }

            console.log(`fullEntityName before fetch: `, fullEntityName);
            try{
                const result = await fetch(`/api/getEntityItems?fullEntityName=${fullEntityName}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(reqBody),
                });
                const data = await result.json();

                console.log("DataTable Data: ", data);
                setData(data)
                if (data.length > 0 && Object.keys(selectedData).length === 0) {
                    // Set position on the first row
                    setSelectedData(data[0]);
                } else {
                    // Clear old data
                    setSelectedData({});
                }
                setIsListUpdateRequired(false);
            } catch (error) {
                console.log("Error fetching data table data: ", error);
                setData([]);
                setSelectedData({});
            }

        }
        loadData();
            
    }, [isListUpdateRequired, fullEntityName]);

    // return (
    //     <div>
    //         <h1>MasterDetails</h1>
    //     </div>
    // )

    const onGlobalStringFilterChange = (e) => {
        setGlobalStringFilter(e.target.value);
    }

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
            <InputText placeholder="Search" onChange={onGlobalStringFilterChange} />
            <Button icon="pi pi-search" className="p-button-info p-mr-2" onClick={() => {
                console.log("Search clicked");
                setIsListUpdateRequired(true);
            }}/>
        </React.Fragment>
    )

    console.log("dataGridSchema before rendering: ", dataGridSchema);

    if(dataGridSchema === undefined || dataGridSchema === null || Object.keys(dataGridSchema).length === 0) {
        return <div>Loading...</div>
    }
    //  else {
    //     return (
    //         <>
    //             {/* <pre>JSON.stringify({dataGridSchema})</pre> */}
    //             <div>Under construction</div>
    //         </>
            
    //     )
    // }

    function DetailsPanel() {
        console.log("dataGridSchema.showDetails: ", dataGridSchema.showDetails);
        if(dataGridSchema.showDetails === true) {
            return(
                
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
            )}
            else {
                return null;
            }
    }

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
                          selection={selectedData}
                          value={data}                          
                          paginator
                          rows={10}
                          rowsPerPageOptions={[10, 15, 30, 50]}
                          multiSortMeta={multiSortMeta}
                          sortMode="multiple"
                          sortField={sortField}
                          onSort={(e) => {
                                console.log("Sort event: ", e);
                                setMultiSortMeta(e.multiSortMeta);
                                // setSortField(e.sortField);
                                // setSortOrder(e.sortOrder);
                            }}
                          sortOrder={sortOrder}
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
                        { Object.keys(dataGridSchema.items).map((key, i) => {
                            const colParamValues = dataGridSchema.items[key];
                            return (
                                <Column 
                                    field={key} 
                                    header={colParamValues.label}
                                    sortable={colParamValues.sortable === true}
                                    key={i}
                                ></Column>
                            )
                        })}
                      </DataTable>
                  </div>
              </SplitterPanel>
              <SplitterPanel className="flex" size={10} minSize={6} style={{ overflow: 'auto' }} hidden={dataGridSchema.showDetails === false}>
                { (dataGridSchema.showDetails === true) ? 
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
                 : null }
              </SplitterPanel>
              {/* {dataGridSchema.showDetails ?
                <SplitterPanel className="flex" size={10} minSize={6} style={{ overflow: 'auto' }}>


                </SplitterPanel>
                : null
            } */}
          </Splitter>
    </div>
  );
}
