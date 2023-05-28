import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import '../css/FullMode.css';
import 'swiper/css';
import { mainContext } from '../App';

const FullMode = ({ imgs }) => {

  const [currentSlide, setCurrentSlide] = React.useState(1);

  const {setStateFull, stateFull} = React.useContext(mainContext);

  return (
    <div className="full_mode">
      <i
        className="icon-cancel close_full"
        onClick={() => {
          setStateFull({
            ...stateFull,
            openImage: false
          })
        }}></i>

      <Swiper
        spaceBetween={40}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={1}
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.realIndex + 1);
        }}
        className="swiper_container">
        {imgs.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <img className="full_picture" src={item} alt="Full image" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {imgs.length !== 1 && (
        <p className="count_pictures">
          {currentSlide} / {imgs.length}
        </p>
      )}
    </div>
  );
};

export default FullMode;
