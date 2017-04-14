<template>
    <div id="jiage">
        <div class="list-block">
            <ul>
                <div class="jiage-set">自定义价格</div>
                <div class="qujianBox">
                    <div class="qj-input">
                        <input type="" name="" v-model="bottom">
                        万
                    </div> -
                    <div class="qj-input">
                        <input type="" name="" v-model="top">
                        万
                    </div>
                    <button type="" @click="sendDetail">确定</button>
                </div>
                <li class="item-content" v-for="(item,index) in list"  @click="send(index)">
                    <div class="item-media"><i class="icon icon-f7"></i></div>
                    <div class="item-inner">
                        <div class="item-title">{{item.name}}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                bottom:"",
                top:"",
                list: [

                    {
                        name:"不限",
                        val:null
                    },
                    {
                        name:"3万以下",
                        val:"0-3"
                    },
                    {
                        name:"3-5万",
                        val:"3-5"
                    },
                    {
                        name:"10万以上",
                        val:"10-100"
                    }
                ]
            }
        },
        methods: {
            send(msg) {
                this.$emit('change-brand', this.list[msg].val)
            },
            sendDetail(){
                this.$emit('change-brand', this.bottom+"-"+this.top)
            }
        }
    }
</script>
<style>
    #jiage .list-block {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 16px;
    }

    #jiage .list-block .item-inner {
        margin-left: 0;
        padding-top: 15px;
        padding-bottom: 15px;
    }

    #jiage .jiage-set {
        padding: 10px;
        font-size: 14px;
        background-color: #eee
    }

    .qujianBox button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: 4px;
        border: 0;
        box-sizing: border-box;
        display: block;
        font-size: 18px;
        height: 41px;
        outline: 0;
        overflow: hidden;
        position: relative;
        text-align: center;
        display: inline-block;
        font-size: 14px;
        padding: 0 12px;
        height: 33px;
        color: #fff;
        background-color: #26a2ff;
        position: absolute;
        right: 10px;
        top: 0
    }

    .qujianBox {
        position: relative;
        background-color: #eee;
        padding-bottom: 10px;
    }

    .qujianBox .qj-input {
        display: inline-block;
        position: relative;
        width: 100px;
        text-align: right;
        height: 35px;
        line-height: 35px;
        margin-left: 10px;
        background-color: #fff;
        padding-right: 10px;
        border-radius: 4px;
    }

    .qujianBox .qj-input input {
        width: 70px;
        height: 35px;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 4px;
        outline: none;
        padding-left: 4px;
    }
</style>