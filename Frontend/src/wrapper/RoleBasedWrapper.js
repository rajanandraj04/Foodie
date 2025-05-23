import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const RoleBasedWrapper = ({ children, roles }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const role = user.role;

  useEffect(() => {
    if (!isAuthenticated || (role && !roles.includes(role))) {
       
         
    }
  }, [isAuthenticated, role, roles, navigate]);

  if (!isAuthenticated || (role && !roles.includes(role))) {
    return null;
  }

  return children;
};

export default RoleBasedWrapper;
