import * as menuService from '../services/menuService';

export default {
  namespace: 'menu',
  state: {
    datas:[],
    item:{},
    menuTree:[],
    totalElements: 0,
    updateVisible: false,
  },
  reducers: {
    indexPage(state, { payload: data }) {
      // console.log(data);
      return {...state, menuTree: data.treeList, totalElements: data.menuList.length, datas: data.menuList};
    },
    setState(state, {payload: datas}) {
      // console.log("ddd", datas);
      return {...state, ...datas};
    }
  },
  effects: {
    *index({ payload: query }, { put, call }) {
      const data = yield call(menuService.listRoot, query);
      yield put({ type: 'indexPage', payload: data.datas });
    },
    *showChildren({ payload: pid }, { put, call }) {
      const data = yield call(menuService.listChildren, {pid});
      yield put({ type: 'setState', payload: { datas: data.datas, totalElements: data.size } });
    },
    *init({ payload: query }, { put, call }) {
      yield call(menuService.init);
    },
    *update({ payload: obj }, { call, put }) {
      const data = yield call(menuService.update, obj);
      console.log("update", data);
    },
    *deleteMenu({ payload: id }, { call }) {
      yield call(menuService.deleteMenu, {id});
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
