'use client';

import Container from '../components/Container';
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { LuArrowRightFromLine } from "react-icons/lu";
import { FaHouse } from "react-icons/fa6";
import AdminMainPage from './AdminMainPage';
import styles from './animation.module.css'
import AdminAuthentication from './AdminAuthentification';
import useSWR from 'swr';
import { useTheme } from 'next-themes';
import AdminCategories from './AdminCategories';

const fetchData = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('An error occured while fetching the data.');
    }

    return response.json();
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showCategories, setShowCategories] = useState(true);
    const [subject, setSubject] = useState('');
    const { theme } = useTheme();

    const { data, isLoading } = useSWR('/api/admin', fetchData);

    if (!isAuthenticated) {
        return (
            <AdminAuthentication setIsAuthenticated={setIsAuthenticated} />
        );
    }
    if (!data) {
        return (
            <div className="mt-15 text-2xl font-semibold text-center w-full cursor-wait">
                Loading...
            </div>
        );
    }
    else {
        console.log(data);

        return (
            <Container>
                <div className="flex">
                    {showCategories ? (
                        <div className={`w-1/5 ${styles.slideIn}`}>
                            <div className={`bg-white p-5 rounded-md ${theme === 'dark' ? 'dark:bg-gray-800' : 'bg-gray-200'}`}>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold mt-10">Categories</h2>
                                    <button className={`text-gray-500 hover:text-gray-700 mt-10 ${theme === 'dark' ? 'text-white' : 'text-gray-500'}`}
                                    onClick={() => setShowCategories(false)}>
                                        <IoMdClose size={24} />
                                    </button>
                                </div>
                                <hr className={`mb-5 ${theme === 'dark' ? 'border-gray-300' : 'border-gray-700'}`} />
                                <ul className="space-y-5">
                                    <li className="cursor-pointer hover:text-blue-500 hover:underline" onClick={() => setSubject('')}>
                                        <FaHouse size={15} className="inline-block mr-[7px]" />
                                        Main page
                                    </li>
                                    <li className="cursor-pointer hover:text-blue-500 hover:underline" onClick={() => setSubject('Students')}>Students</li>
                                    <li className="cursor-pointer hover:text-blue-500 hover:underline" onClick={() => setSubject('Teachers')}>Teachers</li>
                                    <li className="cursor-pointer hover:text-blue-500 hover:underline" onClick={() => setSubject('Courses')}>Courses</li>
                                    <li className="cursor-pointer hover:text-blue-500 hover:underline" onClick={() => setSubject('Settings')}>Settings</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className={`w-1/12 mt-20 ${styles.slideOut}`}>
                            <button className="text-gray-500 hover:text-gray-800" onClick={() => setShowCategories(true)}>
                                <LuArrowRightFromLine size={24} />
                            </button>
                        </div>
                    )}
                    <div className={showCategories ? 'w-4/5' : 'w-full'}>
                        <AdminCategories category={subject} data={data} />
                    </div>
                </div>
            </Container>
        );
    }
};