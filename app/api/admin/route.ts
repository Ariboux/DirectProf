import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET () {
    const data = {} as any;
    data.students = await prisma.user.findMany();
    data.teachers = await prisma.teacher.findMany();
    data.courses = await prisma.course.findMany();
    return NextResponse.json(data);
}