import React, { Component } from 'react'
import { Carousel, Flex } from 'antd-mobile';

import axios from 'axios';

import Nav1 from '../../assets/images/nav-1.png';
import Nav2 from '../../assets/images/nav-2.png';
import Nav3 from '../../assets/images/nav-3.png';
import Nav4 from '../../assets/images/nav-4.png';


// 引入样式
import './index.scss';


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
                    <Flex.Item><img src={Nav1} alt="" /><h2>整租</h2></Flex.Item>
                    <Flex.Item><img src={Nav2} alt="" /><h2>合租</h2></Flex.Item>
                    <Flex.Item><img src={Nav3} alt="" /><h2>地图找房</h2></Flex.Item>
                    <Flex.Item><img src={Nav4} alt="" /><h2>去出租</h2></Flex.Item>
                </Flex>

            </div>
        )
    }
}
