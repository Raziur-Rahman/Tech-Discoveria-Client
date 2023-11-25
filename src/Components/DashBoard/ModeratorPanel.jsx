import { NavLink } from "react-router-dom";
import { FaHome, FaListAlt, FaSignOutAlt } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";

const ModeratorPanel = () => {
    return (
        <div>
            <h1 className="text-3xl">Moderator</h1>
            <ul className="menu space-y-3 text-xl font-semibold">
                <li >
                    <NavLink to='/dashboard/productsReview'>
                        <FaListAlt /> Product Review
                    </NavLink>
                </li>
                <li >
                    <NavLink to="/dashboard/reportedProducts"> <FaListCheck /> ALL USERS</NavLink>
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

export default ModeratorPanel;