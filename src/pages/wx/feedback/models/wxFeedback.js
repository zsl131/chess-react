import * as objService from '../service/objService';

export default {
  state: {
    totalCount: 0,
    data: [],
    curPage: 0,
    refreshing: false,
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    },
    modifyData(state, {payload: data}) {
      const newData = state.data.concat(data);
      return {...state, data: newData};
    }
  },
  effects: {
    *listFeedback({payload: query}, {call,put}) {
      const data = yield call(objService.listFeedback, query);
      if(data.data) {
        yield put({
          type: 'modifyState',
          payload: {totalCount: data.totalCount, curPage: query.page ? query.page : 0}
        });
        yield put({type: 'modifyData', payload: data.data});
      }
    },
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location)=> {
        if(location.pathname === '/wx/feedback/listFeedback') {
          dispatch({type: 'listFeedback', payload: location.query});
        }
      });
    }
  }
}
