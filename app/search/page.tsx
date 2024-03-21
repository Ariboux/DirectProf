'use client';

import { useEffect, useState } from 'react';
import SearchPageResults from './SearchPage';
import getCurrentTeacher from '../actions/getCurrentTeacher';
import getCurrentUser from '../actions/getCurrentUser';

const SearchPage = () => {
    const [currentTeacher, setCurrentTeacher] = useState(null as any);
    const [currentUser, setCurrentUser] = useState(null as any);
    const [searchQuery, setSearchQuery] = useState(null as any);

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

    return (
        <SearchPageResults
        searchQuery={searchQuery}
        // currentTeacher={currentTeacher}
        //     currentUser={currentUser}
        />
    );
};

export default SearchPage;
