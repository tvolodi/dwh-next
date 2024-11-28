'use client';

import { PrismaClient } from "@prisma/client";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, createContext } from "react";

import useSWR from "swr";

export const DwhConfigPageContext = createContext({});

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json());

const prisma = new PrismaClient();

function Layout({ children }: Readonly<{ children: React.ReactNode }>, params: any) {

    const urlParams = useSearchParams();
    console.log("Layout URL Params: ", urlParams);

    console.log("Params: ", params);
    if(params == undefined) {
        params = { param1: 0 }
    }

    const router = useRouter();
    
    const [selectedData, setSelectedData] = React.useState<any>(null);
    const [ detailsMode, setDetailsMode ] = React.useState("view");

    const { data, error, isLoading } = useSWR("/workspace/dwh-config/api/", fetcher);
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error loading data</div>

    const toolbarLeft = (
        <React.Fragment>
            <Button icon="pi pi-plus" className="p-button-success p-mr-2" onClick={
                () => {
                    console.log("Add clicked");
                    router.push("/workspace/dwh-config/0?mode=add");
                    setDetailsMode("add");
                }
            } />
            <Button icon="pi pi-pencil" className="p-button-help p-mr-2" />
            <Button icon="pi pi-trash" className="p-button-danger p-mr-2" />
            <Button icon="pi pi-refresh" className="p-button-info p-mr-2" />
            <Button icon="pi pi-search" className="p-button-warning p-mr-2" />
        </React.Fragment>
    )

    const testDataTableData = [
        {
            id: 1,
            name: "John Doe",
        },
        {
            id: 2,
            name: "Jane Doe",
        }
    ]


    return (
        <>            
            <Splitter style={{ height: "800px" }}>
                <SplitterPanel className="flex" size={35} minSize={6} style={{ overflow: 'auto' }}>
                <div className="card">
                    <Toolbar start={toolbarLeft}></Toolbar>
                    <DataTable
                        selectionMode={"single"}
                        value={data}
                        selection={selectedData}
                        onSelectionChange={(e) => {
                            console.log("Selected Data: ", e.value)
                            if (e.value !== null && e.value !== undefined) {
                                setSelectedData(e.value)

                                router.push(`/workspace/dwh-config/${e.value.id}`);

                            }

                        }}
                        dataKey="id"
                    >
                        <Column field="id" header="ID"></Column>
                        <Column field="code" header="Code"></Column>
                        <Column field="name" header="Name"></Column>
                        <Column field="paramValue" header="Param Value"></Column>
                        <Column field="ExtendedValue" header="Extended Value"></Column>
                        <Column field="notes" header="Notes"></Column>
                    </DataTable>
                    <Button
                        label="Details"
                        icon="pi pi-info"
                        className="p-button-info p-mr-2"
                        onClick={() => {
                            redirect("/workspace/dwh-config/1?search=aaa&param1=1")
                        }}
                    />
                    </div>
                </SplitterPanel>
                <SplitterPanel className="flex" size={10} minSize={6} style={{ overflow: 'auto' }}>
                    <DwhConfigPageContext.Provider value={{ 
                        data: { selectedData, setSelectedData}, 
                        detailsMode: { detailsMode: detailsMode, setDetailsMode: setDetailsMode }
                    }}
                    >
                        <Card>
                            {children}
                        </Card>
                    </DwhConfigPageContext.Provider>
                </SplitterPanel>
            </Splitter>
        </>
    )
}

export default Layout;