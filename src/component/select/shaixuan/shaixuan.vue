<template>
    <div id="shaixuan">
        <div class="list-block">
            <ul style="background-color: #eee;">
                <div class="jiage-set">车辆类型</div>
                <div class="row no-gutter">
                    <div class="col-33" v-for="(lx,index) in lxlist">
                        <span :class="{active:lx.selected}" @click="set1(index)">{{lx.name}}</span>
                    </div>
                </div>

                <div class="jiage-set">变速箱</div>
                <div class="row no-gutter">
                    <div class="col-33" v-for="(bs,index) in bslist">
                        <span :class="{active:bs.selected}" @click="set2(index)">{{bs.name}}</span>
                    </div>
                </div>

                <div class="jiage-set">车龄
                    <small>(单位：{{age}}年)</small>
                </div>
                <div class="range-box">
                    <mt-range v-model="age" :min="0" :max="10">
                        <div slot="start">0</div>
                        <div slot="end">10</div>
                    </mt-range>
                </div>

                <div class="jiage-set">公里数
                    <small>(单位：{{kilometre}}万公里)</small>
                </div>
                <div class="range-box">
                    <mt-range v-model="kilometre" :step="0.5" :min="0" :max="15">
                        <div slot="start">0</div>
                        <div slot="end">15</div>
                    </mt-range>
                </div>

                <div class="jiage-set">排量
                    <small>(单位：{{gas}}升)</small>
                </div>
                <div class="range-box">
                    <mt-range v-model="gas" :min="0" :max="5">
                        <div slot="start">0</div>
                        <div slot="end">5</div>
                    </mt-range>
                </div>

                <mt-button type="primary" size="small" style="width: 90%;margin:8px auto;display: block" @click="send">
                    条件确定
                </mt-button>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                lxlist: [
                    {
                        name: '不限',
                        selected: false,
                        id: null
                    },
                    {
                    name: '微型车',
                    selected: false,
                    id: 1
                }, {
                    name: '小型车',
                    selected: false,
                    id: 2
                }, {
                    name: '紧凑型车',
                    selected: false,
                    id: 3
                }, {
                    name: '中型车',
                    selected: false,
                    id: 4
                }, {
                    name: '中大型车',
                    selected: false,
                    id: 5
                }, {
                    name: '豪华车',
                    selected: false,
                    id: 6

                },
                    {
                        name: 'MPV',
                        selected: false,
                        id: 7
                    },
                    {
                        name: 'SUV',
                        selected: false,
                        id: 8
                    },
                    {
                        name: '跑车',
                        selected: false,
                        id: 9
                    },
                    {
                        name: '皮卡',
                        selected: false,
                        id: 38
                    },
                    {
                        name: '面包车',
                        selected: false,
                        id: 39
                    }
                ],
                bslist: [
                    {
                        name: '不限',
                        selected: false,
                        id: null
                    },
                    {
                        name: '手动',
                        selected: false,
                        id: 1
                    },
                    {
                        name: '自动',
                        selected: false,
                        id: 2
                    },
                    {
                        name: '手自一体',
                        selected: false,
                        id: 3
                    },
                    {
                        name: '无纺变速',
                        selected: false,
                        id: 4
                    },
                    {
                        name: '双离合',
                        selected: false,
                        id: 5
                    },


                ],
                age: 0,
                kilometre: 0,
                gas: 0,
                type: "",
                auto: "",
                dq1: '0',
                dq2: '0',
            }
        },
        methods: {
            send() {
                this.$emit('change-brand', {
                    kilometre: "0-" + this.kilometre,
                    age: "0-" + this.age,
                    gas: "0-" + this.gas,
                    type: this.type,
                    auto: this.auto
                })
            },
            set1: function (index) {
                let type="";
                this.lxlist[index].selected = !this.lxlist[index].selected
                if(index==0){
                    this.lxlist.map((item,index)=>{
                        index>0?item.selected=false:""
                    })
                    type=this.lxlist[0].id;
                }else{
                    this.lxlist[0].selected=false;
                    this.lxlist.map((item,index)=>{
                    if(item.selected){
                        type +=item.id+","
                    }
                    })
                }
                this.type =type;
            },
            set2: function (index) {
                this.bslist.map((item,index)=>{
                    item.selected=false
                })
                this.bslist[index].selected = true
                this.auto = this.bslist[index].id
            }
        }
    }
</script>
<style>
    #shaixuan .list-block {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 16px;
    }

    #shaixuan .list-block .item-inner {
        margin-left: 0;
        padding-top: 15px;
        padding-bottom: 15px;
    }

    #shaixuan .jiage-set {
        padding: 10px;
        font-size: 14px;
        background-color: #eee
    }

    #shaixuan .jiage-set small {
        color: #919191
    }

    #shaixuan .col-33 {
        background-color: #eee
    }

    #shaixuan .row {
        background-color: #eee;
        padding-bottom: 10px;
    }

    #shaixuan .col-33 span {
        display: block;
        width: 85%;
        margin: 5px auto;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        background-color: #fff;
    }

    #shaixuan .col-33 span.active {
        background-color: #0089e2;
        color: #fff;
    }

    #shaixuan .range-box {
        width: 90%;
        margin: 0 auto;
        height: 50px;
    }
</style>