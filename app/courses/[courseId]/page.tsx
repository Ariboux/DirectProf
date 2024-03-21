import getCourseById from "@/app/actions/getCourseById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getSubjectById from "@/app/actions/getSubjectById";
import getTeacherById from "@/app/actions/getTeacherById";
import NotLoggedIn from "@/app/components/NotLoggedIn";
import getCurrentTeacher from "@/app/actions/getCurrentTeacher";
import CoursePresentation from "./CoursePresentation";

import React from "react";
import EnrollCourseModal from "@/app/components/modals/EnrollCourseModal";
import getSessionsByCourse from "@/app/actions/getSessionsByCourse";

interface IParams {
    courseId?: string;
}

const CoursePage = async ({ params } : { params: IParams }) => {
    const currentUser = await getCurrentUser();
    const currentTeacher = await getCurrentTeacher();
    const course = await getCourseById(params);
    const subject = await getSubjectById({ subjectId: course.subjectId });
    const teacher = await getTeacherById({ teacherId: course.teacherId });
    const sessions = await getSessionsByCourse(params);
    if(!currentUser && !currentTeacher) {
        return (
            <NotLoggedIn />
        );
    }
    return (
        <>
        <EnrollCourseModal course={course} student={currentUser} teacherName={teacher.name} sessions={sessions} />
        <CoursePresentation
            currentUser={currentUser}
            currentTeacher={currentTeacher}
            courseId={course.id}
            courseName={course.title}
            courseDescription={course.description ?? ''}
            courseImage={course.image ?? ''}
            subjectName={subject.name}
            teacherName={teacher.name}
            teacherImage={teacher.image ?? ''}
            />
        </>
    );
};

export default CoursePage;