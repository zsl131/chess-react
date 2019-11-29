import * as objService from '../services/objService';
import {message} from 'antd';

export default {
  state: {
    data:[],
    totalElements: 0,
    item:[],
    addVisible: false,
    updateVisible: false,
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    }
  },
  effects: {
    *list({payload: query}, {call,put}) {
      const data = yield call(objService.list, query);
      yield put({ type: 'modifyState', payload: {data: data.data, totalElements: data.size} });
    },
    *addOrUpdate({payload: obj}, {call}) {
      yield call(objService.addOrUpdate, obj);
    },
    *deleteObj({ payload: id }, { call }) {
      const data = yield call(objService.deleteObj, { id });
      if(data) {message.success(data.message);}
    },
    *reSubmit({payload: id}, {call}) {
      const data = yield call(objService.reSubmit, {id});
      if(data) {message.success(data.message);}
    },
    *onSynch({payload: {}}, {call}) {
      const data = yield call(objService.synch, {});
      if(data) {message.success(data.message);}
    },
    *onUpdate({payload: id}, {call,put}) {
      /*const data = yield call(activityCommentService.loadOne, {id});
      if(data) {
        yield put({type:'modifyState', payload: {item: data.obj, updateVisible: true}});
      }*/
    },
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/admin/module') {
          dispatch({ type: 'list', payload: location.query });
        }
      });
    }
  }
}
