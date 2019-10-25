import * as objService from '../services/objectService';
import {message} from 'antd';

export default {
  state: {
    item:{},
    obj:{},
    data:[], //列表
    type: '', //返回的数据类型，base、root、child、course
    system:{}, //当前分类
    course:{},
    learn:{},
    ppt:{},
    video:{},
    treeData:[],
    totalElements: 0,
  },
  reducers: {
    modifyState(state,{payload: options}) {
      return {...state, ...options};
    }
  },
  effects: {
    *index({ payload: query }, { put, call }) {
      const data = yield call(objService.index, query);
      yield put({ type: 'modifyState', payload: data });
    },
    *addSystem({payload: obj}, {call}) {
      const data = yield call(objService.addOrUpdateSystem, obj);
      if(data) {
        message.success("保存成功");
      }
    },
    *updateSystem({payload: obj}, {call}) {
      const data = yield call(objService.addOrUpdateSystem, obj);
      if(data) {
        message.success("修改成功");
      }
    },
    *addOrUpdateDetail({payload: obj}, {call}) {
      const data = yield call(objService.addOrUpdateDetail, obj);
      if(data) {message.success("保存成功");}
    },
    *deleteSystem({payload: id}, {call}) {
      const data = yield call(objService.deleteSystem, {id});
      if(data) {message.success(data.message);}
    },
    *deleteSystemDetail({payload: id}, {call}) {
      const data = yield call(objService.deleteSystemDetail, {id});
      if(data) {message.success(data.message);}
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/yard/classSystem') {
          dispatch({ type: 'index', payload: location.query });
        }
      });
    }
  }
}
