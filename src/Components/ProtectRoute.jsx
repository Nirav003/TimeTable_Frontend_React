import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../Context/UserContext';
import Loader from './Loader/Loader';

const ProtectRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useContext(userDataContext);
  const navigate = useNavigate();

  const userHasRequiredRole = user && Array.isArray(allowedRoles) && allowedRoles.includes(role);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/');  
      } else if (!userHasRequiredRole) {
        navigate('/unauthorized');
      }
    }
  }, [user, userHasRequiredRole, navigate, loading]);

  if (loading) {
    return <Loader />;  
  }

  return <>{children}</>;
};

export default ProtectRoute;
