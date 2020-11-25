import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';


// 引入图标样式
import  './assets/fonts/iconfont.css';

import 'react-virtualized/styles.css'; // only needs to be imported once

import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
