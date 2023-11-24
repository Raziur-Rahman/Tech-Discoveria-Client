import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layoutes/MainLayout";
import Homepage from "../Pages/LandingPages/Homepage";
import LoginPage from "../Pages/LandingPages/LoginPage";
import SignUpPage from "../Pages/LandingPages/SignUpPage";
import ErrorPage from "../Pages/LandingPages/ErrorPage";
const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Homepage></Homepage>,
            },
        ]
    },
    {
        path: '/login',
        element: <LoginPage></LoginPage>
    },
    {
        path: '/signup',
        element: <SignUpPage></SignUpPage>
    }
])


export default router;