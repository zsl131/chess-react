import * as objectService from '../services/objectService';
import {message} from 'antd';

export default {
  state: {
    datas:[],
    totalElements: 0,
    updateVisible: false,
    item:{},
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    },
  },
  effects: {
    *list({payload: query}, {call,put}) {
      const data = yield call(objectService.list, query);
      // console.log(data);
      yield put({type:'modifyState', payload: {datas: data.datas, totalElements: data.size}});
    },
    *onUpdateStatus({payload: obj}, {call}) {
      const data = yield call(objectService.updateStatus, obj);
      if(data) {message.success(data.message);}
    },
    *onUpdatePayFlag({payload: obj}, {call}) {
      const data = yield call(objectService.onUpdatePayFlag, obj);
      if(data) {message.success(data.message);}
    }
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location)=> {
        if(location.pathname === "/admin/activityStudent") {
          dispatch({type:'list', payload: location.query});
        }
      })
    }
  }
}
