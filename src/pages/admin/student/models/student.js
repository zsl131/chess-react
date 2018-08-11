import * as objectService from '../services/objectService';

export default {
  namespace: 'student',
  state: {
    datas:[],
    totalElements: 0,
    item:{},
    ageList:[],
    schoolList:[],
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
    *list({payload: query}, {call,put}) {
      const data = yield call(objectService.list, query);
      yield put({ type: 'modifyState', payload: {datas: data.datas, totalElements: data.size, ageList: data.ageList, schoolList: data.schoolList} });
    },
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/admin/student') {
          dispatch({ type: 'list', payload: location.query });
        }
      });
    }
  }
}
