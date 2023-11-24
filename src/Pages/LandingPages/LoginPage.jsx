import { useEffect, useRef, useState } from "react";
import loginImg from "../../assets/authentication.gif"
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { BiLogoLinkedin } from "react-icons/bi";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";


const LoginPage = () => {
    const { UserGoogleLogin } = useAuth();
    const [disabled, setDisabled] = useState(true);
    const capchaRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadCaptchaEnginge(6)
    }, [])

    const handlevalidate = () => {
        const captchaValue = capchaRef.current.value;
        if (validateCaptcha(captchaValue, false)) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }

    }

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);
    }

    const handleGoogleLogin = () => {
        UserGoogleLogin()
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success("Login Successfull!!!");
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                toast.error(`${error.message}`);
            })
    }

    return (
        <div className="hero min-h-screen bg-logInBg bg-center bg-contain">
            <Helmet>
                <title>Tech Discoveria | LogIn </title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row bg-base-100 shadow-xl bg-center bg-cover w-4/5 mx-auto min-h-[80vh] rounded-xl">
                <div>
                    <img className="hidden lg:block" src={loginImg} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm">
                    <h1 className="text-4xl font-semibold text-center">LogIn</h1>
                    <form onSubmit={handleLogin} className="card-body pt-2 pb-2">
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
                        <div>
                            <LoadCanvasTemplate />
                        </div>
                        <div className="form-control">
                            <input disabled={!disabled} onChange={handlevalidate} ref={capchaRef} type="text" name="captcha" placeholder="Type here" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-3">
                            <button disabled={disabled} className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className="flex flex-col justify-center items-center gap-2 mt-0 pt-0">
                        <p className=" text-[#D1A054] font-semibold">New Here? <Link to="/signup">Create a new Account</Link></p>
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

export default LoginPage;