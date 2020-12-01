import React, { Component } from 'react'

import SearchBox from '../../components/SearchBox';
import { Flex } from 'antd-mobile';

import { getCurrentCity } from '../../utils';

import API from '../../utils/api';

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

    render() {
        return (
            <div className={styles.houselistWrapper}>
                <Flex className={styles.header}>
                    <i className="iconfont  icon-back" onClick={() => this.props.history.go(-1)} ></i>
                    <SearchBox cityName={this.state.cityInfo.label || '上海'} className={styles.search} />
                </Flex>

                {/* 筛选框 */}
                <Filter onFilter={this.onFilter} />
            </div>
        )
    }
}
