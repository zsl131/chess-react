import * as activityService from '../services/activityService';

export default {
  namespace: 'wxActivity',
  state: {
    datas:[],
    totalElements:0,
    item:{},
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    },
  },
  effects: {
    *list({payload: query}, {call,put}) {
      const data = yield call(activityService.list, query);
      // console.log(data);
      if(data) {
        yield put({type:'modifyState', payload: {datas: data.datas, totalElements: data.size}});
      }
    },
    *show({payload: query}, {call,put}) {
      const data = yield call(activityService.loadOne, query);
      console.log(data);
      yield put({type:"modifyState", payload: {item: data.datas}});
    }
  },
  subscriptions: {
    setup({history,dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/wx/activity') {
          dispatch({type:'list', payload: location.query});
        }
        if(location.pathname==='/wx/activity/show') {
          dispatch({type: 'show', payload: location.query});
        }
      });
    }
  }
}
