import * as objService from '../services/objService'

export default {
  namespace: 'wxNotice',
  state: {
    item:{},
    totalElements: 0,
    totalPage:0,
    data:[],
    loaded: false
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    }
  },
  effects: {
    *index({payload: query}, {call,put}) {
      const data = yield call(objService.list, query);
      // console.log(data);
      yield put({type: 'modifyState', payload: {totalElements: data.size, data: data.data, totalPage: data.totalPage, loaded: true}});
    },
    *loadOne({payload: query}, {call,put}) {
      const data = yield call(objService.loadOne, query);
      // console.log(data);
      yield put({type: 'modifyState', payload: {item: data.obj}});
    },
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname==='/weixin/notice/show') {
          dispatch({type: "loadOne", payload: location.query});
        } else if(location.pathname === '/weixin/notice') {
          dispatch({type: 'index', payload: location.query});
        }
      })
    }
  }
}
