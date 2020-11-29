import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'


const titleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false,
}

export default class Filter extends Component {

  state = {
    titleSelectedStatus,
    // 打开类型
    openType: ''
  }

  onTitleClick = (type) => {
    //  type area   mode   price   more 
    this.setState({

      titleSelectedStatus: {
        ...this.state.titleSelectedStatus,
        [type]: true,
      },

      openType: type
    });
  }

  render() {

    const { openType } = this.state;

    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}

        {  openType === 'area' || openType === 'mode'
          || openType === 'price' ? <div className={styles.mask} /> : null}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle onClick={this.onTitleClick} titleSelectedStatus={this.state.titleSelectedStatus} />

          {/* 前三个菜单对应的内容： */}
          {/* <FilterPicker /> */}
          {  openType === 'area' || openType === 'mode'
          || openType === 'price' ?  <FilterPicker /> : null}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
