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
    attaVisible: false,
    attachmentList: [],
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
    },
    *setShowTest({payload: obj}, {call}) {
      const data = yield call(objService.setShowTest, obj);
      if(data) {message.success(data.message);}
    },
    *deleteCourse({payload: id}, {call}) {
      const data = yield call(objService.deleteCourse, {id});
      if(data) {message.success(data.message);}
    },
    *deleteCategory({payload: id}, {call}) {
      const data = yield call(objService.deleteCategory, {id});
      if(data) {message.success(data.message);}
    },
    *onUpdate({payload: id}, {call,put}) {
      //console.log("-----------------")
      const data = yield call(objService.loadOne, {id});
      //console.log(data)
      if(data) {
        yield put({ type: 'modifyState', payload: {item: item, updateVisible: true} });
      }
    },
    *handleAtta({payload: obj}, {put, call}) {
      const data = yield call(objService.handleAtta, obj);
      //console.log(data)
      if(data) {
        //TODO 需要展示相关数据
        yield put({ type: 'modifyState', payload: {item: data.obj, attachmentList: data.attachmentList, attaVisible: true} });
      }
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
