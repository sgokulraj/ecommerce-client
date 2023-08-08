import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Stylesheets/Carousels.css"
import Figure from 'react-bootstrap/Figure';

function Carousels({ product }) {
    const settings = {
        infinite: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
        autoplay: true,
        autoplaySpeed: 3000,
    }

    return (
        <>
            <div className="imgslider">
                <Slider {...settings}>
                    {product.pictures.map((picture) => (
                        <div key={picture.public_id}>
                            <img src={picture.url} alt={picture.public_id} className="carouselImg" />
                            {/* <Figure>
                                <Figure.Image
                                    width={400}
                                    height={300}
                                    alt={picture.public_id}
                                    src={picture.url}
                                />
                            </Figure> */}
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    )
}





export default Carousels;


