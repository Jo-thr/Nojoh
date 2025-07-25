import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div
      className={
        "bg-primary-lighter absolute top-0 left-0 flex h-screen w-screen flex-col items-center justify-center"
      }
    >
      <div
        className={"flex flex-col items-center gap-x-8 gap-y-4 md:w-[550px]"}
      >
        <h2
          className={"text-primary text-center text-4xl font-bold md:text-left"}
        >
          404
        </h2>
        <h1 className={"text-center text-4xl font-bold md:text-left"}>
          Cette page est inaccessible
        </h1>
        <div className={"text-center md:text-left"}>
          {"Il semblerait que la page que vous cherchez n'existe pas."}
        </div>
        <Link className={"mt-4"} href={"/"}>
          <Button>{"Retourner à l'accueil"}</Button>
        </Link>
      </div>
    </div>
  );
}
