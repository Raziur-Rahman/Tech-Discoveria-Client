import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionHeading from "../../Components/Shared/SectionHeading";
import { FaTags } from "react-icons/fa";
import { SlLike, SlDislike } from "react-icons/sl";
import moment from "moment";
import Testimonials from "../../Components/Home/Testimonials";
import useAuth from "../../Hooks/useAuth";
import { Rating } from "@smastrom/react-rating";
import { useState } from "react";


const ProductDetails = () => {
    const [rating, setRating] = useState(0);
    const params = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

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
                            <img src={image} alt="" />
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
            <section className="px-28">
                <SectionHeading heading={"Your Opinions Matter"} subHeading={"---Give Review---"}></SectionHeading>
                <form className="w-full">
                    <div className="w-full flex justify-center items-center py-5">
                        <span className="text-3xl">Give Star Ratings: </span> <Rating
                            style={{ maxWidth: 180 }}
                            value={rating}
                            onChange={setRating}
                            isRequired
                        />
                    </div>
                    <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Reviewer Name</span>
                            </label>
                            <input type="text" name="name" defaultValue={user?.displayName} placeholder="Your Name" className="input input-bordered" readOnly />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Reviewer Image</span>
                            </label>
                            <input type="text" name="photo" defaultValue={user?.photoURL} placeholder="Your Photo URL" className="input input-bordered" readOnly />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Review Description</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-24" placeholder="Review Description"></textarea>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary w-fit">Post Review</button>
                    </div>

                </form>

            </section>
        </div>
    );
};

export default ProductDetails;