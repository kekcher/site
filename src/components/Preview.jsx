import React from 'react';
import { useNavigate } from 'react-router-dom';

import { mainContext } from '../App';
import { userId } from '../App';

import '../css/Preview.css';

const Preview = () => {
  const navigate = useNavigate();

  const { setPage, profile, setStateFull, stateFull, Conversion} = React.useContext(mainContext);

  let subsriptions = Conversion('count', profile.subscribers.length);
  let subscribers =  Conversion('count', profile.subscribers.length);

  React.useEffect(() => {
    if (!profile.nickname) {
      navigate('*');
    }

    let screenY = null;
    let clientY = null;
    let scroll = null;
    let blur = null;
    const previewBox = document.getElementById('swipe_preview');

    previewBox.addEventListener('touchstart', (e) => {
      screenY = e.touches[0].screenY;
      clientY = e.touches[0].screenY;
      scroll = 0;
      blur = 5;
    });

    previewBox.addEventListener('touchmove', (e) => {
      if (Math.abs(screenY - e.touches[0].screenY) >= 20) {
        if (e.touches[0].screenY <= clientY) {
          if (scroll < 50) {
            scroll++;
            if(blur > 0){
              blur -= 0.2;
            }
            clientY = e.touches[0].screenY;
            previewBox.style.transform = `translateY(-${scroll}%)`;
            document.querySelector('footer').style.filter = `blur(${blur}px)`
          } else {
            goBack();
          }
        } else {
          if (scroll > 0) {
            scroll--;
            if(blur < 5){
              blur += 0.2;
            }
            previewBox.style.transform = `translateY(-${scroll}%)`;
            document.querySelector('footer').style.filter = `blur(${blur}px)`
          }
        }
      }
    });

    previewBox.addEventListener('touchend', () => {
      if (scroll < 20) {
        previewBox.style.transform = `translateY(0%)`;
        document.querySelector('footer').style.filter = `blur(5px)`;
      } else {
        goBack();
      }
    });
  }, [stateFull.openPreview]);

  const goBack = () => {

    document.querySelector('footer').style.filter = 'blur(0px)';

    setStateFull({
      ...stateFull,
      openPreview: false,
    });

    if (!stateFull.openComments) {
      document.body.style.overflow = '';
    }

  };

  const goToProfile = () => {
    document.body.style.overflow = '';

    setStateFull({
      openPreview: false,
      openComments: false,
      openImage: false,
    });

    profile.userId !== userId
      ? navigate(`/user_profile/${profile.nickname}`)
      : navigate('/profile');
    setPage('profile');
  };

  return (
    <>
      <div id="swipe_preview" className="preview_user_container" style={{ background: `url(${profile.background})`}}>
        <div className="preview_user_avatar">
          <img
            className="avatar_picture"
            src={profile.avatar}
            alt="avatar"
            onClick={goToProfile}
          />
        </div>
        <div className="preview_user_nickname_box">
          <h1 className="preview_user_nickname">{profile.nickname}</h1>
          <p className="preview_user_role">{profile.role}</p>
        </div>
        <div className="preview_user_sign_box">
          <div className="preview_user_count_container">
            <div className="preview_user_count">
              <p className="count">{subsriptions}</p>
              <p className="count_sign">Подписки</p>
            </div>
            <div className="preview_user_count">
              <p className="count">{subscribers}</p>
              <p className="count_sign">Подписчики</p>
            </div>
          </div>
          <p className="idea_sign">{profile.idea}</p>
        </div>
        <i className="icon-rowupp rowupp"></i>
      </div>
    </>
  );
};

export default Preview;
