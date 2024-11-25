'use client';

import { redirect } from "next/navigation";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Toolbar } from "primereact/toolbar";
import React from "react";



function Layout({ children }: Readonly<{ children: React.ReactNode }>) {

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
            <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" />
            <Button label="Update" icon="pi pi-pencil" className="p-button-help p-mr-2" />
            <Button label="Delete" icon="pi pi-trash" className="p-button-danger p-mr-2" />
            <Button label="Refresh" icon="pi pi-refresh" className="p-button-info p-mr-2" />
            <Button label="Search" icon="pi pi-search" className="p-button-warning p-mr-2" />
        </React.Fragment>
    )


    return (
        <>
            <div className="card">
                <Toolbar start={toolbarLeft}></Toolbar>
                <DataTable value={[]}></DataTable>
                <Button 
                    label="Details" 
                    icon="pi pi-info" 
                    className="p-button-info p-mr-2" 
                    onClick={() => {
                        redirect("/workspace/dwh-settings/1")
                    }}
                    />
            </div>
            {children}
        </>
    )
}

export default Layout;