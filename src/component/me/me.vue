<template>
    <div id="me">
        <mt-header fixed title="" style="background-color: #0089e2;color: #fff;">
            <mt-button slot="left">
                <router-link to="/set">
                    <i class="iconfont" style="color: #fff">&#xe6a6;</i>
                </router-link>    
            </mt-button>
            <mt-button slot="right"><i class="iconfont">&#xe6a7;</i></mt-button>
        </mt-header>
        <div class="content-sell">    
            <form  enctype="multipart/form-data" method="post">
            <div class="user-top" @click="isLogin">
                    <input type="file" name="" id="uploadFile" :style="{display:showUpload}"  @change="uploadImage" runat="server">
                    <img :src="upfile" alt="" class="upload" :style="{opacity:opacity}">
                     <img :src="meData.header_url?IMAGE_ROOT+meData.header_url:'src/assets/images/user-top.jpg'" alt="">
                <p>{{meData.nickname?meData.nickname:meData.mobilephone}}</p>
            </div>
            </form>
            <div class="list-block mart0 user-list">
                <ul>
                    <li class="item-content item-link" @click="melike()">
                        <router-link to="/meOrder">        
                            <div class="item-media"><i class="iconfont">&#xe6a8;</i></div>
                            <div class="item-inner">
                                <div class="item-title">我的订单</div>
                            </div>
                        </router-link>
                    </li>
                    <li class="item-content item-link" @click="melike()">
                        <router-link to="/meLike">
                            <div class="item-media"><i class="iconfont">&#xe6aa;</i></div>
                            <div class="item-inner">
                                <div class="item-title">收藏车辆</div>
                            </div>
                        </router-link>
                    </li>
                    <li class="item-content item-link" @click="melike()">
                        <router-link to="/meHistory">
                            <div class="item-media"><i class="iconfont">&#xe6ab;</i></div>
                            <div class="item-inner">
                                <div class="item-title">浏览记录</div>
                            </div>
                        </router-link>
                    </li>
                    <li class="item-content item-link" @click="melike()">
                        <router-link to="/meContact">
                            <div class="item-media"><i class="iconfont">&#xe6ad;</i></div>
                            <div class="item-inner">
                                <div class="item-title">联系客服</div>
                            </div>
                        </router-link>
                    </li>
                    <li class="item-content item-link" @click="melike()">
                        <router-link to="/meFeed">
                            <div class="item-media"><i class="iconfont">&#xe6ac;</i></div>
                            <div class="item-inner">
                                <div class="item-title">意见反馈</div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
-->
    </div>
</template>
<script>
    import { Toast,Indicator } from 'mint-ui';
    export default {
        data() {
            return {
                msg: '我是个人中心页面',
                popupVisible: false,
                meData:{},
                showUpload:this.$store.state.token?"block":"none",
                upfile:'',
                opacity:0
            }
        },
        created:function(){
            this.getMeData();//获取个人信息
        },
        methods: {
            // 点击收藏车辆
            melike() {
                this.popupVisible = true
            },
            changeA(a) {
                this.popupVisible = a
            },
            isLogin(){
                if(!this.$store.state.token){
                    this.$router.push('/login');
                }
            },
            getMeData(){
                const that = this;
                Indicator.open('加载中...');
                this.$http.post(this.server.my.searchuser, {
                    uid: this.$store.state.userid,
                    token: this.$store.state.token})
                    .then(res=>{
                        Indicator.close();
                        console.log(res.data);
                        if(res){
                           that.meData= res.data;
                         }else{
                            Toast(res.data.msg);
                         }
                })
            },
            createImage(file) {
                if(typeof FileReader==='undefined'){
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                    return false;
                }
                var image = new Image();         
                var that = this;
                var leng=file.length;
                var reader = new FileReader();
                reader.readAsDataURL(file); 
                reader.onload =function(e){
                    that.upfile=e.target.result;                                    
                };                 
            },
            uploadImage(e){
                //判断是否有选择上传文件
                var imgPath = e.target.files[0] || e.dataTransfer.files[0];
                if (imgPath == "") {
                    alert("请选择上传图片！");
                    return;
                }
               // 判断图片格式  
                if(!(imgPath.type.indexOf('image')==0 && imgPath.type && /\.(?:jpg|png|gif|bmp|jpeg)$/.test(imgPath.name)) ){  
                    alert('图片只能是jpg,gif,png');  
                    return ;  
                }  
                  var reader = new FileReader();  
                  reader.readAsDataURL(imgPath);  
                const that = this;
                reader.onload = function(e){ // reader onload start  
                    Indicator.open('加载中...');
                    that.$http.post(that.server.my.user_edit, {
                        uid: that.$store.state.userid,
                        upfile: e.target.result,
                        nickname:that.meData.nickname?that.meData.nickname:that.meData.mobilephone,
                        token: that.$store.state.token})
                        .then(res=>{
                            Indicator.close();
                            console.log(res.data);
                            if(res.data.succ){
                                that.createImage(imgPath);
                                that.opacity=1;
                            }else{
                                Toast(res.data.msg);
                            }
                    })
                }
               
            }
        }

    }
</script>
<style>
    .mint-button-text i {
        font-size: 40px
    }
    
    .user-top {
        background-color: #0089e2;
        padding: 10px 0 20px 0;
        position: relative
    }
    
    .user-top .upload,
    .user-top input[type=file]{
        width: 100px;
        height: 100px;
        position: absolute;
        left:50%;
        margin-left:-50px;
        opacity: 0;
    }
    .user-top input[type=file]{
        z-index:10;
    }
    .user-top .upload{
        z-index:5;
        border-radius: 100px;
    }
    .user-top img {
        display: block;
        width: 100px;
        height: 100px;
        border-radius: 100px;
        margin: 0 auto
    }
    
    .user-top p {
        text-align: center;
        color: #fff;
        font-size: 14px;
        margin-top: 10px;
    }
    
    .mart0 {
        margin-top: 0
    }
    
    .user-list {
        font-size: 16px;
    }
    
    .user-list .iconfont {
        font-size: 35px;
        color: #959595
    }
    
    .user-list .item-inner {
        padding-bottom: 15px;
        padding-top: 15px;
    }
    
    .item-link a {
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-flex-shrink: 0;
        -ms-flex: 0 0 auto;
        -webkit-flex-shrink: 0;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        -webkit-box-lines: single;
        -moz-box-lines: single;
        -webkit-flex-wrap: nowrap;
        -ms-flex-wrap: none;
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        width: 100%
    }
    
    #me .content-sell {
        background-color: #eee;
    }
</style>