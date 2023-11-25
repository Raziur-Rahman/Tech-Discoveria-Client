import { Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import AdminPanel from "../Components/DashBoard/AdminPanel";
import ModeratorPanel from "../Components/DashBoard/ModeratorPanel";
import UserPanel from "../Components/DashBoard/UserPanel";


const Dashboard = () => {
    const {userStatus } = useAuth();
    const {isAdmin, isModerator} = userStatus;

    return (
        <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto">
            <div className="w-72 p-2 space-y-5 min-h-screen bg-[#D1A054]">
                <div className="flex justify-center items-center">
                    <img className="w-[180px] rounded-full" src="https://i.ibb.co/H4MhF6F/Tech-logo.png" alt="" />

                </div>
                {
                    isAdmin && <AdminPanel></AdminPanel>
                }
                {
                    isModerator && <ModeratorPanel></ModeratorPanel>
                }
                {
                    !isAdmin && !isModerator && <UserPanel></UserPanel>
                }
                
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;