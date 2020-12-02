import React, { Component } from 'react'


// 引入antd组件
import { Button } from 'antd-mobile';

// 导入路由组件
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// 引入页面组件
import Home from './pages/Home';

// 导入地图找房页面
import Map from './pages/Map';

import CityList from './pages/CityList';

import HouseDetail from './pages/HouseDetail';

import NotFound from './pages/NotFound'

export default class App extends Component {
  render() {
    return (
      <Router>
        {/* Switch 表示内部Route路径 只能匹配一个 */}
        <Switch>
          {/* 路由重定向 */}
          <Route path="/" exact render={() => <Redirect to="/home" />} />

          <Route path="/home" component={Home} />

          <Route path="/citylist" component={CityList} />

          {/* 房屋详情页 */}
          <Route path="/housedetail/:id" component={HouseDetail} />

          <Route path="/map" component={Map} />

          <Route path="*" component={NotFound} />

        </Switch>

      </Router>
    )
  }
}