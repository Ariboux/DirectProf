import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";


export async function POST(
    req: Request
) {
    const currentUser = await getCurrentUser();
    
    if(!currentUser) {
        return NextResponse.error();
    }
    
    const body = await req.json();

    const {
        sessionId,
        question,
        studentId,
        //price
    } = body;
    
    // ENVOYER LA QUESTION ET L'INFO AU PROF
    

    const enrollement = await prisma.courseEnrollment.create({
        data: {
            student: { connect: { id: studentId } },
            session: { connect: { id: sessionId } }            
        }
    });

    return NextResponse.json(enrollement);
}
