import * as scoreRuleService from '../services/scoreRuleService';
import {message} from 'antd';
export default {
  state:{
    totalElements:0,
    datas:[],
    item:[],
    updateVisible:false,
    addVisible:false
  },
  reducers:{
    modifyState(state,{payload:options}){
      return{...state,...options};
    },
    updatePage(state,{payload:obj}){
      return{...state, item: obj.obj, updateVisible: true};
    }
  },
  effects:{
    *listObj({payload:query},{call,put}){
      const data = yield call(scoreRuleService.list,query);
      yield put({type:'modifyState',payload:{datas:data.datas,totalElements:data.size}});
    },
    *delete({payload:id},{call}){
      const data = yield call(scoreRuleService.deleteObj,{id});
      if(data){
        message.success(data.message);
      }
    },
    *addOrUpdate({payload:obj},{call,put}){
      const data = yield call(scoreRuleService.addOrUpdate,obj);
      if(data){
        message.success("保存成功");
        yield put({type: 'modifyState', payload:{addVisible:false}});
      }
    }
  },
  subscriptions:{
    setup({history,dispatch}){
      return history.listen((location)=>{
        if(location.pathname==='/admin/scoreRule'){
          dispatch({type:'listObj',payload:location.query});
        }
      })
    }
  }
}
