import getCurrentUser from "../actions/getCurrentUser";
import getSessionsByUser from "../actions/getSessionsByUser";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";

export default async function myCourses() {
    const currentUser = await getCurrentUser();
    
    if(!currentUser) {
        return <EmptyState
        title='You are not connected as a student'
        subtitle='Please login with your student account to access this page' />;
    }
    const coursesEnrolled = await getSessionsByUser({ userId: currentUser.id }) as any;
    
    return (
        <Container>
            <h1 className="text-2xl font-semibold text-center pt-16">
                My Courses
            </h1>
            <hr className="my-4 pb-5" />
            {coursesEnrolled.length === 0 ? (
                <EmptyState
                    title='No courses yet'
                    subtitle='You have not enrolled in any courses yet' />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {coursesEnrolled.map((sessions:any) =>
                        sessions.session.map((session:any) => (
                            <div key={session.id} className="bg-white shadow-md rounded-lg p-4 dark:bg-gray-800">
                                <h1 className="text-xl font-semibold">{session.label}</h1>
                                <p className="text-gray-500">{session.description}</p>
                                <hr className="my-2" />
                                <h2 className="text-lg font-semibold">
                                    {`${session.dateStart.getDate()}/${session.dateStart.getMonth()}/${session.dateStart.getFullYear()} : ${session.dateStart.getHours()}:00 - ${session.dateEnd.getHours()}:00`}
                                </h2>
                                <hr className="my-2" />
                                <h2 className="text-xl font-semibold">{session.course.name}</h2>
                                <p className="text-gray-500">{session.course.description}</p>
                                <p className="text-gray-500">{session.course.price}</p>
                            </div>

                    )))}
                </div>
            )}


        </Container>
    );

};
