<template>
    <div id="sell">
        <mt-header fixed title="我要卖车"></mt-header>
        <div class="content-sell">    
            <img src="src/assets/images/sell_02.png" class="img_block" alt="">
            <div class="zixun">
                <input type="tel" name=""  placeholder="请输入手机号码" v-model="tel">
                <mt-button type="primary" @click="sellCar" >我要卖车</mt-button>
                <p><img src="src/assets/images/phone.png" alt=""> 咨询电话：4000-000-123</p>
            </div>
            <img src="src/assets/images/sell_04.png" class="img_block" alt="">
            <img src="src/assets/images/sell_06.png" class="img_block" alt="">
            <img src="src/assets/images/sell_08.png" class="img_block" alt="">
            <img src="src/assets/images/sell_09.png" class="img_block" alt="">
            <br>
            
        </div>
    </div>
</template>
<script>
    import { Toast,Indicator  } from 'mint-ui';
    export default {
        data() {
            return {
                tel:null
            }
        },
        methods:{
            sellCar(){
                const that=this;
                if(/^1[3|4|5|7|8][0-9]{9}$/.test(this.tel)){
                    Indicator.open('加载中...');
                    this.$http.post(this.server.sell.sellCar,{
                        tel:that.tel,
                        uid: this.$store.state.userid,
                        token: this.$store.state.token
                    }).then(res=>{
                        Indicator.close();
                        if(res.data.succ){
                            Toast(res.data.msg);
                            that.tel=''
                        }
                    })
                }else{
                    Toast("请正确输入手机号码！");
                }
            }
        }
    }
</script>
<style>
    .content-sell {
        position: fixed;
        left: 0;
        top: 40px;
        right: 0;
        bottom: 57px;
        overflow: auto;
        background-color: #fff;
    }
    
    .mint-header {
        background-color: #fff;
        color: #333
    }
    
    .img_block {
        display: block;
        width: 100%;
        height: auto
    }
    
    .zixun {
        width: 80%;
        margin: 10px auto;
    }
    
    .zixun input {
        display: block;
        width: 100%;
        height: 40px;
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #dcdcdc;
        margin-bottom: 10px;
        text-indent: 1em;
        outline: none
    }
    
    .zixun button {
        display: block;
        width: 100%
    }
    
    .zixun p {
        text-align: center;
        color: #33a1e8;
        margin-bottom: 20px;
    }
    
    .zixun p img {
        display: inline-block;
        width: 50px;
        margin-bottom: -20px;
        margin-right: -10px;
    }
</style>