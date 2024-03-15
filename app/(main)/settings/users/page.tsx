import { redirect } from "next/navigation";
import CreateUser from "./create-user";
import Seperator from "@/components/seperator";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getUsersRoles } from "./actions";
import readUserSession from "@/lib/lib";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useUserRoles } from "@/hooks/useUserRoles";

export default async function Home() {
  const { data } = await readUserSession();

  if (!data.session) {
    redirect("/login");
  }

  const { userInfo, activeUsersCompany } = await useUserInfo()
  const { userRole } = await useUserRoles()

  // Check if the user is an admin and may change stuff
  let user_admin: boolean;
  if (userRole?.role === "admin" || userRole?.role === "owner") {
    user_admin = true;
  } else {
    user_admin = false;
  }

  // Mapping User IDs
  const userArray = activeUsersCompany?.map((user) => [user.id]);

  // 'userArray' now contains an array of arrays, each with a single user ID
  const { data: user_role } = await getUsersRoles(userArray)

  const userData = activeUsersCompany?.map((user) => ({
    id: user.id,
    email: user.email,
    user_admin,
    user_role: userRole?.role,
    role: user_role
      ?.filter((role) => role.user_id === user.id)
      .map(
        (role) => role.role.charAt(0).toUpperCase() + role.role.slice(1, 10)
      ),
    session_user_id: data.session?.user.id,
  }));

  const daters: any = userData?.sort((a: any, b: any) => {
    const roleA = a.role[0];
    const roleB = b.role[0];

    const roleOrder: any = {
      Owner: 0,
      Admin: 1,
      Member: 2,
    };

    return roleOrder[roleA] - roleOrder[roleB];
  });

  return (
    <>
      {userRole?.role === "owner" || userRole?.role === "admin" ? (
        <>
          <CreateUser company_id={userInfo?.company_id} />
          <div className="my-4">
            <Seperator />
          </div>
        </>
      ) : null}

      <h3 className="text-xl font-bold tracking-tight mb-2">Users</h3>
      <DataTable columns={columns} data={daters} />
    </>
  );
}
