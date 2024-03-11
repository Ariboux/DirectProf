import getCourseById from "@/app/actions/getCourseById";
import getCurrentTeacher from "@/app/actions/getCurrentTeacher";
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
    else {
        return (
            <Container>
                <h1 className="text-2xl font-semibold text-center pt-16">
                    Edit Course: {course.title}
                </h1>
                <hr className="my-4 pb-5" />
                <Calendar />
            </Container>
        );
    }
};

export default EditCoursePage;