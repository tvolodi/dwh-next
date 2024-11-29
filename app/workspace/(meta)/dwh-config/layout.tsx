'use client';

import { PrismaClient } from "@prisma/client";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, createContext, use, useMemo } from "react";

import useSWR from "swr";

export const DwhConfigPageContext = createContext({});

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json());

const prisma = new PrismaClient();

function Layout({ children }: Readonly<{ children: React.ReactNode }>, params: any) {


    const urlParams = useSearchParams();

    if(params == undefined) {
        params = { param1: 0 }
    }

    const router = useRouter();

    const [selectedData, setSelectedData] = React.useState<any>(null);

    useEffect( () => {
        // Set the selected data to the first row in the table
        fetch(`${window.location.origin}/workspace/dwh-config/api/`)
            .then((res) => res.json())
            .then((data) => {            
                if(data !== undefined && data !== null && data.length > 0) {
                    setSelectedData(data[0]);
                    return data[0];
                } else {
                    setSelectedData(null);
                }
            })
    }, []);

    // Load the data from the API using SWR hook (with caching and so on)
    const { data, error, isLoading } = useSWR("/workspace/dwh-config/api/", fetcher);
    
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
                    <DataTable
                        selectionMode={"single"}
                        value={data}
                        selection={selectedData}
                        onSelectionChange={(e) => {
                            if (e.value !== null && e.value !== undefined) {
                                setSelectedData(e.value)                                
                                router.push(`/workspace/dwh-config/${e.value.Id}`);
                            }
                        }}
                        dataKey="Id"
                    >
                        <Column field="Id" header="ID"></Column>
                        <Column field="Code" header="Code"></Column>
                        <Column field="Name" header="Name"></Column>
                        <Column field="ParamValue" header="Param Value"></Column>
                        <Column field="ExtendedValue" header="Extended Value"></Column>
                        <Column field="Notes" header="Notes"></Column>
                    </DataTable>
                </div>
                </SplitterPanel>
                <SplitterPanel className="flex" size={10} minSize={6} style={{ overflow: 'auto' }}>
                    <Card>
                        {children}
                    </Card>
                </SplitterPanel>
            </Splitter>
        </>
    )
}

export default Layout;