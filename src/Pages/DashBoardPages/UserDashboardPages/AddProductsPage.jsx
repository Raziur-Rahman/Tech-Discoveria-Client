import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";

import './Style.css';
import { WithContext as ReactTags } from 'react-tag-input';
import moment from "moment";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
const KeyCodes = {
    comma: 188,
    enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProducts = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [tags, setTags] = useState([]);

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

    const handleSubmit = async event => {
        event.preventDefault();
        const form = event.target;

        const name = form.name.value;
        const Image = form.image.files;
        const link = form.link.value;
        const email = form.email.value;
        const ownerName = form.ownerName.value;
        const ownerImage = form.ownerImage.value;
        const description = form.description.value;
        const timestamp = moment().toISOString();

        const owner = { ownerName, ownerImage, email }

        let tags2 = [];
        tags.forEach(item => {
            tags2.push(item.name);
        })
        const file = { image: Image[0] };

        const res = await axiosPublic.post(image_hosting_api, file, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res?.data?.success) {
            const itemInfo = { name, owner, description, ExternalLink: link, timestamp, tags: tags2, status: "pending", category: "tech", image: res.data?.data?.display_url };
            console.log(itemInfo);
            const postRes = await axiosSecure.post('/newProducts', itemInfo);
            if (postRes?.data?.insertedId) {
                Swal.fire({
                    title: "Success",
                    text: "Your Food Item has Been Added",
                    icon: "success"
                });
                // navigate(`/orderFood/${itemDetail.category}`);

            }
            console.log(postRes.data);
        }
        // console.log(res?.data);
    }

    return (
        <>
            <div className="w-full md:w-5/6 bg-base-300 mx-auto px-5 lg:px-20 py-8 my-12 rounded-md space-y-5 shadow-2xl">
                <div className="px-5 md:px-16 mb-10 text-center space-y-5">
                    <h1 className="text-3xl">Add New Products</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col lg:flex-row gap-5 ">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input type="text" placeholder="Name" name='name'
                                className="input input-bordered w-full" required />
                        </div>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Pick a Image file</span>
                            </div>
                            <input type="file" name="image" className="file-input file-input-bordered w-full" required />
                        </label>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-5 ">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Owner Name</span>
                            </label>
                            <input type="text" defaultValue={user?.displayName} name='ownerName'
                                className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Owner Image</span>
                            </label>
                            <input type="text" defaultValue={user?.photoURL} name="ownerImage" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-5 ">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Owner Email</span>
                            </label>
                            <input type="email" defaultValue={user?.email} placeholder="Email" name='email'
                                className="input input-bordered w-full" />
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
                            <span className="label-text">Short Description</span>
                        </label>
                        <input type="text" placeholder="Short Description" name="description" className="input input-bordered w-full" />
                    </div>
                    <input className="btn py-2 mt-4 bg-amber-700 text-white w-full hover:bg-amber-500" type="submit" value="ADD Product" />
                </form>
            </div>

        </>
    );
};


export default AddProducts;