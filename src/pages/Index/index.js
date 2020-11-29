import React, { Component } from 'react'
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile';

// import axios from 'axios';
import  API  from '../../utils/api';
import  BASE_URL from '../../utils/url';

import Nav1 from '../../assets/images/nav-1.png';
import Nav2 from '../../assets/images/nav-2.png';
import Nav3 from '../../assets/images/nav-3.png';
import Nav4 from '../../assets/images/nav-4.png';

// 引入样式
import './index.scss';

import { getCurrentCity } from '../../utils'

const navs = [
    { img: Nav1, title: '整租', path: '/home/houselist' },
    { img: Nav2, title: '合租', path: '/home/houselist' },
    { img: Nav3, title: '地图找房', path: '/map' },
    { img: Nav4, title: '去出租', path: '/login' },
]



// // 获取地理位置信息
// navigator.geolocation.getCurrentPosition(position => {
//     console.log('当前位置信息：', position)
// })


export default class Index extends Component {

    state = {
        swipers: [],
        groups: [],
        news: [],
        imgHeight: 212,
        cityInfo: null
    }

    async componentDidMount() {
        this.getSwipers();
        this.getGroups();
        this.getNews();

        // this.getCityInfo();
        const curcityInfo = await getCurrentCity();

        this.setState({
            cityInfo: curcityInfo
        });

    }

    // 导航区域调转回调
    handleJump(item) {
        this.props.history.push(item.path);
    }


    // 获取轮播图数据
    async getSwipers() {
        const res = await API.get(`/home/swiper`);

        this.setState({
            swipers: res.data.body
        });
    }

    // 获取租房小组数据
    async getGroups() {
        const res = await API.get(`/home/groups`, {
            params: {
                area: 'AREA%7C88cff55c-aaa4-e2e0'
            }
        });

        this.setState({
            groups: res.data.body
        });
    }

    // 获取最新资讯数据
    async getNews() {
        const res = await API.get(`/home/news`, {
            params: {
                area: 'AREA%7C88cff55c-aaa4-e2e0'
            }
        });

        this.setState({
            news: res.data.body
        });
    }

    // 渲染轮播图
    renderSwipers() {

        const { swipers } = this.state;

        if (swipers.length) {
            return <Carousel
                autoplay={true}
                infinite
                autoplayInterval={1000}
            >
                {swipers.map(val => (
                    <a key={val.id}
                        href="http://www.itcast.cn"
                        style={{ display: 'inline-block', width: '100%', height: 212 }}
                    >
                        <img
                            src={`${BASE_URL}${val.imgSrc}`}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                        />
                    </a>
                ))}
            </Carousel>
        }


        return null
    }

    // 渲染租房小组每个卡片区域
    renderItem = (item) => {

        return (
            <Flex className="group-item">
                <Flex.Item className="desc">
                    <p className="title">{item.title}</p>
                    <span className="info">{item.desc}</span>
                </Flex.Item>
                <img src={`${BASE_URL}${item.imgSrc}`} />
            </Flex>
        );
    }

    // 渲染最新资讯每个块区域
    renderNewItem = (item) => {
        return (
            <Flex className="news-item">
                <div className="img-wrap">
                    <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
                </div>
                <Flex className="desc" justify="between" direction="column" align="stretch">
                    <h3> {item.title}</h3>
                    <Flex justify="between" >
                        <span>{item.from}</span>
                        <span>{item.date}</span>
                    </Flex>
                </Flex>
            </Flex>
        )
    }

    // 城市信息点击事件
    handleCityList = () => {
        this.props.history.push('/citylist');
    }

    render() {

        const { cityInfo } = this.state;

        return (
            <div className="index">

                {/* 轮播图区域 */}
                <div className="swipers">

                    {this.renderSwipers()}

                    <Flex className="search-box">
                        <Flex className="search">
                            <div className="location" onClick={this.handleCityList}>
                                {cityInfo ? cityInfo.label : '上海'}
                                <i className="iconfont icon-arrow"></i>
                            </div>
                            <div className="form">
                                <i className="iconfont icon-seach"></i>
                                <span>请输入小区或地址</span>
                            </div>
                        </Flex>
                        <i className="iconfont  icon-map"
                            onClick={() => this.props.history.push('/map')}></i>
                    </Flex>

                </div>

                {/* 导航 */}
                <Flex className="nav" justify="around">
                    {navs.map((item, index) => (
                        <Flex.Item key={index} onClick={this.handleJump.bind(this, item)}>
                            <img src={item.img} alt="" />
                            <h2>{item.title}</h2></Flex.Item>
                    ))}
                </Flex>

                {/* 租房小组 */}
                <div className="groups">
                    <div className="title">
                        租房小组
                        <span className="more">更多</span>
                    </div>

                    <Grid data={this.state.groups}
                        columnNum={2}
                        hasLine={false}
                        square={false}
                        renderItem={this.renderItem}
                    />
                </div>

                {/* 最新资讯 */}
                <div className="news">
                    <h3>最新资讯</h3>
                    <WingBlank>
                        <Grid data={this.state.news}
                            columnNum={1}
                            hasLine={false}
                            square={false}
                            renderItem={this.renderNewItem}
                        />
                    </WingBlank>
                </div>
            </div>
        )
    }
}
