import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import './Style.css';
import { WithContext as ReactTags } from 'react-tag-input';
import { useQuery } from "@tanstack/react-query";


const KeyCodes = {
    comma: 188,
    enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];


const UpdateProductsPage = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const {data: product ={} } =useQuery({
        queryKey: ["Product", user?.email],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/newProducts/`)
        }
    })

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setTags(newTags);
    };

    const params = useParams();
    console.log(params);

    const handleUpdate = (e) =>{
        e.preventDefault();

        // const form = e.target;

    }

    return (
        <div className="w-full md:w-5/6 bg-base-300 mx-auto px-5 lg:px-20 py-8 my-12 rounded-md space-y-5 shadow-2xl">
            <div className="px-5 md:px-16 mb-10 text-center space-y-5">
                <h1 className="text-3xl">Add New Products</h1>
            </div>
            <form onSubmit={handleUpdate}>
                <div className="flex flex-col lg:flex-row gap-5 ">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input type="text" placeholder="Name" name='name'
                            className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Product Image</span>
                        </label>
                        <input type="text"  placeholder="Photo URL" name='image'
                            className="input input-bordered w-full" required />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-5 ">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Owner Name</span>
                        </label>
                        <input type="text" defaultValue={user?.displayName} name='ownerName'
                            className="input input-bordered w-full" disabled />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Owner Image</span>
                        </label>
                        <input type="text" defaultValue={user?.photoURL} name="ownerImage" className="input input-bordered w-full" disabled />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-5 ">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Owner Email</span>
                        </label>
                        <input type="email" defaultValue={user?.email} placeholder="Email" name='email'
                            className="input input-bordered w-full" disabled />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">External Links</span>
                        </label>
                        <input type="text" placeholder="External link" name="link" className="input input-bordered w-full " />
                    </div>
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Product Name</span>
                    </label>
                    <div className="w-full bg-white rounded-md p-2">
                        <ReactTags
                            tags={tags}
                            delimiters={delimiters}
                            handleDelete={handleDelete}
                            handleAddition={handleAddition}
                            handleDrag={handleDrag}
                            labelField={'name'}
                            inputFieldPosition="inline"
                            autocomplete
                        />
                    </div>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input type="text" placeholder="Short Description" name="description" className="input input-bordered w-full" required />
                </div>
                <input className="btn py-2 mt-4 bg-amber-700 text-white w-full hover:bg-amber-500" type="submit" value="ADD Product" />
            </form>
        </div>
    );
};

export default UpdateProductsPage;