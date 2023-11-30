import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaListAlt, FaPhoneAlt, FaRegEdit, FaSignOutAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const UserPanel = () => {

    const { UserLogOut } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        UserLogOut()
            .then(() => {
                toast.success("User Logged Out Successful...")
                navigate("/");
            })
            .catch((error) => {
                console.error(error)
                toast.error(`${error.message}`);
            })
    }

    return (
        <div>
            <ul className="menu space-y-3 text-xl font-semibold">
                <li >
                    <NavLink to='/dashboard/userProfile'>
                        <ImProfile /> My Profile
                    </NavLink>
                </li>
                <li >
                    <NavLink to="/dashboard/addProducts"> <FaRegEdit /> Add Products</NavLink>
                </li>
                <li >
                    <NavLink to='/dashboard/myProducts'> <FaListAlt /> My Products </NavLink>
                </li>
            </ul>
            <hr />
            <ul className="menu space-y-3 text-xl font-semibold">
                <li>
                    <NavLink to='/'> <FaHome />  Home </NavLink>
                </li>
                <li>
                    <NavLink to='/contactsUs'> <FaPhoneAlt />  Contacts </NavLink>
                </li>
                <li>
                    <button onClick={handleLogOut}><FaSignOutAlt />  Log Out</button>
                </li>


            </ul>
        </div>
    );
};

export default UserPanel;