import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

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

    const handleReject = (id) => {
        console.log("reject", id)
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
                                        <button title="Update Product" className="btn btn-active">Make Featured</button>
                                    </td>
                                    <th>
                                        <button title="Update Product" className="btn btn-success">Accept</button>
                                    </th>
                                    <td>
                                        <button onClick={() => handleReject(item?.originalDoc?._id)} className="btn btn-error">Reject</button>
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