import useProducts from "../../Hooks/useProducts";
import ProductsCard from "../Shared/ProductsCard";
import SectionHeading from "../Shared/SectionHeading";


const FeaturedProducts = () => {
    const [products] = useProducts();

    const featuredProducts = products.filter(item => item.category === "Featured");

    return (
        <div className="px-5 lg:px-0">
            <SectionHeading heading={"Featured Products"} subHeading={"----Check Out----"}></SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {
                    featuredProducts.map(item => <ProductsCard key={item._id} product={item}></ProductsCard>)
                }
            </div>
        </div>
    );
};

export default FeaturedProducts;