<template>
    <div id="u-info">
        <mt-header title="个人资料修改">
            <mt-button slot="left" @click="">
                <router-link to="/set">返回</router-link>
            </mt-button>
        </mt-header>
        <div class="content-sell" style="bottom: 0">
            <br>
            <div class="list-block mart0 user-list">
                <ul>
                    <li class="item-content" @click="melike()">       
                        <div class="item-inner">
                            <div class="item-title">修改昵称</div>
                            <div class="item-input">
                                <input type="text" placeholder="爱斯基摩人">
                            </div>
                        </div>
                    </li>
                    <li class="item-content item-link" @click="melike()">       
                        <div class="item-inner">
                            <div class="item-title">更换头像</div>
                            <div class="item-after">
                                <img src="src/assets/images/user-top.jpg" alt="">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <mt-button type="primary" style="width: 90%;margin:8px auto;display: block" @click="login">保存修改</mt-button>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                myData:{}
            }
        },
        method:{
            getMyData(){
                
            }
        }
    }
</script>
<style lang="">
#u-info .item-title{color:#999}
#u-info .item-input{width:70%}
#u-info .item-input input{font-size:15px;outline:none}
#u-info .item-after img{display:block;width:40px;height:40px;border-radius:40px;margin-top:-7px;}
</style>
<script>
    
</script>