'use client'
import { createContext, useState } from "react";
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
import { useRouter } from "next/navigation";

type TUiContext = {
    workspaceState: {isAppSidebarVisible: boolean},
    setWorkspaceState: ({}: {isAppSidebarVisible: boolean}) => void;
};

export const UiContext = createContext<TUiContext | undefined>(undefined);



const menuPanelKey = "menuPanelKey";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const [workspaceState, setWorkspaceState] = useState({isAppSidebarVisible: true});

    const router = useRouter();

    const items = [
        {
            label: "Meta",
            icon: "pi pi-fw pi-hammer",
            items: [
                {
                    label: "DWH Settings",
                    icon: "pi pi-fw pi-cog",
                    command: () => {
                        router.push("/workspace/dwh-settings");
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

    return (
        <UiContext.Provider value={{
            workspaceState,
            setWorkspaceState
        }}>
            <PrimeReactProvider>
                <h1>Root Layout</h1>
                <AppMenuBar />
                <Splitter style={{height: "800px"}}>
                    <SplitterPanel className="flex" size={10} minSize={3} style={{overflow: 'auto'}}>
                        <PanelMenu model={items} ></PanelMenu>
                        {/* <AppSidebar workspaceState={workspaceState} setWorkspaceState={setWorkspaceState} /> */}
                    </SplitterPanel>
                    <SplitterPanel className="flex" size={50} minSize={10}>
                        {children}
                        {/* <DataTable value={[]}>
                            <Column field="vin" header="Vin"></Column>
                            <Column field="year" header="Year"></Column>
                            <Column field="brand" header="Brand"></Column>
                            <Column field="color" header="Color"></Column>
                        </DataTable> */}
                    </SplitterPanel>
                    <SplitterPanel className="flex" size={50} minSize={10}></SplitterPanel>
                </Splitter>

            </PrimeReactProvider>
        </UiContext.Provider>
    );
}

export default Layout;

