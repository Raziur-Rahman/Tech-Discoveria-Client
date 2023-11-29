import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth"
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionHeading from "../../../Components/Shared/SectionHeading";
import Payment from "./Payment";

const ProfilePage = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userData = {} } = useQuery({
        queryKey: ["userdata"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            console.log(res.data)
            return res.data;
        }
    })

    const { email, name, Membership } = userData;

    const handlePayment = () => {
        document.getElementById('my_modal_5').classList.add('modal-open');
    }

    const handleClose = () => {
        document.getElementById('my_modal_5').classList.remove("modal-open");
    }

    return (
        <div>
            <SectionHeading heading={`Welcome Back ${user?.displayName}`}></SectionHeading>
            <section className="flex flex-col justify-center items-center md:flex-row">
                <div className="w-96 h-96 flex flex-col justify-center items-center bg-gradient-to-r from-amber-600 to-blue-500 rounded-2xl shadow-xl">
                    <img className="w-2/3 rounded-full" src={user?.photoURL} alt="" />
                </div>
                <hr className="p-[2px]" />
                <div className="w-96 rounded-2xl shadow-xl text-white h-96 space-y-10 bg-gradient-to-r from-purple-500 to-pink-500 p-8">
                    <h1 className="text-2xl"><span className="font-bold">Name:</span> {name}</h1>
                    <h2 className="text-xl"><span className="font-bold">Email:</span> {email}</h2>

                    {
                        Membership !== "Subscribed" && <button onClick={handlePayment} className="btn btn-primary text-lg">Buy Membership At $20</button>
                    }
                    {
                        Membership === 'Subscribed' && <p className="text-lg"><span className="text-xl font-bold">Status: </span> Verified</p>
                    }
                </div>
                <dialog id="my_modal_5" className="modal ">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <Payment close={handleClose}></Payment>
                        <div className="modal-action space-x-5">
                            <button onClick={handleClose} className="btn btn-error">Cancel</button>
                        </div>
                    </div>
                </dialog>

            </section>
        </div>
    );
};

export default ProfilePage;