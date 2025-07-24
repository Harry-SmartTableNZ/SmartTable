import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import img1 from "../../assets/images/Image 1.jpg";
import img2 from "../../assets/images/Image 2.jpg";
import img3 from "../../assets/images/Image 3.jpg";
import img4 from "../../assets/images/Image 4.jpg";

const slides = [
  {
    image: img1,
    title: "Step 1: Choose Menu Item",
    description: "Easily browse and select items using the interactive tablet.",
  },
  {
    image: img2,
    title: "Step 2: Add to Cart",
    description: "Check your cart, make edits, and proceed when ready.",
  },
  {
    image: img3,
    title: "Step 3: Place Order",
    description:
      "Place your order through the kiosk without having to wait for staff",
  },
  {
    image: img4,
    title: "Order Confirmed",
    description: "Sit back and relax while we prepare your meal.",
  },
];

const ImageCarousel = () => {
  return (
    <Swiper
      modules={[Navigation, Autoplay, EffectCoverflow]}
      navigation
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      effect="coverflow"
      grabCursor
      centeredSlides={true}
      loop={false} // IMPORTANT: turn off loop to prevent extra left clone
      slidesPerView={2.5} // Visible center + sides
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 150,
        modifier: 1.5,
        scale: 0.9,
        slideShadows: false,
      }}
      style={{
        maxWidth: "90vw",
        margin: "auto",
        paddingBottom: "60px",
        overflow: "visible",
      }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            style={{
              textAlign: "center",
              overflow: "visible",
              position: "relative",
              zIndex: 2,
            }}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                borderRadius: "20px",
                boxShadow: "0 10px 35px rgba(0,0,0,0.3)",
              }}
            />
            <h3 style={{ marginTop: "15px", color: "#fff" }}>{slide.title}</h3>
            <p style={{ color: "#ccc", fontSize: "0.9rem" }}>
              {slide.description}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
