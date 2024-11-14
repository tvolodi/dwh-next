import { Menubar } from "primereact/menubar";

function AppMenuBar () {

    const items = [
        {
            label: "Home",
            icon: "pi pi-fw pi-home",
        },
        {
            label: "About",
            icon: "pi pi-fw pi-info",
        }
    ]


    return (
        <Menubar model={items} />
    )

}

export default AppMenuBar;