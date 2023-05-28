import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../css/Header.css';

import { mainContext } from '../App';

import History from './History';

const Header = () => {
  const location = useLocation();

  const { setCurrentFilter } = React.useContext(mainContext);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const onClickFilter = (filter) => {
    setCurrentFilter(filter);
    setIsFilterOpen(false);
  };
  return (
    <header className="head_container">
      <div className="logo_box">
        <div className="logo_item">
          <svg
            width="207"
            height="54"
            viewBox="0 0 207 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.53 29L0.66 8H5.7L11.67 26.6H9.15L15.39 8H19.89L25.89 26.6H23.46L29.58 8H34.23L27.36 29H22.14L16.83 12.68H18.21L12.75 29H7.53ZM36.8768 29V12.86H41.5568V29H36.8768ZM39.2168 10.61C38.3568 10.61 37.6568 10.36 37.1168 9.86C36.5768 9.36 36.3068 8.74 36.3068 8C36.3068 7.26 36.5768 6.64 37.1168 6.14C37.6568 5.64 38.3568 5.39 39.2168 5.39C40.0768 5.39 40.7768 5.63 41.3168 6.11C41.8568 6.57 42.1268 7.17 42.1268 7.91C42.1268 8.69 41.8568 9.34 41.3168 9.86C40.7968 10.36 40.0968 10.61 39.2168 10.61ZM52.8302 29.24C51.3102 29.24 49.9402 28.9 48.7202 28.22C47.5002 27.52 46.5302 26.55 45.8102 25.31C45.1102 24.07 44.7602 22.61 44.7602 20.93C44.7602 19.23 45.1102 17.76 45.8102 16.52C46.5302 15.28 47.5002 14.32 48.7202 13.64C49.9402 12.96 51.3102 12.62 52.8302 12.62C54.1902 12.62 55.3802 12.92 56.4002 13.52C57.4202 14.12 58.2102 15.03 58.7702 16.25C59.3302 17.47 59.6102 19.03 59.6102 20.93C59.6102 22.81 59.3402 24.37 58.8002 25.61C58.2602 26.83 57.4802 27.74 56.4602 28.34C55.4602 28.94 54.2502 29.24 52.8302 29.24ZM53.6402 25.4C54.4002 25.4 55.0902 25.22 55.7102 24.86C56.3302 24.5 56.8202 23.99 57.1802 23.33C57.5602 22.65 57.7502 21.85 57.7502 20.93C57.7502 19.99 57.5602 19.19 57.1802 18.53C56.8202 17.87 56.3302 17.36 55.7102 17C55.0902 16.64 54.4002 16.46 53.6402 16.46C52.8602 16.46 52.1602 16.64 51.5402 17C50.9202 17.36 50.4202 17.87 50.0402 18.53C49.6802 19.19 49.5002 19.99 49.5002 20.93C49.5002 21.85 49.6802 22.65 50.0402 23.33C50.4202 23.99 50.9202 24.5 51.5402 24.86C52.1602 25.22 52.8602 25.4 53.6402 25.4ZM57.8702 29V25.7L57.9602 20.9L57.6602 16.13V6.74H62.3402V29H57.8702ZM74.6817 29.24C72.8417 29.24 71.2217 28.88 69.8217 28.16C68.4417 27.44 67.3717 26.46 66.6117 25.22C65.8517 23.96 65.4717 22.53 65.4717 20.93C65.4717 19.31 65.8417 17.88 66.5817 16.64C67.3417 15.38 68.3717 14.4 69.6717 13.7C70.9717 12.98 72.4417 12.62 74.0817 12.62C75.6617 12.62 77.0817 12.96 78.3417 13.64C79.6217 14.3 80.6317 15.26 81.3717 16.52C82.1117 17.76 82.4817 19.25 82.4817 20.99C82.4817 21.17 82.4717 21.38 82.4517 21.62C82.4317 21.84 82.4117 22.05 82.3917 22.25H69.2817V19.52H79.9317L78.1317 20.33C78.1317 19.49 77.9617 18.76 77.6217 18.14C77.2817 17.52 76.8117 17.04 76.2117 16.7C75.6117 16.34 74.9117 16.16 74.1117 16.16C73.3117 16.16 72.6017 16.34 71.9817 16.7C71.3817 17.04 70.9117 17.53 70.5717 18.17C70.2317 18.79 70.0617 19.53 70.0617 20.39V21.11C70.0617 21.99 70.2517 22.77 70.6317 23.45C71.0317 24.11 71.5817 24.62 72.2817 24.98C73.0017 25.32 73.8417 25.49 74.8017 25.49C75.6617 25.49 76.4117 25.36 77.0517 25.1C77.7117 24.84 78.3117 24.45 78.8517 23.93L81.3417 26.63C80.6017 27.47 79.6717 28.12 78.5517 28.58C77.4317 29.02 76.1417 29.24 74.6817 29.24ZM95.4075 12.62C96.6875 12.62 97.8275 12.88 98.8275 13.4C99.8475 13.9 100.648 14.68 101.228 15.74C101.808 16.78 102.098 18.12 102.098 19.76V29H97.4175V20.48C97.4175 19.18 97.1275 18.22 96.5475 17.6C95.9875 16.98 95.1875 16.67 94.1475 16.67C93.4075 16.67 92.7375 16.83 92.1375 17.15C91.5575 17.45 91.0975 17.92 90.7575 18.56C90.4375 19.2 90.2775 20.02 90.2775 21.02V29H85.5975V12.86H90.0675V17.33L89.2275 15.98C89.8075 14.9 90.6375 14.07 91.7175 13.49C92.7975 12.91 94.0275 12.62 95.4075 12.62Z"
              fill="black"
            />
            <circle cx="52" cy="19" r="2" fill="black" />
          </svg>
          <i
            className={isFilterOpen ? 'icon-down-open' : 'icon-up-open'}
            onClick={() => {
              setIsFilterOpen(!isFilterOpen);
            }}></i>
        </div>
        <div className={isFilterOpen ? 'filter_post_box filter_post_box_open' : 'filter_post_box'}>
          <div onClick={() => onClickFilter('case')} className="filter_post_item">
            <p>Кейсы</p>
            <div className="filter_line"></div>
          </div>
          <div onClick={() => onClickFilter('post')} className="filter_post_item">
            <p>Посты</p>
            <div className="filter_line"></div>
          </div>
          <div onClick={() => onClickFilter('all')} className="filter_post_item">
            <p>Всё вместе</p>
          </div>
        </div>

        {location.pathname !== '/search' ? (
          <Link className="icon-search search" to="/search">
            <i></i>
          </Link>
        ) : (
          <i className="icon-search search"></i>
        )}
      </div>
      <div className="history_container">
        <div className="user_history_box">
          <div className="user_history_add">
            <span className='line_plus_horizontal'></span>
            <span className='line_plus_vertical'></span>
          </div>
        </div>
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
      </div>
      <div className="line"></div>
    </header>
  );
};

export default Header;
