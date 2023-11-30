import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProductsReviewPage = () => {

    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    const { data: Products = [], refetch } = useQuery({
        queryKey: ["reportedData"],
        queryFn: async () => {
            const res = await axiosSecure.get('/userProducts');
            return res.data;
        }
    })

    const handleUpdateStatus = (id, str) => {
        if (user && user?.email) {
            if (str === "Featured") {
                axiosSecure.patch(`/products/${id}`, { key: str, category: "Featured" })
                    .then(res => {
                        console.log(res.data);
                        if (res?.data?.modifiedCount) {
                            toast.success("Thanks For Your Vote");
                            refetch();
                        }
                    })

            }
            else if (str === "Accept") {
                axiosSecure.patch(`/products/${id}`, { key: str, status: " Accepted" })
                    .then(res => {
                        console.log(res.data);
                        if (res?.data?.modifiedCount) {
                            toast.success("Product Status Updated Successfuly...");
                            refetch();
                        }
                    })

            }
            else if (str === "Reject") {
                axiosSecure.patch(`/products/${id}`, { key: str, status: "Rejected" })
                    .then(res => {
                        console.log(res.data);
                        if (res?.data?.modifiedCount) {
                            toast.success("Product Status Updated Successfuly...");
                            refetch();
                        }
                    })
            }
        }
    }

    return (
        <div className="px-2 md:px-8 my-5">
            <Helmet>
                <title>Tect Discoveria | DashBoard | My Products</title>
            </Helmet>
            <div className="bg-base-300 shadow-xl p-5 rounded-lg">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Total Products: {Products.length}</h1>
                </div>
                <div className="overflow-x-auto w-full">
                    <table className="table mt-5 rounded-t-xl">
                        {/* head */}
                        <thead className="bg-[#D1A054] text-white uppercase font-semibold">
                            <tr className="py-10">
                                <th>Name</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th>Action</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Products.map(item => <tr key={item?.originalDoc?._id}>
                                    <th>
                                        {item?.originalDoc?.name}
                                    </th>
                                    <td>
                                        {item?.originalDoc?.status}
                                    </td>
                                    <td>
                                        <Link to={`/product/${item?.originalDoc?._id}`}><button title="Update Product" className="btn btn-outline">Details</button></Link>
                                    </td>
                                    <td>
                                        <button 
                                        onClick={()=>handleUpdateStatus(item?.originalDoc?._id, "Featured")} 
                                        disabled={item?.originalDoc?.status !== " Accepted" || item?.originalDoc?.category === "Featured" &&  true}
                                        className="btn btn-active">Make Featured</button>
                                    </td>
                                    <th>
                                        <button 
                                        disabled={item?.originalDoc?.status === " Accepted" && true}
                                        onClick={()=>handleUpdateStatus(item?.originalDoc?._id, "Accept")} 
                                        className="btn btn-success">Accept</button>
                                    </th>
                                    <td>
                                        <button 
                                        disabled={item?.originalDoc?.status === "Rejected" && true} 
                                        onClick={()=>handleUpdateStatus(item?.originalDoc?._id, "Reject")} 
                                        className="btn btn-error">
                                            Reject</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductsReviewPage;