<template>
    <div id="meHistory">
        <mt-header title="联系客服">
            <mt-button icon="back" slot="left" @click="$router.back()"></mt-button>
        </mt-header>
    </div>
</template>
<script>
    import { MessageBox } from 'mint-ui';
    export default {
        data() {
            return {

            }
        },
        created(){
            var that =this;
            this.$http.get(this.server.my.contact,{
                params:{
                    uid:this.$store.state.userid,
                    token:this.$store.state.token
                }
            }).then(function (res) {
               if(res.data.succ){
                   MessageBox("信息","客服电话："+res.data.data.tel)
               }
            })
        },
        methods: {

            closepop() {
                this.$emit('change-a', false)
            }
        }

    }
</script>