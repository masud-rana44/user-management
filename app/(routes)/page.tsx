import { Button } from "@/components/ui/button";
import { UsersTable } from "@/components/users-table";
import db from "@/lib/db";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const HomePage = async () => {
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/users">
          <Button
            size="sm"
            className="mb-4 flex items-center gap-x-1 bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusCircle size={18} /> Add User
          </Button>
        </Link>
        <UsersTable data={users} />
      </div>
    </div>
  );
};

export default HomePage;
