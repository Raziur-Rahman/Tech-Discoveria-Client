import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import ProductsCard from "../Shared/ProductsCard";
import SectionHeading from "../Shared/SectionHeading";


const FeaturedProducts = () => {

    const axiosPublic = useAxiosPublic();
    
    const {data: featuredProducts=[], isLoading, refetch: featureRef} = useQuery({
        queryKey: ["featured"],
        queryFn: async ()=>{
            const res = await axiosPublic.get('/products?category=Featured')
            console.log(res?.data);
            return res?.data;
        }
    })

    return (
        <div className="px-5 lg:px-0">
            <SectionHeading heading={"Featured Products"} subHeading={"----Check Out----"}></SectionHeading>
            {
            isLoading ? <div className="min-h-[20vh] flex justify-center items-center ">
            <span className="loading loading-ring loading-xs"></span>
            <span className="loading loading-ring loading-sm"></span>
            <span className="loading loading-ring loading-md"></span>
            <span className="loading loading-ring loading-lg"></span>
        </div>  : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {
                    featuredProducts?.map(item => <ProductsCard key={item._id} product={item} featureRef={featureRef}></ProductsCard>)
                }
            </div>}
        </div>
    );
};

export default FeaturedProducts;