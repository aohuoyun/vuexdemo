<template>
    <div id="paixu" >
        <a v-for="(item,index) in list" @click="send(index)"  >
            <mt-cell  :title="item" />
        </a>
    </div>
</template>
<script>
    import { Cell } from 'mint-ui';
    export default {
        data() {
            return {
                list: [
                    '默认排序',
                    '价格最高',
                    '价格最低',
                    '最新发布',
                    '里程最短',
                    '车龄最短',
                ]
            }
        },
        methods: {
            send(msg) {
                this.$emit('change-brand', msg)
            }
        },
        component:{Cell}

    }
</script>