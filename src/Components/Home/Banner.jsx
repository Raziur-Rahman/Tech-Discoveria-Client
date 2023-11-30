import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true}>
            <div>
                <img src='https://i.ibb.co/RvFJ0H1/6864937-23324.jpg' />
            </div>
            <div>
                <img src="https://i.ibb.co/fCNbqPY/ai-nuclear-energy.jpg" />
            </div>
            <div>
                <img src="https://i.ibb.co/bBmVN2k/medium-shot-man-wearing-vr-glasses.jpg" />
            </div>
            <div>
                <img src="https://i.ibb.co/34B2LZZ/standard-quality-control-concept-m-1.jpg" />
            </div>
            <div>
                <img src="https://i.ibb.co/37JmpwB/standard-quality.jpg" />
            </div>
            
        </Carousel>
    );
};

export default Banner;