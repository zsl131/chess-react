import * as questionService from '../services/questionService';
import { message } from 'antd';

export default {
  state: {
    datas:[],
    item:[],
    totalElements:0,
    addVisible:false,
    answerAddVisible:false,
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
    *addOrUpdateAnswer({payload:obj},{call,put}) {
      const data = yield call(questionService.addOrUpdateAnswer,obj);
      console.log(data);
      if(data) {
        message.success(data.message);
        yield put({type:"modifyState",payload:{answerAddVisible:false}});
      }
    },
    *show({payload:id},{call}) {
      const data = yield call(questionService.show,{id});
      console.log(data);
      if(data){
        message.success(data.message);
      }
    },
    *showw({payload:id},{call}) {
      const data = yield call(questionService.showw,{id});
      console.log(data);
      if(data){
        message.success(data.message);
      }
    },
    *showww({payload:id},{call}) {
      const data = yield call(questionService.showww,{id});
      console.log(data);
      if(data){
        message.success(data.message);
      }
    },
    *showwww({payload:id},{call}) {
      const data = yield call(questionService.showwww,{id});
      console.log(data);
      if(data){
        message.success(data.message);
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
