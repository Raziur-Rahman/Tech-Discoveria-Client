import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import './Style.css';
import { WithContext as ReactTags } from 'react-tag-input';
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const KeyCodes = {
    comma: 188,
    enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];


const UpdateProductsPage = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [oldtags, setOldTags] = useState([]);
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const { data: product = {} } = useQuery({
        queryKey: ["Product", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${params.id}`)
            console.log(res.data);
            const dat = res?.data?.tags;
            setOldTags(dat);
            return res?.data;
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

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const Image = form.image.value;
        const link = form.link.value;
        const email = form.email.value;
        const ownerName = form.ownerName.value;
        const ownerImage = form.ownerImage.value;
        const description = form.description.value;

        const owner = { ownerName, ownerImage, email }

        let tags2 = [...oldtags];

        if (tags.length > 0) {

            tags.forEach(item => {
                tags2.push(item.name);
            })
        }

        // creting data object
        const {_id, ...rest} = product;
        const updatedInfo = {...rest, name, image: Image, ExternalLink: link, description, owner, tags: tags2 };

        // post data to the database
        const postRes = await axiosSecure.put(`/userProducts/${_id}`, updatedInfo);
        if (postRes?.data?.modifiedCount) {
            Swal.fire({
                title: "Success",
                text: "Your Product is Updated",
                icon: "success"
            });
            navigate("/dashboard/myProducts");

        }
        console.log(postRes.data);
    }

    return (
        <div className="w-full md:w-5/6 bg-base-300 mx-auto px-5 lg:px-20 py-8 my-12 rounded-md space-y-5 shadow-2xl">
            <div className="px-5 md:px-16 mb-10 text-center space-y-5">
                <h1 className="text-3xl">Update Products</h1>
            </div>
            <form onSubmit={handleUpdate}>
                <div className="flex flex-col lg:flex-row gap-5 ">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input type="text" defaultValue={product?.name} placeholder="Name" name='name'
                            className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Product Image</span>
                        </label>
                        <input type="text" defaultValue={product?.image} placeholder="Photo URL" name='image'
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
                        <input type="text" defaultValue={product?.ExternalLink} placeholder="External link" name="link" className="input input-bordered w-full " />
                    </div>
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Product Tags</span>
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
                    <input type="text" defaultValue={product?.description} placeholder="Short Description" name="description" className="input input-bordered w-full" required />
                </div>
                <input className="btn py-2 mt-4 bg-amber-700 text-white w-full hover:bg-amber-500" type="submit" value="Update Product" />
            </form>
        </div>
    );
};

export default UpdateProductsPage;