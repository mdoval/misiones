"use client";

import Link from "next/link";
import { IoHome } from "react-icons/io5";

export default function DashboardSideBar() {
  return (
    <div>
      <ul className="menu bg-base-200 w-56 rounded-box">
        <li>
          <Link href={"/dashboard/propiedades"}>
            <IoHome /> Propiedades
          </Link>
        </li>
        <li>
          <Link href={"/dashboard/provincias"}>Provincias</Link>
        </li>
        <li>
          <Link href={"/dashboard/localidades"}>Localidades</Link>
        </li>
        <hr></hr>
        <li>
          <Link href={"/dashboard/servicios"}>Servicios</Link>
        </li>
        <li>
          <Link href={"/dashboard/tipos"}>Tipos</Link>
        </li>
      </ul>
    </div>
  );
}
