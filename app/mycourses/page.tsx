import getCurrentUser from "../actions/getCurrentUser";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";

export default async function myCourses() {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return <EmptyState
            title='You are not connected as a student'
            subtitle='Please login with your student account to access this page' />;
    }

    return (
        <Container>
            <h1 className="text-2xl font-semibold text-center pt-16">
                My Courses
            </h1>
            <hr className="my-4 pb-5" />


        </Container>
    );

};
