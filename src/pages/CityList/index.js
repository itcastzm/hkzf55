import React, { Component } from 'react'

import { NavBar, Icon } from 'antd-mobile';

import './index.scss';

export default class CityList extends Component {
    render() {
        return (
            <div className="citylist-wrapper">
                <NavBar
                    mode="light"
                    icon={<i  className="iconfont icon-back"></i>}
                    onLeftClick={() => this.props.history.go(-1)}
              
                >城市选择</NavBar>
                城市选择页面
            </div>
        )
    }
}
