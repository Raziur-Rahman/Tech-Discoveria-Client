import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import axios from "axios";

const googleProvider = new GoogleAuthProvider;

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userStatus, setUserStatus] = useState({isAdmin: false, isModerator: false})

    const UserRegitration = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const UserLogIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const UserLogOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const UserGoogleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const UpdateProfile = ( obj ) =>{
        setLoading(true);
        updateProfile(user, obj);
    }


    // Observe the auth state changes in this Section
    useEffect(() => {
        const unSubScribe = onAuthStateChanged(auth,  async(currentUser) => {
            console.log('Current user: ', currentUser)
            setUser(currentUser);
            if(currentUser){
                const userinfo = {email : currentUser?.email}
                axiosPublic.post('/jwt', userinfo)
                .then(res =>{
                    const token = res?.data?.token;
                    if(token){
                        localStorage.setItem("access_token", token);
                        axios.get(`https://tech-discoveria-server.vercel.app/users/role/${currentUser?.email}`, {
                            headers: {
                                authorization: `bearer ${token}`
                            }
                        })
                        .then(res =>{
                            const role = res.data;
                            if(role === "admin"){
                                setUserStatus({isAdmin: true, isModerator: false})
                            }
                            else if(role === "moderator"){
                                setUserStatus({isAdmin: false, isModerator: true})
                            }
                            else{
                                setUserStatus({isAdmin: false, isModerator: false})
                            }
                        })
                        
                        setLoading(false);
                    }
                })
            }
            else{
                localStorage.removeItem("access_token");
                setUserStatus({isAdmin: false, isModerator: false})
                setLoading(false);
            }
            
        })
        return () => {
            unSubScribe();
        }
    }, [axiosPublic])

    const authInfo = { user, UserRegitration, UserLogIn, loading, UserLogOut, UserGoogleLogin, UpdateProfile, userStatus }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
}