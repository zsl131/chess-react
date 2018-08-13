import * as answerService from '../services/answerService';
import { message } from 'antd';
import * as ageDicService from "../../ageDic/services/ageDicService";
import * as activityCommentService from "../../activityComment/services/activityCommentService";

export default {
  state: {
    datas:[],
    totalElements:0,
    item:[],
    updateVisible:false,
  },
  reducers: {
    modifyState(state,{payload:options}) {
      return {...state,...options};
    },
    updatePage(state, { payload: obj }) {
      return {...state, item: obj.obj, updateVisible: true};
    }
  },
  effects: {
    *list({payload:query},{call,put}) {
      const data = yield call(answerService.list,query);
      console.log(data);
      yield put({type:"modifyState",payload:{totalElements:data.size,datas:data.datas}});
    },
    *addOrUpdate({payload:obj},{call,put}) {
      const data = yield call(answerService.addOrUpdate,obj);
      console.log(data);
      if(data) {
        message.success(data.message);
        yield put({type:"modifyState",payload:{updateVisible:false}});
      }
    },
    *deleteObj({payload:id},{call}) {
      const data = yield call(answerService.deleteObj,{id});
      console.log(data);
      if(data) {
        message.success(data.message);
      }
    },
    *onUpdate({payload: id}, {call,put}) {
      const data = yield call(answerService.loadOne, {id});
      if(data) {
        yield put({type:'modifyState', payload: {item: data.obj, updateVisible: true}});
      }
    },
  },
  subscriptions: {
    setup({history,dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/admin/answer') {
          dispatch({type:'list',payload:location.query});
        }
      })
    }
  }
}
