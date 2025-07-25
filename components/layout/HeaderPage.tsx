"use client";

import { getStatusColor, Status } from "@/enums";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderPageProps {
  goBack?: boolean;
  goBackUrl?: string;
  title: string;
  description?: string;
  startDate?: string;
  status?: Status;
  updatedAt?: string;
}

const HeaderPage = ({
  title,
  description,
  goBack = false,
  goBackUrl,
  startDate,
  status,
  updatedAt,
}: HeaderPageProps) => {
  const router = useRouter();
  return (
    <div className="mb-20 w-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full items-center justify-start">
          {goBack && (
            <>
              {goBackUrl ? (
                <Link href={goBackUrl}>
                  <Undo2
                    size={20}
                    className="mr-2 cursor-pointer text-gray-400"
                  />
                </Link>
              ) : (
                <button
                  onClick={() => router.back()}
                  className="mr-2 cursor-pointer text-gray-400"
                >
                  <Undo2 size={20} />
                </button>
              )}
            </>
          )}
          <h1 className="text-4xl font-medium tracking-tight">{title}</h1>
          {status && (
            <div
              className={`mt-1 ml-6 flex w-max items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium uppercase`}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: getStatusColor(status) }}
              />
              {status}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end">
          {startDate && (
            <div className="flex flex-row items-center justify-start gap-1 text-sm font-semibold text-gray-400">
              <span className="font-normal whitespace-nowrap">
                Date de début :
              </span>
              {new Date(startDate)
                .toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(",", "")}
            </div>
          )}
          {updatedAt && (
            <div className="flex flex-row items-center justify-start gap-1 text-sm font-semibold text-gray-400">
              <span className="font-normal whitespace-nowrap">
                Dernière mise à jour :
              </span>
              {new Date(updatedAt)
                .toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(",", "")}
            </div>
          )}
        </div>
      </div>
      {description && (
        <p className="text-muted-foreground my-3 w-1/2">{description}</p>
      )}
    </div>
  );
};
export default HeaderPage;
