import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionHeading from "../../Components/Shared/SectionHeading";
import { FaTags } from "react-icons/fa";
import { SlLike, SlDislike } from "react-icons/sl";
import moment from "moment";
import Testimonials from "../../Components/Home/Testimonials";


const ProductDetails = () => {

    const params = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: product = {} } = useQuery({
        queryKey: ["product", params.id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/${params?.id}`);
            return res.data;
        }
    })

    const { name, timestamp, tags, image, upvotes, downvotes, owner, reviews, specifications, description } = product;

    return (
        <div>
            <SectionHeading heading={"Products Details"}></SectionHeading>
            {
                product ? <>
                    <div className="flex flex-col lg:flex-row p-5 lg:p-0">
                        <div className="lg:w-4/6">
                            <img  src={image} alt="" />
                        </div>
                        <div className="lg:w-2/6 space-y-2 md:ml-20 md:pt-28">
                            <h1 className="text-3xl font-semibold">{name}</h1>
                            <p className='flex gap-2'>
                                {
                                    tags?.map((item, index) => <span className='flex items-center justify-center border' key={index}><FaTags />{item}</span>)
                                }
                            </p>
                            {
                                specifications?.map((item, index) => <p key={index}>
                                    <span className="text-lg font-semibold">{item?.name}:</span> <span> {item?.value}</span>
                                </p>)
                            }
                            <button className="btn btn-accent text-xl font-bold"><SlLike /> {upvotes?.length}</button>
                            <button className="btn btn-error text-xl ml-10 font-bold"><SlDislike /> {downvotes?.length}</button>
                        </div>

                    </div>
                    <div className="flex flex-col-reverse md:flex-row">
                        <div className="md:w-1/2 text-xl p-10">
                            {description}
                        </div>
                        <div className="flex space-x-4 md:w-1/2 p-10">
                            <img alt="" src={owner?.ownerImage} className="object-cover w-20 h-20 rounded-full shadow dark:bg-gray-500" />
                            <div className="flex flex-col space-y-1">
                                <a rel="noopener noreferrer" href="#" className="text-2xl font-semibold">{owner?.ownerName}</a>
                                <span className="text-lg dark:text-gray-400">{moment(timestamp).fromNow()}</span>
                            </div>
                        </div>
                    </div>
                </> : <div className="min-h-[70vh] flex justify-center items-center">
                    <span className="loading loading-bars loading-xs"></span>
                    <span className="loading loading-bars loading-sm"></span>
                    <span className="loading loading-bars loading-md"></span>
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            }
            <Testimonials reviews={reviews}></Testimonials>
        </div>
    );
};

export default ProductDetails;