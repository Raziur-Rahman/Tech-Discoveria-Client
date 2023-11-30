import axios from "axios";

// 1https:///tech-discoveria-server.vercel.app/1
const axiosPublic = axios.create({
    baseURL: "https://tech-discoveria-server.vercel.app"
})


const useAxiosPublic = () => {
    return axiosPublic;
    
};

export default useAxiosPublic;