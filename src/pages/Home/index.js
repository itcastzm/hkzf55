import React, { Component } from 'react'

// 子路由的配置
// 导入路由组件
import { Route } from 'react-router-dom';

// 导入子页面组件
// 小首页
import Index from '../Index'
// 资讯页面

import News from '../News'

import Profile from '../Profile'

import HouseList from '../HouseList';

export default class Home extends Component {
    render() {
        return (
            <div>


                <Route path="/home" exact component={Index} />
                <Route path="/home/news" component={News} />
                <Route path="/home/my" component={Profile} />
                <Route path="/home/houselist" component={HouseList} />

                首页Tabbar
            </div>
        )
    }
}
