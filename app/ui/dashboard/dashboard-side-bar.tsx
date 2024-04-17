'use client'

import { useState } from "react";

export default function DashboardSideBar() {
    const [menuHidden, setMenuHidden] = useState(false)
    
  return (
    <div>
      <ul className="menu bg-base-200 w-56 rounded-box">
        <li>
          <a>Propiedades</a>
        </li>
        <li>
          <span className={`menu-dropdown-toggle ${menuHidden? 'menu-dropdown-show': ''}`}>Tablas adicionales</span>
          <ul className={`menu-dropdow ${menuHidden? 'menu-dropdown-show': ''}`}>
            <li>
              <a>Provincias</a>
            </li>
            <li>
              <a>Localidades</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
