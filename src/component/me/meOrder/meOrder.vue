<template>
    <div id="meOrder">
        <mt-header title="我的订单">
            <mt-button icon="back" slot="left" @click="$router.back()"></mt-button>
            <!--<mt-button slot="right">编辑</mt-button>-->
        </mt-header>
        <div class="content">    
            <div class="list-block media-list" style="margin-top: 0;margin-bottom: 0">
                <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <li v-for="item in list" class="guess_list">
                        <div class="item-content">
                            <div class="item-media"><img src="src/assets/images/home_12.png" style='width: 8rem;'></div>
                            <div class="item-inner" style="position: relative">
                                <div class="item-title-row">
                                    <div class="item-title">BMW1系运动型两厢轿车</div>
                                    
                                    </div>
                                    <div class="item-subtitle">1.5T 自动 风尚前驱型 <br>2016年6月/1.2万公里
                                </div>
                        
                                <div class="item-text">￥256.900</div>
                            </div>
                        </div>
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
    export default {
        data() {
            return {
                loading:true,
                noData:false,
                noMoreData:false,
                list: [
                    '我是数据',
                    '我是数据',
                    '我是数据',
                    '我是数据',
                    '我是数据',
                    '我是数据',
                    '我是数据',
                ],
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
                this.loading = true;
                setTimeout(() => {
                    let last = this.list[this.list.length - 1];
                    for (let i = 1; i <= 10; i++) {
                        this.list.push('新加列表');
                    }
                    this.loading = false;
                }, 2500);
            },

        }

    }
</script>
<style>
    .mint-popup {
        width: 100%;
        height: 100vh;
        overflow: auto;
        background-color: #eee
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
    .content{
        position: fixed;
        left: 0;
        top: 40px;
        right: 0;
        bottom: 57px;
        overflow: auto;
    }
</style>