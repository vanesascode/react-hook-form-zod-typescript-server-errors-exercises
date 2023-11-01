import { signUpSchema } from "@/lib/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if (typeof body.email !== "string") {
    return NextResponse.json(
      { error: "Email must be a string" },
      { status: 400 }
    );
  }

  if (typeof body.password !== "string") {
    return NextResponse.json(
      { error: "Password must be a string" },
      { status: 400 }
    );
  }

  const result = signUpSchema.safeParse(body); // safeParse method validates the body agains the schema.

  //The key of the property is the first element of the issue.path array (issue.path[0]), and the value is the issue.message:
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      // result.error.flatten().forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  }

  return NextResponse.json(
    //NextResponse is to create a JSON response
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true }
  );
}
