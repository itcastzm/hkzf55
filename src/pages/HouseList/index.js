import React, { Component } from 'react'

import SearchBox from '../../components/SearchBox';
import { Flex} from 'antd-mobile'

import  styles from './index.module.scss';

export default class HouseList extends Component {
    render() {
        return (
            <div  className={styles.houselistWrapper}>

                <Flex>
                    <SearchBox  />
                </Flex>


                找房
            </div>
        )
    }
}
