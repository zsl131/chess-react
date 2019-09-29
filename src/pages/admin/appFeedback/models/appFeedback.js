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
    *reply({payload: obj}, {call}) {
      const data = yield call(objService.reply, obj);
      if(data) {message.success("数据保存成功");}
    },
    *onUpdate({payload: id}, {call,put}) {
      const data = yield call(objService.loadOne, {id});
      console.log(data);
      yield put({type: 'modifyState', payload: {item: data.obj, imgList: data.imgList, updateVisible: true}})
    },
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/admin/appFeedback') {
          dispatch({type: 'list', payload: location.query});
        }
      })
    }
  }
}
