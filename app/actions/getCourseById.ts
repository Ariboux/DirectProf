import prisma from '@/app/libs/prismadb';

interface IParams {
    courseId?: string;
}

// A MODIFIER !!!!!!!!!

export default async function getCourseById(
    params: IParams
) {
    try {
        const { courseId } = params;

        const course = await prisma.course.findUnique({
            where: {
                id: courseId
            },
            include: {
                // user: true
            }
        });

        if (!course) {
            throw new Error('Course not found');
        }

        return course;/* {
            ... course,
            createdAt: course.createdAt.toISOString(),
            // user: {
            //     ... course.user,
            //     createdAt: course.user.createdAt.toISOString(),
            //     updatedAt: course.user.updatedAt.toISOString(),
            //     emailVerified: course.user.emailVerified?.toISOString()
            // }
        };*/
    } catch (error) {
        throw error;
    }
}