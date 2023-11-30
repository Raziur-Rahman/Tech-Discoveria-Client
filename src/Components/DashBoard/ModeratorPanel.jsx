import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaListAlt, FaPhoneAlt, FaSignOutAlt } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const ModeratorPanel = () => {
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
            <h1 className="text-3xl">Moderator</h1>
            <ul className="menu space-y-3 text-xl font-semibold">
                <li >
                    <NavLink to='/dashboard/productsReview'>
                        <FaListAlt /> Product Review
                    </NavLink>
                </li>
                <li >
                    <NavLink to="/dashboard/reportedProducts"> <FaListCheck /> Reported Contents</NavLink>
                </li>
            </ul>
            <hr />
            <ul className="menu space-y-3 text-xl font-semibold">
                <li>
                    <NavLink to='/'> <FaHome />  Home </NavLink>
                </li>
                <li>
                    <NavLink to='/contacts'> <FaPhoneAlt />  Contact </NavLink>
                </li>
                <li>
                    <button onClick={handleLogOut}><FaSignOutAlt />  Log Out</button>
                </li>


            </ul>
        </div>
    );
};

export default ModeratorPanel;