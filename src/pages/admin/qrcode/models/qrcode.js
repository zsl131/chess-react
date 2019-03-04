import * as objService from '../services/objService';
import { message } from 'antd';

export default {
  state: {
    datas:[],
    item:{},
    menuTree:[],
    menuList:[],
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
    'setModalVisible'(state, { payload: options }) {
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
      yield put({ type:'setModalVisible', payload: {totalElements: data.size, datas: data.data, config: data.config} });
    },
    *addOrUpdateCode({ payload: obj }, { call, put }) {
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
    *saveConfig({payload:obj}, {call}) {
      const data = yield call(objService.saveConfig, obj);
      if(data) {
        message.success("保存成功");
      }
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/qrcode') {
          dispatch({ type: 'listObj', payload: location.query });
        }
      })
    }
  }
}
