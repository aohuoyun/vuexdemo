<template>
    <div id="buy">
        <mt-search placeholder="搜索您想要的车"></mt-search>
        <mt-navbar>
            <mt-tab-item id="1">
                <router-link to="/paixu" @click="paixu_dian()">
                    排序<i class="iconfont">&#xe6b6;</i>
                </router-link>    
            </mt-tab-item>
            <mt-tab-item id="2">
                <router-link to="/pinpai">
                    品牌<i class="iconfont">&#xe6b6;</i>
                </router-link> 
            </mt-tab-item>
            <mt-tab-item id="3">
                <router-link to="/jiage">
                    价格<i class="iconfont">&#xe6b6;</i>
                </router-link> 
            </mt-tab-item>
            
            <mt-tab-item id="4">
                <router-link to="/shaixuan">
                    筛选<i class="iconfont">&#xe6b6;</i>
                </router-link> 
            </mt-tab-item>
        </mt-navbar>
        <div class="xuan_brand" v-show="brand_show">
            <transition enter-active-class="animated fadeIn">
                <router-view @change-brand="changeBrand"></router-view>
            </transition>
        </div>
        <div class="content">    
            <div class="list-block media-list" style="margin-top: 0;margin-bottom: 0">
                <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <li v-for="item in list" class="guess_list">
                        <div class="item-content">
                            <div class="item-media"><img :src="item.mainpic" style='width: 8rem;'></div>
                            <div class="item-inner" style="position: relative">
                                <div class="item-title-row">
                                    <div class="item-title">{{item.carname}}</div>
                                    
                                    </div>
                                    <div class="item-subtitle">{{item.regdate}}/{{(item.kilometre/10000).toFixed(2)}}万公里
                                </div>
                                <div class="item-subtitle">
                                    <span>超值</span>
                                    <span>急售</span>
                                    <span>超值</span>
                                </div>
                                <div class="item-text">￥{{item.price}}</div>
                                <div class="shoucang" :class="{active:item.iscollect=0}"><i class="iconfont">&#xe6aa;</i></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <p class="load-icon">
                <mt-spinner type="triple-bounce" style="display: inline-block"></mt-spinner> 加载中
            </p>
        </div>
    </div>
</template>
<script>
    export default {
        mounted: function() {},
        data() {
            return {
                searchCondition: {
                    page: 0
                },
                value: [],
                selected: [],
                list: [],
                likeif: false,
                brand_show: false,

                paixu_dian: true,
                pinpai_dian: true,
                jiage_dian: true,
                shaixuan_dian: true
            }
        },
        methods: {
            loadMore() {
                this.loading = true;
                this.searchCondition.page++;
                var that = this;

                //获取车信息GET方法
                this.$http.get(this.API_ROOT + "index.php?m=api&a=search", {
                    params: this.searchCondition
                }).then(function(response) {
                    if (response.body && response.body.list) {

                        //没有数据了
                        if (response.body.list.length == 0) {
                            //TODO:
                            //应该处理一下没有数据的情况

                        } else {

                            //加载数据
                            for (var i = 0; i < response.body.list.length; i++) {
                                response.body.list[i].mainpic = that.IMAGE_ROOT + response.body.list[i].mainpic;
                                that.list.push(response.body.list[i]);
                            }
                        }


                    }
                    that.loading = false;

                }, function(err) {
                    console.log(err);
                });

                //post请求数据例子
                //this.$http.post(this.API_ROOT + "m=api&a=search",data,{body:'FormData',emulateJSON :true}).then( res, err);

            },
            changeBrand(a) {
                this.brand_show = a
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
            }
        }

    }
</script>

<style>
    /*.mint-tab-container-item {
        position: fixed;
        left: 0;
        top: 103px;
        z-index: 100
    }*/
    
    .content {
        position: fixed;
        left: 0;
        right: 0;
        top: 103px;
        bottom: 57px;
        overflow: auto;
    }
    
    .mint-tab-container {
        position: fixed;
        left: 0;
        top: 103px;
        right: 0;
        z-index: 100
    }
    
    .mint-search {
        height: 54px;
    }
    
    .mint-searchbar {
        background-color: #fff;
    }
    
    .mint-searchbar-inner {
        background-color: #f8f6f6;
        border: 1px solid #e5e5e5;
        border-radius: 6px
    }
    
    .mint-searchbar-inner input {
        background-color: #f8f6f6
    }
    
    .mint-tab-item-label {
        font-size: 14px;
    }
    
    .mint-tab-item-label i {
        font-size: 14px;
    }
    
    .item-subtitle span {
        display: inline-block;
        border: 1px solid #87bf10;
        color: #87bf10;
        padding: 2px;
        border-radius: 4px;
    }
    
    .item-subtitle span:nth-child(2) {
        border: 1px solid #0089e2;
        color: #0089e2
    }
    
    .item-subtitle span:nth-child(3) {
        border: 1px solid #d53e43;
        color: #d53e43
    }
    
    .shoucang {
        position: absolute;
        right: 10px;
        bottom: 4px;
    }
    
    .shoucang i {
        font-size: 30px;
        color: #7f7f7f
    }
    
    .shoucang.active i {
        color: #d7464b
    }
    
    .xuan_brand {
        position: fixed;
        left: 0;
        top: 103px;
        right: 0;
        bottom: 57px;
        background-color: #eee;
        z-index: 30;
        overflow: auto
    }
    
    #buy .router-link-active {
        color: #0089e2
    }
</style>