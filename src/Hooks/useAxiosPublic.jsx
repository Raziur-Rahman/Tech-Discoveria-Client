import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://tech-discoveria-server.vercel.app"
})


const useAxiosPublic = () => {
    return axiosPublic;
    
};

export default useAxiosPublic;