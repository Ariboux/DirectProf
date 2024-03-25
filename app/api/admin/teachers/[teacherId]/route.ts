import prisma from "@/app/libs/prismadb";

import { NextResponse } from "next/server";

interface IParams {
    teacherId: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const { teacherId: teacherId } = params;
    if (!teacherId || typeof (teacherId) !== 'string') throw new Error("Invalid ID");

    const teacher = await prisma.teacher.delete({
        where: {
            id: teacherId,
        },
    });

    return NextResponse.json(teacher);
}
