import * as objectService from '../services/objectService';
import {message} from 'antd';
import {getLoginUser} from "../../../../utils/authUtils";

export default {
  state: {
    datas:[],
    totalElements: 0,
    item:{},
    addVisible: false,
    updateVisible: false,
    replyVisible: false,
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
    updatePage(state, { payload: obj }) {
      return {...state, item: obj.obj, updateVisible: true};
    }
  },
  effects: {
    *list({payload: query}, {call,put}) {
      const data = yield call(objectService.listAll, query);
      yield put({ type: 'modifyState', payload: {datas: data.data, totalElements: data.size} });
    },
    *reply({payload: obj}, {call}) {
      const data = yield call(objectService.reply, obj);
      if(data) {
        message.success(data.message);
      }
    },
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/yard/classComment') {
          dispatch({ type: 'list', payload: location.query });
        }
      });
    }
  }
}
