import React, { Component } from 'react'
import { Carousel, Flex  } from 'antd-mobile';

import axios from 'axios';

import Nav1 from '../../assets/images/nav-1.png';
import Nav2 from '../../assets/images/nav-2.png';
import Nav3 from '../../assets/images/nav-3.png';
import Nav4 from '../../assets/images/nav-4.png';


// 引入样式
import  './index.css';


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

    render() {
        return (
            <div className="index">


                {this.state.swipers.length ? <Carousel
                    autoplay={true}
                    infinite
                    autoplayInterval={1000}
                >
                    {this.state.swipers.map(val => (
                        <a
                            key={val.id}
                            href="http://www.itcast.cn"
                            style={{ display: 'inline-block', width: '100%', height: 212 }}
                        >
                            <img
                                src={`http://localhost:8080${val.imgSrc}`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                            // onLoad={() => {
                            //     // fire window resize event to change height
                            //     window.dispatchEvent(new Event('resize'));
                            //     this.setState({ imgHeight: 'auto' });
                            // }}
                            />
                        </a>
                    ))}
                </Carousel> : null}

                {/* 导航 */}
                <Flex className="nav"  justify="around">
                    <Flex.Item><img  src={Nav1}  alt=""  /><h2>整租</h2></Flex.Item>
                    <Flex.Item><img  src={Nav2}  alt=""  /><h2>整租</h2></Flex.Item>
                    <Flex.Item><img  src={Nav3}  alt=""  /><h2>整租</h2></Flex.Item>
                    <Flex.Item><img  src={Nav4}  alt=""  /><h2>整租</h2></Flex.Item>
                </Flex>

            </div>
        )
    }
}
