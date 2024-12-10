'use client'
import { createContext, use, useEffect, useState } from "react";
import { PrimeReactProvider } from 'primereact/api';
import AppMenuBar from "@/components/app-menu-bar";
import App from "next/app";
import AppSidebar from "@/components/app-sidebar";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { PanelMenu } from "primereact/panelmenu";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { comma } from "postcss/lib/list";
import { url } from "inspector";
import { Menu } from "primereact/menu";
import { useRouter,  } from "next/navigation";
import React from "react";

type TUiContext = {
    workspaceState: {isAppSidebarVisible: boolean},
    setWorkspaceState: ({}: {isAppSidebarVisible: boolean}) => void;
};

export const UiContext = createContext<TUiContext | undefined>(undefined);

const menuPanelKey = "menuPanelKey";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const [workspaceState, setWorkspaceState] = useState({isAppSidebarVisible: true});

    const router = useRouter();

    // Sidebar menu items. Inserting from code generator
    // #insert-file: ../lib/schemas/gui/sidebar_menu.ts

    const items = [
        {
            label: "Meta",
            icon: "pi pi-fw pi-hammer",
            items: [
                {
                    label: "DWH Config",
                    icon: "pi pi-fw pi-cog",
                    command: () => {
                        router.push("/workspace/dwh-config");
                    }
                    // url: "/workspace/dwh-settings"

                },
                {
                    label: "ETL Settings",
                    icon: "pi pi-fw pi-cog",
                    command: () => {
                        router.push("/workspace/etl-settings");
                    }
                },
                {
                    label: "ETL Jobs",
                    icon: "pi pi-fw pi-list-check",
                },
                {
                    label: "ETL Processing Journal",
                    icon: "pi pi-fw pi-list",
                },
                {
                    label: "Last Extracted Records",
                    icon: "pi pi-fw pi-list",
                }
            ]
        },
        {
            label: "Home",
            icon: "pi pi-fw pi-home",
            command: () => {
                window.location.href = "/";
            }
        },
        {
            label: "About",
            icon: "pi pi-fw pi-info",
        }
    ]

    const [ sidebarItems, setSidebarItems ] = useState<{ label: string; icon: string; items?: { label: string; icon: string; command?: () => void; }[]; command?: () => void; }[]>([]);

    useEffect(() => {
        import("@/lib/schemas/gui/sidebar_menu")
            .then((module) => {
                console.log("Module: ", module);
                setSidebarItems(module.schema);
            })  
    }, []);

    return (
        <UiContext.Provider value={{
            workspaceState,
            setWorkspaceState
        }}>
            <PrimeReactProvider>
                <h1>Root Layout</h1>
                <AppMenuBar />
                <Splitter style={{height: "800px", width: "1500px"}}>
                    <SplitterPanel className="flex" size={20} minSize={3} style={{overflow: 'auto'}}>
                        <PanelMenu model={sidebarItems} ></PanelMenu>                        
                    </SplitterPanel>
                    <SplitterPanel className="flex" size={80} minSize={15}>
                        {children}
                    </SplitterPanel>                    
                </Splitter>

            </PrimeReactProvider>
        </UiContext.Provider>
    );
}

export default Layout;
