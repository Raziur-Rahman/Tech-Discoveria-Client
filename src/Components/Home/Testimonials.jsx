import SectionHeading from "../Shared/SectionHeading";
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import moment from "moment";


const Testimonials = ({ reviews }) => {

    return (
        <section className="lg:mx-24 lg:mb-10">
            <SectionHeading heading={"REVIEWS"} subHeading={"---What Our Users Say---"}></SectionHeading>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews?.map(item => <SwiperSlide key={item._id}>
                        <div className="w-2/3 mx-auto flex flex-col justify-center items-center gap-6 text-center my-10">
                            <div className="flex space-x-4 md:w-1/2 p-10">
                                <img alt="" src={item?.reviewerImage} className="object-cover w-20 h-20 rounded-full shadow dark:bg-gray-500" />
                                <div className="flex flex-col space-y-1">
                                    <a rel="noopener noreferrer" href="#" className="text-2xl font-semibold">{item?.reviewerName}</a>
                                    <span className="text-lg dark:text-gray-400">{moment(item?.timestamp).fromNow()}</span>
                                </div>
                            </div>
                            <Rating style={{ maxWidth: 180 }} value={item?.ratings} readOnly />
                            <p>{item?.reviewDescription}</p>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>



        </section>
    );
};

export default Testimonials;

Testimonials.propTypes = {
    reviews: PropTypes.object
}