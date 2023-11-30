import moment from 'moment/moment';
import PropTypes from 'prop-types';
import { SlLike, SlDislike } from "react-icons/sl";
import { Link, useNavigate } from 'react-router-dom';
import { FaTags } from "react-icons/fa";
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useProducts from '../../Hooks/useProducts';
import Swal from 'sweetalert2';

const ProductsCard = ({ product }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useProducts();
    const navigate = useNavigate();

    const { name, timestamp, tags, image, upvotes, downvotes, owner, _id } = product;

    const handleUpdate = (id, str) => {
        if (user && user?.email) {
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
        else{
            Swal.fire({
                title: "You Are Not Logged In",
                text: "Please login to add item to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Please"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location.pathname } })
                }
            });
        }
    }

    return (
        <div className="flex relative flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg border border-yellow-500 hover:scale-105 duration-500">
            <div className="flex space-x-4">
                <img alt="" src={owner?.ownerImage} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                <div className="flex flex-col space-y-1">
                    <a rel="noopener noreferrer" href="#" className="text-sm font-semibold">{owner?.ownerName}</a>
                    <span className="text-xs dark:text-gray-400">{moment(timestamp).fromNow()}</span>
                </div>
            </div>
            <div>
                <img src={image} alt="" className="object-cover w-full mb-4 h-60 dark:bg-gray-500" />
                <Link to={`/product/${_id}`}><h2 className="mb-1 text-xl font-semibold">{name}</h2></Link>
                <p className='flex gap-2'>
                    {
                        tags.slice(0, 2).map((item, index) => <span className='flex items-center justify-center border' key={index}><FaTags />{item}</span>)
                    }
                </p>
            </div>
            <div className="flex flex-wrap justify-between items-center static bottom-0">
                <div className="space-x-2">
                    <button title='Report this post' onClick={() => handleUpdate(_id, "Reported")} aria-label="Report this post" type="button" className=" text-red-600 btn btn-ghost">
                        Report
                    </button>
                </div>
                <div className="flex space-x-2 dark:text-gray-400">
                    <button type="button" onClick={() => handleUpdate(_id, "downVote")} className="flex items-center border p-1 text-bold space-x-1.5">
                        <SlDislike className='text-blue-600' />
                        <span>{downvotes}</span>
                    </button>
                    <button type="button" onClick={() => handleUpdate(_id, "upvote")} className="flex items-center border hover:bg-amber-300 p-1 space-x-1.5 text-bold">
                        <SlLike className='text-blue-600' />
                        <span>{upvotes}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductsCard;

ProductsCard.propTypes = {
    product: PropTypes.object
}