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

        let { top } = placeHolderEl.getBoundingClientRect();

        if (top > 0) {
            //正常不吸顶
            contentEl.classList.remove('sticky-fixed');
            placeHolderEl.style.height = '0px';
        } else {
            //吸顶
            contentEl.classList.add('sticky-fixed');
            placeHolderEl.style.height = '40px';
        }

    }

    componentDidMount() {

        window.addEventListener('scroll', this.handleScroll)
    }


    render() {
        return (
            <div>
                <div ref={this.placeHolder} style={{ height: 0 }} ></div>
                <div ref={this.content}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
