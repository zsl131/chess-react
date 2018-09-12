import * as objService from '../services/objService';
import {message} from 'antd';

export default {
  state: {
    data:[],
    schoolList:[],
    totalElements: 0,
    item:{},
    addVisible: false,
    updateVisible: false
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    },
  },
  effects: {
    *list({payload: query}, {call,put}) {
      const data = yield call(objService.list, query);
      yield put({type: 'modifyState', payload: {data: data.data, totalElements: data.size}})
    },
    *onAdd({payload: query}, {call,put}) {
      const data = yield call(objService.listSchool, query)
      yield put({type: "modifyState", payload: {schoolList:data.list, addVisible: true}});
    },
    *addOrUpdate({payload: obj}, {call}) {
      const data = yield call(objService.addOrUpdate, obj);
      if(data) {message.success("数据保存成功");}
    },
    *onUpdate({payload: id}, {call,put}) {
      const data = yield call(objService.loadOne, {id})
      yield put({type: 'modifyState', payload: {item: data.obj, updateVisible: true}})
    },
    *deleteObj({payload: id}, {call}) {
      const data = yield call(objService.deleteObj, {id});
      if(data) {message.success(data.message)}
    }
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/yard/teacher') {
          dispatch({type: 'list', payload: location.query});
        }
      })
    }
  }
}
