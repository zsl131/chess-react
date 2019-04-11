import * as objService from '../services/objService';
import {getLoginAccount2Obj} from "../../../../utils/loginAccountUtils";

export default {

  state: {
    dtoList:[],
    ppt:{},
    learn:{},
    video:{},
    course:{},
    surplusCount:0,
    detail:{}
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    },
  },
  effects: {
    *listOwn({payload: query}, {call,put}) {
      const loginAccount = getLoginAccount2Obj();
      query.phone = loginAccount.phone;
      const data = yield call(objService.listOwn, query);
      if(data) {
        yield put({ type: 'modifyState', payload: {dtoList: data.dtoList}});
      }
    },
    *loadDetail({payload: query}, {call,put}) {
      const loginAccount = getLoginAccount2Obj();
      query.phone = loginAccount.phone;
      const data = yield call(objService.loadDetail, query);
      if(data) {
        yield put({type: 'modifyState', payload: {ppt: data.ppt, learn: data.learn, video: data.video, course: data.course, surplusCount: data.surplusCount, detail: data.obj}});
      }
    },
  },
  subscriptions: {
    setup({history,dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/wx/course/listOwn') {
          dispatch({type: 'listOwn', payload: location.query})
        } else if(location.pathname === '/wx/course/showDetail') {
          dispatch({type: 'loadDetail', payload: location.query})
        }
      });
    }
  }
}
