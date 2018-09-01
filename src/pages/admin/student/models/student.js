import * as objectService from '../services/objectService';
import {message} from "antd";

export default {
  namespace: 'student',
  state: {
    datas:[],
    totalElements: 0,
    addVisible: false,
    updateVisible: false,
    item:{},
    ageList:[],
    schoolList:[],
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
    *list({payload: query}, {call,put}) {
      const data = yield call(objectService.list, query);
      yield put({ type: 'modifyState', payload: {datas: data.datas, totalElements: data.size, ageList: data.ageList, schoolList: data.schoolList} });
    },
    *addStudent({payload: obj}, {call}) {
      const data = yield call(objectService.addStudent, obj);
      if(data) {
        message.success("添加成功");
      }
    },
    *deleteObj({payload: id}, {call}) {
      const data = yield call(objectService.deleteObj, {id});
      if(data) {
        message.success(data.message);
      }
    },
    *updateObj({payload: obj}, {call}) {
      const data = yield call(objectService.updateObj, obj);
      if(data) {
        message.success("修改成功");
      }
    },
    *loadObj({payload: id}, {call, put}) {
      const data = yield call(objectService.loadObj, {id});
      if(data) {
        yield put({type: "modifyState", payload: {item: data.obj}});
      }
    }
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/admin/student') {
          dispatch({ type: 'list', payload: location.query });
        }
      });
    }
  }
}
