'use client';

import { PrismaClient } from "@prisma/client";
import { redirect, useRouter, useSearchParams, useParams } from "next/navigation";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, createContext, use, useMemo } from "react";
// import { useHistory } from 'react-router-dom'
import useSWR from "swr";

export const DwhConfigPageContext = createContext({});

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json());

const prisma = new PrismaClient();

function Layout({ children }: Readonly<{ children: React.ReactNode }>, params: any) {


    const urlSearchParams = useSearchParams();

    if(params == undefined) {
        params = { param1: 0 }
    }

    let id = "";
    const urlParams = useParams();
    if(urlParams !== null) {
        id = urlParams.id as string;
    }

    const router = useRouter();

    const parentPageContext : any = React.useContext(DwhConfigPageContext);

    const test = ():any=>{
      window.focus()
    }
    const [selectedData, setSelectedData] = React.useState<any>(null);
    const [ isNeededUpdate, setIsNeededUpdate ] = React.useState<boolean>(false);
    const [ objectId, setObjectId ] = React.useState<string>(id);
    
    const { data, error, isLoading, mutate } = useSWR("/workspace/dwh-config/api/", fetcher);

    useEffect(() => {

        if (isNeededUpdate) {
          mutate(); // Trigger a refetch
          setIsNeededUpdate(false); // Reset the update flag
        }
      }, [isNeededUpdate, 
        mutate
    ]);

    
    // Load the data from the API using SWR hook (with caching and so on)
    
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error loading data</div>

    const toolbarLeft = (
        <React.Fragment>
            <Button icon="pi pi-plus" className="p-button-success p-mr-2" onClick={
                () => {
                    console.log("Add clicked");
                    router.push("/workspace/dwh-config/0?mode=add");
                }
            } />
            <Button icon="pi pi-pencil" className="p-button-help p-mr-2" />
            <Button icon="pi pi-trash" className="p-button-danger p-mr-2" />
            <Button icon="pi pi-refresh" className="p-button-info p-mr-2" />
            <Button icon="pi pi-search" className="p-button-warning p-mr-2" />
        </React.Fragment>
    )

    return (
        <>            
            <Splitter style={{ height: "800px" }}>
                <SplitterPanel className="flex" size={35} minSize={6} style={{ overflow: 'auto' }}>
                <div className="card">
                    <Toolbar start={toolbarLeft}></Toolbar>
                    {JSON.stringify(isNeededUpdate)}
                    <Button onClick={() => {
                        setIsNeededUpdate(true);
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
                                router.push(`/workspace/dwh-config/${e.value.Id}`);
                            } else {
                                console.log("Selected Data 2: ", e.value, e);
                                console.log("Selected Data 3: ", selectedData);
                                router.push(`/workspace/dwh-config/${selectedData.Id}`);
                            }
                        }}
                        onRowSelect={(e) => {
                            console.log("Row Selected: ", e);
                        }}                        
                        dataKey="Id"
                    >
                        <Column field="Id" header="ID"></Column>
                        <Column field="Code" header="Code"></Column>
                        <Column field="Name" header="Name"></Column>
                        <Column field="ParamValue" header="Param Value"></Column>
                        {/* <Column field="ExtendedValue" header="Extended Value"></Column> */}
                        <Column field="Notes" header="Notes"></Column>
                    </DataTable>
                </div>
                </SplitterPanel>
                <SplitterPanel className="flex" size={10} minSize={6} style={{ overflow: 'auto' }}>
                <DwhConfigPageContext.Provider value={{ selectedData, setSelectedData, isNeededUpdate, setIsNeededUpdate, objectId, setObjectId, test }}>                        <Card>
                            {children}
                        </Card>
                    </DwhConfigPageContext.Provider>
                </SplitterPanel>
            </Splitter>
        </>
    )
}

export default Layout;