import { Helmet } from "react-helmet-async";


const Homepage = () => {
    return (
        <div>
            <Helmet>
                <title>Tech discoveria | Home Page</title>
            </Helmet>
            <h1 className="text-7xl">This is Home page</h1>
        </div>
    );
};

export default Homepage;