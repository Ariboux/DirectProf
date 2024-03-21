import getCourseById from "@/app/actions/getCourseById";
import getCurrentTeacher from "@/app/actions/getCurrentTeacher";
import getSessionsByCourse from "@/app/actions/getSessionsByCourse";
import Container from "@/app/components/Container";
import NotLoggedIn from "@/app/components/NotLoggedIn";
import Calendar from "@/app/components/scheduler/calendar";

import React from "react";

interface EditCourseProps {
    courseId: string;
}

const EditCoursePage = async ({ params }: { params: EditCourseProps }) => {
    const currentTeacher = await getCurrentTeacher();
    const course = await getCourseById(params);
    if (!currentTeacher) {
        return (
            <NotLoggedIn />
            );
        }
        if (course.teacherId !== currentTeacher.id) {
            return (
                <Container>
                <h1 className="text-2xl font-semibold text-center pt-16">
                    You are not authorized to edit this course.
                </h1>
            </Container>
        );
    }
    else {
        const sessions = await getSessionsByCourse(params);
        return (
            <Container>
                <h1 className="text-2xl font-semibold text-center pt-16">
                    Edit Course: {course.title}
                </h1>
                <hr className="my-4 pb-5" />
                <Calendar data={sessions} courseId={params.courseId} />
            </Container>
        );
    }
};

export default EditCoursePage;