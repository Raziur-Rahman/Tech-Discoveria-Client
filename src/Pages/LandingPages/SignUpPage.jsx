import loginImg from "../../assets/authentication.gif"
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { BiLogoLinkedin } from "react-icons/bi";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";


const SignUp = () => {

    const { UserGoogleLogin, UserRegitration } = useAuth();
    const navigate = useNavigate();

    const handleCreateUser = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.Photo.value;

        UserRegitration(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                if (user?.email) {
                    updateProfile(user, {
                        displayName: name,
                        photoURL: photo
                    })
                        .then(() => {
                            toast.success("User created Successfuly....");
                            navigate("/")
                        })
                        .catch((error) => {
                            console.log(error);
                            toast.error("Update failed..")
                        })
                }
            })
            .catch(error => {
                console.error(error);
                toast.error("Registration failed...")
            })
    }

    const handleGoogleLogin = () => {
        UserGoogleLogin()
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success("Login Successful...");
                navigate('/')

            })
            .catch(error => {
                console.error(error);
                toast.error(`${error.message}`)
            })
    }


    return (
        <div className="hero min-h-screen bg-logInBg bg-center bg-contain">
            <Helmet>
                <title>Bistro Boss | Create User </title>
            </Helmet>
            <div className="hero-content bg-base-100 flex-col lg:flex-row-reverse shadow-xl w-4/5 mx-auto min-h-[80vh] rounded-xl">
                <div>
                    <img className="hidden lg:block" src={loginImg} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm">
                    <h1 className="text-4xl font-semibold text-center">Sign Up</h1>
                    <form onSubmit={handleCreateUser} className="card-body pt-2 pb-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Profile Photo</span>
                            </label>
                            <input type="text" placeholder="Photo URL" name="Photo" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-3">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <div className="flex flex-col justify-center items-center gap-4 mt-0 pt-0">
                        <p className=" text-[#D1A054] font-semibold">Already registered? <Link to="/login">Go to log in</Link></p>
                        <p>Or sign up with</p>
                        <div className="space-x-5 my-2">
                            <button className="btn btn-circle text-xl bg-slate-200  text-[#0A66C2]"> <FaFacebookF></FaFacebookF> </button>
                            <button className="btn btn-circle bg-slate-200  text-xl text-[#0A66C2]"><BiLogoLinkedin></BiLogoLinkedin></button>
                            <button onClick={handleGoogleLogin} className="btn btn-circle bg-slate-200 text-xl"><FcGoogle></FcGoogle></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;