import React, { useState, useEffect } from 'react';

import Footer from '../components/Footer';
import Message from '../components/Message';

import { userId } from '../App';

import chat_data from '../data/chat_data.json';
import users_data from '../data/users_data.json';

import '../css/Messenger.css';

const Messenger = () => {

  const myProfile = users_data.find((obj) => obj.userId === userId);
  const [chatFilter, setChatFilter] = useState(myProfile.chatNames[0]);
  const [activeChats, setActiveChats] = useState(chat_data.filter((chat) => chat.chatName === myProfile.chatNames[0]));

  useEffect(() => {
    setActiveChats(chat_data.filter((chat) => chat.chatName === chatFilter))
  }, [chatFilter])


  return (
    <>

      <div className="search_container">
        <div className="search_box">
          <i className="icon-search search_input"></i>
          <input type="text" id="global_search" placeholder="глобальный поиск" />
        </div>
      </div>

      <div className="search_filter">
        {
          myProfile.chatNames.map((item) => {
            return (
              <button
                onClick={() => {
                  setChatFilter(item);
                }}
                className={chatFilter === item ? "chat_search_filter_btn chat_filter_active" : "chat_search_filter_btn"}
              >
                {item}
                {
                  
                  chat_data.filter((chat) => chat.chatName === item && chat.fullStatus === "unread").length ?
                    <div className={chatFilter === item ? "not_view_message chat_none_active" : "not_view_message chat_active"}>
                      <p>{chat_data.filter((chat) => chat.chatName === item && chat.fullStatus === "unread").length}</p>
                    </div>
                    :
                    null
                }
              </button>
            )
          })
        }
      </div>

      <div className="chats_container">
        {activeChats.map((item) => {
          return <Message key={item.chatId} {...item} />
        })}
      </div>


      <Footer />
    </>
  );
};
export default Messenger;
