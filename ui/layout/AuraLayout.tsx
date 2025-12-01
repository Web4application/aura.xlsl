import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import PanelContainer from "./PanelContainer";

export default function AuraLayout({ children }) {
  return (
    <div className="aura-layout">
      <Sidebar />
      <div className="aura-main">
        <Topbar />
        <PanelContainer>{children}</PanelContainer>
      </div>
    </div>
  );
}
