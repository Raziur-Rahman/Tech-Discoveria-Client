import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const axiosSecure = axios.create({
    // baseURL: "localhost:5000"
    baseURL: "https://tech-discoveria-server.vercel.app"
})

const useAxiosSecure = () => {
    

    const navigate = useNavigate();
    const { user, UserLogOut } = useAuth();

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access_token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
        
    });

    // intercept 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
            if (user) {
                await UserLogOut()
                navigate("/");
            }

        }
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;