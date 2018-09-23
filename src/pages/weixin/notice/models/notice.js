import * as objService from '../services/objService'
import {Toast} from 'antd-mobile';
import * as activityService from "../../../wx/activity/services/activityService";

export default {
  namespace: 'wxNotice',
  state: {
    item:{},
    totalElements: 0,
    totalPage:0,
    data:[],
    category:{},
    attachment:{},
    loaded: false,
    commentCount:0,
    commentList:[],
    addCommentVisible: false,
    commentPage:0,
    curCommentPage:1,
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    },
    addCommentPage(state, {payload: obj}) {
      state.commentList.push(obj);
      return {...state, commentCount: state.commentCount + 1};
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
  },
  effects: {
    *index({payload: query}, {call,put}) {
      const data = yield call(objService.list, query);
      // console.log(data);
      yield put({type: 'modifyState', payload: {totalElements: data.size, data: data.data, totalPage: data.totalPage, loaded: true, category: data.category}});
    },
    *loadOne({payload: query}, {call,put}) {
      query.hasAttachment = '1'; //需要获取附件
      query.findComment = "1"; //需要获取评论数量
      const data = yield call(objService.loadOne, query);
      // console.log(data);
      yield put({type: 'modifyState', payload: {item: data.obj, attachment: data.attachment, commentPage: data.totalPage, commentList: data.commentList, commentCount: data.commentSize}});
    },
    *addComment({payload: obj}, {call,put}) {
      const data = yield call(objService.addComment, obj);
      Toast.success("成功发表评论");
      // put({type: 'addCommentPage', payload: data.obj});
      yield put({type: "listComment", payload: {openid: obj.openid, noticeId: obj.noticeId}});
    },
    *listComment({payload: params}, {call,put}) {
      const data = yield call(objService.listComment, params);
      // console.log(data);
      yield put({type: 'modifyState', payload: {commentList: data.commentList, commentCount: data.size, commentPage: data.totalPage}});
    },
    *onCommentGood({payload: id}, {call,put}) {
      const data = yield call(objService.onGood, {id});
      if(data) {Toast.success(data.message);}
      yield put({type: 'onCommentGoodPage', payload: id});
    }
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname==='/weixin/notice/show') {
          dispatch({type: "loadOne", payload: location.query});
        } else if(location.pathname === '/weixin/notice') {
          dispatch({type: 'index', payload: location.query});
        }
      })
    }
  }
}
