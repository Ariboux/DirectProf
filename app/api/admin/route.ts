import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET () {
    const data = {} as any;
    data.students = await prisma.user.findMany();
    data.teachers = await prisma.teacher.findMany();
    data.courses = await prisma.course.findMany();
    for (let course of data.courses) {
        const teacher = await prisma.teacher.findUnique({
            where: {
            id: course.teacherId,
            },
            select: {
            name: true
            }
        });
        course.teacher = teacher?.name;
    }
    return NextResponse.json(data);
}