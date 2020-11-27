import React from 'react'
import { NavBar } from 'antd-mobile';

import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

import './index.scss';

function NavHeader(props) {

    const defaultHandle = () => props.history.go(-1);

    return (
        <NavBar
            mode="light"
            icon={<i className="iconfont icon-back"></i>}
            onLeftClick={ props.onLeftClick || defaultHandle}
        >
            {props.children}
        </NavBar>
    )
}

NavHeader.propTypes = {
    children: PropTypes.string.isRequired,
    onLeftClick : PropTypes.func
}

// NavHeader.defaultProps = {
//     onLeftClick: () => props.history.go(-1)
// }


export default withRouter(NavHeader);