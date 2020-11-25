import React, { Component } from 'react'

import { NavBar, Icon } from 'antd-mobile';

import axios from 'axios';

import './index.scss';


function formatCityList(list) {

    const cityList = {};

    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        let first = item.short.substr(0, 1);

        if (cityList[first]) {
            cityList[first].push(item);
        } else {
            cityList[first] = [item];
        }
    }

    const cityIndex = Object.keys(cityList).sort();

    return {
        cityIndex,
        cityList
    };

}

export default class CityList extends Component {


    // 获取城市信息
    componentDidMount() {

        this.fetchCityList();
    }


    async fetchCityList() {
        const res = await axios.get(`http://localhost:8080/area/city?level=1`);

        // console.log(res.data.body)

        const { cityList, cityIndex } = formatCityList(res.data.body);

        const hotRes = await axios.get(`http://localhost:8080/area/hot`);

        cityIndex.unshift('hot');
        cityList['hot']= hotRes.data.body;

        console.log(cityIndex, cityList);
    }

    render() {
        return (
            <div className="citylist-wrapper">
                <NavBar
                    mode="light"
                    icon={<i className="iconfont icon-back"></i>}
                    onLeftClick={() => this.props.history.go(-1)}

                >城市选择</NavBar>
                城市选择页面
            </div>
        )
    }
}
