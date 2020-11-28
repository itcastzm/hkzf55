import React, { Component } from 'react'


// 导入NavHeader组件
import NavHeader from '../../components/NavHeader';

import axios from 'axios';

import { getCurrentCity } from '../../utils'
// import './index.scss';

import styles from './index.module.css';


const labelStyle = {
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
}

export default class Map extends Component {


    async componentDidMount() {

        const { label, value } = await getCurrentCity();

        // console.log(label, value);

        var map = new window.BMap.Map("container");

        // 创建地址解析器实例     
        var myGeo = new window.BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野    
        myGeo.getPoint(label, async function (point) {
            if (point) {
                console.log(point, 'point');

                map.centerAndZoom(point, 11);

                map.addControl(new window.BMap.NavigationControl());
                map.addControl(new window.BMap.ScaleControl());
                // map.addControl(new window.BMap.OverviewMapControl());

                // map.addOverlay(new BMap.Marker(point));
                const res = await axios.get(`http://localhost:8080/area/map?id=${value}`);

                // console.log(res.data.body);

                res.data.body.forEach((v, i) => {

                    // new BMap.Point(116.404, 39.915);
                    let labelPoint = new window.BMap.Point(v.coord.longitude, v.coord.latitude);

                    let opts = {
                        position: labelPoint, // 指定文本标注所在的地理位置
                        offset: new window.BMap.Size(-35, -35) // 设置文本偏移量
                    };
                    // 创建文本标注对象
                    let label = new window.BMap.Label( '', opts);
                    // 自定义文本标注样式
                    label.setStyle(labelStyle);

                    // 添加覆盖物内部html标签
                    label.setContent(`
                                <p class="${styles.name}">${v.label}</p>
                                <p class="${styles.count}">${v.count}套</p>
                    `);


                    label.addEventListener( 'click',  ()=> {
                        // 1. 地图发生了移动
                            map.panTo(labelPoint);
                        // 2. 地图放大了
                            map.setZoom(13);
                        // 3. 原来的覆盖物 被清除了
                            setTimeout(()=> {
                                map.clearOverlays();
                            }, 0);
                            
                        // 4. 镇的数据 被渲染成覆盖物
                        // this.getData();
                        // const res = await axios.get(`http://localhost:8080/area/map?id=${v.value}`);

                        // console.log(res.data.body);

                    });


                    map.addOverlay(label);
                })



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
