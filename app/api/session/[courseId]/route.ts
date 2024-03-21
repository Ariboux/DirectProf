import prisma from "@/app/libs/prismadb";

import { NextResponse } from "next/server";


interface IParams {
    courseId?: string;
}

export async function POST(
    req: Request,
    { params }: { params: IParams }
) {
    const bodies = await req.json();
    for (let body of bodies) {
    const {
        label,
        dateStart,
        dateEnd,
        description
     } = body;

    Object.keys(body).forEach((key) => {
        if(!body[key]) {
            return NextResponse.error();
        }
    });


    const { courseId } = params;
    if (!courseId || typeof(courseId)!=='string') throw new Error("Invalid ID");

    const session = await prisma.session.create({
        data: {
            label,
            dateStart: new Date(dateStart),
            dateEnd: new Date(dateEnd),
            description,
            course: { connect: { id: courseId } },
        } as any,
    });
    if (!session) {
        return NextResponse.error();
    }
}

    return NextResponse.json("Sessions created successfully");
}