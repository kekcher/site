import React from 'react';

import '../css/Reply.css';
import { useNavigate } from 'react-router-dom';

import { mainContext } from '../App';
import { userId } from '../App';

import users_data from '../data/users_data.json';
import comments_data from '../data/comments_data.json';

const Reply = ({ replyId, authorReplyId }) => {

    const { setPage, profile, setProfile, setStateFull, stateFull, Conversion, setMessageText, messageText } = React.useContext(mainContext);
    const navigate = useNavigate();
    const {
        nickname,
        avatar
    } = users_data.find((obj) => obj.userId === authorReplyId);

    const reply = comments_data.find((obj) => obj.commentId === replyId);
    const likesCount = Conversion('count', reply.likes.length);
    const myProfile = users_data.find((obj) => obj.userId === userId);

    const goToPreview = () => {
        document.querySelector('footer').style.filter = `blur(5px)`;
        if (myProfile.viewUsers.find((obj) => obj === profile.userId) || profile.userId === userId) {
            goToProfile();
        }
        else {
            setProfile(users_data.find((obj) => obj.userId === authorReplyId));
            setStateFull({
                ...stateFull,
                openPreview: true
            })
        }
    };

    const goToProfile = () => {
        setStateFull({
            ...stateFull,
            openComments: false,
            openPreview: false
        })
        document.body.style.overflow = '';
        profile.userId !== userId
            ? navigate(`/user_profile/${profile.nickname}`)
            : navigate('/profile');
        setPage('profile');
    };

    return (
        <div 
            className="reply_box"
            onClick={()=>{
                const block = document.querySelector('blockquote');
                setMessageText(`<a onClick = () => ${{goToPreview}} style='color:var(--color_active)'>${nickname}</a>, `)
                block.innerHTML = `<a onClick = () => ${{goToPreview}} style='color:var(--color_active)'>${nickname}</a>, `;
                block.focus();
            }}
        >
            <div className="reply_user_avatar_box">
                <img className="avatar_picture" src={avatar} alt="User Avatar" onClick={goToPreview} />
            </div>
            <div className="reply_text_box">
                <p className="reply_user_nickname">
                    {nickname}
                </p>
                <p className="reply_text">{reply.text}</p>
                <span className='time_reply_box'>
                    <p className='time' style={{ marginRight: '31px', fontSize: '8px' }}>число месяц в время</p>
                </span>
            </div>
            <div className='reply_like_box'>
                <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.575 1C2.60063 1 1 2.62303 1 4.62505C1 8.25009 5.225 11.5456 7.5 12.3121C9.775 11.5456 14 8.25009 14 4.62505C14 2.62303 12.3994 1 10.425 1C9.216 1 8.14675 1.60868 7.5 2.54032C7.17035 2.06418 6.7324 1.67561 6.22325 1.40748C5.71409 1.13936 5.14872 0.99959 4.575 1Z" fill="white" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className='likes_count'>{likesCount}</p>
            </div>
        </div>
    );
}

export default Reply;