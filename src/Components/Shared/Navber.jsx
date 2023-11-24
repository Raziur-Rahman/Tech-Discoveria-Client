import { Link, NavLink } from "react-router-dom";




const Navber = () => {

    const navOptions = <>
        <li className="font-semibold"> <NavLink to='/'>Home</NavLink> </li>
        <li className="font-semibold"> <NavLink to='/products'>Products</NavLink> </li>
    </>

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
                <Link to="/login"><button className="btn btn-outline">Sign In</button></Link>
                <Link to="/signup"><button className="btn btn-outline">Registration</button></Link>
            </div>
        </div>
    );
};

export default Navber;