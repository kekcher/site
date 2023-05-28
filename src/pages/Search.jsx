import React from 'react';

import Update from '../components/Update';
import Footer from '../components/Footer';

import '../css/Search.css';

const Search = () => {
  return (
    <>
      <div className="search_container">
        <div className="search_box">
          <i className="icon-search search_input"></i>
          <input type="text" id="global_search" placeholder="глобальный поиск" />
        </div>
      </div>

      <div className="search_filter">
        <button className="search_filter_btn">Кейсы</button>
        <button className="search_filter_btn">Посты</button>
        <button className="search_filter_btn">Профессионалы</button>
      </div>
      <Update />
      <Footer />
    </>
  );
};

export default Search;
