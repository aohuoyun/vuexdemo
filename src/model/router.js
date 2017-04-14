/**
 * Created by lenovo on 2017/3/4.
 */
import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)


import home from './../component/home/home.vue'
import buy from './../component/buy/buy.vue'
import sell from './../component/sell/sell.vue'
import brand from './../component/brand/brand.vue'
import me from './../component/me/me.vue'
import finance from './../component/finance/finance.vue'

import meOrder from './../component/me/meOrder/meOrder.vue'
import meLike from './../component/me/meLike/meLike.vue'
import meHistory from './../component/me/meHistory/meHistory.vue'
import meContact from './../component/me/meContact/meContact.vue'
import meFeed from './../component/me/meFeed/meFeed.vue'

import carDetail from './../component/carDetail/carDetail.vue'
import pay from './../component/pay/pay.vue'
import set from './../component/me/set/set.vue'

import paixu from './../component/select/paixu/paixu.vue'
import pinpai from './../component/select/pinpai/pinpai.vue'
import jiage from './../component/select/jiage/jiage.vue'
import shaixuan from './../component/select/shaixuan/shaixuan.vue'

import login from './../component/login/login.vue'

import videocar from './../component/video/videocar.vue'

import userInfo from './../component/me/set/userInfo/userInfo.vue'
import changePhone from './../component/me/set/changePhone/changePhone.vue'

const routes = [{
    path: '/home',
    component: home,
},
    {
        path: '/buy',
        component: buy,
        children: [
            // select
            {
                path: '/paixu',
                component: paixu
            },
            {
                path: '/pinpai',
                component: pinpai
            },
            {
                path: '/jiage',
                component: jiage
            },
            {
                path: '/shaixuan',
                component: shaixuan
            },
        ]
    },
    {
        path:'/brand',
        component:brand
    },
    {
        path:"/finance",
        component:finance
    },
    {
        path: '/sell',
        component: sell
    },
    {
        path: '/me',
        component: me,

    },
    {
        path: '/meOrder',
        component: meOrder
    },
    {
        path: '/meLike',
        component: meLike
    },
    {
        path: '/meHistory',
        component: meHistory
    },
    {
        path: '/meContact',
        component: meContact
    },
    {
        path: '/meFeed',
        component: meFeed
    },
    {
        path: '/carDetail/:id',
        component: carDetail
    },
    {
        path: '/pay',
        component: pay
    },
    {
        path: '/set',
        component: set
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/videocar',
        component: videocar
    },
    {
        path: '/userInfo',
        component: userInfo
    },
    {
        path: '/changePhone',
        component: changePhone
    },
    {
        path: '*',
        redirect: '/home'
    } //默认跳转

]


const router = new VueRouter({
    // mode: 'history',
    routes: routes
})

export  default  router