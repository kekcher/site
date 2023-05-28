import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import defaultPostPng from '../img/default_post.png';

import { mainContext } from '../App';
import { userId } from '../App';

import '../css/Post.css';

import users_data from '../data/users_data.json';

const Post = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { Conversion } = React.useContext(mainContext);

  const {
    postId = 0,
    type = '',
    authorId = 0,
    imgs = '',
    signImgs = '',
    stats = {},
    geoposition = '',
    time = '',
  } = props;


  let statsCount = {};

  for (const key in stats) {
    statsCount[key] = Conversion('count', stats[key].length);
  }

  const profile = users_data.find((obj) => obj.userId === authorId);
  const myProfile = users_data.find((obj) => obj.userId === userId);

  const { setFullImages, setCommentPostId, setProfile, setPage, setStateFull, stateFull } =
    React.useContext(mainContext);

  const firstImgSrc = imgs ? imgs[0] : defaultPostPng;

  const CONTENT_LIMIT = 10;

  const icons = ['icon-like', 'icon-comment', 'icon-repost', 'icon-flag'];
  const [activeIcons, setActiveIcons] = React.useState([]);

  const [fullPost, setFullPost] = React.useState(props.full);

  const goToComments = () => {
    document.body.style.overflow = 'hidden';
    document.querySelector('.mainBackground').style.filter = 'blur(5px)';
    setCommentPostId(postId);
    setStateFull({
      ...stateFull,
      openComments: true,
    });
  };

  const onClickIcon = (icon) => {
    if (activeIcons.includes(icon)) {
      setActiveIcons(activeIcons.filter((obj) => obj !== icon));
    } else {
      setActiveIcons([...activeIcons, icon]);
    }

    if (icon === 'icon-comment') {
      goToComments();
    }
  };

  const goToFullMode = (imgs, firstImg) => {
    const imgs_clone = Array.from(imgs);
    if (imgs_clone.length > 1)
      imgs_clone.sort(function (x, y) {
        return x === firstImg ? -1 : y === firstImg ? 1 : 0;
      });
    setFullImages(imgs_clone);
    setStateFull({
      ...stateFull,
      openImage: true,
    });
  };

  const goToPreview = () => {
    if (myProfile.viewUsers.find((obj) => obj === profile.userId) || profile.userId === userId) {
      goToProfile();
    } else {
      if (
        location.pathname !== `/user_profile/${profile.nickname}` &&
        location.pathname !== '/profile'
      ) {
        document.body.style.overflow = 'hidden';
        document.querySelector('footer').style.filter = `blur(5px)`;
        setProfile(profile);
        setStateFull({
          ...stateFull,
          openPreview: true,
        });
      }
    }
  };

  const goToProfile = () => {
    setStateFull({
      ...stateFull,
      openComments: false,
      openPreview: false,
    });
    document.body.style.overflow = '';
    document.querySelector('.mainBackground').removeAttribute('style');
    profile.userId !== userId
      ? navigate(`/user_profile/${profile.nickname}`)
      : navigate('/profile');
    setPage('profile');
  };

  return (
    <div className={fullPost ? 'post open_post' : 'post'}>
      {!fullPost ? (
        <div className="author_post">
          <div className="avatar_author_post">
            <img
              className="avatar_picture"
              src={profile.avatar}
              alt="user avatar"
              onClick={goToPreview}
            />
          </div>
          <div className="author_nick">
            <p className="nickname" onClick={goToPreview}>
              {profile.nickname}
            </p>
            <p className="geolocation">
              <i className="icon-geolocation" style={{ fontSize: '12px' }}></i>
              {geoposition}
            </p>
          </div>
        </div>
      ) : (
        <div
          className="user_history_box"
          style={{
            marginTop: '11px',
            paddingTop: '40px',
            alignItems: 'center',
            marginRight: '31px',
          }}>
          <div className="user_history_avatar">
            <img
              className="avatar_picture"
              src={profile.avatar}
              alt="user avatar"
              onClick={goToProfile}
            />
          </div>

          <p className="nickname" style={{ paddingBottom: '2px' }}>
            {profile.nickname}
          </p>
          <p className="geolocation">
            <i className="icon-geolocation" style={{ fontSize: '12px' }}></i>
            {geoposition}
          </p>
        </div>
      )}

      <div className="post_sign">
        {signImgs && (
          <p className={type != 'case' ? 'post_text' : 'post_text case_text'}>{signImgs[0]}</p>
        )}
        {type === 'case' && (
          <div className="author_post case_author">
            <div className="avatar_author_post case_avatar">
              <img
                className="avatar_picture case_avatar"
                src={profile.avatar}
                alt="user avatar"
                onClick={goToPreview}
              />
            </div>
            <div className="author_nick">
              <p className="nickname case_nick" onClick={goToPreview}>
                {profile.nickname}
              </p>
            </div>
          </div>
        )}

        <img
          className={type === 'case' ? 'post_one_item case_filter' : 'post_one_item'}
          src={firstImgSrc}
          alt="Post picture"
          onClick={() => {
            fullPost ? goToFullMode(imgs ? imgs : [firstImgSrc], firstImgSrc) : goToComments();
          }}
        />

        {fullPost ? (
          <>
            {imgs && imgs.length <= CONTENT_LIMIT
              ? imgs.map((path, index) => {
                  if (index !== 0)
                    return (
                      <div key={index}>
                        {signImgs[index] ? <p className="post_text">{signImgs[index]}</p> : null}
                        <img
                          className={
                            type === 'case' ? 'post_one_item case_filter' : 'post_one_item'
                          }
                          src={path}
                          alt="img post"
                          onClick={() => goToFullMode(imgs, path)}
                        />
                      </div>
                    );
                })
              : null}
            {/* {props.videos && props.videos.length <= CONTENT_LIMIT
              ? props.videos.map((path, index) => {
                return (
                  <div key={index}>
                    {props.signVideos[index] ? (
                      <p className="post_text">{props.signVideos[index]}</p>
                    ) : null}
                    <video
                      key={index}
                      controls
                      className="post_one_item"
                      src={path}
                      type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'></video>
                  </div>
                );
              })
              : null} */}
          </>
        ) : null}
      </div>
      <div
        className="post_icons"
        onClick={(e) => {
          if (!e.target.getAttribute('name')) {
            return;
          } else {
            onClickIcon(e.target.getAttribute('name').split(' ')[0]);
          }
        }}>
        <div className="post_icon_box">
          <svg
            name="icon-like"
            className={activeIcons.includes(icons[0]) ? 'post_icon_animation' : ''}
            width="25"
            height="21"
            viewBox="0 0 25 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              name="icon-like"
              d="M7.325 1C3.83188 1 1 3.72607 1 7.08868C1 13.1774 8.475 18.7125 12.5 20C16.525 18.7125 24 13.1774 24 7.08868C24 3.72607 21.1681 1 17.675 1C15.536 1 13.6442 2.02235 12.5 3.58714C11.9168 2.78742 11.1419 2.13476 10.2411 1.68442C9.34032 1.23407 8.34005 0.999311 7.325 1Z"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="post_count">{statsCount['likes']}</p>
        </div>
        <div className={props.full ? 'none_active' : 'post_icon_box'}>
          <svg
            name="icon-comment"
            width="21"
            height="20"
            viewBox="0 0 21 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              name="icon-comment"
              d="M10.4992 19C12.264 19.0018 14.0005 18.5996 15.5473 17.8308L18.5761 18.6072C18.8521 18.6796 19.1445 18.6837 19.4229 18.619C19.7012 18.5543 19.9552 18.4232 20.1584 18.2393C20.3616 18.0555 20.5066 17.8256 20.5781 17.5738C20.6496 17.322 20.6451 17.0574 20.5651 16.8077L19.7069 14.0673C20.8134 12.2415 21.2261 10.1373 20.8818 8.07847C20.5374 6.01965 19.4549 4.12022 17.8009 2.67237C16.1468 1.22452 14.0128 0.308464 11.7271 0.0651124C9.44143 -0.17824 7.13068 0.264595 5.15033 1.3255C3.16998 2.3864 1.62974 4.00659 0.766535 5.93685C-0.0966702 7.86711 -0.23502 10.0005 0.37277 12.0088C0.98056 14.0172 2.30082 15.7892 4.13045 17.0524C5.96009 18.3155 8.19774 18.9998 10.4992 19ZM15.4463 16.3144C15.3013 16.3165 15.1591 16.351 15.0324 16.4149C13.1707 17.4138 10.97 17.7636 8.84356 17.3984C6.71708 17.0333 4.81107 15.9783 3.48341 14.4317C2.15574 12.8851 1.49776 10.9532 1.63299 8.9987C1.76823 7.04423 2.68739 5.20163 4.21788 3.81691C5.74837 2.43218 7.78492 1.60056 9.94513 1.4782C12.1053 1.35585 14.2406 1.95117 15.95 3.15239C17.6595 4.3536 18.8254 6.07809 19.229 8.00205C19.6326 9.926 19.2461 11.9171 18.142 13.6014C18.0869 13.6877 18.0514 13.783 18.0375 13.8818C18.0237 13.9806 18.0317 14.081 18.0612 14.1769L19.0203 17.2096L15.6684 16.3418C15.5961 16.3237 15.5214 16.3145 15.4463 16.3144Z"
              fill="black"
            />
          </svg>
          <p className="post_count">{statsCount['comments']}</p>
        </div>
        <div className="post_icon_box">
          <svg
            name="icon-repost"
            width="19"
            height="20"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              name="icon-repost"
              d="M17.7052 7.83284L12.528 14.4674L12.1931 11.7527L12.1012 11.0084L11.3569 11.1002C6.97193 11.6412 3.66678 13.157 1.27669 15.8555C1.68051 14.2159 2.32661 12.637 3.28316 11.227C4.83399 8.94094 7.22883 7.05568 10.8439 6.07597L11.4717 5.90582L11.392 5.26024L11.0707 2.6556L17.7052 7.83284Z"
              fill="white"
              stroke="black"
              strokeWidth="1.5"
            />
          </svg>
          <p className="post_count">{statsCount['reposts']}</p>
        </div>
        <div className="post_icon_box">
          <svg
            name="icon-flag"
            className={activeIcons.includes(icons[3]) ? 'post_icon_animation' : ''}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              name="icon-flag"
              d="M7 17.95L12 15.8L17 17.95V5H7V17.95ZM6.4 20.4C6.06667 20.5333 5.75 20.504 5.45 20.312C5.15 20.1207 5 19.8417 5 19.475V5C5 4.45 5.196 3.979 5.588 3.587C5.97933 3.19567 6.45 3 7 3H17C17.55 3 18.021 3.19567 18.413 3.587C18.8043 3.979 19 4.45 19 5V19.475C19 19.8417 18.85 20.1207 18.55 20.312C18.25 20.504 17.9333 20.5333 17.6 20.4L12 18L6.4 20.4ZM7 5H17H12H7Z"
              fill="black"
            />
            <path name="icon-flag" d="M7 17.95L12 15.8L17 17.95V5H12H7V17.95Z" fill="none" />
          </svg>
          <p className="post_count">{statsCount['favorites']}</p>
        </div>
        <div
          style={{ position: 'absolute', right: '0', marginRight: '0px' }}
          className="post_icon_box">
          <svg
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11 0.5C6 0.5 1.73 3.61 0 8C1.73 12.39 6 15.5 11 15.5C16 15.5 20.27 12.39 22 8C20.27 3.61 16 0.5 11 0.5ZM11 13C8.24 13 6 10.76 6 8C6 5.24 8.24 3 11 3C13.76 3 16 5.24 16 8C16 10.76 13.76 13 11 13ZM11 5C9.34 5 8 6.34 8 8C8 9.66 9.34 11 11 11C12.66 11 14 9.66 14 8C14 6.34 12.66 5 11 5Z"
              fill="#BABABA"
            />
          </svg>
          <p style={{ marginTop: '5px', color: '#BABABA' }} className="post_count">
            {statsCount['views']}
          </p>
        </div>
      </div>
      <p className="post_time">{time} время число месяц</p>
    </div>
  );
};

export default Post;
