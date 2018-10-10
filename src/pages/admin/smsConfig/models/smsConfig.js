import * as objService from '../services/objService';
import { message } from 'antd';

export default {
  state: {
    item:{},
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
    *config({ payload: query }, { call, put }) {
      const data = yield call(objService.loadOne, query);
      // console.log(data);
      yield put({ type:'modifyState', payload: {item: data.obj} });
    },
    *save({payload: obj}, {call, put}) {
      const data = yield call(objService.save, obj);
      if(data) {message.success("保存成功");}
      yield put({ type:'modifyState', payload: {item: data.obj} });
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/smsConfig') {
          dispatch({ type: 'config', payload: location.query });
        }
      })
    }
  }
}
