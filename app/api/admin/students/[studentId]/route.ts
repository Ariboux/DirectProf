import prisma from "@/app/libs/prismadb";

import { NextResponse } from "next/server";

interface IParams {
    studentId: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const { studentId: studentId } = params;
    if (!studentId || typeof (studentId) !== 'string') throw new Error("Invalid ID");

    const teacher = await prisma.user.delete({
        where: {
            id: studentId,
        },
    });

    return NextResponse.json(teacher);
}
