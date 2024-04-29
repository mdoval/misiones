import { auth } from "@/auth";
import LoginForm from "../ui/login/login-form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await auth()
    if(session!= null) redirect('/dashboard')

    return (
    <div className="flex flex-col w-full h-full md:items-center justify-center">
        <LoginForm />
    </div>
    )
}