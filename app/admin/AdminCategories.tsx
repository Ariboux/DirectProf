import { IoMdTrash } from "react-icons/io";
import AdminMainPage from "./AdminMainPage";
import useSWR from "swr";
import toast from "react-hot-toast";
import axios from "axios";


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
        const test = (studentId: string) => {
            if (!window.confirm("Are you sure you want to delete this student?")) {
                return toast.error('Student not deleted.');
            }
            axios.delete(`/api/admin/students/${studentId}`)
                .then((response) => {
                    toast.success('Student deleted successfully!');
                    data.students = data.students.filter((student: any) => student.id !== studentId);
                })
                .catch((error) => {
                    toast.error('An error occurred while deleting the student.');
                    console.log(error);
                });
        }
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
                            <th className="border border-gray-300 px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.students.map((student: any) => (
                            <tr key={student.id}>
                                <td className="border border-gray-300 px-4 py-2">{student.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{student.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{new Date(student.createdAt).getDate()}/{new Date(student.createdAt).getMonth()}/{new Date(student.createdAt).getFullYear()}</td>
                                <td className="border border-gray-300 py-1 justify-center items-center flex">
                                    <button className="text-red-500 hover:text-red-800 px-4 py-2" onClick={() => test(student.id)}>
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

    if (category === 'Teachers') {
        const test = (teacherId: string) => {
            if (!window.confirm("Are you sure you want to delete this teacher?")) {
                return toast.error('Teacher not deleted.');
            }
            axios.delete(`/api/admin/teachers/${teacherId}`)
                .then((response) => {
                    toast.success('Teacher deleted successfully!');
                    data.teachers = data.teachers.filter((teacher: any) => teacher.id !== teacherId);
                })
                .catch((error) => {
                    toast.error('An error occurred while deleting the teacher.');
                    console.log(error);
                });
        }
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
                            <th className="border border-gray-300 px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.teachers.map((teacher: any) => (
                            <tr key={teacher.id}>
                                <td className="border border-gray-300 px-4 py-2">{teacher.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{teacher.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{teacher.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{new Date(teacher.createdAt).getDate()}/{new Date(teacher.createdAt).getMonth()}/{new Date(teacher.createdAt).getFullYear()}</td>
                                <td className="border border-gray-300 py-1 justify-center items-center flex">
                                    <button className="text-red-500 hover:text-red-800 px-4 py-2" onClick={() => test(teacher.id)}>
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

    if (category === 'Courses') {
        const test = (courseId: string) => {
            if (!window.confirm("Are you sure you want to delete this course?")) {
                return toast.error('Course not deleted.');
            }
            axios.delete(`/api/admin/courses/${courseId}`)
                .then((response) => {
                    toast.success('Course deleted successfully!');
                    data.courses = data.courses.filter((course: any) => course.id !== courseId);
                })
                .catch((error) => {
                    toast.error('An error occurred while deleting the course.');
                    console.log(error);
                });
        }
        return (
            <div className="mx-4">
                <h2 className="text-2xl font-semibold flex flex-col items-center mt-14">Courses</h2>
                <table className="w-full mt-4 table-auto">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Description</th>
                            <th className="border border-gray-300 px-4 py-2">Price</th>
                            <th className="border border-gray-300 px-4 py-2">Teacher</th>
                            <th className="border border-gray-300 px-4 py-2">Creation</th>
                            <th className="border border-gray-300 px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.courses.map((course: any) => (
                            <tr key={course.id}>
                                <td className="border border-gray-300 px-4 py-2">{course.title}</td>
                                <td className="border border-gray-300 px-4 py-2">{course.description.split(' ').slice(0, 20).join(' ')}{course.description.split(' ').length > 20 ? '...' : ''}</td>
                                <td className="border border-gray-300 px-4 py-2">{course.price?course.price+"€":'Undefined'}</td>
                                <td className="border border-gray-300 px-4 py-2">{course.teacher}</td>
                                <td className="border border-gray-300 px-4 py-2">{new Date(course.createdAt).getDate()}/{new Date(course.createdAt).getMonth()}/{new Date(course.createdAt).getFullYear()}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button className="text-red-500 hover:text-red-800 px-4 py-2" onClick={() => test(course.id)}>
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