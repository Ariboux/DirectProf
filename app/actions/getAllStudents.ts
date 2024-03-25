import prisma from "@/app/libs/prismadb";

export default async function getAllStudents() {
    try {
        const students = await prisma.user.findMany();
        return students;
    } catch (error: any) {
        throw new Error(error);
    }
}
