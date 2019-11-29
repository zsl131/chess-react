import * as ageDicService from '../services/ageDicService';
import {message} from 'antd';
import * as activityCommentService from "../../activityComment/services/activityCommentService";

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
      const data = yield call(ageDicService.deleteObj, { id });
      if(data) {message.success(data.message);}
    },
    *onUpdate({payload: id}, {call,put}) {
      const data = yield call(activityCommentService.loadOne, {id});
      if(data) {
        yield put({type:'modifyState', payload: {item: data.obj, updateVisible: true}});
      }
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
