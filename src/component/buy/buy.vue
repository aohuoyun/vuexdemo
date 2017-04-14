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
            <paixu v-show="paixu_show" @change-brand="getS"></paixu>
            <pinpai v-show="pinpai_show" @change-brand="getPinpai"></pinpai>
            <jiage v-show="jiage_show" @change-brand="getjiage"></jiage>
            <shaixuan v-show="shaixuan_show" @change-brand="getShaixuan"></shaixuan>
        </div>
        <div class="content" style="top:104px;">    
            <div class="list-block media-list" style="margin-top: 0;margin-bottom: 0">
                <ul v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <li v-for="item in list" class="guess_list">
                        <router-link :to="'/carDetail/'+item.id">
                        <div class="item-content">
                            <div class="item-media"><img :src="item.mainpic" style='width: 8rem;'></div>
                            <div class="item-inner" style="position: relative">
                                <div class="item-title-row">
                                    <div class="item-title">{{item.carname}}</div>
                                    
                                    </div>
                                    <div class="item-subtitle">{{item.regdate}}/{{(item.kilometre)}}万公里
                                </div>
                                <div class="item-subtitle">
                                    <span v-for="t in item.tags">
                                        {{
                                            t
                                        }}
                                    </span>
                                </div>
                                <div class="item-text">￥{{item.price}}</div>
                                <!--<div class="shoucang" :class="{active:item.iscollect=0}"><i class="iconfont">&#xe6aa;</i></div>-->
                            </div>
                        </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <p v-if="loading" class="load-icon">
                <mt-spinner type="triple-bounce" style="display: inline-block"></mt-spinner> 加载中
            </p>
            <p v-if="noData" class="load-icon">
                很抱歉,没有找到数据
            </p>
            <p v-if="noMoreData" class="load-icon" style="">
                没有数据啦
            </p>
        </div>
    </div>
        
</template>
<script>
    import paixu from '../select/paixu/paixu.vue'
    import pinpai from '../select/pinpai/pinpai.vue'
    import jiage from '../select/jiage/jiage.vue'
    import shaixuan from '../select/shaixuan/shaixuan.vue'

    export default {
        data() {
            return {
                scrollTop: 0,
                searchCondition: {
                    page: 0,
                    token:this.$store.state.token
                },
                value: [],
                selected: [],
                list: [],
                likeif: false,
                brand_show: false,
                loading : true,
                noData:false,
                noMoreData:false,
                paixu_show: false,
                pinpai_show: false,
                jiage_show: false,
                shaixuan_show: false
            }
        },
        created(){
            this.searchCondition[this.$store.state.searchCondition.name]= this.$store.state.searchCondition.val
            this.$store.commit("getSearchCondition",{name:"",val:""})
            console.log( this.searchCondition)
        },
        activated(){
            if(this.scrollTop==0){
                this.methods();
            }
        },
        methods: {
            getS(msg){
                this.searchCondition.s=msg;
                this.get()
                this.loadMore(true)
            },
            getjiage(msg){
                this.searchCondition.price =msg;
                this.get()
                this.loadMore(true)
            },
            getShaixuan(msg){
                this.searchCondition.kilometre=msg.kilometre
                this.searchCondition.age=msg.age
                this.searchCondition.gas=msg.gas
                this.searchCondition.transmission=msg.auto
                this.searchCondition.model=msg.type
                this.get()
                this.loadMore(true)
            },
            loadMore(is) {
                const that = this;
                 //清空数据在做请求
                 if(is){
                      that.list=[];
                      that.searchCondition.page=0;
                      this.loading=true;
                      that.noData = false;
                      that.noMoreData = false;
                  }
                if(this.loading){
                    //获取车信息GET方法
                    this.$http.get(this.API_ROOT + "index.php?m=api&a=search", {
                        params: this.searchCondition
                    }).then(function(response) {
                        if (response.body && response.body.list) {
                           
                            if (response.body.list.length == 0) {
                                if(that.list.length == 0){
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
                                that.searchCondition.page++;
                                that.loading = true;
                            }

                        }else{
                             that.loading = false;
                        }

                    }, function(err) {
                        console.log(err);
                    });
                }else{
                    return;
                }
                

            },
            hideShaixuan(){
                this.brand_show = false;
                this.paixu_show = false;
                this.pinpai_show = false;
                this.jiage_show = false;
                this.shaixuan_show = false;
            },
            getPinpai(brand){
                this.hideShaixuan();
                this.searchCondition.subbrand = brand.series_id;
                this.loadMore(true)
            },
            //筛选按钮的隐藏
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
            },
            setScrollTop() {
                document.querySelector('.content').scrollTop = this.scrollTop
            }

        },
        watch: {
            $route(to, from) {
                if(to.path!='/buy'&&to.path.indexOf('carDetail')==-1){
                    this.scrollTop=0;
                }
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
                } else if (to.path == '/pinpai') {
                    this.brand_show = true
                } else if (to.path == '/jiage') {
                    this.brand_show = true
                } else if (to.path == '/shaixuan') {
                    this.brand_show = true
                } else {
                    this.brand_show = false
                }

                this.setScrollTop()

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
        },
        beforeRouteLeave(to, from ,next) {
            this.scrollTop = document.querySelector('.content').scrollTop
            next()
        },
        mounted() {
            this.setScrollTop()
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
        top: 104px;
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
        background-color: transparent;
        z-index: 30;
        overflow: auto
    }
    
    .hui_ceng {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.5)
    }
    
    #buy .router-link-active {
        color: #0089e2
    }
    
    .shai_lan {
        height: 47px;
        background-color: #fff;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        position: relative;
        z-index: 100;
    }
    
    .shai_lan .col-25 {
        height: 47px;
        line-height: 47px;
        text-align: center;
        font-size: 14px;
    }
    
    .shai_lan .col-25 i {
        font-size: 14px;
    }
    
    .shai_lan .col-25.active {
        color: #0089e2
    }
</style>