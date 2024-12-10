const a = 2;
const b = 3;
console.log(a + b);

// #insert-file: ./lib/schemas/gui/sidebar_menu.js
// ##last-modified: 2024-12-10T09:04:08.772Z

const sidebar_menu_schema = [
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
// ## insertion-end: ./lib/schemas/gui/sidebar_menu.js
