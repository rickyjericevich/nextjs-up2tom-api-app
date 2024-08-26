'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HomeIcon, ServerIcon, ServerStackIcon, ArrowLeftStartOnRectangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { logOut } from '../actions';
import { usePathname } from 'next/navigation';

const dashboardRoutes = [
    { name: "Home", href: "/dashboard", icon: HomeIcon },
    // { name: "Decisions", href: "/dashboard/decisions", icon: ServerIcon },
    // { name: "Batches", href: "/dashboard/batches", icon: ServerStackIcon }
]

export default function Sidebar() {
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);

    function toggleSidebar() {
        setIsOpen(!isOpen);
    };

    // TODO: navbar should highlight the link that the user is currently on

    return (
        <div className={`flex flex-col h-screen bg-white dark:bg-gray-800 shadow-lg ${isOpen ? 'w-64' : 'w-20'} transition-width duration-300`}>

            <div className="flex items-center justify-between p-4">

                <button onClick={toggleSidebar}>
                    {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>

            </div>

            <nav className="flex-1 px-2 space-y-4">

                {dashboardRoutes.map(route => (
                    <Link key={route.name} href={route.href} className={`flex items-center p-2 text-gray-700 dark:text-gray-300 ${pathname === route.href && 'bg-gray-200 dark:bg-gray-700'} hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md`}>
                        <route.icon className="h-6 w-6" />
                        {isOpen && <span className="ml-4">{route.name}</span>}
                    </Link>
                ))}

            </nav>

            {isOpen && <form action={logOut}>

                <button className="flex h-[48px] grow items-center justify-center gap-2 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3">
                    <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
                    Sign Out

                </button>
            </form>
            }

        </div>
    );
}