'use client';

import { useEffect, useState } from 'react';
import SearchPageResults from './SearchPage';
import getCurrentTeacher from '../actions/getCurrentTeacher';
import getCurrentUser from '../actions/getCurrentUser';
import useSWR from 'swr';

const fetchData = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('An error occured while fetching the data.');
    }

    return response.json();
};

const SearchPage = () => {
    const [currentTeacher, setCurrentTeacher] = useState(null as any);
    const [currentUser, setCurrentUser] = useState(null as any);
    const [searchQuery, setSearchQuery] = useState(null as any);

    const { data } = useSWR('/api/currentUser', fetchData);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const query = searchParams.get('q');
        setSearchQuery(query);
        // async function fetchData() {
        //     const teacher = await getCurrentTeacher();
        //     setCurrentTeacher(teacher);
        //     const user = await getCurrentUser();
        //     setCurrentUser(user);
        // }
        // fetchData();
    }, []);

    if (!data) {
        return (
            <div className="mt-15 text-2xl font-semibold text-center w-full cursor-wait">
                Loading...
            </div>
        );
    }

    return (
        <SearchPageResults
        searchQuery={searchQuery}
        currentTeacher={data.currentTeacher}
        currentUser={data.currentUser}
        // currentTeacher={currentTeacher}
        //     currentUser={currentUser}
        />
    );
};

export default SearchPage;
