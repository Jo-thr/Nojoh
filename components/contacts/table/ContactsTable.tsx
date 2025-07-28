"use client";

import { getAllContacts } from "@/actions/contacts";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { DataTable } from "./DataTable";

const ContactsTable = () => {
  const { data: contacts, isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => getAllContacts(),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-end gap-4">
        <Button>
          <Plus />
          Créer un rôle
        </Button>
      </div>
      <DataTable data={contacts || []} />
    </div>
  );
};
export default ContactsTable;
