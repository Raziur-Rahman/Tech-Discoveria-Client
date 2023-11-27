import useProducts from "../../Hooks/useProducts";
import ProductsCard from "../Shared/ProductsCard";
import SectionHeading from "../Shared/SectionHeading";


const TrendingProducts = () => {
    const [products] = useProducts();

    const trending = products.filter(item => item.category === "Trending")

    return (
        <div className="px-20">
            <SectionHeading heading={"Trending Product"} subHeading={"---- Watch this----"}></SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    trending.map(item => <ProductsCard key={item._id} product={item}></ProductsCard>)
                }
            </div>
        </div>
    );
};

export default TrendingProducts;