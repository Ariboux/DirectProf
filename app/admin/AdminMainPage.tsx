import React from "react";
import getNbStudents from "../actions/getNbStudents";

interface AdminMainPageProps {
    nbStudents: number;
    nbTeachers: number;
    nbCourses: number;
}

const AdminMainPage: React.FC<AdminMainPageProps> = ({
    nbStudents,
    nbTeachers,
    nbCourses,
}) => {

    return (
        <div className="mt-16 flex flex-col items-center">
            <h1 className="text-2xl font-semibold">Admin Main Page</h1>
            <hr className="w-5/12 mt-4" />
            <div className="mt-8">
                <p className="text-gray-500 mt-4">Here you can manage students, teachers, courses and settings</p>
                <div className="space-y-3">
                <div className="mt-6">
                    Number of students:&nbsp; 
                    <span className="text-blue-500 hover:underline">{nbStudents}</span>
                </div>
                <div>
                    Number of teachers:&nbsp;
                    <span className="text-blue-500 hover:underline">{nbTeachers}</span>
                </div>
                <div>
                    Number of courses:&nbsp;
                    <span className="text-blue-500">{nbCourses}</span>
                </div>
                </div>
                <p className="text-gray-500 mt-8">You will also soon view statistics and reports</p>
            </div>
        </div>
    );
}

export default AdminMainPage;