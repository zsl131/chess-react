import * as activityService from '../services/activityService';
import {Toast} from 'antd-mobile';
import * as signUpService from "../../signUp/services/signUpService";

export default {
  namespace: 'wxActivity',
  state: {
    datas:[],
    totalElements:0,
    item:{},
    commentList:[],
    commentPage: 0,
    commentElements:0,
    curCommentPage: 1,
    recordList:[],
    recordSize:0,
    department:{},
    curPage: 0,
    refreshing: false,
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    },
    onCommentGoodPage(state, {payload: id}) {
      state.commentList.map((item)=> {
        if(item.id === id) {
          item.goodCount += 1;
        }
        return item;
      });
      return {...state};
    },
    onGoodPage(state, {payload: id}) {
      state.item.goodCount += 1;
      return {...state};
    },
    modifyData(state, {payload: data}) {
      const newData = state.recordList.concat(data);
      return {...state, recordList: newData};
    },
    onDeleteApplyPage(state, {payload: id}) {
      const newData = state.recordList.filter((item)=>{if(item.id!==id) return item});
      return {...state, recordList: newData};
    },
  },
  effects: {
    *list({payload: query}, {call,put}) {
      const data = yield call(activityService.list, query);
      // console.log(data);
      if(data) {
        yield put({type:'modifyState', payload: {datas: data.datas, totalElements: data.size, department: data.department}});
      }
    },
    *listOwn({payload: query}, {call,put}) {
      const data = yield call(activityService.listOwn, query);
      // console.log(data)
      if(data.data) {
        yield put({
          type: 'modifyState',
          payload: {totalElements: data.size, curPage: query.page ? query.page : 0}
        });
        yield put({type: 'modifyData', payload: data.data});
      }
    },
    *onDeleteApply({payload: id}, {call,put}) {
      const data =yield call(activityService.deleteApply, {id});
      if(data) {Toast.success(data.message);}
      yield put({type: 'onDeleteApplyPage', payload: id});
    },
    *show({payload: query}, {call,put}) {
      const data = yield call(activityService.loadOne, query);
      yield put({type:"modifyState", payload: {item: data.obj, commentList: data.commentList, commentPage: data.totalPage, commentElements: data.commentSize, recordList: data.recordList, recordSize: data.recordSize}});
    },
    *onComment({payload: comment}, {call,put}) {
      const data = yield call(activityService.addComment, comment);
      if(data) {Toast.success(data.message);}
      yield put({type: "listComment", payload: {openid: comment.openid, actId: comment.objId}});
    },
    *listComment({payload: params}, {call,put}) {
      const data = yield call(activityService.listComment, params);
      yield put({type: "modifyState", payload: {commentList: data.commentList, commentPage: data.totalPage, commentElements: data.size}});
    },
    *onGood({payload: id}, {call,put}) {
      const data = yield call(activityService.onGood, {id});
      if(data) {Toast.success(data.message+" +1");}
      yield put({type: 'onGoodPage', payload: id});
    },
    *onCommentGood({payload: id}, {call,put}) {
      const data = yield call(activityService.onCommentGood, {id});
      if(data) {Toast.success(data.message);}
      yield put({type: 'onCommentGoodPage', payload: id});
    }
  },
  subscriptions: {
    setup({history,dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/wx/activity') {
          dispatch({type:'list', payload: location.query});
        }
        if(location.pathname==='/wx/activity/show') {
          dispatch({type: 'show', payload: location.query});
        } else if(location.pathname === '/wx/activity/listOwn') {
          dispatch({type: 'listOwn', payload: location.query})
        }

      });
    }
  }
}
