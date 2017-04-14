<template>
  <div id="app">  
    <!--顶部搜索栏-->
    <keep-alive>
        <router-view></router-view>
    </keep-alive>

    <!--工具栏-->
    <mt-tabbar v-model="selected" v-show="tool">
        <mt-tab-item id="home">
            <router-link to="/home">        
                <span><i class="iconfont">&#xe69c;</i></span>
                首页
            </router-link>    
        </mt-tab-item>
        <mt-tab-item id="buy">
            <router-link to="/buy">
                <span><i class="iconfont">&#xe69d;</i></span>
                买车
            </router-link>    
        </mt-tab-item>
        <mt-tab-item id="sell">
            <router-link to="/sell">
                <span><i class="iconfont">&#xe69e;</i></span>
                卖车
            </router-link>    
        </mt-tab-item>
        <mt-tab-item id="me">
            <router-link to="/me">      
                <span><i class="iconfont">&#xe69f;</i></span>
                我的
            </router-link>
        </mt-tab-item>
    </mt-tabbar>
    
    



  </div>
</template>
<script>
    export default {
        name: 'app',
        data() {
            return {
                swipers: [
                    'src/assets/images/pic.png',
                    'src/assets/images/pic.png',
                    'src/assets/images/pic.png'
                ],
                selected: 'home',
                tool: true
            }
        },
        components: {

        },
        watch: {
            $route(to, from) {
                if (to.path.indexOf('/carDetail')==0) {
                    this.tool = false;
                } else if (to.path == '/pay') {
                    this.tool = false;
                } else if (to.path == '/set') {
                    this.tool = false;
                } else if (to.path == '/login') {
                    this.tool = false;
                } else {
                    this.tool = true;
                }
                if (to.path == '/home') {
                    this.selected = 'home'
                }
                if (to.path == '/me') {
                    this.selected = 'me'
                }
                if (to.path == '/buy') {
                    this.selected = 'buy'
                }
                if (to.path == '/sell') {
                    this.selected = 'sell'
                }
                if (to.path == '/videocar') {
                    this.selected = 'buy'
                }
            }
        }

    }
</script>

<style >
    * {
        font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "WenQuanYi Micro Hei", "Microsoft Yahei", sans-serif;
    }
    
    .mint-tab-item-label span {
        display: block;
        text-align: center;
    }
    
    .mint-tab-item-label span i {
        font-size: 35px;
    }
    
    .mint-tab-item {
        background-color: #fff;
        padding-top: 0;
        border-top: 1px solid #ddd
    }
    
    .mint-tabbar {
        background-color: #fff;
    }
    
    body {
        background-color: #eee
    }
    
    .mint-tabbar>.mint-tab-item.is-selected {
        background-color: #fff;
        color: #26a2ff;
        border-top: 1px solid #ddd
    }
    
    .mint-tabbar>.mint-tab-item.is-selected a {
        background-color: #fff;
        color: #26a2ff;
    }
    
    
    /*cash*/
    
    .cash {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 57px;
        background-color: #fff;
        border-top: 1px solid #eee
    }
    
    .cash .col-50:nth-child(1) span {
        text-align: center;
        line-height: 57px;
        background-color: #fff;
        color: #d53e43;
        display: block;
        width: 100%;
        height: 57px;
        font-weight: bold
    }
    
    .cash .col-50:nth-child(2) span {
        text-align: center;
        line-height: 57px;
        background-color: #d53e43;
        color: #fff;
        display: block;
        width: 100%;
        height: 57px;
    }
</style>