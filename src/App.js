import React, { Component, Suspense } from 'react'


// 引入antd组件
import { Button } from 'antd-mobile';

// 导入路由组件
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// 引入页面组件
const Home = React.lazy(() => import('./pages/Home'));

// 导入地图找房页面
const Map = React.lazy(() => import('./pages/Map'));

const CityList = React.lazy(() => import('./pages/CityList'));

const HouseDetail = React.lazy(() => import('./pages/HouseDetail'));

const NotFound = React.lazy(() => import('./pages/NotFound'))

export default class App extends Component {
  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    )
  }
}