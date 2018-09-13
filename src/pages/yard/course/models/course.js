import * as objService from '../services/objService';
import {message} from 'antd';

export default {
  namespace: 'classCourse',
  state: {
    data:[],
    totalElements: 0,
    item:{},
    video:{},
    addVisible: false,
    updateVisible: false,
    importVisible: false,
    playVideoVisible: false,
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
      const data = yield call(objService.loadOne, {id})
      let item = data.obj;
      // console.log(data, data.obj)
      item.learn = data.learn;
      item.video = data.video;
      item.ppt = data.ppt;
      console.log(item, '-----')
      yield put({type: 'modifyState', payload: {item: item, updateVisible: true}})
    },
    *onPlayVideo({payload: id}, {call,put}) {
      const data = yield call(objService.loadAttachment, {id});
      yield put({type: "modifyState", payload: {video: data.obj, playVideoVisible: true}});
    },
    *deleteObj({payload: id}, {call}) {
      const data = yield call(objService.deleteObj, {id});
      if(data) {message.success(data.message)}
    }
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/yard/course') {
          dispatch({type: 'list', payload: location.query});
        }
      })
    }
  }
}
