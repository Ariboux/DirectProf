'use client';

import { MdOutlineSort } from "react-icons/md"
import Container from "../components/Container"
import Heading from "../components/Heading"
import { BiBorderAll } from "react-icons/bi"
import CourseCard from "../components/cards/CourseCard"
import FavoritesTable from "./FavoritesTable"
import { useState } from "react";
import { Course, Teacher, User } from "@prisma/client";
import { SafeUser } from "../types";

interface FavoritesViewProps {
favorites: Course[];
currentUser: SafeUser | null;
teachers: string[];
subjects: string[];
}

const FavoritesView: React.FC<FavoritesViewProps> = ({
    favorites,
    currentUser,
    teachers,
    subjects,
}) => {
    const [view, setView] = useState('grid');

    const toggleView = () => {
        if (view === 'grid') {
            setView('table');
        } else {
            setView('grid');
        }
    }

    return (
        <Container>
            <div className="p-6"></div>
            <Heading title="My Favorites" />
            {view === 'grid' ? 
            <MdOutlineSort className="absolute top-40 right-20 cursor-pointer" size={25} onClick={toggleView} />
            : 
            <BiBorderAll className="absolute top-40 right-20 cursor-pointer" size={25} onClick={toggleView} />
            }
            <hr className="my-4" />
            {view === 'grid' ?
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
            {favorites.map((favorite) => (
                <CourseCard
                key={favorite.id}
                data={favorite}
                currentUser={currentUser}
                />
                ))}
            
            </div>
            :
            <FavoritesTable
            currentUser={currentUser}
            courses={favorites}
            teachers={teachers}
            subjects={subjects}
            />
            }
        </Container>


    )
}

export default FavoritesView;