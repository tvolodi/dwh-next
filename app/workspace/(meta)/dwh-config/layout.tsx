'use client';

import { PrismaClient } from "@prisma/client";
import { redirect, useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect } from "react";

import useSWR from "swr";

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json());

const prisma = new PrismaClient();

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {

    const router = useRouter();
    
    const [selectedData, setSelectedData] = React.useState<any>(null);

    const { data, error, isLoading } = useSWR("/workspace/dwh-config/api/", fetcher);
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error loading data</div>

    const toolBarItems = [
        {
            label: "Add",
            icon: "pi pi-plus",
            command: () => {
                console.log("Add clicked");
            }
        },
        {
            label: "Update",
            icon: "pi pi-pencil",
            command: () => {
                console.log("Update clicked");
            }            
        },
        {
            label: "Delete",
            icon: "pi pi-trash",
            command: () => {
                console.log("Delete clicked");
            }            
        },
        {
            label: "Refresh",
            icon: "pi pi-refresh",
            command: () => {
                console.log("Refresh clicked");
            }
        },
        {
            label: "Search",
            icon: "pi pi-search",
            command: () => {
                console.log("Search clicked");
            }
        }
    ]

    const toolbarLeft = (
        <React.Fragment>
            <Button icon="pi pi-plus" className="p-button-success p-mr-2" />
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
                            redirect("/workspace/dwh-config/1")
                        }}
                    />
                    </div>
                </SplitterPanel>
                <SplitterPanel className="flex" size={10} minSize={6} style={{ overflow: 'auto' }}>
                    <Card title="Details">
                        {children}
                    </Card>
                </SplitterPanel>
            </Splitter>
        </>
    )
}

export default Layout;