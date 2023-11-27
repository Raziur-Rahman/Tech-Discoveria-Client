import { Outlet } from "react-router-dom";
import Navber from "../Components/Shared/Navber";
import Footer from "../Components/Shared/Footer";


const MainLayout = () => {
    return (
        <div className='lg:max-w-screen-xl mx-auto'>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;