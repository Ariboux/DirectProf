'use client';

import { useRouter } from "next/navigation";
import MenuItem from "./MenuItem";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";

interface UserConnectedMenuProps {
    currentUser: SafeUser;
}

const UserConnectedMenu: React.FC<UserConnectedMenuProps> = ({
    currentUser
}) => {
    const router = useRouter();
    return (
        <>
            <div
            className="
            cursor-default
            text-center
            px-4
            py-3
            font-bold
            "
            >
                Hello {currentUser.name}
            </div>
            <MenuItem
            onClick={()=>{}}
            label="My Profile"
            />
            <MenuItem
            onClick={()=>{}}
            label="My Courses"
            />
            <MenuItem
            onClick={()=>router.push('/favorites')}
            label="My Favorites"
            />
            <MenuItem
            onClick={() => signOut()}
            label="Log out"
            />
        </>
    )
}

export default UserConnectedMenu;