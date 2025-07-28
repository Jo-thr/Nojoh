import { Button } from "@/components/ui/button";
import { formatFrDate } from "@/lib/utils";
import { Contact } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";

export const getContactsColumns = (): ColumnDef<Contact>[] => {
  return [
    {
      accessorKey: "lastname",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="!px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Lastname
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 font-semibold">
            {row.original.lastname}
          </div>
        );
      },
    },
    {
      accessorKey: "firstname",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="!px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Firstname
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 font-semibold">
            {row.original.firstname}
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="!px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 font-semibold">
            {row.original.email}
          </div>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="!px-0 hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Modifié le
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const contact = row.original;
        return formatFrDate(contact.updated_at);
      },
    },
  ];
};
