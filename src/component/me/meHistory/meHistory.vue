<template>
    <div id="meLike">
        <mt-header title="浏览记录">
            <mt-button icon="back" slot="left" @click="$router.back()"></mt-button>
            <!--<mt-button slot="right">编辑</mt-button>-->
        </mt-header>
        <div class="content" style="position: static;">
            <div class="list-block media-list" style="margin-top: 0;margin-bottom: 0">
                <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <li v-for="item in list" class="guess_list">
                      <router-link :to="'/carDetail/'+item.id">
                        <div class="item-content">
                            <div class="item-media"><img :src="IMAGE_ROOT+item.mainpic" style='width: 8rem;'></div>
                            <div class="item-inner" style="position: relative">
                                <div class="item-title-row">
                                    <div class="item-title">{{item.carname}}</div>

                                    </div>
                                    <div class="item-subtitle">{{item.p_gas}}T 自动 风尚前驱型 <br>{{item.regdate}}/{{item.kilometre}}万公里
                                </div>

                                <div class="item-text">￥{{item.price}}</div>
                            </div>
                        </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <!--<p class="load-icon">-->
                <!--<mt-spinner type="triple-bounce" style="display: inline-block"></mt-spinner> 加载中-->
            <!--</p>-->
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: [],
            }
        },
        methods: {
            // 点击收藏车辆
            melike() {
                this.popupVisible = true
            },
            closepop() {
                this.$emit('change-a', false)
            },
            loadMore() {
                var that =this;
                this.$http.get(this.server.my.record,{
                    params:{
                        uid:this.$store.state.userid,
                        token:this.$store.state.token
                    }
                }).then(function (res) {
                    console.log(that.list = res.data.data.list)
                })
            },
        }
    }
</script>
<style>
    .mint-popup {
        width: 100%;
        height: 100vh;
        overflow: auto;
    }
    
    #me .v-modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 1;
        background: #eee;
    }
</style>