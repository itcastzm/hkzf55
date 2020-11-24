import React, { Component } from 'react'
import { Carousel, Flex, Grid } from 'antd-mobile';

import axios from 'axios';

import Nav1 from '../../assets/images/nav-1.png';
import Nav2 from '../../assets/images/nav-2.png';
import Nav3 from '../../assets/images/nav-3.png';
import Nav4 from '../../assets/images/nav-4.png';

// 引入样式
import './index.scss';

const navs = [
    { img: Nav1, title: '整租', path: '/home/houselist' },
    { img: Nav2, title: '合租', path: '/home/houselist' },
    { img: Nav3, title: '地图找房', path: '/map' },
    { img: Nav4, title: '去出租', path: '/login' },
]


export default class Index extends Component {

    state = {
        swipers: [],
        groups: [],
        imgHeight: 212,
    }

    componentDidMount() {
        this.getSwipers();
        this.getGroups();
    }

    // 导航区域调转回调
    handleJump(item) {
        this.props.history.push(item.path);
    }
    // 获取轮播图数据
    async getSwipers() {
        const res = await axios.get(`http://localhost:8080/home/swiper`);

        this.setState({
            swipers: res.data.body
        });
    }

    // 获取租房小组数据
    async getGroups() {
        const res = await axios.get(`http://localhost:8080/home/groups`, {
            params: {
                area: 'AREA%7C88cff55c-aaa4-e2e0'
            }
        });

        this.setState({
            groups: res.data.body
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
                            src={`http://localhost:8080${val.imgSrc}`}
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
                <img src={`http://localhost:8080${item.imgSrc}`} />
            </Flex>
        );
    }

    render() {
        return (
            <div className="index">

                {/* 轮播图区域 */}
                <div className="swipers">
                    {this.renderSwipers()}
                </div>

                {/* 导航 */}
                <Flex className="nav" justify="around">
                    {navs.map((item, index) => (
                        <Flex.Item key={index} onClick={this.handleJump.bind(this, item)}><img src={item.img} alt="" /><h2>{item.title}</h2></Flex.Item>
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



            </div>
        )
    }
}
