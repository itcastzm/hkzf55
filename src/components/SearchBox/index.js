import React from 'react'
import { Flex } from 'antd-mobile'

import styles from './index.module.scss';

export default function SearchBox() {
    return (
        <Flex className={styles.searchBoxComp}>
            <Flex className={styles.search}>
                <div className={styles.location} onClick={()=> console.log()}>
                    { '上海'}
                    <i className="iconfont icon-arrow"></i>
                </div>
                <div className={styles.form}>
                    <i className="iconfont icon-seach"></i>
                    <span>请输入小区或地址</span>
                </div>
            </Flex>
            <i className="iconfont  icon-map"
                onClick={() => this.props.history.push('/map')}></i>
        </Flex>
    )
}
