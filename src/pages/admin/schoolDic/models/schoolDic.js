import * as schoolDicService from '../services/schoolDicService';

export default {
  namespace: 'schoolDic',
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
      const data = yield call(schoolDicService.list, query);
      yield put({ type: 'modifyState', payload: {datas: data.datas, totalElements: data.size} });
    },
    *addOrUpdate({payload: obj}, {call}) {
      yield call(schoolDicService.addOrUpdate, obj);
    },
    *deleteObj({ payload: id }, { call }) {
      yield call(schoolDicService.deleteObj, { id });
    },
    *onUpdate({ payload: id }, { call, put }) {
      const data = yield call(schoolDicService.loadOne, {id});
      // console.log(data);
      yield put({ type: 'updatePage', payload: data });
    },
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/admin/schoolDic') {
          dispatch({ type: 'list', payload: location.query });
        }
      });
    }
  }
}
