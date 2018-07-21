import * as feedbackService from '../services/feedbackService';
import {message} from 'antd';

export default {
  namespace: 'feedback',
  state: {
    datas: [],
    totalElements: 0,
    item:{},
    replyVisible: false,
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
    setStatusPage(state, { payload: obj }) {
      const datas = state.datas.map((item)=> {
        if(item.id === obj.record.id) {
          item.status = obj.status;
        }
        return item;
      })
      return {...state, datas: datas};
    },
    onReplyPage(state, { payload: obj }) {
      const datas = state.datas.map((item)=> {
        if(item.id === obj.id) {
          item = obj;
        }
        return item;
      })
      return {...state, datas: datas, replyVisible: false};
    }
  },
  effects: {
    *index({ payload: query }, { call, put }) {
      const data = yield call(feedbackService.list, query);
      yield put({ type: 'modifyState', payload: { datas: data.datas, totalElements: data.size } });
    },
    *setStatus({payload: record}, { call, put }) {
      const status = record.status === '1'?'0':'1';
      const data = yield call(feedbackService.updateStatus, {id: record.id, status: status});
      if(data) {message.success(data.datas);}
      yield put({ type: 'setStatusPage', payload: {record: record, status: status} });
    },
    *onReply({payload: values}, { call, put }) {
      const data = yield call(feedbackService.reply, values);
      if(data) {
        message.success("回复成功");
        yield put({ type: 'onReplyPage', payload: data.datas });
      }
    }
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === "/admin/feedback") {
          dispatch({ type: 'index', payload: location.query });
        }
      });
    }
  }
}
