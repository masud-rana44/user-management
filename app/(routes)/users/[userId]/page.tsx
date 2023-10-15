import { UsersForm } from "@/components/users-form";
import db from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";

const UserIdPage = async ({ params }: { params: { userId: string } }) => {
  if (!params.userId) {
    return redirect("/");
  }

  const user = await db.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="p-6">
      <Link
        href="/"
        className="mb-10 block text-sm text-indigo-600 hover:underline "
      >
        {"<< All Users"}
      </Link>
      <UsersForm
        title={`Update for ${user.name}`}
        description="Use the below form to update the user"
        data={user}
      />
    </div>
  );
};

export default UserIdPage;
