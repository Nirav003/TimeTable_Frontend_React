import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { userDataContext } from '../Context/UserContext';
import getMenu from '../utility/getMenu';
import axios from 'axios';
import { API_URL } from '../Api/server';
import toast from 'react-hot-toast';

const Navbar = () => {

    const [ isOpen, setIsOpen ] = useState(false);
    const [ menuItem, setMenuItem ] = useState([]);
    const { user, role, setUser, setRole } = useContext(userDataContext)
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(role) {
            setMenuItem(getMenu(role));
        } else {
            setMenuItem([]);
        }
    }, [role]);

    const handleLogout = async () => {
        await axios.get(`${API_URL}/user/logout`, {
            withCredentials: true,
        });
        localStorage.removeItem('token')
        setUser(null)
        setRole(null)
        toast.success("Logout Successful")
        navigate('/')
        setIsOpen(false)
    }

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
                        {user && <button
                            onClick={handleLogout}
                            className="block w-full px-4 py-2 text-base text-primary-1 bg-primary-4 hover:bg-primary-2 hover:text-white rounded-sm"
                        >
                            Logout
                        </button>}
                    </div>       
                </div>

                {isOpen && (
                    <div className="md:hidden bg-primary-dark p-4">
                        <nav className="flex flex-col items-start justify-center w-screen px-10 space-y-4" onClick={prev => setIsOpen(!prev)}>
                            {
                                menuItem.map(( item, i ) => {
                                    return (
                                        <Link key={i} to={item.to} className="text-offwhite-light hover:underline underline-offset-8 decoration-2 decoration-offwhite-light">{item.label}</Link>
                                    )
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