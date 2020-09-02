import * as objService from '../services/objService';
import { message } from 'antd';

export default {
  state: {
    item:{}
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    }
  },
  effects: {
    *index({ payload }, { call, put }) {
      const data = yield call(objService.loadOne);
      //console.log("index::", data.obj);
      yield put({ type: 'modifyState', payload: { item: data.obj } });
    },
    *save({ payload: obj }, { call }) {
      const data = yield call(objService.save, obj);
      if(data) {
        message.success("保存数据成功");
      }
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/yard/teachPlanConfig') {
          dispatch({ type: 'index' });
        }
      });
    }
  }
}
