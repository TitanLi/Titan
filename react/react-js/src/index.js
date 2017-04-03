import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MessageBoard from './messageBoard.js'; //名稱第一個字需大寫
import './index.css';

ReactDOM.render(
  <MessageBoard />,                           //顯示內容
  document.getElementById('root')             //把內容放到ID=root這個HTML標籤裡
);
