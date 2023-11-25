import { NavLink } from "react-router-dom";
import { FaHome, FaListAlt, FaPhoneAlt, FaRegEdit, FaSignOutAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const UserPanel = () => {
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
                    <NavLink to='/contacts'> <FaPhoneAlt />  Contacts </NavLink>
                </li>
                <li>
                    <button><FaSignOutAlt />  Log Out</button>
                </li>


            </ul>
        </div>
    );
};

export default UserPanel;