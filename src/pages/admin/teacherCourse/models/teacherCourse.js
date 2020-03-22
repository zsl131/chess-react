import * as objService from '../services/objService';
import {getLoginUser} from "../../../../utils/authUtils";

export default {
  state: {
    datas:[],
    totalElements: 0,
    item: {},
    showVisible: false,
    gid: '',
    dataList: [], //数据列表
    commentList: [], //评论列表
    ppt: {}, //
    learn: {},
    course: {},
    video: {},
    commentCount: 0, //评论条数

    uploadVisible: false,
    courseId: 0,
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
    *index({ payload: query }, { call, put }) {
      const loginUser = getLoginUser();
      // console.log(loginUser)
      query.phone = loginUser.username;
      const data = yield call(objService.listCourse, query);
      console.log(data);
      yield put({ type: 'modifyState', payload: {gid: data.gid, dataList: data.data, totalElements: data.size} });
    },
    *loadCourse({payload: query}, {call,put}) {
      const loginUser = getLoginUser();
      // console.log(loginUser)
      query.phone = loginUser.username;
      // console.log(query)
      let data = yield call(objService.loadCourse, query);
      data.showVisible = true;
      console.log(data);

      yield put({type: "modifyState", payload: data});
      // yield put({ type: 'modifyState', payload: {gid: data.gid, dataList: data.data, totalElements: data.size} });
    },
  },
  subscriptions: {
    setupt({ history, dispatch }) {
      return history.listen(( location ) => {
        if(location.pathname === "/admin/teacherCourse") {
          dispatch({ type: 'index', payload: location.query });
        }
      });
    }
  }
}
