import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import ProductsCard from "../Shared/ProductsCard";
import SectionHeading from "../Shared/SectionHeading";


const TrendingProducts = () => {

    const axiosPublic = useAxiosPublic();
    
    const {data: trending =[], isLoading, refetch: trendingRefetch} = useQuery({
        queryKey: ["trendingdata"],
        queryFn: async ()=>{
            const res = await axiosPublic.get('/products?category=Trending')
            console.log(res?.data);
            return res?.data;
        }
    })

    return (
        <div className="px-5 lg:px-0">
            <SectionHeading heading={"Trending Product"} subHeading={"---- Watch this----"}></SectionHeading>
            {
                isLoading ? <div className="min-h-[30vh] flex justify-center items-center ">
                <span className="loading loading-ring loading-xs"></span>
                <span className="loading loading-ring loading-sm"></span>
                <span className="loading loading-ring loading-md"></span>
                <span className="loading loading-ring loading-lg"></span>
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
                {
                    trending.map(item => <ProductsCard key={item._id} product={item} trendingRefetch={trendingRefetch}></ProductsCard>)
                }
            </div>
            }
        </div>
    );
};

export default TrendingProducts;