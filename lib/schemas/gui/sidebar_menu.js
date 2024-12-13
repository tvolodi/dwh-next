
// Command(par1, par2)
// par1: event - The original event
// par2: router - router from next/navigate

import { comma } from "postcss/lib/list";

// 
export const sidebar_menu_schema = [
    {
        label: "Meta",
        icon: "pi pi-fw pi-hammer",
        items: [
            {
                label: "DWH Config",
                icon: "pi pi-fw pi-cog",
                // command: (e, router) => {
                //     router.push("/workspace/dwh-config");
                // }
                command: (e, router, setChildEntityName) => {
                    // console.log("Command e: ", e);
                    // console.log("Command router: ", router);
                    // console.log("Command setChildEntityName: ", setChildEntityName);
                    // console.log("Selected meta.Module: ", );
                    setChildEntityName("meta_DwhConfig");
                }
            },
            {
                label: "ETL Settings",
                icon: "pi pi-fw pi-cog",
                linkTo: "/workspace/etl-settings"
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
            },
            {
                label: "Modules",
                icon: "pi pi-fw pi-database",
                command: (e, router, setChildEntityName) => {
                    // console.log("Command e: ", e);
                    // console.log("Command router: ", router);
                    // console.log("Command setChildEntityName: ", setChildEntityName);
                    // console.log("Selected meta.Module: ", );
                    setChildEntityName("meta_Module");
                }
            },
            {
                label: "Entities",
                icon: "pi pi-fw pi-database",
                command: (e, router, setChildEntityName) => {
                    setChildEntityName("meta_Entity");
                }
            },
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