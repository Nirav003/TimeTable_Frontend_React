import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import DropDownMenu from './DropDownMenu'
import { userDataContext } from '../Context/UserContext';

const Navbar = () => {

    const [ isOpen, setIsOpen ] = useState(false);
    const location = useLocation();
    const { role } = useContext(userDataContext)
    
    const menuItem = [
        {
            label: 'Home',
            to: '/',
            roles: ['admin', 'student']
        },
        {
            label: 'Lecture',
            to: '/lecture',
            roles: ['admin', 'student']
        },
        {
            label: 'Master Data',
            to: '/master-data',
            roles: ['admin']
        },
        {
            label: 'Mapping',
            to: '/mapping',
            roles: ['admin']        
        },
        {
            label: 'Committee Members',
            to: '/CommitteeMembers'
        }
    ]

    return (
        <header className='fixed top-0 left-0 w-full z-50'>
            <div className='bg-secondary-3 p-3 flex flex-col justify-between items-center w-full'>
                <div>
                    <h1 className="text-base font-normal sm:text-xl sm:font-bold text-primary-2">
                        VPM R.Z SHAH COLLEGE MULUND (E), MUMBAI
                    </h1>
                </div>
                <div className='bg-secondary-3 flex justify-end md:relative md:justify-between items-center w-full'>
                    <div className='hidden md:w-full md:block'>
                        <nav className='flex space-x-4 gap-2'>
                            {menuItem.map((item, i) => {
                                const hasAccess = role && item.roles.includes(role);
                                if (hasAccess) {
                                    const isActive = location.pathname === item.to;
                                    return (
                                        <Link 
                                            key={i} 
                                            to={item.to} 
                                            className={`font-medium text-lg text-primary-2 ${isActive ? "underline underline-offset-8 decoration-2 decoration-primary-2" : "hover:underline underline-offset-8 decoration-2 decoration-primary-2"}`}
                                        >
                                            {item.label}
                                        </Link>
                                    )
                                } else {
                                    return null
                                }
                            })}
                        </nav>
                    </div>
                    <div className="md:hidden p-2 w-16">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-offwhite-light hover:text-primary-dark hover:bg-offwhite-light p-2 rounded-md"
                        >
                            <GiHamburgerMenu />
                        </button>
                    </div>
                    <div>
                        <DropDownMenu /> 
                    </div>       
                </div>

                {isOpen && (
                    <div className="md:hidden bg-primary-dark p-4">
                        <nav className="flex flex-col items-start justify-center w-screen px-10 space-y-4" onClick={prev => setIsOpen(!prev)}>
                            {
                                menuItem.map(( item, i ) => {
                                    const hasAccess = role && item.roles.includes(role);
                                    if(hasAccess) {
                                        return (
                                            <Link key={i} to={item.to} className="text-offwhite-light hover:underline underline-offset-8 decoration-2 decoration-offwhite-light">{item.label}</Link>
                                        )
                                    } else {
                                        return null
                                    }
                                })
                            }
                        </nav>
                    </div>
                )}

            </div>
        </header>
    )
}

export default Navbar