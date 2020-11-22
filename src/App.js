import React, { Component } from 'react'


// 引入antd组件
import { Button } from 'antd-mobile';

// 导入路由组件
import { HashRouter as Router, Route, Link } from 'react-router-dom';

// 引入页面组件
import  Home from './pages/Home';

import  CityList from './pages/CityList';


export default class App extends Component {
  render() {
    return (
      <Router>

        <Route   path="/home" component={Home}  />

        <Route   path="/citylist"  component={ CityList }  />

      </Router>
    )
  }
}