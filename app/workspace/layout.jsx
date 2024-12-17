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
// import { url } from "inspector";
import { Menu } from "primereact/menu";
import { useRouter,  } from "next/navigation";
import React from "react";
import {WorkspaceLayoutContext} from "@/lib/contexts/WorkspaceLayoutContext";

// export const WorkspaceLayoutContext = createContext<WorkspaceLayoutContextType | undefined | never>(undefined);

function Layout({ children }) {
    const [workspaceState, setWorkspaceState] = useState({isAppSidebarVisible: true});

    const router = useRouter();

    const [ sidebarItems, setSidebarItems ] = useState([]);
    const [ childEntityName, setChildEntityName ] = useState("");

    function setMenuItemCommand(item) {

        // Substitute component command with the customized command
        
        const originalCommand = item.command;
        if(originalCommand) {
            // This command will be called from the menu component
            item.command = (e) => {
                // This command will be really executed with additional parameters
                // Add component variable to the command if needed.
                originalCommand(e, router, setChildEntityName);
            }
        }
        
        const children = item.items;
        if(children) {
            for(let j = 0; j < children.length; j++) {
                const child = children[j];
                setMenuItemCommand(child);
            }
        }
    }

    useEffect(() => {
        
        const fetchSidebarMenu = async () => {
            const {sidebar_menu_schema} = await import("@/lib/schemas/gui/sidebar_menu");

            // sidebar_menu_schema[0].items[0].command = testCallback;
            for(let i = 0; i < sidebar_menu_schema.length; i++) {
                const menuItem = sidebar_menu_schema[i];
                const originalCommand = menuItem.command;

                setMenuItemCommand(menuItem);
            }

            setSidebarItems(sidebar_menu_schema);
        };
        fetchSidebarMenu();
    }, [sidebarItems]);

    return (
        <WorkspaceLayoutContext.Provider value={{
            workspaceState,
            setWorkspaceState,
            childEntityName,
            setChildEntity: setChildEntityName
        }}>
            <PrimeReactProvider>
                <AppMenuBar />
                <Splitter style={{height: "800px", width: "1500px"}}>
                    <SplitterPanel className="flex" size={20} minSize={3} style={{overflow: 'auto'}}>
                        <PanelMenu model={sidebarItems}                        
                        ></PanelMenu>                        
                    </SplitterPanel>
                    <SplitterPanel className="flex" size={80} minSize={15}>
                        {children}
                    </SplitterPanel>                    
                </Splitter>

            </PrimeReactProvider>
        </WorkspaceLayoutContext.Provider>
    );
}

export default Layout;
