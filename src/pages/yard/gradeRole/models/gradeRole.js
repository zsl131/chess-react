import * as objService from '../services/objService';
import { message } from 'antd';

export default {
  state: {
    datas:[],
    item:{},
    menuTree:[],
    menuList:[],
    menuElements:0,
    totalElements:0,
    addVisible: false,
    updateVisible: false,
    matchMenuVisible: false,
    curRole:[],
    curAuthMenu:[],
  },
  reducers: {
    'list'(state, { payload: datas }) {
      // console.log("listRole", datas);
      return {...state, datas: datas.datas, totalElements: datas.size};
    },
    'setModalVisible'(state, { payload: options }) {
      return {...state, ...options};
    },
    'updateItem'(state, { payload: obj }) {
      // console.log("updateItem", obj);
      return {...state, updateVisible: true, item: obj};
    },
    showMenus(state, { payload: data }) {
      // console.log(data);
      return {...state, menuTree: data.treeList, menuElements: data.menuList.length, menuList: data.menuList, matchMenuVisible: true};
    },
  },
  effects: {
    *listObj({ payload: query }, { call, put }) {
      // console.log("listObj:::", query);
      const data = yield call(objService.list, query);
      yield put({ type:'setModalVisible', payload: {totalElements: data.size, datas: data.data} });
    },
    *addRole({ payload: obj }, { call, put }) {
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
    *updateRole({ payload: obj }, { call, put }) {
      const data = yield call(objService.addOrUpdate, obj);
      if(data) {message.success("修改成功");}
    },
    *queryMenus({ payload: query }, { put, call }) {
      // console.log("queryMenus::", query);
      // const data = yield call(menuService.listRoot, query);
      const data2 = yield call(objService.listMenuIds, query);

      yield put({ type: 'setModalVisible', payload: { curAuthMenu: data2.datas } });
      // yield put({ type: 'showMenus', payload: data.datas });
      // console.log("data2===", data2);
    },
    *authMenu({ payload: obj }, { call }) {
      const data = yield call(objService.authMenu, obj);
      message.success(data.message);
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/yard/gradeRole') {
          dispatch({ type: 'listObj', payload: location.query });
        }
      })
    }
  }
}
