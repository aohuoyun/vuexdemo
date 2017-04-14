<template>
    <div id="buy">
        
        <mt-search placeholder="搜索您想要的车"></mt-search>
        <div class="row no-gutter shai_lan">
            <div class="col-25" :class="{ active: paixu_show }" @click="paixu_dian()">
                排序<i class="iconfont">&#xe6b6;</i>
            </div>
            <div class="col-25" :class="{ active: pinpai_show }" @click="pinpai_dian()">
                品牌<i class="iconfont">&#xe6b6;</i>
            </div>
            <div class="col-25" :class="{ active: jiage_show }" @click="jiage_dian()">
                价格<i class="iconfont">&#xe6b6;</i>
            </div>
            <div class="col-25" :class="{ active: shaixuan_show }" @click="shaixuan_dian()">
                筛选<i class="iconfont">&#xe6b6;</i>
            </div>
        </div>
        <div class="xuan_brand" v-show="brand_show">
            <div class="hui_ceng" @click="close_self()"></div>
            <paixu v-show="paixu_show" @change-brand="get"></paixu>
            <pinpai v-show="pinpai_show" @change-brand="get"></pinpai>
            <jiage v-show="jiage_show" @change-brand="get"></jiage>
            <shaixuan v-show="shaixuan_show" @change-brand="get"></shaixuan>
        </div>

        <div class="content"  v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <div class="video-item"  v-for="item in list" >
                <router-link :to="'/carDetail/'+item.id">
                <img :src="item.mainpic" class="banner_img" alt="">
                <div class="list-block media-list" style="margin-top: 0;margin-bottom: 10px;">
                    <ul>
                        <li>
                            <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title-row">
                                <div class="item-title" style="font-size: 16px;margin-bottom: 5px;">{{item.carname}}</div>
                                </div>
                                <div class="item-subtitle">
                                    <small style="font-size:14px;color: #d53e43;font-weight: bold">￥{{item.price}}</small>
                                    <small style="color: #757575;float: right">{{item.regdate}}/{{(item.kilometre/10000).toFixed(2)}}万公里</small>
                                </div>
                            </div>
                            </div>
                        </li>
                    </ul>
                </div>
                </router-link>
            </div>
            <!--<p v-if="loading" class="load-icon">-->
                <!--<mt-spinner type="triple-bounce" style="display: inline-block"></mt-spinner> 加载中-->
            <!--</p>-->
            <!--<p v-if="noData" class="load-icon">-->
                <!--很抱歉,没有找到数据-->
            <!--</p>-->
            <!--<p v-if="noMoreData" class="load-icon">-->
                <!--没有数据啦-->
            <!--</p>-->
        </div>
    </div>
</template>
<script>
    import paixu from '../select/paixu/paixu.vue'
    import pinpai from '../select/pinpai/pinpai.vue'
    import jiage from '../select/jiage/jiage.vue'
    import shaixuan from '../select/shaixuan/shaixuan.vue'

    export default {
        mounted: function() {this.loadMore();},
        data() {
            return {
                searchCondition: {
                    page: 0
                },
                list: [],
                brand_show: false,
                loading : false,
                noData:false,
                noMoreData:false,
                paixu_show: false,
                pinpai_show: false,
                jiage_show: false,
                shaixuan_show: false
            }
        },
        methods: {
            loadMore() {
                this.loading = true;

                var that = this;



                //获取车信息GET方法
                this.$http.get(this.API_ROOT + "index.php?m=api&a=search", {
                    params: this.searchCondition
                }).then(function(response) {
                    if (response.body && response.body.list) {

                        that.searchCondition.page++;

                        //没有数据了
                        if (response.body.list.length == 0) {
                            if(that.list.length==0){
                                that.noData = true;
                            }else{
                                that.noMoreData = true;
                            }

                            that.loading = false;

                        } else {

                            //加载数据
                            for (var i = 0; i < response.body.list.length; i++) {
                                response.body.list[i].mainpic = that.IMAGE_ROOT + response.body.list[i].mainpic;
                                that.list.push(response.body.list[i]);
                            }

                            that.loading = false;
                        }


                    }else{
                        //加载出错应该处理
                        that.loading = false;
                    }


                }, function(err) {
                    console.log(err);
                });

                //post请求数据例子
                //this.$http.post(this.API_ROOT + "m=api&a=search",data,{body:'FormData',emulateJSON :true}).then( res, err);

            },
            get(msg) {
                this.brand_show = false;
                this.paixu_show = false,
                    this.pinpai_show = false,
                    this.jiage_show = false,
                    this.shaixuan_show = false

            },
            close_self() {
                this.brand_show = false;
                this.paixu_show = false,
                    this.pinpai_show = false,
                    this.jiage_show = false,
                    this.shaixuan_show = false
            },
            paixu_dian() {
                if (this.paixu_show == false) {
                    this.paixu_show = true,
                        this.pinpai_show = false,
                        this.jiage_show = false,
                        this.shaixuan_show = false,
                        this.brand_show = true
                } else {
                    this.paixu_show = false,
                        this.pinpai_show = false,
                        this.jiage_show = false,
                        this.shaixuan_show = false,
                        this.brand_show = false
                }
            },
            pinpai_dian() {
                if (this.pinpai_show == false) {
                    this.paixu_show = false,
                        this.pinpai_show = true,
                        this.jiage_show = false,
                        this.shaixuan_show = false,
                        this.brand_show = true
                } else {
                    this.paixu_show = false,
                        this.pinpai_show = false,
                        this.jiage_show = false,
                        this.shaixuan_show = false,
                        this.brand_show = false
                }
            },
            jiage_dian() {
                if (this.jiage_show == false) {
                    this.paixu_show = false,
                        this.pinpai_show = false,
                        this.jiage_show = true,
                        this.shaixuan_show = false,
                        this.brand_show = true
                } else {
                    this.paixu_show = false,
                        this.pinpai_show = false,
                        this.jiage_show = false,
                        this.shaixuan_show = false,
                        this.brand_show = false
                }
            },
            shaixuan_dian() {
                if (this.shaixuan_show == false) {
                    this.paixu_show = false,
                        this.pinpai_show = false,
                        this.jiage_show = false,
                        this.shaixuan_show = true,
                        this.brand_show = true
                } else {
                    this.paixu_show = false,
                        this.pinpai_show = false,
                        this.jiage_show = false,
                        this.shaixuan_show = false,
                        this.brand_show = false
                }
            }

        },
        watch: {
            $route(to, from) {
                console.log(to.path);
                // if (to.path == '/paixu' && this.brand_show == true) {
                //     this.brand_show = false
                // } else if (to.path == '/pinpai' && this.brand_show == true) {
                //     this.brand_show = false
                // } else if (to.path == '/jiage' && this.brand_show == true) {
                //     this.brand_show = false
                // } else if (to.path == '/shaixuan' && this.brand_show == true) {
                //     this.brand_show = false
                // } else {
                //     this.brand_show = true
                // }
                if (to.path == '/paixu') {
                    this.brand_show = true
                    this.paixu_dian = !this.paixu_dian
                    alert(this.paixu_dian)
                } else if (to.path == '/pinpai') {
                    this.brand_show = true
                } else if (to.path == '/jiage') {
                    this.brand_show = true
                } else if (to.path == '/shaixuan') {
                    this.brand_show = true
                } else {
                    this.brand_show = false
                }

            }
        },
        components: {
            'pinpai': {
                props: [{
                    pinpai_h: ''
                }]
            },
            'paixu': paixu,
            'pinpai': pinpai,
            'jiage': jiage,
            'shaixuan': shaixuan,
        }

    }
</script>
<style>
    .video-item {
        background-color: #fff;
    }
</style>