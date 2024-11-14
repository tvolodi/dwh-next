'use client';

import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { PanelMenu } from "primereact/panelmenu";

import { useState } from "react";

function AppSidebar() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="card flex justify-content-center">
      <h1>App Sidebar</h1>
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <h1>Sidebar</h1>
      </Sidebar>
      <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
    </div>
  );
}

export default AppSidebar;