"use client";

// This is the column definition for the invoice table
// In invoice-table, this component is imported

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteUser, updateUser } from "./delete-user";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export type UserTable = {
  id: any,
  email: string,
  role: string,
  user_role: string,
  user_admin: boolean,
  session_user_id: string
}

export const columns: ColumnDef<UserTable>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    // This column has a lot more logic than the other columns.
    // See explanation on what it does before the row
    accessorKey: "role",
    header: "Role",
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* Check if the user is an owner or member. If owner, disabled, if member they should not be able to update */}
            {user.role[0] === 'Owner' || user.user_role === 'member' || user.id === user.session_user_id ? (
              <Button disabled variant={"disabled"} className="h-8 w-32 p-2">{user.role}</Button>
            ) : (
              // Otherwise user can update
              <Button
                variant={"outline"}
                className="h-8 w-32 p-2 hover:bg-background font-normal"
              >
                {user.role}
              </Button>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <>
              {/* User role changed to Admin */}
              {user.user_admin ? (
                <DropdownMenuItem
                  className="rounded-lg"
                  disabled={user.role[0] === "Admin"}
                  onClick={() => {
                    updateUser(user.id, "admin");
                    // Call the toast function to display that something has changed
                    toast({
                      title: `Role for ${user.email} has been updated to Admin.`,
                    });
                    router.refresh();
                  }}
                >
                  <div className="py-1 px-2 rounded ">
                    <h2 className="mb-1 font-semibold">Admin</h2>
                    <p className="text-gray-700 dark:text-gray-300 ">
                      Change this user's role to Admin.
                    </p>
                  </div>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="rounded-lg"
                  disabled={user.role[0] === "Admin"}
                  onClick={() => {
                    // Call the toast function to display that something has changed
                    toast({
                      title: `Please relog to be able to update roles.`,
                    });
                  }}
                >
                  <div className="py-1 px-2 rounded ">
                    <h2 className="mb-1 font-semibold">Admin</h2>
                    <p className="text-gray-700 dark:text-gray-300 ">
                      Change this user's role to Admin.
                    </p>
                  </div>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {/* User role changed to member */}
              {user.user_admin ? (
                <DropdownMenuItem
                  className="rounded-lg"
                  disabled={user.role[0] === "Member"}
                  onClick={() => {
                    updateUser(user.id, "member");
                    // Call the toast function to display that something has changed
                    toast({
                      title: `Role for ${user.email} has been updated to Member.`,
                    });
                    router.refresh();
                  }}
                >
                  <div className="py-1 px-2 rounded">
                    <h2 className="mb-1 font-semibold">Member</h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      Change this user's role to Admin.
                    </p>
                  </div>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="rounded-lg"
                  disabled={user.role[0] === "Member"}
                  onClick={() => {
                    // Call the toast function to display that something has changed
                    toast({
                      title: `Please relog to be able to update roles.`,
                    });
                  }}
                >
                  <div className="py-1 px-2 rounded">
                    <h2 className="mb-1 font-semibold">Member</h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      Change this user's role to Admin.
                    </p>
                  </div>
                </DropdownMenuItem>
              )}
              {/* If user is an Owner, they an also delete users */}
              {user.user_role === "owner" ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="rounded-lg focus:bg-red-300 dark:focus:bg-red-700"
                    onClick={() => {
                      deleteUser(user.id);
                      // Call the toast function to display that something has changed
                      toast({
                        title: `The account for user ${user.email} has been deleted.`,
                      });
                      router.refresh();
                    }}
                  >
                    <div className="py-1 px-2 rounded ">
                      <h2 className="mb-1 font-semibold">Delete</h2>
                      <p className="opacity-70">
                        Delete this member from the team
                      </p>
                    </div>
                  </DropdownMenuItem>
                </>
              ) : null}
            </>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
