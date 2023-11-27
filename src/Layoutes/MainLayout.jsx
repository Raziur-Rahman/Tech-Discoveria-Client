import { Outlet } from "react-router-dom";
import Navber from "../Components/Shared/Navber";
import Footer from "../Components/Shared/Footer";


const MainLayout = () => {
    return (
        <div>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;