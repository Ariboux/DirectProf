import getCurrentTeacher from "@/app/actions/getCurrentTeacher";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET () {
    const data = {} as any;

    const currentTeacher = await getCurrentTeacher();
    const currentUser = await getCurrentUser();

    data.currentTeacher = currentTeacher;
    data.currentUser = currentUser;

    return NextResponse.json(data);
}
