import { getAllContacts } from "@/actions/contacts";
import ContactsTable from "@/components/contacts/table/ContactsTable";
import HeaderPage from "@/components/layout/HeaderPage";
import { QueryClient } from "@tanstack/react-query";

export default async function Contacts() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["contacts"],
    queryFn: getAllContacts,
  });
  return (
    <div className="text-foreground flex h-full w-full flex-col items-center justify-start">
      <HeaderPage title={"Contacts"} />
      <ContactsTable />
    </div>
  );
}
