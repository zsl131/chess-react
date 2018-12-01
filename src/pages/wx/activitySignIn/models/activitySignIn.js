import * as objectService from '../services/objectService';
import {Toast} from 'antd-mobile';

export default {
  state: {
    data: [],
    record:{}
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    },
    signPage(state, {payload: id}) {
      const newData = state.data.map((item) => {
        if(item.id === id) {
          item.hasCheck = "1";
        }
        return item;
      })
      return {...state, data:newData}
    }
  },
  effects: {
    *listRecord({payload: query}, {call,put}) {
      const data = yield call(objectService.findRecord, query);
      if(data) {
        yield put({type: "modifyState", payload: {data: data.obj, record: data.record}});
      }
    },
    *sign({payload: id}, {call, put}) {
      const data = yield call(objectService.onSign, {id});
      if(data) {Toast.success(data.message);}
      yield put({type: "signPage", payload: id});
    },
    *searchRecord({payload: query}, {call, put}) {
      //console.log(query);
      const data = yield call(objectService.findRecordByPhone, query);
      //console.log(data);
      if(data.obj.length>0) {
        yield put({type: "modifyState", payload: {data: data.obj}});
      } else {
        Toast.info("未检测到任何记录，请检查手机号码是否正确");
      }
    }
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location)=> {
        if(location.pathname === '/wx/activitySignIn') {
          dispatch({type: 'listRecord', payload: location.query})
        }
      });
    }
  }
}
