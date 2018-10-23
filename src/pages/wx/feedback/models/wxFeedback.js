import * as objService from '../service/objService';
import {Toast} from 'antd-mobile';

export default {
  state: {
    totalCount: 0,
    data: [],
    curPage: 0,
    refreshing: false,
    totalPage: 0,
    replyVisible: false,
    item:{},
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
    *list({payload: query}, {call,put}) {
      const data = yield call(objService.list, query);
      // console.log(data);
      yield put({type: 'modifyState', payload: {data: data.data, totalCount: data.totalCount, totalPage: data.totalPage}});
    },
    *onReply({payload: obj}, {call,put}) {
      const data = yield call(objService.reply, obj);
      if(data) {
        Toast.success(data.message);
      }
    }
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location)=> {
        if(location.pathname === '/wx/feedback/listFeedback') {
          dispatch({type: 'listFeedback', payload: location.query});
        } else if(location.pathname === '/wx/feedback/list') {
          dispatch({type: 'list', payload: location.query})
        }
      });
    }
  }
}
