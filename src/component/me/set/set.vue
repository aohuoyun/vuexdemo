<template>
    <div id="set">
        <mt-header title="设置">
            <mt-button slot="left">
                <router-link to="/me">返回</router-link>
            </mt-button>
        </mt-header>
        <div class="content-sell" style="background-color: #eee">
            <div class="list-block mart10 user-list" style="margin-bottom: 0">
                <ul>
                    <li class="item-content item-link" @click="melike()">
                        <router-link to="/userInfo">        
                            <div class="item-inner">
                                <div class="item-title">
                                    个人资料修改
                                </div>
                            </div>
                        </router-link>
                    </li>
                    <li class="item-content item-link" @click="melike()">
                        <router-link to="/changePhone">        
                            <div class="item-inner">
                                <div class="item-title">
                                    更换手机号码
                                </div>
                            </div>
                        </router-link>
                    </li>
                    <!--<li class="item-content item-link" @click="melike()">
                        <router-link to="/home">        
                            <div class="item-inner">
                                <div class="item-title">
                                    清除图片缓存
                                </div>
                            </div>
                        </router-link>
                    </li>-->
                </ul>
            </div>
        </div>
        <!--结算栏-->
        <div class="row no-gutter cash" style="z-index:10">
            <mt-button type="danger" style="width: 90%;margin:8px auto;display: block">登出</mt-button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {

        }

    }
</script>
<style>
.mart10{margin-top: 10px;}
</style>