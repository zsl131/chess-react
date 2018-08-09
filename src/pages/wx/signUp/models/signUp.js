import * as signUpService from '../services/signUpService';
import {Toast} from 'antd-mobile';
export default {
  state: {
    account:{},
    stuList:[],
    record:{},
    applyList:[],
    ageList:[],
    schoolList:[]
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    },
    onDeleteApplyPage(state, {payload: id}) {
      state.applyList.splice(state.applyList.findIndex(item => item.id === id), 1); //从数组中移除
    },
    addStudentOnlyPage(state, {payload: data}) {
      state.stuList.push(data.obj);
    }
  },
  effects: {
    *index({payload: query}, {call, put}) {
      const data = yield call(signUpService.loadActivityRecord, query);
      console.log(data);
      yield put({type: 'modifyState', payload: {account: data.account, stuList: data.stuList, record: data.record, applyList: data.applyList, ageList: data.ageList, schoolList: data.schoolList}});
    },
    *onDeleteApply({payload: id}, {call,put}) {
      const data =yield call(signUpService.deleteApply, {id});
      if(data) {Toast.success(data.message);}
      yield put({type: 'onDeleteApplyPage', payload: id});
    },
    *addStudent({payload: student}, {call,put}) {
      const data = yield call(signUpService.addStudent, student);
      if(data) {Toast.success(data.message)}
    },
    *addStudentOnly({payload: student}, {call,put}) {
      const data = yield call(signUpService.addStudentOnly, student);
      yield put({type: "addStudentOnlyPage", payload: data});
    },
    *deleteBatch({payload: objIds}, {call}) {
      const data = yield call(signUpService.deleteBatch, {objIds});
    }
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location)=> {
        if(location.pathname === '/wx/signUp') {
          dispatch({type: 'index', payload: location.query});
        }
      });
    }
  }
}
