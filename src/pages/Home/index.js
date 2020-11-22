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

export default class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
            fullScreen: false,
        };
    }


    renderContent(pageText) {
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
                <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
                    onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                            hidden: !this.state.hidden,
                        });
                    }}
                >
                    Click to show/hide tab-bar
            </a>
                <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
                    onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                            fullScreen: !this.state.fullScreen,
                        });
                    }}
                >
                    Click to switch fullscreen
            </a>
            </div>
        );
    }


    render() {
        return (
            <div>

                <Route path="/home" exact component={Index} />
                <Route path="/home/news" component={News} />
                <Route path="/home/my" component={Profile} />
                <Route path="/home/houselist" component={HouseList} />


                <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#21b97a"
                        barTintColor="white"
                        hidden={this.state.hidden}
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
                            {this.renderContent('Life')}
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
                            {this.renderContent('Koubei')}
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
                            {this.renderContent('Friend')}
                        </TabBar.Item>
                        <TabBar.Item
                            icon={ <i className="iconfont  icon-my"></i>}
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
                            {this.renderContent('My')}
                        </TabBar.Item>
                    </TabBar>
                </div>


            </div>
        )
    }
}
