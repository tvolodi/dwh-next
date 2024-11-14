'use client';

import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { PanelMenu } from "primereact/panelmenu";

import { useState } from "react";
import { useContext } from "react";


function AppSidebar({workspaceState, setWorkspaceState}:
  {
    workspaceState: { isAppSidebarVisible: boolean },
    setWorkspaceState: ({}: any) => void
  }
) {
  console.log("AppSidebar workspaceState", workspaceState);

  return (
    <div className="card flex justify-content-center">
      <h1>App Sidebar</h1>
      <Sidebar 
        visible={workspaceState.isAppSidebarVisible} 
        onHide={() => setWorkspaceState({...workspaceState, isAppSidebarVisible: false})}>
        <h1>Sidebar</h1>
      </Sidebar>
      {/* <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} /> */}
    </div>
  );
}

export default AppSidebar;