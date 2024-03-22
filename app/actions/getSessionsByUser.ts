import prisma from "@/app/libs/prismadb";

interface IParams {
    userId?: string;
}

export default async function getSessionsByUser(
    params: IParams
) {
    const { userId } = params;
    if (!userId || typeof(userId)!=='string') throw new Error("Invalid ID");

    const coursesEnrolled = await prisma.courseEnrollment.findMany({
        where: {
            studentId: userId
        }
    });

    if (coursesEnrolled.length > 0) {
        for (const course of coursesEnrolled as any) {
            course.session = await prisma.session.findMany({
                where: {
                    id: course.sessionId
                }
            });
            for (const session of course.session) {
                session.course = await prisma.course.findUnique({
                    where: {
                        id: session.courseId
                    }
                });
            }
        }
    }

    return coursesEnrolled;
}
