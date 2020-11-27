import React, { Component } from 'react'

import { Toast } from 'antd-mobile';

// 导入List组件
import { List, AutoSizer, WindowScroller } from 'react-virtualized';

import axios from 'axios';

import './index.scss';

import { getCurrentCity } from '../../utils'

import NavHeader from '../../components/NavHeader'


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

    //  'a'  'b'  'c'  ASCII
    const cityIndex = Object.keys(cityList).sort();

    return {
        cityIndex,
        cityList
    };

}


// 索引（A、B等）的高度
const TITLE_HEIGHT = 36
// 每个城市名称的高度
const NAME_HEIGHT = 50

export default class CityList extends Component {


    constructor() {
        super();
        this.state = {
            cityIndex: [],
            cityList: {},
            curIndex: 0
        }

        // 创建ref引用
        this.listRef = React.createRef();
    }


    // 获取城市信息
    componentDidMount() {

        this.fetchCityList();
        //    // 2. 解决List组件js驱动滚动误差问题
        //    this.listRef.current.measureAllRows();

    }
    // 获取列表每一行的高度
    getRowHeight = ({ index }) => {
        const letter = this.state.cityIndex[index];
        const list = this.state.cityList[letter];

        return TITLE_HEIGHT + NAME_HEIGHT * list.length;

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
        }, () => {
            // 2. 解决List组件js驱动滚动误差问题
            this.listRef.current.measureAllRows();
        });

        // 1. 解决List组件js驱动滚动误差问题
        // this.listRef.current.measureAllRows();
        // console.log(cityIndex, cityList);
    }

    // List 每一行即将渲染时触发回调
    onRowsRendered = ({ overscanStartIndex, startIndex }) => {

        const { curIndex } = this.state;

        if (curIndex !== startIndex && overscanStartIndex != 0) {
            // console.log('startIndex', startIndex);
            this.setState({
                curIndex: startIndex
            })
        }
    }

    // 该方法在使用的时候 已经绑定this  所以需要在定义的时候绑定this
    // 右侧索引点击滚动 List组件
    scrollTo(index) {
        // 通过非受控拿到List组件的实例
        // console.log(this.listRef.current);
        this.listRef.current.scrollToRow(index);
    }

    // 切换城市
    changeCity(item) {
        if (['北京', '上海', '广州', '深圳'].indexOf(item.label) > -1) {
            // 正常切换
            localStorage.setItem('hkzf_55_city', JSON.stringify(item));

            this.props.history.go(-1);

        } else {
            //没有房源数据
            Toast.info('该城市暂无房源数据！', 2, null, false);
        }
    }

    rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    }) => {
        const letter = this.state.cityIndex[index];
        const list = this.state.cityList[letter];

        let title = '';

        switch (letter) {
            case '#':
                title = '当前城市';
                break;
            case 'hot':
                title = '热门城市';
                break;
            default:
                title = letter.toUpperCase();
                break;
        }

        return (
            <div key={key} style={style} className="city">
                <div className="title">{title}</div>
                {list.map((item, i) => (<div key={i}
                    onClick={this.changeCity.bind(this, item)}
                    className="name">{item.label}</div>))}
            </div>
        );
    }

    render() {
        return (
            <div className="citylist-wrapper">

                <NavHeader >城市选择</NavHeader>
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            width={width}
                            height={height}
                            rowCount={this.state.cityIndex.length}
                            rowHeight={this.getRowHeight}
                            rowRenderer={this.rowRenderer}
                            onRowsRendered={this.onRowsRendered}
                            ref={this.listRef}
                            scrollToAlignment={'start'}
                        />
                    )}
                </AutoSizer>

                <ul className="city-index">

                    {this.state.cityIndex.map((item, i) => (
                        // <li key={i} className="city-index-item"  onClick={this.scrollTo.bind(this, i)} >
                        <li key={i} className="city-index-item" onClick={() => this.scrollTo(i)} >
                            <span className={i === this.state.curIndex ? 'index-active' : ''}>
                                {item === 'hot' ? '热' : item.toUpperCase()}
                            </span>
                        </li>

                    ))}

                </ul>

            </div>
        )
    }
}
