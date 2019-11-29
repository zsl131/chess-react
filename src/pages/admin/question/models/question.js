import * as questionService from '../services/questionService';
import { message } from 'antd';

export default {
  state: {
    datas:[],
    item:[],
    totalElements:0,
    addVisible:false,
    updateVisible:false,
    update:false,
  },

  reducers: {
    modifyState(state,{payload:options}) {
      return {...state,...options};
    }

  },

  effects: {
    *list({payload:query},{call,put}) {
      const data = yield call(questionService.list,query);
      console.log(data);
      yield put({type:'modifyState',payload:{datas:data.datas,totalElements:data.size}});
    },
    *addOrUpdate({payload:obj},{call,put}) {
      const data = yield call(questionService.addOrUpdate,obj);
      console.log(data);
      if(data) {
        message.success(data.message);
        yield put({type:"modifyState",payload:{addVisible:false}});
      }
    },
    *deleteObj({payload:id},{call}) {
      const data = yield call(questionService.deleteObj,{id});
      console.log(data);
      if(data) {
        message.success(data.message);
      }
    },
    *onUpdate({payload: id}, {call,put}) {
      const data = yield call(questionService.loadOne, {id});
      if(data) {
        yield put({type:'modifyState', payload: {item: data.obj, updateVisible: true}});
      }
    },
  },

  subscriptions: {
    setup({history,dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/admin/question') {
          dispatch({type:'list',payload:location.query});
        }
      })
    }
  },
}
