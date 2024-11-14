import { useState } from "react";


function Layout({ children } : { children: React.ReactNode }) {

  return (
    <div>
        <h1>Meta</h1>
      {children}      
    </div>
  );
}

export default Layout;