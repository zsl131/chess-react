import * as objService from '../services/objectService';
import {message} from 'antd';

export default {
  state: {
    data:[],
    item:{},
    menuTree:[],
    totalElements: 0,
    updateVisible: false,
    addVisible: false,
    pid:0,
    pname:'根分类',
  },
  reducers: {
    indexPage(state, { payload: data }) {
      return {...state, menuTree: data.treeList, totalElements: data.categoryList.length, datas: data.categoryList};
    },
    setState(state, {payload: datas}) {
      return {...state, ...datas};
    },
  },
  effects: {
    *index({ payload: query }, { put, call }) {
      const data = yield call(objService.listRoot, query);
      yield put({ type: 'indexPage', payload: data.datas });
    },
    *showChildren({ payload: pid }, { put, call }) {
      const data = yield call(objService.listChildren, {pid});
      yield put({ type: 'setState', payload: { datas: data.datas, totalElements: data.size } });
    },
    *update({ payload: obj }, { call, put }) {
      const data = yield call(objService.update, obj);
      //console.log("update", data);
      if(data) { message.success("保存成功"); }
    },
    *add({ payload: obj }, {call}) {
      const data = yield call(objService.add, obj);
      if(data) { message.success("保存成功"); }
    },
    *deleteMenu({ payload: id }, { call }) {
      const data = yield call(objService.deleteObj, {id});
      if(data) { message.success(data.datas); }
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/yard/classCategory') {
          dispatch({ type: 'index', payload: location.query });
        }
      });
    }
  }
}
