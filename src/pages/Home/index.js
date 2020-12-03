import React, { Component } from 'react'

// 子路由的配置
// 导入路由组件
import { Route } from 'react-router-dom';

// 导入TabBar组件
import { TabBar } from 'antd-mobile';

// 引入样式
import './index.css';

// 导入子页面组件

// React.lazy(() => import('./OtherComponent'));
// 小首页
const Index =  React.lazy(()=> import('../Index'))
// 资讯页面
const News =  React.lazy(()=> import('../News'))

const Profile =  React.lazy(()=> import('../Profile'))

const HouseList =  React.lazy(()=> import('../HouseList'));



const tabBars = [
    { path: '/home', title: '首页', icon: 'icon-ind' },
    { path: '/home/houselist', title: '找房', icon: 'icon-findHouse' },
    { path: '/home/news', title: '资讯', icon: 'icon-infom' },
    { path: '/home/my', title: '我的', icon: 'icon-my' },
];

export default class Home extends Component {

    render() {

        return (
            <div className="home">
                <Route path="/home" exact component={Index} />
                <Route path="/home/news" component={News} />
                <Route path="/home/my" component={Profile} />
                <Route path="/home/houselist" component={HouseList} />

                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#21b97a"
                    barTintColor="white"
                    noRenderContent
                >
                    {tabBars.map((item) => (
                        <TabBar.Item
                            title={item.title}
                            key={item.path}
                            icon={<i className={`iconfont  ${item.icon}`}></i>}
                            selectedIcon={<i className={`iconfont  ${item.icon}`}></i>}
                            selected={this.props.location.pathname === item.path}
                            onPress={() => {
                                this.props.history.push(item.path);
                            }}

                        />
                    ))}
                </TabBar>
            </div>
        )
    }
}
