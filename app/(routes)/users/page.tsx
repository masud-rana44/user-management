"use client";

import Link from "next/link";
import { UsersForm } from "@/components/users-form";

const UsersPage = () => {
  return (
    <div className="p-6">
      <Link
        href="/"
        className="mb-10 block text-sm text-violet-600 hover:underline"
      >
        {"<< All Users"}
      </Link>

      <UsersForm
        title="New User"
        description="Use the below form to create a new user"
      />
    </div>
  );
};

export default UsersPage;
