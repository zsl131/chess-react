import * as activityCommentService from '../services/activityCommentService';
import {message} from 'antd';

export default {
  state: {
    datas:[],
    totalElements: 0,
    updateVisible: false,
    showActivityVisible: false,
    item:{},
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    },
  },
  effects: {
    *list({payload: query}, {call,put}) {
      const data = yield call(activityCommentService.list, query);
      // console.log(data);
      yield put({type:'modifyState', payload: {datas: data.datas, totalElements: data.size}});
    },
    *onUpdateStatus({payload: obj}, {call}) {
      const data = yield call(activityCommentService.updateStatus, obj);
      if(data) {message.success(data.message);}
    },
    *onUpdate({payload: id}, {call,put}) {
      const data = yield call(activityCommentService.loadOne, {id});
      if(data) {
        yield put({type:'modifyState', payload: {item: data.obj, updateVisible: true}});
      }
    },
    *update({payload: comment}, {call, put}) {
      const data = yield call(activityCommentService.update, comment);
      if(data) {
        yield put({type:'modifyState', payload: {updateVisible: false}});
      }
    },
    *deleteObj({payload: id}, {call}) {
      const data = yield call(activityCommentService.deleteObj, {id});
      if(data) {message.success(data.message);}
    }
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location)=> {
        if(location.pathname === "/admin/activityComment") {
          dispatch({type:'list', payload: location.query});
        }
      })
    }
  }
}
