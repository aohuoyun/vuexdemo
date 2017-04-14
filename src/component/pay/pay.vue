<template>
    <div id="pay">
        <mt-header title="定金结算">
            <mt-button slot="left" @click="$router.back()">
                返回
            </mt-button>
        </mt-header>
        <div class="content-sell" style="background-color: #eee">
            <div class="list-block media-list" style="margin-top: 10px;margin-bottom: 0">
                <ul>
                    <li class="guess_list">
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
        </div>
        <!--结算栏-->
        <div class="row no-gutter cash">
            <div class="col-50 row no-gutter">
                <span>￥256.900</span>
            </div>
            <div class="col-50">
                <span>结算</span>
            </div>
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

</style>