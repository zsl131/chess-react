import * as objService from '../services/objService';
import {message} from 'antd';

export default {
  state: {
    data:[],
    totalElements: 0,
    item:{},
    imgList:[],
    addVisible: false,
    updateVisible: false,
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
    *addOrUpdate({payload: obj}, {call}) {
      const data = yield call(objService.addOrUpdate, obj);
      if(data) {message.success("数据保存成功");}
    },
    *onUpdate({payload: id}, {call,put}) {
      const data = yield call(objService.loadOne, {id});
      yield put({type: 'modifyState', payload: {item: data.obj, imgList: data.imgList, updateVisible: true}})
    },
    *updateField({payload: obj}, {call}) {
      const data = yield call(objService.updateField, obj);
      if(data) {message.success(data.message);}
    },
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/admin/appVersion') {
          dispatch({type: 'list', payload: location.query});
        }
      })
    }
  }
}
