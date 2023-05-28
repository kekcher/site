import React from 'react';
import ContentLoader from 'react-content-loader';

import Footer from '../components/Footer';
import Update from '../components/Update';
import Post from '../components/Post';
import Comments from '../components/Comments';
import Preview from '../components/Preview';
import FullMode from '../components/FullMode';
import { mainContext } from '../App';

import users_data from '../data/users_data.json';
import posts_data from '../data/posts_data.json';

import '../css/Profile.css';
import '../css/Post.css';

const Profile = ({ userId }) => {
  const { stateFull, fullImages, Conversion } = React.useContext(mainContext);

  const [activeIcon, setActiveIcon] = React.useState(0);
  const [userPosts, setUserPosts] = React.useState([]);

  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    setUserPosts(
      posts_data.filter((item) => {
        return item.authorId === userId;
      }),
    );
    setIsLoaded(true);
  }, []);

  const profile = users_data.find((obj) => obj.userId === userId);

  let subsriptions = Conversion('count', profile.subscribers.length);
  let subscribers = Conversion('count', profile.subscribers.length);

  return (
    <>
      <div
        name="upd"
        className="profile_container"
        style={{ backgroundImage: `url(${profile.background})` }}>
        {stateFull.openComments || stateFull.openPreview ? null : <Update />}
        <div className="burger_box">
          <span className="burger_line"></span>
          <span className="burger_line"></span>
          <span className="burger_line"></span>
        </div>

        <i className="icon-bell profile_notific"></i>

        <div className="profile_avatar">
          <img className="avatar_picture" src={profile.avatar} alt="avatar" />
        </div>

        <div className="profile_box">
          <div className="profile_user_count_container">
            <div className="preview_user_count" style={{ marginRight: '48px' }}>
              <p className="profile_count">{subsriptions}</p>
              <p className="profile_count_sign">Подписки</p>
            </div>
            <div className="preview_user_count" style={{ marginRight: '48px' }}>
              <p className="profile_count">{subscribers}</p>
              <p className="profile_count_sign">Подписчики</p>
            </div>
          </div>

          <div className="profile_nick_box">
            <h1 className="profile_nickname">{profile.nickname}</h1>
            <p className="profile_fi">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="profile_role">{profile.role}</p>
          </div>

          <div className="profile_idea_box">
            <p className="profile_idea">Идея:</p>
            <p className="profile_idea_sign">{profile.idea}</p>
          </div>
          {isLoaded && document.querySelector('.profile_idea_sign').textContent.length > 180 && (
            <p
              className="btn_unwrap"
              onClick={(e) => {
                document.querySelector('.profile_idea_box').classList.toggle('full_idea');
                e.target.textContent =
                  e.target.textContent === 'Развернуть' ? 'Свернуть' : 'Развернуть';
              }}>
              Развернуть
            </p>
          )}
          <div className="btn_profile_box">
            <button className="btn_profile">Редактировать</button>
            <button className="btn_profile">Опубликовать</button>
          </div>

          <div className="line"></div>
          <ul className="profile_icon_container">
            <li
              className={
                activeIcon === 0 ? 'profile_icon_box profile_icon_box_active' : 'profile_icon_box'
              }>
              <svg
                onClick={() => {
                  setActiveIcon(0);
                }}
                width="38"
                height="31"
                viewBox="0 0 38 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.6 23C7.885 23 7.27313 22.75 6.7644 22.2499C6.2548 21.7491 6 21.1472 6 20.4444V2.55556C6 1.85278 6.2548 1.25094 6.7644 0.750055C7.27313 0.250018 7.885 0 8.6 0H29.4C30.115 0 30.7273 0.250018 31.2369 0.750055C31.7456 1.25094 32 1.85278 32 2.55556V20.4444C32 21.1472 31.7456 21.7491 31.2369 22.2499C30.7273 22.75 30.115 23 29.4 23H8.6ZM8.6 20.4444H29.4V11.9107V2.55556H8.6V20.4444Z"
                  fill="#BABABA"
                />
                <path d="M11.2 7.66667H27V5H11.2V7.66667Z" fill="#BABABA" />
                <path d="M11.2 10.2222V12.7778H27V10.2222H11.2Z" fill="#BABABA" />
                <path d="M11.2 15.3333V17.8889H27V15.3333H11.2Z" fill="#BABABA" />
                <line y1="30.5" x2="38" y2="30.5" stroke="#BABABA" />
              </svg>
            </li>
            <li
              className={
                activeIcon === 1 ? 'profile_icon_box profile_icon_box_active' : 'profile_icon_box'
              }>
              <svg
                onClick={() => {
                  setActiveIcon(1);
                }}
                width="40"
                height="35"
                viewBox="0 0 40 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.2 20.8889H16.7V18.3333H10.2V20.8889ZM10.2 15.7778H16.7V13.2222H10.2V15.7778ZM10.2 10.6667H16.7V8.11111H10.2V10.6667ZM7.6 26C6.885 26 6.27313 25.75 5.7644 25.2499C5.2548 24.7491 5 24.1472 5 23.4444V5.55556C5 4.85278 5.2548 4.25094 5.7644 3.75006C6.27313 3.25002 6.885 3 7.6 3H28.4C29.115 3 29.7273 3.25002 30.2369 3.75006C30.7456 4.25094 31 4.85278 31 5.55556V23.4444C31 24.1472 30.7456 24.7491 30.2369 25.2499C29.7273 25.75 29.115 26 28.4 26H7.6ZM7.6 23.4444H28.4V14.9107V5.55556H7.6V23.4444Z"
                  stroke="#BABABA"
                  strokeWidth="1"
                />
                <line
                  x1="23.0541"
                  y1="14.8358"
                  x2="39.0541"
                  y2="1.83583"
                  stroke="#BABABA"
                  strokeWidth="3"
                />
                <line y1="34.5" x2="38" y2="34.5" stroke="#BABABA" />
              </svg>
            </li>
            <li
              className={
                activeIcon === 2 ? 'profile_icon_box profile_icon_box_active' : 'profile_icon_box'
              }>
              <svg
                onClick={() => {
                  setActiveIcon(2);
                }}
                width="38"
                height="32"
                viewBox="0 0 38 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M19.6313 -0.00012207V24" stroke="#BABABA" strokeWidth="2" />
                <path d="M31 11.4338L7 11.3684" stroke="#BABABA" strokeWidth="2" />
                <path
                  d="M10.1582 11.3684C9.94763 8.421 11.5476 2.52625 19.6319 2.52625"
                  fill="#BABABA"
                />
                <path
                  d="M19.6313 5.05263C21.7366 4.84211 25.9472 5.81053 25.9472 11.3684"
                  fill="#BABABA"
                />
                <path
                  d="M11.4209 11.3684C11.4209 14.3158 13.063 20.2105 19.6315 20.2105"
                  fill="#BABABA"
                />
                <path
                  d="M25.7826 11.4783C25.9565 13.5652 25.0522 17.7392 20.0435 17.7392"
                  fill="#BABABA"
                />
                <line y1="31.5" x2="38" y2="31.5" stroke="#BABABA" />
              </svg>
            </li>
            <li
              className={
                activeIcon === 3 ? 'profile_icon_box profile_icon_box_active' : 'profile_icon_box'
              }>
              <svg
                onClick={() => {
                  setActiveIcon(3);
                }}
                width="38"
                height="32"
                viewBox="0 0 38 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18.7255 1H11.5098V9.17778C11.5098 10.5059 11.8901 11.7983 12.5935 12.8605C13.2969 13.9228 14.2855 14.6977 15.4108 15.0688C15.4108 18.1461 12.2088 19.2385 10.6078 19.4V23.4889H18.7255M11.5098 3.04444H7V7.13333C7 9.69809 8.61541 11.2222 10.6078 11.2222H11.5098"
                  fill="#BABABA"
                />
                <path
                  d="M18 1H25.2184V9.17818C25.2185 10.5064 24.838 11.7988 24.1343 12.8611C23.4306 13.9235 22.4416 14.6984 21.316 15.0695C21.316 18.147 24.5192 19.2394 26.1207 19.4009V23.49H18M25.2184 3.04455H29.73V7.13364C29.73 9.69852 28.1139 11.2227 26.1207 11.2227H25.2184"
                  fill="#BABABA"
                />
                <line y1="31.5" x2="38" y2="31.5" stroke="#BABABA" />
              </svg>
            </li>
          </ul>
          <div className={activeIcon === 0 ? 'postItems' : 'postItems none_active'}>
            <div className="mainBackground">
              {userPosts.length === 0 ? (
                <p className="no_posts">У вас ещё нет постов...</p>
              ) : isLoaded ? (
                userPosts.map((item) => {
                  return <Post {...item} key={item.postId} />;
                })
              ) : (
                <div className="posts_container">
                  <div className="post_box">
                    {[...new Array(3)].map((_, index) => {
                      return (
                        <ContentLoader
                          key={index}
                          speed={1}
                          width={360}
                          height={300}
                          viewBox="0 0 360 300"
                          backgroundColor="#f3f3f3"
                          foregroundColor="#7e52ee">
                          <circle cx="47" cy="16" r="16" />
                          <rect x="72" y="5" rx="3" ry="3" width="65" height="8" />
                          <rect x="72" y="20" rx="3" ry="3" width="50" height="6" />
                          <rect x="31" y="50" rx="3" ry="3" width="320" height="8" />
                          <rect x="31" y="70" rx="10" ry="10" width="320" height="188" />
                        </ContentLoader>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={activeIcon === 1 ? 'editItems' : 'editItems none_active'}></div>
          <div className={activeIcon === 2 ? 'scopeItems' : 'scopeItems none_active'}></div>
          <div
            className={
              activeIcon === 3 ? 'achievementItems' : 'achievementItems none_active'
            }></div>
        </div>
      </div>
      {stateFull.openComments ? <Comments /> : null}
      {stateFull.openPreview ? <Preview /> : null}
      <Footer />
      {stateFull.openImage ? <FullMode imgs={fullImages} /> : null}
    </>
  );
};
export default Profile;
