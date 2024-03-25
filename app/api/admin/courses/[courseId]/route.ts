import getCurrentTeacher from "@/app/actions/getCurrentTeacher";
import prisma from "@/app/libs/prismadb";

import { NextResponse } from "next/server";

interface IParams {
    courseId: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const { courseId: courseId } = params;
    if (!courseId || typeof(courseId)!=='string') throw new Error("Invalid ID");

    const course = await prisma.course.delete({
        where: { 
            id: courseId,
        },
    });
    
    return NextResponse.json(course);
}