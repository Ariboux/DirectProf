import getCurrentTeacher from "@/app/actions/getCurrentTeacher"
import getSubjectIdByName from "@/app/actions/getSubjectIdByName";
import prisma from "@/app/libs/prismadb";

import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {
    const currentTeacher  = await getCurrentTeacher();
    
    if(!currentTeacher) {
        return NextResponse.error();
    }
    
    const body = await req.json();
    
    const {
        subject,
        title,
        description,
        image,
        price,
        // tags: []
    } = body;

    const subjectId = await getSubjectIdByName({ subjectName: subject });
    
    Object.keys(body).forEach((key) => {
        if(!body[key]) {
            return NextResponse.error();
        }
    });

    const course = await prisma.course.create({
        data: {
            title,
            description,
            image,
            price,
            // tags,
            subject: { connect: { id: subjectId } },
            teacher: { connect: { id: currentTeacher.id } },
        },
    });

    return NextResponse.json(course);
}
