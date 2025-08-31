// ImageCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import img1 from "../../assets/images/Kiosk 1.png";
import img2 from "../../assets/images/Kiosk 2.png";
import img3 from "../../assets/images/Kiosk 3.png";
import img4 from "../../assets/images/Kiosk 4.png";

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

export default function ImageCarousel() {
  return (
    <>
      <Swiper
        className="image-carousel"
        modules={[Navigation, Autoplay, EffectCoverflow]}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="coverflow"
        grabCursor
        loop={false}
        // 데스크탑 기본값
        slidesPerView={2.5}
        centeredSlides={true}
        breakpoints={{
          // 모바일에서는 Swiper에 폭 계산을 맡긴다 (슬라이드 1개, 가운데 정렬 끔)
          0: { slidesPerView: 1, centeredSlides: false, spaceBetween: 16 },
          640: { slidesPerView: 1.2, centeredSlides: true, spaceBetween: 20 },
          768: { slidesPerView: 2, centeredSlides: true, spaceBetween: 24 },
          1024: { slidesPerView: 2.5, centeredSlides: true, spaceBetween: 32 },
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 1.5,
          scale: 0.95,
          slideShadows: false,
        }}
        style={{ maxWidth: "100vw", margin: "0 auto", paddingBottom: 60 }}
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            {/* 이미지와 텍스트를 같은 폭으로 묶는 래퍼 */}
            <div className="slide-inner">
              <img
                src={s.image}
                alt={s.title}
                className="image-carousel__img"
              />
              <h3 className="image-carousel__title">{s.title}</h3>
              <p className="image-carousel__desc">{s.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        /* 공통 스타일 */
        .image-carousel__img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          border-radius: 20px;
          box-shadow: 0 10px 35px rgba(0,0,0,.3);
        }
        .image-carousel__title { margin-top: 15px; color: #fff; text-align: center; }
        .image-carousel__desc  { color: #ccc; font-size: .9rem; text-align: center; }

        /* 데스크탑/태블릿: 기존 레이아웃 유지 */
        .image-carousel .swiper-slide { width: auto; }
        .slide-inner { width: 100%; margin: 0 auto; }

        /* 모바일: Swiper가 슬라이드 폭을 관리 -> 우리는 내부 콘텐츠 폭만 동일하게 맞춘다 */
        @media (max-width: 640px) {
          /* 슬라이드 폭은 건드리지 않음(중요!) */
          .slide-inner {
            width: 90%;            /* 이미지와 텍스트 모두 이 폭을 사용 */
            max-width: 360px;      /* 작은 폰에서도 안정적 */
            margin: 0 auto;        /* 중앙 정렬 */
          }
          .image-carousel__img { width: 100%; }
          .image-carousel__title,
          .image-carousel__desc { width: 100%; margin-left: auto; margin-right: auto; }
        }
      `}</style>
    </>
  );
}
