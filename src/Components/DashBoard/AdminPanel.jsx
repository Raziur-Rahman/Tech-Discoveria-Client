import { NavLink, useNavigate } from "react-router-dom";
import { RiCoupon3Fill } from "react-icons/ri";
import { FcStatistics } from "react-icons/fc";
import { FaHome, FaPhoneAlt, FaSignOutAlt, FaUsers } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";


const AdminPanel = () => {
    const {UserLogOut} = useAuth();
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
                    <NavLink to='/dashboard/adminStatistics'>
                        <FcStatistics /> Statistic
                    </NavLink>
                </li>
                <li >
                    <NavLink to="/dashboard/users"> <FaUsers /> ALL USERS</NavLink>
                </li>
                <li >
                    <NavLink to='/dashboard/manageCoupons'> <RiCoupon3Fill /> Manage Coupons</NavLink>
                </li>
            </ul>
            <hr />
            <ul className="menu space-y-3 text-xl font-semibold">
                <li>
                    <NavLink to='/'> <FaHome />  Home </NavLink>
                </li>
                <li>
                    <NavLink to='/contactsUs'><FaPhoneAlt></FaPhoneAlt>  Contact </NavLink>
                </li>
                <li>
                    <button onClick={handleLogOut}><FaSignOutAlt />  Log Out</button>
                </li>


            </ul>
        </div>
    );
};

export default AdminPanel;