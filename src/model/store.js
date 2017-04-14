/**
 * Created by lenovo on 2017/3/4.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import {addData,getData} from "./localData"
Vue.use(Vuex)
const store =  new Vuex.Store({
    state:{
        token:getData("token"),
        userid:getData("userid"),
        searchCondition:{

        }
    },
    mutations:{
        changeToken(state,token,userid){
            state.token=token;
            state.uid=userid;
            addData("token",token);
            addData("userid",userid);
        },
        getSearchCondition(state,config){
            state.searchCondition.name=config.name;
            state.searchCondition.val=config.val;
        }
    }
})
export default  store