import { signOut, auth } from "@/auth";

export default async function LogoutButton() {
  const session = await auth()

  //console.log(session)

  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button className="btn bg-blue-800 hover:bg-blue-600 text-white"><span className="font-bold">{session?.user?.email}</span> - Cerrar Session</button>
    </form>
  );
}
