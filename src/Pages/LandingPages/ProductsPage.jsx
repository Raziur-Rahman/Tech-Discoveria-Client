import { Helmet } from "react-helmet-async";
import ProductsCard from "../../Components/Shared/ProductsCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useEffect } from "react";


const ProductsPage = () => {
    const [url, setUrl] = useState(null);
    const axiosPublic = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const productsPerPage = 20;

    const { data } = useQuery({
        queryKey: ["totalCount"],
        queryFn: async () => {
            const res = await axiosPublic.get('/productsCount');
            const pageCount = Math.ceil(res?.data?.count / productsPerPage);
            setTotalPage(pageCount);
            return res.data;
        }
    })

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ["ProductsShow", "Searchdata", currentPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/page/products?page=${currentPage}&size=${productsPerPage}`)
            console.log(res.data);
            return res?.data;
        }
    })

    const { data: SearchProducts = [] } = useQuery({
        queryKey: ["SearchProducts", url],
        enabled: url?.length > 0,
        queryFn: async () => {
            console.log(url)
            const res = await axiosPublic.get(url)
            console.log(res.data);
            return res?.data;
        }
    })

    useEffect(()=>{
        
    }, [])

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }


    const handleSearch = () => {
        const textField = document.getElementById("searchBar");
        const text = textField.value;

        // const data = text.split(" ");
        setUrl(`/searchProducts?search=${text}`);
        textField.value = '';
    }

    return (
        <div className="px-5 lg:px-0 my-10">
            <Helmet>
                <title>Tech Discoveria | Products </title>
            </Helmet>
            <div className="flex justify-center items-center">
                <div className="join mb-10 mt-2">
                    <input id="searchBar" className="input input-bordered join-item" placeholder="Search by tags" />
                    <button onClick={handleSearch} className="btn join-item rounded-r-full">Search</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
                {
                    SearchProducts?.length > 0 && SearchProducts?.map(item => <ProductsCard key={item._id} product={item}></ProductsCard>)
                }
            </div>

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
                    <button disabled={currentPage + 1 === 1} onClick={handlePrevPage} className="join-item btn text-2xl">«</button>
                    <button className="join-item btn">Page {currentPage + 1}</button>
                    <button disabled={currentPage + 1 === totalPage} onClick={handleNextPage} className="join-item btn text-2xl">»</button>
                </div>
            </div>

        </div>
    );
};

export default ProductsPage;