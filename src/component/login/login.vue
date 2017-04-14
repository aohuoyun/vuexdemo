<template>
    <div id="login">
        <mt-header title="快捷登录">
            <mt-button slot="left" @click="">
                <router-link to="/me">返回</router-link>
            </mt-button>
        </mt-header>
        <div class="content-sell" style="bottom: 0">
            <br>
            <div class="login-input">
                <input class="a" type="text" name="" v-model="mobilephone" placeholder="请输入手机号">
            </div>
            <div class="login-input">
                <input class="a" type="text" name="" v-model="password"  placeholder="验证码">
                <input class="b" type="button" id="btn" v-model="timetext"  @click="getCode"/>
            </div>
            <br>
            <mt-button type="primary" style="width: 90%;margin:8px auto;display: block" @click="login">开始使用</mt-button>
        </div>
    </div>
</template>
<script>
    import { Toast,Indicator } from 'mint-ui';
    export default {
        data() {
            return {
                mobilephone:'',
                password:"",
                timetext:"获取验证码"
            }
        },
        computed:{
            mobilePass(){
                return   /^1[3|4|5|8][0-9]\d{4,8}$/.test(this.mobilephone)
            }
        },
        methods:{
            login(){
                const that =this;
                if(that.mobilePass){
                    Indicator.open('加载中...');
                     that.$http.post(that.server.user.login,{
                        mobilephone:that.mobilephone,
                        mobilecode:that.password
                    }).then(res=>{
                        Indicator.close();
                        this.$store.commit("changeToken",res.data.token,res.data.userid)
                        this.$router.push('/me')
                    })
                }else{
                    Toast('请正确输入手机号码！');
                }
               
            },
            getCode(){
                const that =this;
                if(that.mobilePass){
                    Indicator.open('加载中...');
                    that.$http.get(that.server.user.phoneCode,{params: {mobilephone:that.mobilephone}})
                        .then(res=>{
                        Indicator.close();
                        if(res.data.succ){
                            Toast(res.data.msg);
                        }
                    })
                }else {
                    Toast('请正确输入手机号码！');
                }
            }
        }
    }
</script>
<style>
    .login-input {
        background-color: #fff;
        height: 40px;
        padding: 5px 0;
        position: relative
    }
    
    .login-input input.a {
        width: 95%;
        float: right;
        height: 40px;
        outline: none;
        border-bottom: 1px solid #eee
    }
    
    .login-input input.b {
        position: absolute;
        right: 10px;
        top: 5px;
        background-color: #f8a103;
        color: #fff;
        border-radius: 4px;
        padding: 5px;
        font-size: 14px;
        outline: none
    }
    
    .login-input input.b:active {
        background-color: #d78b00
    }
</style>