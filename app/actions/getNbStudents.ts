import prisma from "@/app/libs/prismadb";

export default async function getNbStudents() {
    try {
        const nbStudents = await prisma.user.count();
        return nbStudents;
    } catch (error: any) {
        throw new Error(error);
    }
}