<template>
    <div id="carDetail">
        <mt-header title="车辆详情">
            <mt-button slot="left">
                <a @click="$router.back()">返回</a>
            </mt-button>
            <mt-button slot="right">
                <a @click="collect">{{ iscollect==0 ? '收藏':'取消收藏'}}</a>
            </mt-button>
        </mt-header>
        <div class="content-sell" style="background-color: #eee">
            <iframe v-if="data.p_video" frameborder="0" src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400" allowfullscreen></iframe>
            <mt-swipe v-else :auto="4000" :style="{height: bannerh + 'px'}">
                <mt-swipe-item class="slide1" v-for="item in data.p_pics">
                    <img v-lazy="IMAGE_ROOT+item" alt="">
                </mt-swipe-item>
            </mt-swipe>
            <div class="list-block media-list" style="margin-top: 0;margin-bottom: 0">
                <ul>
                    <li class="guess_list">
                        <div class="item-content">
                            
                            <div class="item-inner" style="width: 100%">
                                <div class="item-title-row">
                                    <div class="item-title">{{data.carname}}</div>
                                    
                                    </div>
                                    <div class="item-subtitle">{{data.regdate | dateNY}}/{{(data.kilometre/10000).toFixed(2)}}万公里
                                </div>
                                <div class="item-subtitle" style="text-align: right">
                                    <span v-for="t in data.tags">
                                        {{
                                            t
                                        }}
                                    </span>
                                </div>
                                <div class="item-text price">{{data.price}}万 <span>新车含税{{data.styles_price}}万</span></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="row no-gutter car_info">
                <div class="col-33">
                    {{(data.kilometre/10000).toFixed(1)}}万公里
                    <span>里程数</span>
                </div>
                <div class="col-33">
                    {{getOldYear(data.regdate)}}
                    <span>{{data.regdate | dateNY2}}</span>
                </div>
                <div class="col-33">
                    {{data.carcode_city?data.carcode_city:"暂无登记"}}
                    <span>车牌所在地</span>
                </div>
                <div class="col-33">
                    {{data.transmission}}
                    <span>变速箱</span>
                </div>
                <div class="col-33">
                    {{data.gas}}
                    <span>排放量</span>
                </div>
                <div class="col-33">
                    {{data.emission}}
                    <span>排放标准</span>
                </div>
            </div>

            <div class="peizhi">
                
                <section v-if="data.hlconfig && data.hlconfig.length>0">
                    <hr>
                    <span class="titt">配置亮点</span>
                    <div class="row no-gutter">
                        <div class="col-25"  v-for="hl in data.hlconfig" >
                            <img :src="IMAGE_ROOT+hl.c_pic" alt="">
                            <p>{{hl.c_name}}</p>
                        </div>
                    </div>
                </section>
            </div>

            <div class="peizhi">
                <section>
                    <hr>
                    <span class="titt">宝晋二手车《质量检测报告》</span>
                    <div class="list-block media-list">
                        <ul style="border: none">
                            <li style="position: relative">
                                <div class="item-content" style="padding-left: 0">
                                    <div class="item-media"><img src="src/assets/images/user-top.jpg" style='width: 4rem;border-radius: 4rem'></div>
                                    <div class="item-inner">
                                        <div class="item-title-row">
                                                <div class="item-title" style="font-size: 16px;padding-top: 10px;">志佳</div>   
                                        </div>
                                        <div class="item-subtitle" style="color: #757575;font-size: 12px;padding-top: 10px;">资深二手车检测师</div>
                                    </div>
                                </div>
                                    <a :href="tel+data.tel">
                                        <mt-button style="position: absolute;right: 0;bottom: 10px;font-size: 14px;" type="danger">
                                                <img src="src/assets/images/phone2.png" alt="" height="20" width="20" slot="icon">
                                                咨询看车
                                        </mt-button>
                                    </a>
                                
                            </li>
                        </ul>
                    </div>
                    <p class="jiance_res">
                          经检测，该车发动机正常。底盘无异响。内饰整洁，无异味。全车原厂漆，无钣金修复，覆盖件无更换。车辆骨架完好，排除事故车。变速箱正常，无怠速抖动，转向无乏力感。  
                    </p>
                </section>

            </div>

            <div class="list-block mart0 user-list" style="margin-bottom: 0">
                <ul>
                    <li class="item-content item-link" @click="melike()">

                            <div class="item-media"><i class="iconfont">&#xe6b7;</i></div>
                            <div class="item-inner">
                                <div class="item-title">
                                    事故排查
                                    <span class="res_succeed" style="margin-left: 10px;">
                                        32项 
                                        <i class="iconfont" style="font-size: 18px;color: #22ac38">&#xe697;</i>
                                    </span>
                                </div>
                            </div>

                    </li>
                    <li class="item-content item-link" @click="melike()">

                            <div class="item-media"><i class="iconfont">&#xe6af;</i></div>
                            <div class="item-inner">
                                <div class="item-title">核心部件
                                    <span class="res_succeed" style="margin-left: 10px;">
                                        55项 
                                        <i class="iconfont" style="font-size: 18px;color: #22ac38">&#xe697;</i>
                                    </span>
                                </div>
                            </div>

                    </li>
                    <li class="item-content item-link" @click="melike()">

                            <div class="item-media"><i class="iconfont">&#xe6b0;</i></div>
                            <div class="item-inner">
                                <div class="item-title">磨损程度
                                    <span class="res_succeed" style="margin-left: 10px;">
                                        26项 
                                        <i class="iconfont" style="font-size: 18px;color: #22ac38">&#xe697;</i>
                                    </span>
                                </div>
                            </div>

                    </li>
                    <li class="item-content item-link" @click="melike()">

                            <div class="item-media"><i class="iconfont">&#xe6b9;</i></div>
                            <div class="item-inner">
                                <div class="item-title">常用功能
                                    <span class="res_succeed" style="margin-left: 10px;">
                                        51项 
                                        <i class="iconfont" style="font-size: 18px;color: #22ac38">&#xe697;</i>
                                    </span>
                                    <span class="res_warn" style="margin-left: 10px;">
                                        2项 
                                        <i class="iconfont" style="font-size: 18px;color: #f8a103">&#xe697;</i>
                                    </span>
                                </div>
                            </div>

                    </li>
                    <li class="item-content item-link" @click="melike()">

                            <div class="item-media"><i class="iconfont">&#xe6b2;</i></div>
                            <div class="item-inner">
                                <div class="item-title">启动检测
                                    <span class="res_succeed" style="margin-left: 10px;">
                                        11项 
                                        <i class="iconfont" style="font-size: 18px;color: #22ac38">&#xe697;</i>
                                    </span>
                                </div>
                            </div>

                    </li>
                </ul>
            </div>

            <div class="peizhi mart0">
                <section>
                    <hr>
                    <div class="item_jz" v-for="item in data.p_pics">
                        <img v-lazy="IMAGE_ROOT+item" alt="">
                    </div>

                </section>

            </div>

            <br>

        </div>
        <!--车辆详情定金栏-->
        <div class="row no-gutter prepay">
            <div class="col-50 row no-gutter">
                <div class="col-50">  
                    <a :href="tel+data.tel">      
                        <i class="iconfont">&#xe6ad;</i>
                        <p>客服</p>
                    </a>
                </div>
                <div class="col-50 " :class="iscollect==0 ?'':'active'" @click="collect">        
                    <i class="iconfont">&#xe6aa;</i>
                    <p>{{ iscollect==0 ? '关注':'取消关注'}}</p>
                </div>
            </div>
            <div class="col-50">
                <router-link to="/pay">
                    <span>预付定金</span>
                </router-link>
            </div>
        </div>
    </div>
    
</template>
<script>
    import { Toast,Lazyload  } from 'mint-ui';
    export default {
        created: function() {
            var that=this;
            this.getDetail(that.$route.params.id);
        },
        
        data() {
            return {
                id:this.$route.params.id,
                data: [],
                bannerw: [],
                bannerh: [],
                iscollect:null,
                swipers: [
                ],
                tel:"tel:"
            }
        },
        filters: {
            dateNY: function (date) {
                return window.moment(date).format('YY年MM月');
            },
            dateNY2: function (date) {
                return window.moment(date).format('YYYY年MM月');
            }
        },
        watch:{
            $route(to, from) {
                if((this.id!=this.$route.params.id) && to.path.indexOf('carDetail')==1){
                    var that=this;
                    this.getDetail(that.$route.params.id);
                }
            }
        },
        methods: {
            getDetail(id){
                this.bannerw = window.screen.width;
                this.bannerh = this.bannerw * 0.6;
                console.log("载入")
                var that = this;
                //获取车信息GET方法
                this.$http.get(this.server.car.carDetail,{
                    params:{
                        id:id,
                        uid:this.$store.state.userid,
                        token:this.$store.state.token
                    }}).then(
                    function (res) {
                        that.iscollect=res.data.data.iscollect;
                        that.data = res.data.data;
                    }
                )
            },
            getOldYear(date){
                var y = window.moment().diff(window.moment(date),"years");
                var m = window.moment().diff(window.moment(date),"months")%12;

                return y + "年" + m +"个月";

            },
            collect(){
                var that = this;
                if(that.iscollect==0){
                    this.$http.post(this.server.car.collectCar,{
                        id:that.$route.params.id,
                        uid:this.$store.state.userid,
                        token:this.$store.state.token
                    }).then(res=>{
                        if(res.data.succ){
                            that.iscollect=1
                            Toast("收藏成功");
                        }else {
                            this.$router.push('/login')
                        }
                    })

                }else {
                    this.$http.post(this.server.car.delcollect,{
                        id:that.$route.params.id,
                        uid:this.$store.state.userid,
                        token:this.$store.state.token
                    }).then(res=>{
                        if(res.data.succ){
                            that.iscollect=0
                            Toast("取消收藏");
                        }else {
                            this.$router.push('/login')
                        }
                    })
                }
            }
        }
    }
</script>
<style>
    iframe {
        width: 100%;
        height: 230px;
        display: block
    }
    img[lazy=loading] {
        width: 40px;
        height: 40px;
        margin:50px auto;
    }
    #carDetail .price {
        font-size: 18px;
        height: 18px;
        line-height: 18px;
        margin-top: -20px;
        padding-bottom: 5px
    }
    
    #carDetail .price span {
        font-size: 14px;
        color: #7d7d7d
    }
    
    #carDetail .car_info {
        background-color: #fff;
        margin-top: 10px;
        font-size: 16px;
    }
    
    #carDetail .car_info span {
        display: block;
        font-size: 14px;
        color: #757575;
        padding-top: 4px;
    }
    
    #carDetail .car_info .col-33 {
        padding: 15px;
    }
    
    #carDetail .peizhi {
        background-color: #fff;
        margin-top: 10px;
        position: relative
    }
    
    #carDetail .peizhi section {
        padding: 10px;
    }
    
    #carDetail .peizhi hr {
        height: 1px;
        border: none;
        background-color: #eee
    }
    
    #carDetail .peizhi .titt {
        display: inline-block;
        background-color: #fff;
        position: absolute;
        left: 15px;
        top: 10px;
        color: #757575;
        padding-right: 14px;
    }
    
    #carDetail .peizhi .titt:before {
        content: '';
        height: 6px;
        width: 6px;
        border-radius: 6px;
        background-color: #dcdcdc;
        position: absolute;
        right: 0;
        top: 5px;
    }
    
    #carDetail .peizhi .col-25 {
        padding: 10px;
    }
    
    #carDetail .peizhi .col-25 img {
        display: block;
        width: auto;
        height: 50px;
        margin: 10px auto;
    }
    
    #carDetail .peizhi .col-25 p {
        text-align: center;
        font-size: 14px;
    }
    
    .jiance_res {
        font-size: 14px;
        text-indent: 2em;
        margin-top: -20px;
        line-height: 20px;
        color: #434343
    }
    .item_jz{
        background: #dcdcdc;
        min-height: 226px;
    }
    .item_jz img {
        display: block;
        width: 100%;
        height: auto;
        margin-top: 20px;
    }
    .item_jz img[lazy=loading] {
        width: 40px;
        height: 40px;
        margin:50px auto;
    }
    
    .item_jz p {
        padding-top: 10px;
        text-indent: 1em;
        color: #757575
    }

    .prepay {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 57px;
        background-color: #fff;
        border-top: 1px solid #eee;
        z-index:10;
    }
    
    .prepay .col-50 {
        text-align: center
    }
    .prepay .col-50.active{
        color:red;
    }
    .prepay .col-50 a{
        display: block
    }
    .prepay span {
        line-height: 57px;
        background-color: #f8a103;
        color: #fff;
        display: block;
        width: 100%;
        height: 57px;
    }
    
    .prepay  .col-50.active i {
        color: red;
    }
    .prepay i {
        font-size: 35px;
        color: #959595;
    }
    
    .prepay .col-50.active p {
        /*color: red;*/
    }
    .prepay p {
        font-size: 14px;
        color: #959595
    }
</style>