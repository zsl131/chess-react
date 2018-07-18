import * as roleService from '../services/roleService';
import { message } from 'antd';
import * as menuService from "../../menu/services/menuService";

export default {
  namespace: 'role',
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
      // console.log("update---->", id);
      const data = yield call(roleService.loadOne, {id});
      if(data.size) {
        yield put({ type: 'updateItem', payload: data.datas });
      } else {
        message.error("没有找到对应数据");
      }
    },
    *updateRole({ payload: obj }, { call, put }) {
      yield call(roleService.update, obj);
    },
    *queryMenus({ payload: query }, { put, call }) {
      // console.log("queryMenus::", query);
      const data = yield call(menuService.listRoot, query);
      const data2 = yield call(roleService.listMenuIds, query);

      yield put({ type: 'setModalVisible', payload: { curAuthMenu: data2.datas } });
      yield put({ type: 'showMenus', payload: data.datas });
      // console.log("data2===", data2);
    },
    *authMenu({ payload: obj }, { call }) {
      const data = yield call(roleService.authMenu, obj);
      message.success(data.datas);
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
