import React from 'react';

import Comment from './Comment';
import Post from './Post';
import Update from './Update';
import FullMode from './FullMode'

import '../css/Comments.css';

import { mainContext } from '../App';
import posts_data from '../data/posts_data.json';
import comments_data from '../data/comments_data.json';
import Footer from './Footer';

const Comments = () => {
  const { fullImages, commentPostId, setStateFull, stateFull, Conversion, setMessageText } = React.useContext(mainContext);

  const post = posts_data.find((obj) => obj.postId === commentPostId);

  const commentsCount = Conversion('count', post.stats.comments.length);
  const commentsSign = Conversion('comments', post.stats.comments.length);


  const goBack = () => {
    document.body.style.overflow = '';
    document.querySelector('.foot_container').style.opacity = 1;
    document.querySelector('.mainBackground').removeAttribute('style');
    setMessageText('');
    setStateFull({
      ...stateFull,
      openComments: false,
      openPreview: false,
      openImage: false
    })
  };

  React.useEffect(() => {
    let screenX = null;
    let clientX = null;
    let scroll = null;
    let opacity = null;
    let blur = null;
    const commentBox = document.getElementById('comments');
    const swipe = document.querySelector('[name="swipe"]');

    swipe.addEventListener('touchstart', (e) => {
      screenX = e.touches[0].screenX;
      clientX = e.touches[0].screenX;
      scroll = 0;
      opacity = 1;
      blur = 5;
    });

    swipe.addEventListener('touchmove', (e) => {
      if (Math.abs(screenX - e.touches[0].screenX) >= 20) {
        document.getElementById('update').classList.add('none_active');
        if (e.touches[0].screenX >= clientX) {
          if (scroll < 50) {
            scroll++;
            opacity -= 0.05;
            if (blur > 0) {
              blur -= 0.2;
            }
            document.querySelector('.head_comments_container').style.opacity = opacity;
            document.querySelector('.foot_container').style.opacity = opacity;
            document.querySelector('.mainBackground').style.filter = `blur(${blur}px)`
            clientX = e.touches[0].screenX;
            commentBox.style.transform = `translateX(${scroll}%)`;
          }
          else {
            goBack();
          }
        }
        else {
          if (scroll > 0) {
            opacity += 0.05;
            scroll--;
            if (blur < 5) {
              blur += 0.2;
            }
            document.querySelector('.head_comments_container').style.opacity = opacity;
            document.querySelector('.foot_container').style.opacity = opacity;
            document.querySelector('.mainBackground').style.filter = `blur(${blur}px)`
            commentBox.style.transform = `translateX(${scroll}%)`;
          }
        }
      }
    }, [stateFull.openComments]);

    swipe.addEventListener('touchend', () => {
      document.getElementById('update').classList.remove('none_active');
      if (scroll < 20) {
        commentBox.style.transform = `translate(0%)`;
        document.querySelector('.head_comments_container').removeAttribute('style');
        document.querySelector('.foot_container').style.opacity = 1;
        document.querySelector('.mainBackground').style.filter = `blur(5px)`;
        screenX = null;
        clientX = null;
        scroll = null;
        opacity = null;
        blur = null;
      }
      else {
        goBack();
      }
    });

  });

  return (
    <>
      <div className="head_comments_container">
        <i className='icon_close' onClick={goBack}>
          <svg width="23" height="12" viewBox="0 0 23 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6H23M1 6L8 1M1 6L8 11" stroke="#7E52EE" />
          </svg>
        </i>
        <h1 className="comments_name">Запись</h1>
      </div>
      <div id='comments' className="comments_container">
        {stateFull.openPreview ? null : <Update />}
        <div name="upd">
          <div name='swipe'>
            <Post {...post} full={true} />
            <div className="line"></div>
            <div className="comments_box">
              <p className='count_comments'>{commentsCount} {commentsSign}</p>
              {post.stats.comments &&
                post.stats.comments.map((commentId) => {
                  return (
                    <Comment
                      key={commentId}
                      commentId={commentId}
                      authorCommentId={comments_data.find((obj) => obj.commentId === commentId).authorCommentId}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <Footer message={true} />
      {stateFull.openImage ? <FullMode imgs={fullImages} /> : null}
    </>
  );
};

export default Comments;
