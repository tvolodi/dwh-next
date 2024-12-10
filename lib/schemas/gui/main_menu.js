export const schema = [
    {

        icon: "pi pi-fw pi-bars",
        command: () => {
            console.log("Menu clicked");
        }
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


