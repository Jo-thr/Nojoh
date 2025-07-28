import { getAllUsers } from "@/actions/user";
import HeaderPage from "@/components/layout/HeaderPage";
import Member from "@/components/members/member";

export default async function Members() {
  // get all users from the database
  const users = await getAllUsers();
  return (
    <div className="text-foreground flex h-full w-full flex-col items-center justify-start">
      <HeaderPage title={"Members"} />
      <div className="grid w-full grid-cols-6">
        {users.map((user) => (
          <Member data={user} key={user.id} />
        ))}
      </div>
    </div>
  );
}
