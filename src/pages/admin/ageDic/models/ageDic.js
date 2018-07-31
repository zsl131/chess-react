import * as ageDicService from '../services/ageDicService';

export default {
  namespace: 'ageDic',
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
      return {...state, item: obj.datas, updateVisible: true};
    }
  },
  effects: {
    *list({payload: query}, {call,put}) {
      const data = yield call(ageDicService.list, query);
      yield put({ type: 'modifyState', payload: {datas: data.datas, totalElements: data.size} });
    },
    *addOrUpdate({payload: obj}, {call}) {
      yield call(ageDicService.addOrUpdate, obj);
    },
    *deleteObj({ payload: id }, { call }) {
      yield call(ageDicService.deleteObj, { id });
    },
    *onUpdate({ payload: id }, { call, put }) {
      const data = yield call(ageDicService.loadOne, {id});
      // console.log(data);
      yield put({ type: 'updatePage', payload: data });
    },
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/admin/ageDic') {
          dispatch({ type: 'list', payload: location.query });
        }
      });
    }
  }
}
