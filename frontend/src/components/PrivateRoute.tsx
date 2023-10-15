import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { history } from '../helpers/history';
import { AuthState } from '../state/GlobalState';

function PrivateRoute({ children }: any) {
    const [isAuthenticated,] = useContext(AuthState);
    if (!isAuthenticated) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/signIn" state={{ from: history.location }} /> 
    }
            
     // authorized so return component
    return children;
}

export default PrivateRoute;