import React, { Component } from 'react'

import SearchBox from '../../components/SearchBox';
import { Flex } from 'antd-mobile';

import { getCurrentCity } from '../../utils'

// 导入FIlter组件
import Filter from './components/Filter';

import styles from './index.module.scss';

export default class HouseList extends Component {

    state = {
        cityInfo: {}
    }


    async componentDidMount() {
        const cityInfo = await getCurrentCity();
        this.setState({
            cityInfo
        });
    }

    render() {
        return (
            <div className={styles.houselistWrapper}>
                <Flex className={styles.header}>
                    <i className="iconfont  icon-back" onClick={ () => this.props.history.go(-1) } ></i>
                    <SearchBox cityName={this.state.cityInfo.label || '上海'} className={styles.search} />
                </Flex>
                
                {/* 筛选框 */}
                <Filter  />
            </div>
        )
    }
}
