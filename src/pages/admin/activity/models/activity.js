import * as activityService from '../services/activityService';
import { message } from 'antd';

export default {
  namespace: 'activity',
  state: {
    datas:[],
    item:{},
    totalElements: 0,
    addVisible: false,
    updateVisible: false,
    depList:[],
    showVisible: false,
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
    indexPage(state, { payload: data }) {
      return {...state, datas: data.datas, totalElements: data.size};
    },
    updatePage(state, { payload: obj }) {
      return {...state, item: obj.datas, updateVisible: true};
    }
  },
  effects: {
    *index({ payload: query }, { call, put }) {
      const data = yield call(activityService.list, query);
      yield put({ type: 'indexPage', payload: data });
    },
    *addOrUpdate({ payload: obj }, { call }) {
      // console.log("addOrUpdate", obj);
      yield call(activityService.addOrUpdate, obj);
    },
    *deleteObj({ payload: id }, { call }) {
      yield call(activityService.deleteObj, { id });
    },
    *onAdd({ payload: obj }, { call, put }) {
      const data = yield call(activityService.listDep);
      // console.log("onAdd::", data);
      yield put({ type: 'modifyState', payload: { depList: data.datas, addVisible: true } });
    },
    *onUpdate({ payload: id }, { call, put }) {
      const data = yield call(activityService.loadOne, {id});
      // console.log(data);
      yield put({ type: 'updatePage', payload: data });
    },
    *onShow({ payload: id }, { call, put }) {
      const data = yield call(activityService.loadOne, {id});
      yield put({ type: 'modifyState', payload: { item: data.datas, showVisible: true } });
    }
  },
  subscriptions: {
    setupt({ history, dispatch }) {
      return history.listen(( location ) => {
        if(location.pathname === "/admin/activity") {
          dispatch({ type: 'index', payload: location.query });
        }
      });
    }
  }
}
