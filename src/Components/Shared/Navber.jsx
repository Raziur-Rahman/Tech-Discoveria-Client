import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import profileImg from "../../assets/profile.png"




const Navber = () => {
    const { user, UserLogOut, userStatus } = useAuth();
    const navigate = useNavigate();
    // console.log(userStatus);
    const {isAdmin, isModerator} = userStatus;


    const navOptions = <>
        <li className="font-semibold"> <NavLink to='/'>Home</NavLink> </li>
        <li className="font-semibold"> <NavLink to='/products'>Products</NavLink> </li>
    </>

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
        <div className="navbar bg-base-300 shadow-xl py-5">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">
                    <img className="w-[50px] rounded-full" src="https://i.ibb.co/H4MhF6F/Tech-logo.png" alt="" /> Tech Discoveria
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end space-x-5">
                {
                    user ? <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full overflow-hidden">
                                <img alt="Tailwind" src={user?.photoURL ? user?.photoURL : profileImg} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="ml-3 text-xl">{user?.displayName}</li>
                            {
                                user && isAdmin && <li><Link to='/dashboard/adminStatistics'>DashBoard</Link></li>
                            }
                            {
                                user && isModerator && <li><Link to='/dashboard/productReview'>DashBoard</Link></li>
                            }
                            {
                                user && !isModerator && !isAdmin && <li><Link to='/dashboard/userProfile'>DashBoard</Link></li>
                            }
                            <li onClick={handleLogOut}><a>Logout</a></li>
                        </ul>
                    </div> : <>
                        <Link to="/login"><button className="btn btn-outline">Sign In</button></Link>
                        <Link to="/signup"><button className="btn btn-outline">Registration</button></Link>
                    </>
                }

            </div>
        </div>
    );
};

export default Navber;