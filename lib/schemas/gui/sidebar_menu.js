
// Command(par1, par2)
// par1: event - The original event
// par2: router - router from next/navigate


// 
export const sidebar_menu_schema = [
    {
        label: "Meta",
        icon: "pi pi-fw pi-hammer",
        items: [
            {
                label: "DWH Config",
                icon: "pi pi-fw pi-cog",
                command: (e, router, setChildEntityName) => {
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
                    console.log("Modules command");
                    debugger;
                    setChildEntityName("meta_Module");
                }
            },
            {
                label: "Entities",
                icon: "pi pi-fw pi-database",
                command: (e, router, setChildEntityName) => {
                    console.log("Entities command");
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