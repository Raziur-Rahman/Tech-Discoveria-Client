import { Helmet } from "react-helmet-async";
import ProductsCard from "../../Components/Shared/ProductsCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


const ProductsPage = () => {
    const axiosPublic = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const productsPerPage = 20;

    const { data } = useQuery({
        queryKey:["totalCount"],
        queryFn: async ()=>{
            const res = await axiosPublic.get('/productsCount');
            const pageCount = Math.ceil( res?.data?.count / productsPerPage);
            setTotalPage(pageCount);
            return res.data;
        }
    })

    const {data : products=[], isLoading, refetch} = useQuery({
        queryKey: ["ProductsShow", currentPage],
        queryFn: async ()=>{
            const res = await axiosPublic.get(`/page/products?page=${currentPage}&size=${productsPerPage}`)
            console.log(res.data);
            return res?.data;
        }
    })

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    return (
        <div className="px-5 lg:px-0 my-10">
            <Helmet>
                <title>Tech Discoveria | Products </title>
            </Helmet>
            {
                isLoading ? <div className="min-h-[70vh] flex justify-center items-center ">
                    <span className="loading loading-ring loading-xs"></span>
                    <span className="loading loading-ring loading-sm"></span>
                    <span className="loading loading-ring loading-md"></span>
                    <span className="loading loading-ring loading-lg"></span>
                </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {
                        products.map(item => <ProductsCard key={item._id} product={item} refetch={refetch} ></ProductsCard>)
                    }
                </div>
            }
            <div className="my-10 flex flex-row justify-center items-center md:w-1/4 mx-auto">
                <div className="join">
                    <button disabled={currentPage+1 === 1} onClick={handlePrevPage} className="join-item btn text-2xl">«</button>
                    <button className="join-item btn">Page {currentPage+1}</button>
                    <button disabled={currentPage+1 === totalPage} onClick={handleNextPage} className="join-item btn text-2xl">»</button>
                </div>
            </div>

        </div>
    );
};

export default ProductsPage;