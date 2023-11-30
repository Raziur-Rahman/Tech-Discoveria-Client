import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import SectionHeading from "../../Components/Shared/SectionHeading";
import { FaTags } from "react-icons/fa";
import { SlLike, SlDislike } from "react-icons/sl";
import moment from "moment";
import Testimonials from "../../Components/Home/Testimonials";
import useAuth from "../../Hooks/useAuth";
import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";


const ProductDetails = () => {
    const [rating, setRating] = useState(0);
    const params = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const url = `/products/${params?.id}`
    const { data: product = {}, refetch, isLoading } = useQuery({
        queryKey: ["product", params.id],
        queryFn: async () => {
            const res = await axiosSecure.get(url);
            return res.data;
        }
    })

    const { name, timestamp, tags, image, upvotes, downvotes, owner, reviews, specifications, description, _id } = product;

    // Vote And Report handled Here
    const handleVoteReport = (id, str) => {
        if (user) {
            if (str === "upvote") {
                axiosSecure.patch(`/products/${id}`, { key: str, upvotes: upvotes + 1 })
                    .then(res => {
                        console.log(res.data);
                        if (res?.data?.modifiedCount) {
                            toast.success("Thanks For Your Vote");
                            refetch();
                        }
                    })

            }
            else if (str === "downVote") {
                axiosSecure.patch(`/products/${id}`, { key: str, downvotes: downvotes + 1 })
                    .then(res => {
                        console.log(res.data);
                        if (res?.data?.modifiedCount) {
                            toast.success("Thanks For Your Vote");
                            refetch();
                        }
                    })

            }
            else if (str === "Reported") {
                console.log(str)
                axiosSecure.patch(`/products/${id}`, { key: str, category: str })
                    .then(res => {
                        console.log(res.data);
                        if (res?.data?.modifiedCount) {
                            toast.success("Your Report is revied, Please wait for moderator review");
                            refetch();
                        }
                    })
            }
        }
    }

    // Review Post

    const handlePostReview = e => {
        e.preventDefault();
        const form = e.target;

        const reviewerName = form.name.value;
        const reviewerImage = form.photo.value;
        const reviewDescription = form.description.value;
        const timestamp = moment().toISOString();

        const review = { reviewerName, reviewerImage, reviewDescription, timestamp, ratings: rating };

        console.log([...reviews, review])

        const updateReview = [...reviews, review];

        axiosSecure.patch(`/products/${_id}`, { key: "review", reviews: updateReview })
            .then(res => {
                console.log(res.data);
                if (res?.data?.modifiedCount) {
                    toast.success("Thanks For Your Vote");
                    refetch();
                }
            })
            

        form.reset();
    }

    return (
        <>
            {isLoading ? <div className="min-h-[70vh] flex items-center justify-center">
                <span className="loading loading-ring loading-xs"></span>
                <span className="loading loading-ring loading-sm"></span>
                <span className="loading loading-ring loading-md"></span>
                <span className="loading loading-ring loading-lg"></span>
            </div> : <div>
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
                                <button onClick={() => handleVoteReport(_id, "upvote")} className="btn btn-accent text-xl font-bold"><SlLike /> {upvotes}</button>
                                <button onClick={() => handleVoteReport(_id, "downVote")} className="btn btn-error text-xl ml-10 font-bold"><SlDislike /> {downvotes}</button>
                                <button onClick={() => handleVoteReport(_id, "Reported")} className="btn btn-error text-red-700 text-xl ml-10 font-bold">Report</button>

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
                    <form onSubmit={handlePostReview} className="w-full">
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
                            <textarea name="description" className="textarea textarea-bordered h-24" placeholder="Review Description"></textarea>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary w-fit">Post Review</button>
                        </div>

                    </form>

                </section>
            </div>
            }
        </>
    );
};

export default ProductDetails;