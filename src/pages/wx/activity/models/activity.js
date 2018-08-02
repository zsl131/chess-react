import * as activityService from '../services/activityService';
import {Toast} from 'antd-mobile';

export default {
  namespace: 'wxActivity',
  state: {
    datas:[],
    totalElements:0,
    item:{},
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    },
  },
  effects: {
    *list({payload: query}, {call,put}) {
      const data = yield call(activityService.list, query);
      // console.log(data);
      if(data) {
        yield put({type:'modifyState', payload: {datas: data.datas, totalElements: data.size}});
      }
    },
    *show({payload: query}, {call,put}) {
      const data = yield call(activityService.loadOne, query);
      // console.log(data);
      yield put({type:"modifyState", payload: {item: data.obj}});
    },
    *onComment({payload: comment}, {call,put}) {
      const data = yield call(activityService.addComment, comment);
      if(data) {Toast.success(data.message);}
    }
  },
  subscriptions: {
    setup({history,dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/wx/activity') {
          dispatch({type:'list', payload: location.query});
        }
        if(location.pathname==='/wx/activity/show') {
          dispatch({type: 'show', payload: location.query});
        }
      });
    }
  }
}
