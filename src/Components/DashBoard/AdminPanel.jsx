import { NavLink } from "react-router-dom";
import { RiCoupon3Fill } from "react-icons/ri";
import { FcStatistics } from "react-icons/fc";
import { FaHome, FaSignOutAlt, FaUsers } from "react-icons/fa";


const AdminPanel = () => {
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
                    <NavLink to='/dashboard/coupons'> <RiCoupon3Fill /> Manage Coupons</NavLink>
                </li>
            </ul>
            <hr />
            <ul className="menu space-y-3 text-xl font-semibold">
                <li>
                    <NavLink to='/'> <FaHome />  Home </NavLink>
                </li>
                <li>
                    <NavLink to='/contacts'>  Contact </NavLink>
                </li>
                <li>
                    <button><FaSignOutAlt />  Log Out</button>
                </li>


            </ul>
        </div>
    );
};

export default AdminPanel;