import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const payload = await req.json();

  if (payload.type === "user.created") {
    const { id, email_addresses, username, first_name, last_name, image_url } =
      payload.data;

    const email = email_addresses?.[0]?.email_address;

    try {
      await prisma.user.create({
        data: {
          idClerk: id,
          email: email || "",
          firstName: first_name || "",
          lastName: last_name || "",
          username: username || "",
          image: image_url,
        },
      });

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error creating user:", error);
      return NextResponse.json(
        { error: "User creation failed" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ received: true });
}
