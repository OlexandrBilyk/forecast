import { useGetNatureImagesQuery } from "../../redux/pixabay/pixabayApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import styles from "./Nature.module.scss";

export default function Nature() {
  const { data, isLoading, isError } = useGetNatureImagesQuery();

  if (isLoading) return <p>Loading images...</p>;
  if (isError) return <p>Error loading images</p>;

  return (
    <section className={styles.nature}>
      <h2 className={styles.title}>Beautiful nature</h2>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className={styles.swiper}
      >
        {data.hits.map((img) => (
          <SwiperSlide key={img.id} className={styles.slide}>
            <img src={img.webformatURL} alt={img.tags} className={styles.img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
