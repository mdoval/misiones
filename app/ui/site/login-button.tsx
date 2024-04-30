import { auth } from "@/auth";
import Link from "next/link";
import { LuLogIn } from "react-icons/lu";

export default async function LoginButton() {
    const session = await auth()
    //console.log(session)
    if (session === null){
        return <Link className="btn bg-blue-600 text-white" href="/login"><LuLogIn />Ingresar</Link>
    } else {
        return <Link className="btn bg-green-600 text-white" href="/dashboard">Dashboard</Link>
    }
}