import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";


const ManageUsersPage = () => {

    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data
        }
    })

    const handleRoleChange = (id, role ) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to upgarde this user as ${role}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Upgrade!"
        }).then((result) => {
            if (result.isConfirmed) {
                const data = {role}
                console.log(data);
                axiosSecure.patch(`/users/${id}`, data )
                    .then(res => {
                        console.log(res.data);
                        if (res.data) {
                            Swal.fire({
                                title: "Updated",
                                text: "Users has been upgraded as Admin",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }

    return (
        <div className="px-2 md:px-10 my-5">
            <Helmet>
                <title>Tect Discoveria | DashBoard | Manage Users</title>
            </Helmet>
            <div className="bg-base-300 shadow-2xl p-5 rounded-lg">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Total Orders: {users.length}</h1>
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
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((item, index) => <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        {item?.email}
                                    </td>
                                    <td>{item.role}</td>
                                    <th>
                                        <button disabled={item.role === "moderator" ? true : false} onClick={() => handleRoleChange(item._id, "moderator")} className="btn btn-outline">Make Moderator</button>
                                    </th>
                                    <td><button disabled={item.role === "admin" ? true : false} onClick={()=> handleRoleChange(item._id, "admin")} className="btn btn-outline">Make Admin</button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsersPage;