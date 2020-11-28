import React, { Component } from 'react'


// 导入NavHeader组件
import NavHeader from '../../components/NavHeader';

import axios from 'axios';

import { getCurrentCity } from '../../utils'
// import './index.scss';

import styles from './index.module.css';

export default class Map extends Component {


    async componentDidMount() {

        const { label, value } = await getCurrentCity();

        // console.log(label, value);

        const res = await axios.get(`http://localhost:8080/area/map?id=${value}`);

        var map = new window.BMap.Map("container");

        console.log(res.data.body);


        // 创建地址解析器实例     
        var myGeo = new window.BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野    
        myGeo.getPoint(label, function (point) {
            if (point) {
                console.log(point, 'point');

                map.centerAndZoom(point, 11);

                map.addControl(new window.BMap.NavigationControl());
                map.addControl(new window.BMap.ScaleControl());
                // map.addControl(new window.BMap.OverviewMapControl());

                // map.addOverlay(new BMap.Marker(point));


                var opts = {
                    position: point, // 指定文本标注所在的地理位置
                    offset: new window.BMap.Size(30, -30) // 设置文本偏移量
                };
                // 创建文本标注对象
                var label = new window.BMap.Label('你好', opts);
                // 自定义文本标注样式
                label.setStyle({
                    width: '70px',
                    height: '70px',
                    display: 'inline-block',
                    borderRadius: '50%',
                    backgroundColor: '#0cb56ae6',
                    color: '#fff',
                    fontSize: '12px',
                    border: '1px solid #fff',
                    textAlign: 'center',
                    lineHeight: '30px',
                    fontFamily: '微软雅黑'
                });

                // 添加覆盖物内部html标签
                label.setContent(`<p>浦东</p><p>436套</p>`);

                map.addOverlay(label);
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
