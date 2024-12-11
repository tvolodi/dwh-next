'use client'

import { MasterDetails } from "@/components/master-details";

import { WorkspaceLayoutContext } from "./layout";
import React, { useContext } from "react";


function Page() {

    const workspaceLayoutContext = useContext(WorkspaceLayoutContext);

    console.log("workspaceLayoutContext from page: ", workspaceLayoutContext);

    return (
        <div>
            <MasterDetails fullEntityName={workspaceLayoutContext?.childEntityName} />
        </div>
    );
}

export default Page;