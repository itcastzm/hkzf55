import React, { Component } from 'react'

import SearchBox from '../../components/SearchBox';
import { Flex, Toast } from 'antd-mobile';

import { getCurrentCity } from '../../utils';


import { List, AutoSizer, WindowScroller, InfiniteLoader } from 'react-virtualized';

import API from '../../utils/api';
import BASE_URL from '../../utils/url';

import HouseItem from '../../components/HouseItem';

import NoHouse from '../../components/NoHouse'


import Sticky from '../../components/Sticky';

// 导入FIlter组件
import Filter from './components/Filter';

import styles from './index.module.scss';

export default class HouseList extends Component {

    state = {
        cityInfo: {},
        count: 0,
        list: [],
        // 加载中
        isLoading: false
    }


    filters = {}

    async componentDidMount() {
        const cityInfo = await getCurrentCity();
        this.setState({
            cityInfo
        });

        this.fetchHouseListData();
    }


    async fetchHouseListData() {
        // 获取城市id
        const cityInfo = await getCurrentCity();

        // 开启loading
        Toast.loading('加载中', 0, null, true);
        this.setState({
            isLoading: true
        });

        const res = await API.get(`/houses`, {
            params: {
                cityId: cityInfo.value,
                ...this.filters,
                start: 1,
                end: 20
            }
        });

        Toast.hide();

        if (res.data.body.count !== 0) {
            Toast.info(`共找到${res.data.body.count}套房源`);
        }



        this.setState({
            count: res.data.body.count,
            list: res.data.body.list,
            isLoading: false
        });
    }

    onFilter = (data) => {
        // console.log(data, 'data');

        this.filters = data;

        this.fetchHouseListData();
    }


    rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    }) => {

        const { list } = this.state;
        const item = list[index];

        // 判断item 是否为空 undefined
        if (!item) {
            return (
                <div key={key} style={style}>
                    <p className={styles.loading}>加载中...</p>
                </div>
            )
        }

        return <HouseItem
            style={style}
            key={key}
            // src={`${BASE_URL}${item.houseImg}`}
            src={BASE_URL + item.houseImg}
            title={item.title}
            desc={item.desc}
            tags={item.tags}
            price={item.price}
            onClick={() => {
                this.props.history.push(`/housedetail/${item.houseCode}`)
            }}
        />;
    }


    // InfiniteLoader 判断数据是否加载的函数
    isRowLoaded = ({ index }) => {
        let rs = !!this.state.list[index];
        console.log(index, 'isRowLoaded', rs);
        return rs;
    }

    // InfiniteLoader 加载更多数据的方法
    loadMoreRows = async ({ startIndex, stopIndex }) => {

        // 获取城市id
        const cityInfo = await getCurrentCity();

        return new Promise((resolve) => {

            API.get(`/houses`, {
                params: {
                    cityId: cityInfo.value,
                    ...this.filters,
                    start: startIndex,
                    end: stopIndex
                }
            }).then((res) => {

                this.setState({
                    // count: res.data.body.count,
                    list: [...this.state.list, ...res.data.body.list]
                });
                resolve();
            })

        })
    }

    renderHouseList() {

        const { isLoading, count } = this.state;

        if (!isLoading && !count) {
            return <NoHouse>没有找到房源，请您换个搜索条件吧~</NoHouse>
        }

        return <InfiniteLoader
            isRowLoaded={this.isRowLoaded}
            loadMoreRows={this.loadMoreRows}
            rowCount={this.state.count}
        >
            {({ onRowsRendered, registerChild }) => (
                <WindowScroller>
                    {({ height, isScrolling, scrollTop }) => (
                        <AutoSizer>
                            {({ width }) => (
                                <List
                                    autoHeight
                                    onRowsRendered={onRowsRendered}
                                    ref={registerChild}
                                    width={width}
                                    height={height}
                                    rowCount={this.state.count}
                                    rowHeight={120}
                                    rowRenderer={this.rowRenderer}
                                    scrollTop={scrollTop}
                                    isScrolling={isScrolling}
                                />
                            )}
                        </AutoSizer>
                    )}
                </WindowScroller>
            )}
        </InfiniteLoader>
    }

    render() {
        return (
            <div className={styles.houselistWrapper}>
                <Flex className={styles.header}>
                    <i className="iconfont  icon-back" onClick={() => this.props.history.go(-1)} ></i>
                    <SearchBox cityName={this.state.cityInfo.label || '上海'} className={styles.search} />
                </Flex>

                {/* 筛选框 */}
                <Sticky offset={40}>
                    <Filter onFilter={this.onFilter} />
                </Sticky>

                <div className={styles.houseItems}>
                    {this.renderHouseList()}
                </div>


            </div>
        )
    }
}
