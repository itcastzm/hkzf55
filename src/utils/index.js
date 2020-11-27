import axios from 'axios';


export function getCurrentCity() {

    //当前城市信息

    return new Promise((resolve, reject) => {
        // 执行中
        // 调用 resolve() 进入成功状态
        // 调用 reject  进入失败状态
        try {
            // 先去localstorage查下 有没有  5M  cookie 4k
            const curCityStr = localStorage.getItem('hkzf_55_city');

            // localstorage数据处理
            let curCity = null;
            if (curCityStr === 'undefined' || curCityStr === null) {
                curCity = {}
            } else {
                curCity = JSON.parse(curCityStr)
            }

            // 最终判断localstorage里面有没有值
            if (curCity.label) {
                resolve(curCity);
                return;
            }

            // localstorage中没有值

            var myCity = new window.BMap.LocalCity();

            myCity.get(async (result) => {
                var cityName = result.name;

                const res = await axios.get(`http://localhost:8080/area/info?name=${cityName}`);

                localStorage.setItem('hkzf_55_city', JSON.stringify(res.data.body));
                resolve(res.data.body);
            });

        } catch (e) {
            reject(e);
        }
    })
}