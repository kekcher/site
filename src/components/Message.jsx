import users_data from '../data/users_data.json';

const Message = (props) => {
    const {
        companionId,
        messages
    } = props

    /*Объект последнего сообщения*/
    const Message = messages[messages.length - 1];
    const countUnread = messages.filter(item => item.status === "unread").length;
    const user = users_data.find((obj)=> obj.userId === companionId)

    return (
        <div className="chat_box">

            <div className="chat_user_avatar_box">
                <img className="avatar_picture" src={user.avatar} alt={user.nickname} />
            </div>

            <div className="chat_user_sign_box">
                <p className="chat_user_nickname">{user.nickname}</p>
                <p className={Message.who === "iam" ? "chat_user_message your_message" : "chat_user_message"}>{Message.message}</p>
            </div>

            <div className="chat_status_box">
                {Message.who === "user" && Message.status === "read" ? <div></div> : null}
                
                {
                    Message.who === "user" && Message.status === "unread" ? 
                    <div className="not_view_message chat_active">
                        <p>{countUnread}</p>
                    </div>
                    :
                    null
                }

                {
                    Message.who === "iam" && Message.status === "unread" ? 
                    <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 0.775862L3.76814 10L0 5.18966L0.608856 4.41379L3.76814 8.43103L10.3911 0L11 0.775862Z" fill="#7E52EE" />
                    </svg>
                    :
                    null
                }

                {
                    Message.who === "iam" && Message.status === "read" ? 
                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 0.775862L8.76814 10L5 5.18966L5.60886 4.41379L8.76814 8.43103L15.3911 0L16 0.775862Z" fill="#7E52EE" />
                    <path d="M11 0.775862L3.76814 10L0 5.18966L0.608856 4.41379L3.76814 8.43103L10.3911 0L11 0.775862Z" fill="#7E52EE" />
                    </svg>
                    :
                    null
                }
                <p className="time">{Message.time}</p>
            </div>
        </div>
    )
}

export default Message;