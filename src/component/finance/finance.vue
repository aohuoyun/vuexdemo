<template>
    <div id="sell">
        <mt-header fixed title="宝马金融">
            <mt-button slot="left" @click="$router.back()">
                返回
            </mt-button>
        </mt-header>
        <div class="content-sell">    
            <img src="src/assets/images/f1.jpg" class="img_block" alt="">
            <img src="src/assets/images/f1.jpg" class="img_block" alt="">
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tel:null
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