'use client';

import { useRouter } from "next/navigation";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import { Teacher } from "@prisma/client";
import useCreateCourseModal from "@/app/hooks/useCreateCourseModal";

interface TeacherConnectedMenuProps {
    currentTeacher: Teacher;
}

const TeacherConnectedMenu: React.FC<TeacherConnectedMenuProps> = ({
    currentTeacher
}) => {
    const router = useRouter();
    const CreateCourseModal = useCreateCourseModal();
    return (
        <>
            <div
            className="
            cursor-default
            text-center
            px-4
            py-3
            font-bold
            "
            >
                Hello {currentTeacher.name}
            </div>
            <MenuItem
            onClick={() => router.push('/teacherDashboard')}
            label="My Dashboard"
            />
            <MenuItem
            onClick={CreateCourseModal.onOpen}
            label="Create a course"
            />
            <MenuItem
            onClick={() => signOut()}
            label="Log out"
            />
        </>
    )
}

export default TeacherConnectedMenu;