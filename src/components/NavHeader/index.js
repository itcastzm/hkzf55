import React from 'react'
import { NavBar } from 'antd-mobile';

import { withRouter } from 'react-router-dom';

import './index.scss';

function NavHeader(props) {

    return (
        <NavBar
            mode="light"
            icon={<i className="iconfont icon-back"></i>}

            onLeftClick={() => props.history.go(-1)}
        >
            {props.children}
        </NavBar>
    )
}


export default withRouter(NavHeader);