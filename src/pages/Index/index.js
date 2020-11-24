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
    { img: Nav1, title: '整租' },
    { img: Nav2, title: '合租' },
    { img: Nav3, title: '地图找房' },
    { img: Nav4, title: '去出租' },
]

const data1 = Array.from(new Array(4)).map(() => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
}));



export default class Index extends Component {

    state = {
        swipers: [],
        imgHeight: 212,
    }

    componentDidMount() {
        this.getSwipers();
    }

    async getSwipers() {
        const res = await axios.get(`http://localhost:8080/home/swiper`);

        this.setState({
            swipers: res.data.body
        });
    }

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
                        <Flex.Item key={index}><img src={item.img} alt="" /><h2>{item.title}</h2></Flex.Item>
                    ))}
                </Flex>

                {/* 租房小组 */}
                <div className="groups">
                    <div className="title">
                        租房小组
                        <span className="more">更多</span>
                    </div>

                    <Grid data={data1}
                        columnNum={2}
                        hasLine={false}
                        square={false}
                        renderItem={dataItem => (
                            <Flex className="group-item">
                                <Flex.Item className="desc">
                                    <p className="title">家住回龙观</p>
                                    <span className="info">归属的感觉</span>
                                </Flex.Item>
                                <img src="http://localhost:8080/img/groups/1.png" />
                            </Flex>
                        )}
                    />
                </div>



            </div>
        )
    }
}
