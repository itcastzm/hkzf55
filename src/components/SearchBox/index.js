import React from 'react'
import { Flex } from 'antd-mobile';

import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

import './index.scss';

function SearchBox({ className, cityName, history }) {
    return (
        <Flex className={`search-box ${className ? className : ''}`}>
            <Flex className="search">
                <div className="location" onClick={() => history.push('/citylist')}>
                    {cityName}
                    <i className="iconfont icon-arrow"></i>
                </div>
                <div className="form">
                    <i className="iconfont icon-seach"></i>
                    <span>请输入小区或地址</span>
                </div>
            </Flex>
            <i className="iconfont  icon-map" onClick={() => history.push('/map')}></i>
        </Flex>
    )
}

SearchBox.propTypes = {
    cityName: PropTypes.string.isRequired
}



export default withRouter(SearchBox);
