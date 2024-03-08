import getCourseById from "@/app/actions/getCourseById";
import getCurrentTeacher from "@/app/actions/getCurrentTeacher";
import Container from "@/app/components/Container";
import NotLoggedIn from "@/app/components/NotLoggedIn";

import React from "react";

interface EditCourseProps {
    courseId: string;
}

const EditCoursePage = async ({ params } : { params: EditCourseProps}) => {
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
                <div className="flex flex-col justify-center items-center h-full gap-4 pt-16">
                    <h1>Edit Course</h1>
                </div>
            </Container>
        );
    }
};

export default EditCoursePage;