import {
  BookUser,
  Calendar,
  Folder,
  Home,
  LibraryBig,
  ListTodo,
  Newspaper,
  Users,
} from "lucide-react";

export const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/todo", label: "To Do", icon: ListTodo },
  { href: "/planner", label: "Planner", icon: Calendar },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/projects", label: "Projects", icon: LibraryBig },
  { href: "/contacts", label: "Contacts", icon: BookUser },
  { href: "/members", label: "Members", icon: Users },
  { href: "/ressources", label: "Ressources", icon: Folder },
];
