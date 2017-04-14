<template>
    <div id="meHistory">
        <mt-header title="意见反馈">
            <mt-button icon="back" slot="left" @click="$router.back()"></mt-button>
        </mt-header>
        <div class="feedBox">
            <textarea class="feed" rows="" cols="" placeholder="您的意见和反馈就是我们前进的动力" v-model="word"></textarea>
        </div>
        <div class="zixun">
            <mt-button type="primary" @click="send">提交</mt-button>

        </div>
    </div>
</template>
<script>
    import { Toast,Indicator } from 'mint-ui';
    export default {
        data() {
            return {
                word: null
            }
        },
        methods: {

            closepop() {
                this.$emit('change-a', false)
            },
            send(){
                const that = this;
                Indicator.open('加载中...');
                this.$http.post(this.server.my.feedback, {
                    feedback: that.word,
                    uid: this.$store.state.userid,
                    token: this.$store.state.token})
                    .then(res=>{
                        Indicator.close();
                        if(res.data.succ){
                            Toast(res.data.msg);
                            this.word=''
                }
                })
            }
        }
    }
</script>
<style>
    .feed {
        width: 95%;
        height: 120px;
        background-color: #fff;
        border: none;
        outline: none;
        margin: 0 auto;
        display: block
    }

    .feedBox {
        background-color: #fff;
        margin-top: 10px;
        padding: 10px 0
    }
</style>