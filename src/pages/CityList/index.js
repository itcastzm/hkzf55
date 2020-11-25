import React, { Component } from 'react'

import { NavBar, Icon } from 'antd-mobile';

// 导入List组件
import { List, AutoSizer, WindowScroller } from 'react-virtualized';

import axios from 'axios';

import './index.scss';

import { getCurrentCity } from '../../utils'


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


function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
}) {
    return (
        <div key={key} style={style}>
            <h3>一行数据</h3>
        </div>
    );
}


/* 
  1 将获取到的 cityList 和 cityIndex  添加为组件的状态数据。
  2 修改 List 组件的 rowCount 为 cityIndex 的长度。
  3 将 rowRenderer 函数，添加到组件中，以便在函数中获取到状态数据 cityList 和 cityIndex。
  4 修改 List 组件的 rowRenderer 为组件中的 rowRenderer 方法。
  5 修改 rowRenderer 方法中渲染的每行结构和样式。
  6 修改 List 组件的 rowHeight 为函数，动态计算每一行的高度（因为每一行高度都不相同）。
  
  <div key={key} style={style} className="city">
    <div className="title">S</div>
    <div className="name">上海</div>
  </div>
*/

export default class CityList extends Component {

    state = {
        cityIndex: [],
        cityList: {}
    }

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
        cityList['hot'] = hotRes.data.body;

        const curcityInfo = await getCurrentCity();

        cityIndex.unshift('#');
        cityList['#'] = [curcityInfo];

        this.setState({
            cityIndex,
            cityList
        });
        // console.log(cityIndex, cityList);
    }

    render() {
        return (
            <div className="citylist-wrapper">
                <NavBar
                    mode="light"
                    icon={<i className="iconfont icon-back"></i>}
                    onLeftClick={() => this.props.history.go(-1)}
                >城市选择</NavBar>

                {/* <WindowScroller>
                    {({ height, isScrolling, onChildScroll, scrollTop }) => ( */}
                        <AutoSizer>
                            {({height, width }) => (
                                <List
                                    width={width}
                                    height={height}
                                    rowCount={this.state.cityIndex.length}
                                    rowHeight={50}
                                    rowRenderer={rowRenderer}
                                />
                            )}
                        </AutoSizer>
                    {/* )} */}
                {/* </WindowScroller> */}
            </div>
        )
    }
}
