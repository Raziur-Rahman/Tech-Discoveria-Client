import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layoutes/MainLayout";
import Homepage from "../Pages/LandingPages/Homepage";
import LoginPage from "../Pages/LandingPages/LoginPage";
import SignUpPage from "../Pages/LandingPages/SignUpPage";
import ErrorPage from "../Pages/LandingPages/ErrorPage";
import ProductsPage from "../Pages/LandingPages/ProductsPage";
import DashBoard from "../Layoutes/DashBoard";
import StatisticsPage from "../Pages/DashBoardPages/AdminDashboardPages/StatisticsPage";
import ProfilePage from "../Pages/DashBoardPages/UserDashboardPages/ProfilePage";
import AddProductsPage from "../Pages/DashBoardPages/UserDashboardPages/AddProductsPage";
import MyProductsPage from "../Pages/DashBoardPages/UserDashboardPages/MyProductsPage";
import ProductsReviewPage from "../Pages/DashBoardPages/ModeratorsPages/ProductsReviewPage";
import RepotedProductsPage from "../Pages/DashBoardPages/ModeratorsPages/RepotedProductsPage";
import ManageUsersPage from "../Pages/DashBoardPages/AdminDashboardPages/ManageUsersPage";
import ManageCouponPage from "../Pages/DashBoardPages/AdminDashboardPages/ManageCouponPage";
import ProductDetails from "../Pages/LandingPages/ProductDetails";
import UpdateProductsPage from "../Pages/DashBoardPages/UserDashboardPages/UpdateProductsPage";


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
            {
                path: '/products',
                element:<ProductsPage></ProductsPage>
            },
            {
                path: '/product/:id',
                element: <ProductDetails></ProductDetails>
            }
        ]
    },

    // DashBoard Routes
    {
        path: '/dashboard',
        element: <DashBoard></DashBoard>,
        children: [
            {
                path: '/dashboard/userProfile',
                element: <ProfilePage></ProfilePage>,
            },
            {
                path: '/dashboard/addProducts',
                element: <AddProductsPage></AddProductsPage>
            },
            {
                path: '/dashboard/myProducts',
                element: <MyProductsPage></MyProductsPage>
            },
            {
                path: "/dashboard/updateProducts/:id",
                element: <UpdateProductsPage></UpdateProductsPage>
            },

            // Moderators Routes
            {
                path: "/dashboard/productsReview",
                element: <ProductsReviewPage></ProductsReviewPage>,
            },
            {
                path:"/dashboard/reportedProducts",
                element: <RepotedProductsPage></RepotedProductsPage>
            },


            // admin Routes
            {
                path: '/dashboard/adminStatistics',
                element: <StatisticsPage></StatisticsPage>
            },
            {
                path: '/dashboard/users',
                element: <ManageUsersPage></ManageUsersPage>
            },
            {
                path: '/dashboard/manageCoupons',
                element: <ManageCouponPage></ManageCouponPage>
            }
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