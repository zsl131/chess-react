import * as publicService from '../services/publicService';

export default {
  state : {
    activityList:[]
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    }
  },
  effects: {
    *listRecommend({payload: query}, {call, put}) {
      const data = yield call(publicService.listRecommentActivity,query);
      // console.log(data);
      yield put({type: 'modifyState', payload: {activityList: data.activityList}});
    }
  }
}
