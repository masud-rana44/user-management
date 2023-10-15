import { User } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Pencil, X } from "lucide-react";

interface UsersTableProps {
  data: User[];
}

export const UsersTable = ({ data }: UsersTableProps) => {
  return (
    <Table>
      <TableCaption>List of Users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((user, idx) => (
          <TableRow key={user.id}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.gender}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell className="text-left">
              <Button
                size="sm"
                variant="link"
                className="text-indigo-700 hover:text-indigo-900"
              >
                <X size={18} />
              </Button>
              <Button
                size="sm"
                variant="link"
                className="text-indigo-700 hover:text-indigo-900"
              >
                <Pencil size={18} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
