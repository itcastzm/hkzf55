import React, { Component } from 'react'


import './index.scss';
export default class Sticky extends Component {

    constructor() {

        super();
        this.placeHolder = React.createRef();
        this.content = React.createRef();
    }


    handleScroll = () => {

        let placeHolderEl = this.placeHolder.current;
        let contentEl = this.content.current;
        const { offset } = this.props;
        // 获取占位元素的top值
        let { top } = placeHolderEl.getBoundingClientRect();

        if (top > 0) {
            //正常不吸顶
            contentEl.classList.remove('sticky-fixed');
            placeHolderEl.style.height = '0px';
        } else {
            //吸顶
            contentEl.classList.add('sticky-fixed');
            // 动态传入占位元素的高度
            placeHolderEl.style.height = `${offset}px`;
        }

    }

    componentDidMount() {
        // 监听窗口滚动事件
        window.addEventListener('scroll', this.handleScroll)
    }

    // 移除监听事件
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }


    render() {
        return (
            <div>
                {/* 占位元素 */}
                <div ref={this.placeHolder} style={{ height: 0 }} ></div>

                {/* 内容元素 */}
                <div ref={this.content}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
