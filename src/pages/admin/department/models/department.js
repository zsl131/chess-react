import * as departmentService from '../services/departmentService';
import { message } from 'antd';

export default {
  namespace: 'department',
  state: {
    datas:[],
    totalElements: 0,
    item: [],
    addVisible: false,
    updateVisible: false,
    setUserVisible: false,
    userList:[],
    userIds:[],
  },
  reducers: {
    indexPage(state, { payload: data }) {
      return {...state, datas: data.datas, totalElements: data.size};
    },
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
    updatePage(state, { payload: obj }) {
      return {...state, item: obj.obj, updateVisible: true};
    }
  },
  effects: {
    *index({ payload: query }, { call, put }) {
      const data = yield call(departmentService.list, query);
      yield put({ type: 'indexPage', payload: data });
    },
    *addOrUpdate({ payload: obj }, { call }) {
      yield call(departmentService.addOrUpdate, obj);
    },
    *deleteObj({ payload: id }, { call }) {
      const data = yield call(departmentService.deleteObj, { id });
      if(data) {message.success(data.message)}
    },
    *onUpdate({ payload: id }, { call, put }) {
      const data = yield call(departmentService.loadOne, {id});
      // console.log(data);
      yield put({ type: 'updatePage', payload: data });
    },
    *onSetUser({ payload: obj }, { call, put }) {
      const data = yield call(departmentService.loadAuthUser, {"depId": obj.id});
      // console.log("setUser::", data);
      yield put({ type: 'modifyState', payload: { setUserVisible: true,  userList: data.obj.userList, userIds: data.obj.userIds, item: obj} });
    },
    *setAuthUser({ payload: obj }, { call }) {
      const data = yield call(departmentService.setDepUser, obj);
      yield message.success(data.message);
    }
  },
  subscriptions: {
    setupt({ history, dispatch }) {
      return history.listen(( location ) => {
        if(location.pathname === "/admin/department") {
          dispatch({ type: 'index', payload: location.query });
        }
      });
    }
  }
}
