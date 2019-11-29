import * as objService from '../services/objService';
import { message } from 'antd';

export default {
  state: {
    datas:[],
    item:{},
    config:{},
    menuElements:0,
    totalElements:0,
    addVisible: false,
    updateVisible: false,
  },
  reducers: {
    'list'(state, { payload: datas }) {
      // console.log("listRole", datas);
      return {...state, datas: datas.datas, totalElements: datas.size, config: datas.config};
    },
    'updateState'(state, { payload: options }) {
      return {...state, ...options};
    },
    'updateItem'(state, { payload: obj }) {
      // console.log("updateItem", obj);
      return {...state, updateVisible: true, item: obj};
    },
  },
  effects: {
    *listObj({ payload: query }, { call, put }) {
      // console.log("listObj:::", query);
      const data = yield call(objService.list, query);
      yield put({ type:'updateState', payload: {totalElements: data.size, datas: data.data} });
    },
    *addOrUpdate({ payload: obj }, { call, put }) {
      const data = yield call(objService.addOrUpdate, obj);
      if(data) {
        yield put({ type: 'setModalVisible', payload: { addVisible: false } });
      }
    },
    *deleteObj({ payload: id }, { call, put }) {
      const data = yield call(objService.deleteObj, {id});
      if(data) {message.success(data.message);}
    },
    *update({ payload: id }, { call, put }) {
      const data = yield call(objService.loadOne, {id});
      if(data) {
        yield put({ type: 'updateItem', payload: data.obj });
      } else {
        message.error("没有找到对应数据");
      }
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/appSwiper') {
          dispatch({ type: 'listObj', payload: location.query });
        }
      })
    }
  }
}
