"use server";
import { prisma } from "@/lib/prisma";

export const getAllContacts = async () => prisma.contact.findMany();
export const getContactById = async (id: string) =>
  prisma.contact.findUnique({ where: { id } });
