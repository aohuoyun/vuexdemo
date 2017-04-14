<template>
    <div id="home" class="page">
        <div class="top_search">
            <img src="src/assets/images/logo.png" class="logo" alt="">
            <input type="text" placeholder="搜索您想要的车" name="" value="">
        </div>
        <mt-swipe :auto="4000" :style="{height: bannerh + 'px'}">
            <mt-swipe-item class="slide1" v-for="item in swipers">
                <img :src="item" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <div class="row no-gutter san-btn" style="margin:10px auto;">
            <div class="col-50">
                <router-link to="/buy">
                    <mt-button class="btn-50" type="primary">
                        <img src="src/assets/images/icon1.png" height="44" width="44" slot="icon">
                        我要<span>买车</span>
                    </mt-button>
                </router-link>
            </div>
            <div class="col-50">
                <router-link to="/sell">
                    <mt-button class="btn-50" type="primary">
                        <img src="src/assets/images/icon2.png" height="44" width="44" slot="icon">
                        我要<span>卖车</span>
                    </mt-button>
                </router-link>
            </div>
            <router-link to="/videocar">
                <mt-button class="btn-100" type="primary">
                    <img src="src/assets/images/icon3.png" height="44" width="44" slot="icon">
                    我要<span>看视频</span>
                </mt-button>
            </router-link>
        </div>
        <div class="home-xi">
            <div class="row no-gutter">
                <div class="col-25" v-for="(item,index) in liebiao" @click="detail(item.tiaojian)">
                    {{item.name}}
                </div>
                <div class="col-50" @click='detail({name:"brand",val:"7"})'>
                    <img src="src/assets/images/home_03.png" alt="">
                    <p>BMW官方认证二手车</p>
                </div>
                <div class="col-50" @click='detail({name:"",val:""})'>
                    <img src="src/assets/images/home_05.png" alt="">
                    <p>其他品牌</p>
                </div>
            </div>
        </div>
        <div class="four-menu">
            <div class="row no-gutter">
                <div class="col-25">
                    <router-link to="/finance">
                        <span>
                            <i class="iconfont">&#xe6a1;</i>
                        </span>
                        <p>宝马金融</p>
                    </router-link>
                </div>
                <div class="col-25">
                    <span>
                        <i class="iconfont">&#xe6a2;</i>
                    </span>
                    <p>帮你找车</p>
                </div>
                <div class="col-25">
                    <router-link to="/brand">
                        <span>
                            <i class="iconfont">&#xe6a3;</i>
                        </span>
                        <p>品牌承诺</p>
                    </router-link>
                </div>
                <div class="col-25">
                    <span>
                        <i class="iconfont">&#xe6a4;</i>
                    </span>
                    <p>精品商城</p>
                </div>
            </div>
        </div>
        <img src="src/assets/images/home_09.png" class="banner_img" alt="">
        <div class="guess">
            <div><span>猜你喜欢</span></div>
        </div>
        <div class="list-block media-list" style="margin-top: 0;margin-bottom: 0">
            <ul v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                <li v-for="item in list" class="guess_list">
                    <router-link :to="'/carDetail/'+item.id">
                        <div class="item-content">
                            <div class="item-media"><img :src="item.mainpic" style='width: 8rem;'></div>
                            <div class="item-inner">
                                <div class="item-title-row">
                                    <div class="item-title">{{item.carname}}</div>
                                </div>
                                <div class="item-subtitle"> {{item.regdate |
                                    dateNY}}/{{(item.kilometre/10000).toFixed(2)}}万公里
                                </div>
                                <div class="item-text">￥{{item.price}}万</div>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <p v-if="loading" class="load-icon">
            <mt-spinner type="triple-bounce" style="display: inline-block"></mt-spinner>
            加载中
        </p>
        <p v-if="noData" class="load-icon">
              很抱歉,没有找到数据
        </p>
        <p v-if="noMoreData" class="load-icon" style="">
             没有数据啦
        </p>    
    </div>
</template>
<script>
    export default {
        mounted: function () {
            this.bannerw = window.screen.width;
            this.bannerh = this.bannerw * 0.4735 - 15;

        },
        filters: {
            dateNY: function (date) {
                return window.moment(date).format('YY年MM月');
            }
        },
        data() {
            return {
                bannerw: [],
                bannerh: [],
                swipers: [
                    'src/assets/images/pic.png',
                    'src/assets/images/pic.png',
                    'src/assets/images/pic.png'
                ],
                list: [],
                searchCondition: {
                    page: 0
                },
                loading: true,
                noData: false,
                noMoreData: false,
                liebiao: [
                    {
                        name: "3系",
                        tiaojian: {
                            name: "subbrand",
                            val: "89"
                        }
                    },
                    {
                        name: "5系",
                        tiaojian: {
                            name: "subbrand",
                            val: "90"
                        }
                    },
                    {
                        name: "X1",
                        tiaojian: {
                            name: "subbrand",
                            val: "91"
                        }
                    },
                    {
                        name: "其他",
                        tiaojian: {
                            name: "",
                            val: ""
                        }
                    },
                    {
                        name: "1年以内",
                        tiaojian: {
                            name: "age",
                            val: "0-1"
                        }
                    },
                    {
                        name: "1-2年",
                        tiaojian: {
                            name: "age",
                            val: "1-2"
                        }
                    },
                    {
                        name: "2-3年",
                        tiaojian: {
                            name: "age",
                            val: "2-3"
                        }
                    },
                    {
                        name: "3年以上",
                        tiaojian: {
                            name: "age",
                            val: "3-100"
                        }
                    },

                ]
            }
        },
        methods: {
            detail(obj){
                console.log(obj.val)
                this.$store.commit("getSearchCondition",obj)
                this.$router.push('/buy')
            },
            loadMore() {
                //this.loading = true;
                
                var that = this;
                if(this.loading){
                     //获取车信息GET方法
                        this.$http.get(this.API_ROOT + "index.php?m=api&a=search", {
                            params: this.searchCondition
                        }).then(function (response) {
                            if (response.body && response.body.list) {
                                this.searchCondition.page++;
                                //没有数据了
                                if (response.body.list.length == 0) {
                                    if (that.list.length == 0) {
                                        that.noData = true;
                                    } else {
                                        that.noMoreData = true;
                                    }

                                    that.loading = false;

                                } else {

                                    //加载数据
                                    for (var i = 0; i < response.body.list.length; i++) {
                                        response.body.list[i].mainpic = that.IMAGE_ROOT + response.body.list[i].mainpic;
                                        that.list.push(response.body.list[i]);
                                    }

                                    that.loading = true;
                                }


                            }else{
                                that.loading = false;
                            }

                        }, function (err) {
                            console.log(err);
                        });
                }else{
                    return;
                }
               

                //post请求数据例子
                //this.$http.post(this.API_ROOT + "m=api&a=search",data,{body:'FormData',emulateJSON :true}).then( res, err);

            }

        }
    }
</script>
<style>
    ::-webkit-scrollbar {
        width: 0px;
    }

    /* Track */

    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0);
        -webkit-border-radius: 10px;
        border-radius: 10px;
    }

    /* Handle */

    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        background: #fff;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    }

    ::-webkit-scrollbar-thumb:window-inactive {
        background: rgba(0, 0, 0, 0);
    }

    .guess_list .item-inner {
        width: 60%;
    }

    .guess_list .item-title {
        font-size: 16px;
        font-weight: bold;
        white-space: normal
    }

    .guess_list .item-subtitle {
        font-size: 12px;
        margin-top: 10px;
        line-height: 14px;
        color: #707070
    }

    .guess_list .item-text {
        font-size: 16px;
        margin-top: 10px;
        color: #cd3d3d;
        font-weight: bold;
        height: auto
    }

    .page {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 55px;
        overflow: auto
    }

    .top_search {
        position: absolute;
        width: 90%;
        height: 40px;
        left: 50%;
        margin-left: -45%;
        top: 5px;
        z-index: 100
    }

    .top_search .logo {
        margin-top: 5px
    }

    .top_search input {
        position: absolute;
        border-radius: 6px;
        height: 32px;
        right: 0;
        top: 4px;
        width: 70%;
        background-color: rgba(255, 255, 255, 0.5);
        color: #333;
        outline: none;
        padding-left: 10px;
    }

    .mint-swipe {
        /*height: 150px;*/
        color: #fff;
        font-size: 30px;
        text-align: center;
        margin-bottom: 0px;
    }

    .mint-swipe-item {
        line-height: 200px;
    }

    .mint-swipe-item img {
        display: block;
        height: auto;
        width: 100%
    }

    .page-swipe-desc {
        text-align: center;
        color: #666;
        margin-bottom: 5px;
    }

    .san-btn {
        text-align: center;
        margin-top: 10px;
        width: 96%;
    }

    .btn-50 {
        width: 96%
    }

    .btn-50 span {
        font-size: 22px;
    }

    .btn-100 {
        width: 98%;
        font-size: 16px;
        margin-top: 10px;
        background-color: #f8a103
    }

    .btn-100 span {
        font-size: 22px;
    }

    .home-xi {
        background-color: #fff;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        width: 100%;
    }

    .home-xi .row {
        padding: 10px;
    }

    .home-xi .row .col-25 {
        text-align: center;
        border-right: 1px solid #dcdcdc;
        margin-bottom: 10px;
        margin-top: 10px
    }

    .home-xi .row .col-25:nth-child(4) {
        border-right: 0
    }

    .home-xi .row .col-25:nth-child(8) {
        border-right: 0
    }

    .home-xi .row .col-50 {
        margin-top: 5px;
    }

    .home-xi .row .col-50 img {
        display: block;
        width: 96%;
        height: auto;
        margin: 0 auto
    }

    .home-xi .row .col-50 p {
        text-align: center;
        margin-top: 10px;
        font-size: 14px;
    }

    .four-menu {
        background-color: #fff;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        width: 100%;
        margin-top: 10px;
    }

    .four-menu .row {
        padding: 10px;
    }

    .four-menu .col-25 span {
        display: block;
        width: 50px;
        height: 50px;
        border-radius: 50px;
        background-color: #0089e2;
        margin: 0 auto;
        text-align: center;
        line-height: 50px;
        color: #fff;
    }

    .four-menu .col-25 span i {
        font-size: 45px;
    }

    .four-menu .col-25 p {
        text-align: center;
        font-size: 14px;
        margin-top: 10px;
    }

    .four-menu .col-25:nth-child(2) span {
        background-color: #5f52a0
    }

    .four-menu .col-25:nth-child(3) span {
        background-color: #f8a103
    }

    .four-menu .col-25:nth-child(4) span {
        background-color: #d53e43
    }

    .banner_img {
        display: block;
        width: 100%;
        height: auto;
        margin-top: 10px;
    }

    .guess {
        margin-top: 25px;
        margin-bottom: 20px;
    }

    .guess div {
        height: 1px;
        background-color: #333;
        position: relative;
        width: 95%;
        margin: 0 auto
    }

    .guess span {
        display: inline-block;
        position: absolute;
        left: 50%;
        width: 110px;
        margin-left: -55px;
        text-align: center;
        top: -8px;
        background-color: #eee;
    }

    .guess span:before {
        content: "";
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 6px;
        background-color: #333;
        left: 0;
        top: 5px;
    }

    .guess span:after {
        content: "";
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 6px;
        background-color: #333;
        right: 0;
        top: 5px;
    }

    .load-icon {
        color: #dcdcdc;
        padding: 10px 0;
        text-align: center
    }
</style>