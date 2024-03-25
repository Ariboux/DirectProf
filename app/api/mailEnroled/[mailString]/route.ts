import { sendEnrollmentEmail } from "@/utils2/email";
import { NextResponse } from "next/server";

interface IParams {
    mailString?: string;
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    const { mailString } = params;
    if (!mailString || typeof(mailString)!=='string') throw new Error("The mail is invalid");

    const data = await request.json();

    await sendEnrollmentEmail({ email: mailString, token: "token", data: data });
    return NextResponse.json({message: "Email sent"});
}