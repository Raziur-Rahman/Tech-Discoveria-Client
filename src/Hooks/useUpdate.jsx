import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useUpdate = ({id, updatedDoc}) => {
    const axiosSecure = useAxiosSecure();

    const { data } = useQuery({
        queryKey: ["update"],
        queryFn: async ()=>{
            const res = await axiosSecure.patch(`/products/${id}`, updatedDoc )
            return res.data;
        }
    })

    return [data]
};

export default useUpdate;