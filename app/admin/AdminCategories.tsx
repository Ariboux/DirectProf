import { IoMdTrash } from "react-icons/io";
import AdminMainPage from "./AdminMainPage";
import useSWR from "swr";
import toast from "react-hot-toast";

const deleteObj = async (url: string) => {

    if (!window.confirm("Are you sure you want to delete this course?"))
    {
        return ;
    }
    const response = await fetch(url, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('An error occurred while deleting the object.');
    }
    return response.json();
}

interface AdminCategoriesProps {
    category: any;
    data: any;
}


const AdminCategories: React.FC<AdminCategoriesProps> = ({
    category,
    data
}) => {

    if (category === '') {
        return (
            <AdminMainPage
                nbStudents={data.students.length}
                nbTeachers={data.teachers.length}
                nbCourses={data.courses.length}
            />
        );
    }

    if (category === 'Students') {
        return (
            <div className="mx-4">
                <h2 className="text-2xl font-semibold flex flex-col items-center mt-14">Students</h2>
                <table className="w-full mt-4 table-auto">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Creation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.students.map((student: any) => (
                            <tr key={student.id}>
                                <td className="border border-gray-300 px-4 py-2">{student.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{student.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{student.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    if (category === 'Teachers') {
        return (
            <div className="mx-4">
                <h2 className="text-2xl font-semibold flex flex-col items-center mt-14">Teachers</h2>
                <table className="w-full mt-4 table-auto">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Creation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.teachers.map((teacher: any) => (
                            <tr key={teacher.id}>
                                <td className="border border-gray-300 px-4 py-2">{teacher.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{teacher.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{teacher.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{teacher.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    if (category === 'Courses') {
        return (
            <div className="mx-4">
                <h2 className="text-2xl font-semibold flex flex-col items-center mt-14">Courses</h2>
                <table className="w-full mt-4 table-auto">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Description</th>
                            <th className="border border-gray-300 px-4 py-2">Teacher</th>
                            <th className="border border-gray-300 px-4 py-2">Creation</th>
                            <th className="border border-gray-300 px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.courses.map((course: any) => (
                            <tr key={course.id}>
                                <td className="border border-gray-300 px-4 py-2">{course.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{course.title}</td>
                                <td className="border border-gray-300 px-4 py-2">{course.description.split(' ').slice(0, 20).join(' ')}{course.description.split(' ').length > 20 ? '...' : ''}</td>
                                <td className="border border-gray-300 px-4 py-2">{course.teacher}</td>
                                <td className="border border-gray-300 px-4 py-2">{course.createdAt}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button className="text-red-500 hover:text-red-800 px-4 py-2" onClick={()=>useSWR(`/api/admin/courses/${course.id}`, deleteObj)}>
                                        <IoMdTrash size={24} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    if (category === 'Settings') {
        return (
            <div className="mx-4">
                <h2 className="text-2xl font-semibold flex flex-col items-center mt-14">Settings</h2>
                <table className="w-full mt-4 table-auto">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Setting</th>
                            <th className="border border-gray-300 px-4 py-2">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div>
            <h1>404 Not Found</h1>
        </div>
    );
}

export default AdminCategories;