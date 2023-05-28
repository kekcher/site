import ContentLoader from 'react-content-loader';
import React from 'react';

import '../css/History.css';

const History = ({ isView, avatar, nickname = 'ANONIM' }) => {
  const [load, setLoad] = React.useState(true);

  return load ? (
    <div className="user_history_box">
      <ContentLoader
        speed={1}
        width={68}
        height={150}
        viewBox="0 0 75 135"
        backgroundColor="#f3f3f3"
        foregroundColor="#7e52ee">
        <circle cx="37" cy="40" r="37" />
        <rect x="0" y="83" rx="0" ry="0" width="74" height="12" />
      </ContentLoader>
    </div>
  ) : (
    <div className="user_history_box">
      <div className={isView ? 'view' : 'not_view'}>
        <div className="user_history_avatar">
          {avatar ? (
            <img className="avatar_picture" src={avatar} />
          ) : (
            <i className="icon-profile none_picture"></i>
          )}
        </div>
      </div>
      <p className="user_history_nickname">{nickname}</p>
    </div>
  );
};

export default History;
