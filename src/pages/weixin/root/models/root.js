import * as weixinRootService from '../services/weixinRootService';
export default {
  namespace: 'wxRoot',
  state:{

  },
  reducers: {

  },
  effects: {
    *root({ payload: query }, { call }) {
      yield call(weixinRootService.root, query);
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/weixin/root') {
          dispatch({ type: 'root', payload: location.query });
        }
      });
    }
  }
}
