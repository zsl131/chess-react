import * as objService from '../services/objectService';
import {message} from 'antd';

export default {
  state: {
    item:{},
    obj:{},
    learn:{},
    ppt:{},
    video:{},
    data:[], //列表
    type: '', //返回的数据类型，base、root、child、course
    category:{}, //当前分类
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
    *addCategory({payload: obj}, {call}) {
      const data = yield call(objService.addCategory, obj);
      if(data) {
        message.success("保存成功");
      }
    },
    *updateCategory({payload: obj}, {call}) {
      const data = yield call(objService.updateCategory, obj);
      if(data) {
        message.success("修改成功");
      }
    },
    *addOrUpdateCourse({payload: obj}, {call}) {
      const data = yield call(objService.addOrUpdateCourse, obj);
      if(data) {message.success("保存成功");}
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/yard/courseNew') {
          dispatch({ type: 'index', payload: location.query });
        }
      });
    }
  }
}
