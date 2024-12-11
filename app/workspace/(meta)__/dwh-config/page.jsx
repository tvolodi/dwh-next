'use client'
import { MasterDetails } from "@/components/master-details";
import { WorkspaceLayoutContext } from "../../../workspace/layout";
import React, { useContext } from "react";

function Page() {

    const layoutContext = useContext(WorkspaceLayoutContext);

    const entityName = layoutContext.childEntity;

    return (
        <div>
            <MasterDetails fullEntityName={entityName} />
        </div>
    );
}

export default Page;
