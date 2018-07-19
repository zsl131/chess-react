import * as departmentService from '../services/departmentService';

export default {
  namespace: 'department',
  state: {
    datas:[],
    totalElements: 0,
    item: [],
    addVisible: false,
    updateVisible: false
  },
  reducers: {
    indexPage(state, { payload: data }) {
      return {...state, datas: data.datas, totalElements: data.size};
    },
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
    updatePage(state, { payload: obj }) {
      return {...state, item: obj.datas, updateVisible: true};
    }
  },
  effects: {
    *index({ payload: query }, { call, put }) {
      const data = yield call(departmentService.list, query);
      yield put({ type: 'indexPage', payload: data });
    },
    *addOrUpdate({ payload: obj }, { call }) {
      yield call(departmentService.addOrUpdate, obj);
    },
    *deleteObj({ payload: id }, { call }) {
      yield call(departmentService.deleteObj, { id });
    },
    *onUpdate({ payload: id }, { call, put }) {
      const data = yield call(departmentService.loadOne, {id});
      console.log(data);
      yield put({ type: 'updatePage', payload: data });
    }
  },
  subscriptions: {
    setupt({ history, dispatch }) {
      return history.listen(( location ) => {
        if(location.pathname === "/admin/department") {
          dispatch({ type: 'index', payload: location.query });
        }
      });
    }
  }
}
