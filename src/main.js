import Vue from 'vue'
import MintUI from 'mint-ui'
import VueResource from 'vue-resource'
import router from "./model/router"
import App from './App.vue'
import store from './model/store'

window.moment =require('moment');

Vue.use(VueResource);
Vue.use(MintUI);
Vue.http.options.emulateJSON = true;
Vue.http.options.body = 'FormData';
const base = "http://che.slkfz.cn/"
Vue.prototype.API_ROOT = "http://che.slkfz.cn/";
Vue.prototype.IMAGE_ROOT = "http://che.slkfz.cn";
Vue.prototype.VIDEO_ROOT = "http://che.slkfz.cn/";
Vue.prototype.server = {
    user:{
        login: base+"index.php?m=api&a=login_sms",
        register:base+"index.php?m=api&a=register",
        phoneCode:base+"index.php?m=api&a=sendmsg",
        isRegister:base+"index.php?m=api&a=regjudge",
        forgetPass:base+"ndex.php?m=api&a=forgetpwd",
        nextPass:base+"index.php?m=api&a=forgetpwd",
        changePass:base+"index.php?m=api&a=modifypwd",
    },
    car:{
        carList:base+"index.php?m=api&a=search",
        carDetail:base+"index.php?m=api&a=cars",
        collectCar:base+"index.php?m=api&a=carmode",
        delcollect:base+"/index.php?m=api&a=delcollect"
    },
    buy:{
        getPay:base+"index.php?m=api&a=assesscar&subsubbrand=43508&mk=60&reyear=2013&remonth=10&token=sdhiadklfdkjlsafhlsafhlsadf",
        sale:base+"index.php?m=api&a=subcars&token=fsafdsfsafsafsafsafsafsafs",
    },
    sell:{
        sellCar:base+"index.php?m=api&a=sell_cars"
    },
    my:{
        collect:base+"index.php?m=api&a=collectcars_list",
        cancelCollect:base+"index.php?m=api&a=delcollect&token=fsafdsfsafsafsafsafsafsafs",
        feedback:base+"index.php?m=api&a=feedback",
        record:base+"index.php?m=api&a=browse_record",
        contact:base+"index.php?m=api&a=contact",
        searchuser:base+"index.php?m=api&a=searchuser",
        user_edit:base+"index.php?m=api&a=user_edit"
    }
}
Vue.prototype.getBody=(url,body)=>{
    let     news="";
    let    keys = Object.keys(body)
    for(let i=0,n=keys.length;i<n;++i){
        news+="&"+keys[i]+"="+body[keys[i]]
    }
    return url+news
}

new Vue({
    router,store,
    el: '#app',
    render: h => h(App)

})