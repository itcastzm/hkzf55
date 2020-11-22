import React, { Component } from 'react'

// 子路由的配置
// 导入路由组件
import { Route } from 'react-router-dom';


// 导入TabBar组件
import { TabBar } from 'antd-mobile';

// 导入子页面组件
// 小首页
import Index from '../Index'
// 资讯页面
import News from '../News'

import Profile from '../Profile'

import HouseList from '../HouseList';

// 引入样式
import './index.css';

export default class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
        };
    }


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
                        hidden={this.state.hidden}
                        noRenderContent
                    >
                        <TabBar.Item
                            title="首页"
                            key="Life"
                            icon={<i className="iconfont icon-ind"></i>}
                            selectedIcon={<i className="iconfont icon-ind"></i>}
                            selected={this.state.selectedTab === 'blueTab'}
                            // badge={1}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'blueTab',
                                });
                            }}
                            data-seed="logId"
                        >
                            
                        </TabBar.Item>
                        <TabBar.Item
                            icon={<i className="iconfont icon-findHouse"></i>}
                            selectedIcon={<i className="iconfont icon-findHouse"></i>}
                            title="找房"
                            key="Koubei"
                            // badge={'new'}
                            selected={this.state.selectedTab === 'redTab'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'redTab',
                                });
                            }}
                            data-seed="logId1"
                        >
                           
                        </TabBar.Item>
                        <TabBar.Item
                            icon={<i className="iconfont  icon-infom"></i>}
                            selectedIcon={<i className="iconfont  icon-infom"></i>}
                            title="资讯"
                            key="Friend"
                            // dot
                            selected={this.state.selectedTab === 'greenTab'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'greenTab',
                                });
                            }}
                        >
                           
                        </TabBar.Item>
                        <TabBar.Item
                            icon={<i className="iconfont  icon-my"></i>}
                            selectedIcon={<i className="iconfont  icon-my"></i>}
                            title="我的"
                            key="my"
                            selected={this.state.selectedTab === 'yellowTab'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'yellowTab',
                                });
                            }}
                        >
                           
                        </TabBar.Item>
                    </TabBar>
            </div>
        )
    }
}
