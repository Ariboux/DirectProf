import useSWR from "swr";
import CourseCard from "../components/cards/CourseCard";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";

interface SearchPageProps {
    searchQuery: string | null;
    currentTeacher: any;
    currentUser: any;
}

const fetchCourses = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('An error occured while fetching the data.');
    }

    return response.json();
};


const SearchPageResults: React.FC<SearchPageProps> =  ({
    searchQuery,
    currentTeacher,
    currentUser
}) => {

    const { data, isLoading } = useSWR((`/api/search?q=${searchQuery}`), fetchCourses);

    if (!data) return (
        <div className="text-2xl font-semibold text-center w-full cursor-wait">
            Loading...
        </div>
    );


    return (
        <Container>
            <h1 className="text-2xl font-semibold  pt-16">
                Results for {searchQuery}
            </h1>
            <hr className="my-4" />
            {data.courses.length === 0 ? (
                <EmptyState
                    title='No results found'
                    subtitle='Try a different search'
                    returnMenu
                />
            ) : (
                <div className="
        pt-3
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
        justify-items-center
        ">
                    {isLoading ? (
                        <div className="text-2xl font-semibold text-center w-full cursor-wait">
                            Loading...
                        </div>
                    ) : (
                        data.courses.map((course: any) => (
                            <CourseCard
                                currentUser={currentUser}
                                currentTeacher={currentTeacher}
                                disabled={false}
                                key={course.id}
                                data={course}
                            />
                        ))
                    )}
                </div>)}

        </Container>

    )
};

export default SearchPageResults;