import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import DropDownMenu from './DropDownMenu'

const Navbar = () => {

    const [ isOpen, setIsOpen ] = useState(false);
    
    const menuItem = [
        {
            label: 'Home',
            to: '/'
        },
        {
            label: 'Lecture',
            to: '/lecture'
        },
        {
            label: 'Master Data',
            to: '/master-data'
        }
    ]

    return (
        <header className='fixed top-0 left-0 w-full z-50'>
            <div className='bg-primary-dark p-3 flex flex-col justify-between items-center w-full'>
                <div>
                    <h1 className="text-base font-normal sm:text-xl sm:font-bold text-offwhite-dark">
                        VPM R.Z SHAH COLLEGE MULUND (E), MUMBAI
                    </h1>
                </div>
                <div className='bg-primary-dark flex justify-end md:relative md:justify-between items-center w-full'>
                    <div className='hidden md:w-full md:block'>
                        <nav className='flex space-x-4 gap-2'>
                            {menuItem.map((item, i) => {
                                const isActive = location.pathname === item.to;
                                return (
                                    <Link 
                                        key={i} 
                                        to={item.to} 
                                        className={`font-medium text-lg text-offwhite-light ${isActive ? "underline underline-offset-8 decoration-2 decoration-offwhite-light" : "hover:underline underline-offset-8 decoration-2 decoration-offwhite-light"}`}
                                    >
                                        {item.label}
                                    </Link>
                                )
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
                                menuItem.map(( item, i ) => (
                                    <Link key={i} to={item.to} className="text-offwhite-light hover:underline underline-offset-8 decoration-2 decoration-offwhite-light">{item.label}</Link>
                                ))
                            }
                        </nav>
                    </div>
                )}

            </div>
        </header>
    )
}

export default Navbar