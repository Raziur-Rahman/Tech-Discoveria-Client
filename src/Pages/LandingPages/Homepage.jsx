import { Helmet } from "react-helmet-async";
import FeaturedProducts from "../../Components/Home/FeaturedProducts";
import TrendingProducts from "../../Components/Home/TrendingProducts";


const Homepage = () => {
    return (
        <div>
            <Helmet>
                <title>Tech discoveria | Home Page</title>
            </Helmet>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
        </div>
    );
};

export default Homepage;