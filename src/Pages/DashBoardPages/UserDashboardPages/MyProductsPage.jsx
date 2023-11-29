import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";


const MyProductsPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const { data: Products = [] } = useQuery({
        queryKey: ["Products", user?.email ],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userProducts/${user?.email}`);
            return res.data;

        }
    })

    const handleDelete = id =>{
        console.log(id);
    }

    return (
        <div className="px-2 md:px-10 my-5">
            <Helmet>
                <title>Tect Discoveria | DashBoard | My Products</title>
            </Helmet>
            <div className="bg-base-300 shadow-2xl p-5 rounded-lg">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Total Orders: {Products.length}</h1>
                </div>
                <div className="overflow-x-auto w-full">
                    <table className="table mt-5 rounded-t-xl">
                        {/* head */}
                        <thead className="bg-[#D1A054] text-white uppercase font-semibold">
                            <tr className="py-10">
                                <th>
                                    #
                                </th>
                                <th>Name</th>
                                <th>UpVotes</th>
                                <th>DownVotes</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Products.map((item, index) => <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        {item?.name}
                                    </td>
                                    <td>
                                        {item?.upvotes}
                                    </td>
                                    <td>{item?.downvotes}</td>
                                    <th>
                                        <Link to={`/dashboard/updateProducts/${item._id}`}><button title="Update Product" className="btn btn-square bg-amber-500 text-xl text-white"><FaEdit></FaEdit></button></Link>
                                    </th>
                                    <td><button onClick={()=> handleDelete(item._id)} className="btn btn-square text-xl bg-amber-500 text-white"><FaTrashAlt></FaTrashAlt></button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyProductsPage;