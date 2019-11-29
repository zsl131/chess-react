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
      // console.log("wxConfig::", data);
      yield put({ type: 'modifyState', payload: { item: data.obj } });
    },
    *addOrUpdate({ payload: obj }, { call }) {
      const data = yield call(objService.addOrUpdate, obj);
      if(data) {
        message.success("保存数据成功");
      }
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/appRemark') {
          dispatch({ type: 'index' });
        }
      });
    }
  }
}
