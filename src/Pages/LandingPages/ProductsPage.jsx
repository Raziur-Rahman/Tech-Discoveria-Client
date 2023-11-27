import { Helmet } from "react-helmet-async";
import useProducts from "../../Hooks/useProducts";
import ProductsCard from "../../Components/Shared/ProductsCard";


const ProductsPage = () => {

    const [products] = useProducts();

    return (
        <div className="px-10 my-10">
            <Helmet>
                <title>Tech Discoveria | Products </title>
            </Helmet>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {
                    products.map(item => <ProductsCard key={item._id} product={item}></ProductsCard>)
                }
            </div>
        </div>
    );
};

export default ProductsPage;