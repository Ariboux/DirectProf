import { sendEnrollmentEmail } from "@/utils/email";
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

    await sendEnrollmentEmail({ email: mailString, token: "token" });
    return NextResponse.json({message: "Email sent"});
}