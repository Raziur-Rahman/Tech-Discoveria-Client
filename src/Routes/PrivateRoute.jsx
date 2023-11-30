import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import useAuth from "../Hooks/useAuth";


const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth();

    const location = useLocation();

    if(loading){
        return <div className="min-h-screen flex justify-center items-center">
            <progress className="progress w-56"></progress>
        </div>
    }
    if(user){
        return children;
    }

    return <Navigate state={{from: location.pathname}} to='/login' replace ></Navigate>
};

export default PrivateRoute;

PrivateRoute.propTypes ={
    children: PropTypes.node
}