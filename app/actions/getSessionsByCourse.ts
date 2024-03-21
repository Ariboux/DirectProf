import prisma from "@/app/libs/prismadb";

interface IParams {
    courseId?: string;
}

export default async function getSessionsByCourse(
    params: IParams
) {
    const { courseId } = params;
    if (!courseId || typeof(courseId)!=='string') throw new Error("Invalid ID");

    const sessions = await prisma.session.findMany({
        where: {
            courseId: courseId
        }
    });
    return sessions;
}
