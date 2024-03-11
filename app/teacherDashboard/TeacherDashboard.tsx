'use client';

import { Course } from "@prisma/client";
import axios from "axios";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BiSolidPencil } from "react-icons/bi";
import { RiDeleteBin7Fill } from "react-icons/ri";

interface TeacherDashboardTableProps {
    courses: Course[];
    subjects: string[];
}

const TeacherDashboardTable: React.FC<TeacherDashboardTableProps> = ({
    courses,
    subjects
}) => {
    const { theme } = useTheme();
    const router = useRouter();
    
    const onDeleteCourse = (courseId: any) => {
        if (!window.confirm('Are you sure you want to delete this course?')) return;

        axios.delete(`/api/courses/${courseId}`)

        .then((res) => {
            toast.success('Course deleted successfully');
            router.refresh();
        })
        .catch((err) => {
            toast.error('Error deleting course');
        })

    }
    for (let i = 0; i < courses.length; i++) {
        courses[i].subjectId = subjects[i];
    }
    return (
        <>
        <table className="table-auto w-full">
        <thead>
            <tr>
                <th className={`px-4 py-2 ${theme==='dark'?'':''}`}></th>
                <th className={`px-4 py-2 ${theme==='dark'?'':'border'}`}>Subject</th>
                <th className={`px-4 py-2 ${theme==='dark'?'':'border'}`}>Course</th>
                <th className={`px-2 py-2 ${theme==='dark'?'':'border'}`}>Students</th>
                <th className={`px-2 py-2 ${theme==='dark'?'':'border'}`}>Price</th>
                <th className={`px-2 py-2 ${theme==='dark'?'':'border'}`}>Status</th>
            </tr>
        </thead>
        <tbody>
        {courses.map((course,count) => (
                <tr
                key={course.id}                
                className={`
                ${count % 2 === 0 ? (theme==='dark'? 'bg-neutral-700' : 'bg-neutral-100') : (theme==='dark'? 'bg-neutral-800' : 'bg-neutral-200')}
                `}>
                    <td className="border py-2 text-center">
                        <input type="checkbox" className="cursor-pointer rounded" />
                    </td>
                    <td className="border px-4 py-2">{course.subjectId}</td>
                    <td className="border px-4 py-2 hover:cursor-pointer hover:underline" onClick={()=>router.push(`/courses/${course.id}`)}>{course.title}</td>
                    <td className="border px-4 py-2 text-center">24</td>
                    <td className="border px-4 py-2 text-center">$792</td>
                    <td className="border px-4 py-2 text-center">Posted</td>
                    <td className="border px-2 py-2 text-center" onClick={()=>router.push(`/courses/${course.id}/edit`)}>
                        <BiSolidPencil className="cursor-pointer hover:text-blue-500 mx-auto" />
                    </td>
                    <td className="border py-2 self-center">
                        <RiDeleteBin7Fill className="cursor-pointer hover:text-red-500 mx-auto" onClick={() => {onDeleteCourse(course.id)}}/>
                    </td>
                </tr>
        ))}
        </tbody>
        </table>
        </>
    );
};

export default TeacherDashboardTable;