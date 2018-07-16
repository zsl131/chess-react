import * as menuService from '../services/menuService';

export default {
  namespace: 'menu',
  state: {
    datas:[],
    item:{},
    menuTree:[],
  },
  reducers: {
    indexPage(state, { payload: data }) {
      return {...state, menuTree: data};
    }
  },
  effects: {
    *index({ payload: query }, { put, call }) {
      const data = yield call(menuService.listRoot);
      yield put({ type: 'indexPage', payload: data.datas });
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/menu') {
          dispatch({ type: 'index', payload: location.query });
        }
      });
    }
  }
}
