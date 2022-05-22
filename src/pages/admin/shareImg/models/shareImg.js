import * as objService from '../services/objService';
import {message} from 'antd';

export default {
  state: {
    datas:[],
    totalElements: 0,
    item:[],
    addVisible: false,
    updateVisible: false,
    showVisible: false,
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    }
  },
  effects: {
    *list({payload: query}, {call,put}) {
      const data = yield call(objService.list, query);
      yield put({ type: 'modifyState', payload: {datas: data.data, totalElements: data.size} });
    },
    *addOrUpdate({payload: obj}, {call}) {
      yield call(objService.addOrUpdate, obj);
    },
    *deleteObj({ payload: id }, { call }) {
      const data = yield call(objService.deleteObj, { id });
      if(data) {message.success(data.message);}
    },
    *onUpdate({payload: id}, {call,put}) {
      const data = yield call(objService.loadOne, {id});
      if(data) {
        yield put({type:'modifyState', payload: {item: data.obj, updateVisible: true}});
      }
    },
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/admin/shareImg') {
          dispatch({ type: 'list', payload: location.query });
        }
      });
    }
  }
}
