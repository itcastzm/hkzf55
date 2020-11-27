import React, { Component } from 'react'


// 导入NavHeader组件
import NavHeader from '../../components/NavHeader';


import { getCurrentCity } from '../../utils'
// import './index.scss';

import styles from './index.module.css';

export default class Map extends Component {


    async componentDidMount() {

        const { label } = await getCurrentCity();

        // console.log(cityInfo);

        var map = new window.BMap.Map("container");


        // 创建地址解析器实例     
        var myGeo = new window.BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野    
        myGeo.getPoint(label, function (point) {
            if (point) {
                console.log(point, 'point');

                map.centerAndZoom(point, 11);
                // map.addOverlay(new BMap.Marker(point));
            }
        }, label);

        // var point = new window.BMap.Point(116.404, 39.915);

        // map.centerAndZoom(point, 15);
    }

    render() {
        return (
            <div className={styles.mapWrapper}  >

                <NavHeader >地图找房</NavHeader>

                <div id="container">

                </div>
            </div>
        )
    }
}
