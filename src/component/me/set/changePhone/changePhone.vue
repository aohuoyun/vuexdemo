<template>
    <div id="u-info">
        <mt-header title="更换手机号码">
            <mt-button slot="left" @click="">
                <router-link to="/set">返回</router-link>
            </mt-button>
        </mt-header>
        <div class="content-sell" style="bottom: 0">
            <br>
            <div class="list-block mart0 user-list">
                <ul>
                    <li class="item-content" @click="melike()">       
                        <div class="item-inner">
                            <div class="item-title">修改手机号</div>
                            <div class="item-input">
                                <input type="text" placeholder="13598569874">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <mt-button type="primary" style="width: 90%;margin:8px auto;display: block" @click="login">保存修改</mt-button>
        </div>
    </div>
</template>
<style lang="">
#u-info .item-title{color:#999}
#u-info .item-input{width:70%}
#u-info .item-input input{font-size:15px;outline:none}
#u-info .item-after img{display:block;width:40px;height:40px;border-radius:40px;margin-top:-7px;}
</style>
<script>
    
</script>