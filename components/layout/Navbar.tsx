"use client";

import Logo from "@/components/common/Logo";
import MilestoneForm from "@/components/milestone/MilestoneForm";
import ProjectForm from "@/components/project/ProjectForm/ProjectForm";
import RoleForm from "@/components/role/RoleForm/RoleForm";
import TaskForm from "@/components/task/TaskForm/TaskForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut, useSession } from "@/lib/auth-client";
import * as Icons from "lucide-react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const pathname = usePathname();
  const [showActions, setShowActions] = useState(false);

  const [roleSheetOpen, setRoleSheetOpen] = useState(false);
  const [projectSheetOpen, setProjectSheetOpen] = useState(false);
  const [taskSheetOpen, setTaskSheetOpen] = useState(false);
  const [jalonSheetOpen, setJalonSheetOpen] = useState(false);

  const menu = [
    {
      name: "Projets",
      path: "/projects",
      icon: "BookOpen",
    },
    {
      name: "Rôles",
      path: "/roles",
      icon: "Users",
    },
  ];

  const projectId = pathname.split("/").slice(-1)[0];

  const logOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <nav className="z-20 flex w-full items-center justify-between p-4 px-6">
      <div className="flex w-max flex-row items-center justify-start gap-14">
        {/* LOGO */}
        <Link
          href="/"
          className={`group flex w-max items-center justify-start gap-2 hover:cursor-pointer`}
        >
          <Logo size={28} className="group-hover:animate-jump-shaking" />
          <div className="text-xl font-bold">Nojoh</div>
        </Link>

        {/* MENU */}
        {session && (
          <div
            className={
              "text-primary-deep flex w-max flex-row gap-1 font-medium"
            }
          >
            {menu.map((item) => {
              const Icon = (Icons as any)[item.icon];
              return (
                <li
                  key={item.path}
                  className={`hover:bg-gray-light/60 flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 transition hover:cursor-pointer ${
                    pathname.startsWith(item.path)
                      ? "text-primary bg-primary/5 font-bold"
                      : ""
                  }`}
                >
                  <Link
                    href={item.path}
                    className={`flex items-center justify-start gap-2`}
                  >
                    <Icon size={16} />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </div>
        )}
      </div>

      {session && (
        <div className="flex w-max flex-row items-center justify-end gap-4">
          {/* QUICK ACTION */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowActions(!showActions)}
              className="border-gray-dark flex items-center justify-between gap-3 rounded-md border bg-white px-3 py-2 text-xs font-medium transition hover:cursor-pointer"
            >
              <Icons.Search size={16} />
              Actions rapides
            </button>
            {showActions && (
              <div className="border-gray-dark absolute left-1/2 z-40 mt-2 flex w-40 -translate-x-1/2 flex-col gap-2 rounded-lg border bg-white p-1">
                {/* PROJECT */}
                <Sheet
                  open={projectSheetOpen}
                  onOpenChange={setProjectSheetOpen}
                >
                  <SheetTrigger asChild>
                    <div className="hover:bg-gray-light flex items-center justify-start gap-3 rounded-lg p-3 text-xs font-medium transition hover:cursor-pointer">
                      {projectId ? (
                        <Icons.PenBox size={16} />
                      ) : (
                        <Icons.Plus size={16} />
                      )}
                      {projectId ? "Modifier le projet" : "Créer un projet"}
                    </div>
                  </SheetTrigger>
                  <SheetContent side="right" showXIcon={false}>
                    <div className="p-10">
                      <div className="flex flex-row items-center justify-start gap-2">
                        <ArrowLeft
                          onClick={() => (
                            setProjectSheetOpen(false),
                            setShowActions(false)
                          )}
                          className="cursor-pointer stroke-3"
                        />
                        <div className="ml-4 font-medium text-gray-400">
                          Projets /
                        </div>
                        <div className="font-jost text-lg font-semibold tracking-tight">
                          {projectId ? "Modifier le projet" : "Nouveau projet"}
                        </div>
                      </div>
                      <ProjectForm
                        onClose={() => (
                          setProjectSheetOpen(false),
                          setShowActions(false)
                        )}
                        projectId={projectId}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
                {/* ROLES */}
                <Sheet open={roleSheetOpen} onOpenChange={setRoleSheetOpen}>
                  <SheetTrigger asChild>
                    <div className="hover:bg-gray-light flex items-center justify-start gap-3 rounded-lg p-3 text-xs font-medium transition hover:cursor-pointer">
                      <Icons.Plus size={16} />
                      Créer un rôle
                    </div>
                  </SheetTrigger>
                  <SheetContent side="right" showXIcon={false}>
                    <div className="p-10">
                      <div className="flex flex-row items-center justify-start gap-2">
                        <ArrowLeft
                          onClick={() => (
                            setRoleSheetOpen(false),
                            setShowActions(false)
                          )}
                          className="cursor-pointer stroke-3"
                        />
                        <div className="ml-4 font-medium text-gray-400">
                          Rôles /
                        </div>
                        <div className="font-jost text-lg font-semibold tracking-tight">
                          Nouveau rôle
                        </div>
                      </div>
                      <RoleForm
                        onClose={() => (
                          setRoleSheetOpen(false),
                          setShowActions(false)
                        )}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
                {/* TASK */}
                {pathname.startsWith("/projects/") && (
                  <Sheet open={taskSheetOpen} onOpenChange={setTaskSheetOpen}>
                    <SheetTrigger asChild>
                      <div className="hover:bg-gray-light flex items-center justify-start gap-3 rounded-lg p-3 text-xs font-medium transition hover:cursor-pointer">
                        <Icons.Plus size={16} />
                        Créer une tâche
                      </div>
                    </SheetTrigger>
                    <SheetContent side="right" showXIcon={false}>
                      <div className="p-10">
                        <div className="flex flex-row items-center justify-start gap-2">
                          <ArrowLeft
                            onClick={() => (
                              setTaskSheetOpen(false),
                              setShowActions(false)
                            )}
                            className="cursor-pointer stroke-3"
                          />
                          <div className="ml-4 font-medium text-gray-400">
                            Tâches /
                          </div>
                          <div className="font-jost text-lg font-semibold tracking-tight">
                            Nouvele tâche
                          </div>
                        </div>
                        <TaskForm
                          onClose={() => (
                            setTaskSheetOpen(false),
                            setShowActions(false)
                          )}
                          projectId={projectId}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                )}
                {/* JALON */}
                {pathname.startsWith("/projects/") && (
                  <Sheet open={jalonSheetOpen} onOpenChange={setJalonSheetOpen}>
                    <SheetTrigger asChild>
                      <div className="hover:bg-gray-light flex items-center justify-start gap-3 rounded-lg p-3 text-xs font-medium transition hover:cursor-pointer">
                        <Icons.Plus size={16} />
                        Créer un jalon
                      </div>
                    </SheetTrigger>
                    <SheetContent side="right" showXIcon={false}>
                      <div className="p-10">
                        <div className="flex flex-row items-center justify-start gap-2">
                          <ArrowLeft
                            onClick={() => (
                              setJalonSheetOpen(false),
                              setShowActions(false)
                            )}
                            className="cursor-pointer stroke-3"
                          />
                          <div className="ml-4 font-medium text-gray-400">
                            Tâches /
                          </div>
                          <div className="font-jost text-lg font-semibold tracking-tight">
                            Nouvele tâche
                          </div>
                        </div>
                        <MilestoneForm
                          onClose={() => (
                            setJalonSheetOpen(false),
                            setShowActions(false)
                          )}
                          projectId={projectId}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                )}
                {/* SEPARATOR */}
                <Separator />
                {/* LOGOUT */}
                <button
                  onClick={logOut}
                  className="hover:bg-gray-light flex items-center justify-start gap-3 rounded-lg p-3 text-xs font-medium transition hover:cursor-pointer"
                >
                  <Icons.LogOut size={16} />
                  Déconnexion
                </button>
              </div>
            )}
          </div>

          {/* USER */}
          <div className="text-xs font-medium">{session?.user.name}</div>
          <div className="bg-gray-light flex size-10 items-center justify-center rounded-full border">
            <Avatar className="size-8">
              {session.user?.image && (
                <AvatarImage
                  src={session.user?.image}
                  alt={session?.user.name}
                />
              )}
              <AvatarFallback>
                <Icons.User size={18} />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
