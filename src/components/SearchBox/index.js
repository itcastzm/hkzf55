import React from 'react'
import { Flex } from 'antd-mobile'

import './index.scss';

export default function SearchBox({ className }) {
    return (
        <Flex className={`search-box ${className ? className : ''}`}>
            <Flex className="search">
                <div className="location" onClick={() => console.log()}>
                    {'上海'}
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
    )
}
