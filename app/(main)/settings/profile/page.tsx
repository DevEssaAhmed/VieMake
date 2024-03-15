import { redirect } from "next/navigation";
import UserForm from "./profile-form";
import readUserSession from "@/lib/lib";
import { useUser } from "@/hooks/useUser";
import { useUserInfo } from "@/hooks/useUserInfo";

export default async function Home() {
  const { data } = await readUserSession();

  if (!data.session) {
    redirect("/login");
  }

  const { user } = await useUser()
  const { userInfo } = await useUserInfo()

  return (
    <>
      <h3 className="text-xl font-bold tracking-tight mb-2">Profile</h3>
      <UserForm user={user} user_info={userInfo} />
    </>
  );
}
