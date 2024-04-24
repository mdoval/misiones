'use client'

import Link from "next/link";
import { useState } from "react";

export default function DashboardSideBar() {
  const [menuHidden, setMenuHidden] = useState(true)
    
  return (
    <div>
      <ul className="menu bg-base-200 w-56 rounded-box">
        <li>
          <Link href={"/dashboard/propiedades"}>Propiedades</Link>
        </li>
        <li>
          <span onClick={() => setMenuHidden(!menuHidden)} className={`menu-dropdown-toggle ${menuHidden? 'menu-dropdown-show' : ''}`}>Tablas adicionales</span>
          <ul className={`menu-dropdown ${menuHidden? '' : 'menu-dropdown-show'}`}>
            <li>
              <Link href={"/dashboard/provincias"}>Provincias</Link>
            </li>
            <li>
              <Link href={"/dashboard/localidades"}>Localidades</Link>
            </li>
            <hr ></hr>
            <li>
              <Link href={"/dashboard/servicios"}>Servicios</Link>
            </li>
            <li>
              <Link href={"/dashboard/tipos"}>Tipos</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
