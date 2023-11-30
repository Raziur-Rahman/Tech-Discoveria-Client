import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";


const RepotedProductsPage = () => {

    // const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    const { data: reported = [], refetch } = useQuery({
        queryKey: ["reportedData"],
        queryFn: async () => {
            const res = await axiosSecure.get('/userProducts?category=Reported')
            console.log(res.data)
            return res.data;
        }
    })

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/userProducts/${id}`)
                if (res.data.deletedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your file has been deleted...",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            }
            else {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Product Is Safe",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }

    return (
        <div className="px-2 md:px-10 my-5">
            <Helmet>
                <title>Tect Discoveria | DashBoard | Reported Products</title>
            </Helmet>
            <div className="bg-base-300 shadow-2xl p-5 rounded-lg">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Total Products: {reported.length}</h1>
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
                                reported.map((item, index) => <tr key={item._id}>
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
                                        <Link to={`/product/${item._id}`}><button title="Update Product" className="btn btn-outline bg-amber-500 text-xl text-white">Details</button></Link>
                                    </th>
                                    <td><button onClick={() => handleDelete(item._id)} className="btn btn-square text-xl bg-amber-500 text-white"><FaTrashAlt></FaTrashAlt></button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RepotedProductsPage;