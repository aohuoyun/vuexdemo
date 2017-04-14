<template>
    <div id="pinpai" :style="{height: brandh+'px'}">
        <div v-if="sub_data.length>0" class="cheBox" :style="{height: brandh+'px'}">
            <mt-cell v-for="data in sub_data" :title="data.series_name" @click.native="send(data)"></mt-cell>
        </div>
        <mt-index-list :show-indicator="true" :height="brandh">
            <mt-index-section :index="caption.brand_mark" v-for="caption in data"  >
                <mt-cell  @click.native="getSubBrand(item)" v-for="item in caption.list" :title="item.brand_name+' '">
                    <img slot="icon" class="sprite-brand" :src="IMAGE_ROOT+item.brand_pic">
                </mt-cell>
            </mt-index-section>
        </mt-index-list>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                data:[],
                sub_data:[],
                brandh: window.screen.height - 160
            }
        },
        //index.php?m=api&a=brand
        methods: {
            send(data) {
                this.$emit('change-brand', data)
            },
            //获取车系
            getSubBrand(item){
                var that = this;
                //获取车信息GET方法
                this.$http.get(this.API_ROOT + "index.php?m=api&a=subbrand&brand="+item.brand_id).then(function(response) {

                    that.sub_data = response.body;

                }, function(err) {
                    console.log(err);
                });

            }
        },

        mounted: function() {
            this.bannerw = window.screen.width;
            this.bannerh = this.bannerw * 0.6;

            var that = this;
            //获取车信息GET方法
            this.$http.get(this.API_ROOT + "index.php?m=api&a=brand&from=app").then(function(response) {

                that.data = response.body;

            }, function(err) {
                console.log(err);
            });

        }
    }
</script>
<style>
    #pinpai .mint-cell img {
        display: inline-block;
        -webkit-transform: scale(.5);
        transform: scale(.5);
        -webkit-transform-origin: top;
        transform-origin: top;
        width: 56px;
        height: 56px;
        margin-bottom: -30px;
    }
    
    .cheBox {
        width: 50%;
        height: 504px;
        background-color: #fff;
        position: absolute;
        right: 20px;
        top: 0;
        z-index: 2;
        -moz-box-shadow: -3px 1px 6px #ccc;
        -webkit-box-shadow: -3px 1px 6px #ccc;
        box-shadow: -3px 1px 6px #ccc;
        border-right: 1px solid #ccc;
        overflow: auto;
    }
    
    .mint-indexlist-indicator {
        z-index: 10
    }
    .mint-indexlist-nav{
        z-index: 3;
    }
</style>