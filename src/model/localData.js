/**
 * Created by lenovo on 2016/10/31.
 * 本地数据存取的方法
 */
export function addData(name,data) {
    if(!data) return false;
    var datas = "";
    if (data instanceof Object) {
        datas = JSON.stringify(data)
    } else {
        datas = data;
    }
    window.localStorage[name] = datas;
}
export  function getData(name) {
    var data=window.localStorage[name];
    if(data){
        data =window.localStorage[name];
    }else {
        data=false;
    }
    return data;
}