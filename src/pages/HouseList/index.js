import React, { Component } from 'react'

import SearchBox from '../../components/SearchBox';
import { Flex } from 'antd-mobile';

import { getCurrentCity } from '../../utils';


import { List } from 'react-virtualized';

import API from '../../utils/api';
import BASE_URL from '../../utils/url';

import HouseItem from '../../components/HouseItem';

// 导入FIlter组件
import Filter from './components/Filter';

import styles from './index.module.scss';

export default class HouseList extends Component {

    state = {
        cityInfo: {},
        count: 0,
        list: []
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
        const res = await API.get(`/houses`, {
            params: {
                cityId: cityInfo.value,
                ...this.filters,
                start: 1,
                end: 20
            }
        });

        this.setState({
            count: res.data.body.count,
            list: res.data.body.list
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

        return <HouseItem
            key={item.houseCode}
            src={`${BASE_URL}${item.houseImg}`}
            title={item.title}
            desc={item.desc}
            tags={item.tags}
            price={item.price}
            onClick={() => console.log('点击房源！')}
        />;
    }

    render() {
        return (
            <div className={styles.houselistWrapper}>
                <Flex className={styles.header}>
                    <i className="iconfont  icon-back" onClick={() => this.props.history.go(-1)} ></i>
                    <SearchBox cityName={this.state.cityInfo.label || '上海'} className={styles.search} />
                </Flex>

                {/* 筛选框 */}
                <Filter onFilter={this.onFilter} />


                <div className={styles.houseItems}>
                    <List
                        width={300}
                        height={300}
                        rowCount={this.state.count}
                        rowHeight={120}
                        rowRenderer={this.rowRenderer}
                    // onRowsRendered={this.onRowsRendered}
                    // ref={this.listRef}
                    // scrollToAlignment={'start'}
                    />
                </div>


            </div>
        )
    }
}
