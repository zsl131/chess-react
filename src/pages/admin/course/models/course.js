import * as courseService from '../services/courseService';
import { message } from 'antd';

export default {
  namespace: 'course',
  state: {
    datas:[],
    totalElements:0,
    addVisible:false,
    updateVisible:false,
    item:[],
  },
  reducers: {
    modifyState(state,{payload:options}) {
      return {...state,...options};
   },
  },
  effects: {
    *list({payload:query},{call,put}) {
      const data = yield call(courseService.list,query);
      console.log(data);
      yield put({type:'modifyState',payload:{totalElements:data.size,datas:data.datas}});
    },
    *addOrUpdate({payload:obj},{call,put}) {
      const data = yield call(courseService.addOrUpdate,obj);
      console.log(data);
      if(data) {
        message.success(data.message);
        yield put({type:'modifyState',payload:{addVisible:false}});
      }
    },
    *deleteObj({payload:id},{call}) {
      const data = yield call(courseService.deleteObj,{id});
      console.log(data);
      if(data) {
        message.success(data.message);
      }
    },
    *onUpdate({payload:id},{call,put}) {
      const data = yield call(courseService.loadOne,{id});
      if(data) {
        yield put({type:'modifyState',payload:{item:data.obj,updateVisible:true}});
      }
    }
  },
  subscriptions: {
    setup({history,dispatch}) {
      return history.listen((location) => {
        if(location.pathname === "/admin/course") {
          dispatch({type:'list',payload:location.query});
        }
      });
    }
  }
}
