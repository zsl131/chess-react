import * as objectService from '../services/objectService';
import {message} from 'antd';

export default {
  state: {
    datas:[],
    totalElements: 0,
    item:[],
    addVisible: false,
    updateVisible: false,
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
    updatePage(state, { payload: obj }) {
      return {...state, item: obj.obj, updateVisible: true};
    }
  },
  effects: {
    *list({payload: query}, {call,put}) {
      const data = yield call(objectService.list, query);
      yield put({ type: 'modifyState', payload: {datas: data.data, totalElements: data.size} });
    },
    *addOrUpdate({payload: obj}, {call}) {
      yield call(objectService.addOrUpdate, obj);
    },
    *deleteObj({ payload: id }, { call }) {
      const data = yield call(objectService.deleteObj, { id });
      if(data) {message.success(data.message);}
    },
    *onUpdate({ payload: id }, { call, put }) {
      const data = yield call(objectService.loadOne, {id});
      // console.log(data);
      yield put({ type: 'updatePage', payload: data });
    },
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/yard/grade') {
          dispatch({ type: 'list', payload: location.query });
        }
      });
    }
  }
}
