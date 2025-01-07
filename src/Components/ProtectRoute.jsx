import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../Context/UserContext';

const ProtectRoute = ({
    children,
    allowedRoles
}) => {
    
    const token = localStorage.getItem('token');
    const user = useContext(userDataContext);
    const navigate = useNavigate();

    const userRequiredRole = user && Array.isArray(allowedRoles) && allowedRoles.includes(user.role)

    useEffect(() => {
        if (!token) {
            navigate('/login')
        } 
        
        if (user && !userRequiredRole) {
            navigate('/unauthorized')
        }

    }, [token, allowedRoles, navigate]);

    return (
        <>
            {children}
        </>
    )
}

export default ProtectRoute