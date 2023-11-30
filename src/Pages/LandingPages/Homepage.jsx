import { Helmet } from "react-helmet-async";
import FeaturedProducts from "../../Components/Home/FeaturedProducts";
import TrendingProducts from "../../Components/Home/TrendingProducts";
import Banner from "../../Components/Home/Banner";
import ContactUs from "../../Components/Home/ContactUs";


const Homepage = () => {
    return (
        <div className="mt-8">
            <Helmet>
                <title>Tech discoveria | Home Page</title>
            </Helmet>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Homepage;