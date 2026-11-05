import React from "react";
import "./OpenedDrawer.css";

import openedDrawer from "../../../media/images/OpenedDrawer/opened-drawer.svg";
import letter from "../../../media/images/OpenedDrawer/letter.svg";

function OpenedDrawer() {
  return (
    <div className="opened-drawer-page">
      <img
        className="opened-drawer-background"
        src={openedDrawer}
        alt="מגירה פתוחה"
      />
      <img
        className="opened-drawer-letter"
        src={letter}
        alt="מכתב על מקורות הכוח וההנעה"
      />
    </div>
  );
}

export default OpenedDrawer;