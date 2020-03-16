import * as objectService from '../services/objectService';
import {message} from 'antd';
import {getLoginUser} from "../../../../utils/authUtils";

export default {
  state: {
    datas:[],
    totalElements: 0,
    item:[],
    addVisible: false,
    updateVisible: false,
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
    *list({payload: query}, {call,put}) {
      const user = getLoginUser();
      query.phone = user.username; //用户电话
      const data = yield call(objectService.list, query);
      //console.log(data)
      yield put({ type: 'modifyState', payload: {datas: data.data, totalElements: data.size} });
    },
    *addOrUpdate({payload: obj}, {call}) {
      yield call(objectService.addOrUpdate, obj);
    },
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/yard/teacherClassImage') {
          dispatch({ type: 'list', payload: location.query });
        }
      });
    }
  }
}
