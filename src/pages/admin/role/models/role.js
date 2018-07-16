import * as roleService from '../services/roleService';
import { message } from 'antd';

export default {
  namespace: 'role',
  state: {
    datas:[],
    item:{},
    totalElements:0,
    addVisible: false,
    updateVisible: false
  },
  reducers: {
    'list'(state, { payload: datas }) {
      console.log("listRole", datas);
      return {...state, datas: datas.datas, totalElements: datas.size};
    },
    'setModalVisible'(state, { payload: options }) {
      return {...state, ...options};
    },
    'updateItem'(state, { payload: obj }) {
      console.log("updateItem", obj);
      return {...state, updateVisible: true, item: obj};
    }
  },
  effects: {
    *listObj({ payload: query }, { call, put }) {
      // console.log("listObj:::", query);
      const data = yield call(roleService.list, query);
      yield put({ type:'list', payload: data });
    },
    *addRole({ payload: obj }, { call, put }) {
      const data = yield call(roleService.add, obj);
      if(data.size) {
        yield put({ type: 'setModalVisible', payload: { addVisible: false } });
      }
    },
    *deleteObj({ payload: id }, { call, put }) {
      yield call(roleService.deleteObj, {id});
    },
    *update({ payload: id }, { call, put }) {
      console.log("update---->", id);
      const data = yield call(roleService.loadOne, {id});
      if(data.size) {
        yield put({ type: 'updateItem', payload: data.datas });
      } else {
        message.error("没有找到对应数据");
      }
    },
    *updateRole({ payload: obj }, { call, put }) {
      yield call(roleService.update, obj);
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/role') {
          dispatch({ type: 'listObj', payload: location.query });
        }
      })
    }
  }
}
