import * as objService from '../services/objService';

export default {
  state: {
    data:[],
    totalElements: 0,
    item:{},
    planList: [],
    showVisible: false,
    curId: 0,

    schoolList:[],
    teachList:[],
    // planList: [],
    type:'1',
    year: '',
    school:{},
    teacher: {},
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    },
  },
  effects: {
    *listPlan({payload: query}, {call,put}) {
      const data = yield call(objService.listPlan4Manger, query);
      console.log(data);
      yield put({type: 'modifyState', payload: data});
    },
    *list({payload: query}, {call,put}) {
      const data = yield call(objService.list, query);
      yield put({type: 'modifyState', payload: {data: data.data, totalElements: data.size}})
    },
    *listByCourse({payload: obj}, {call,put}) {
      const data = yield call(objService.listByCourse, {id: obj.id, year: obj.planYear, teaId: obj.teaId, courseId: obj.courseId});
      yield put({type: 'modifyState', payload: {planList: data.planList, showVisible: true, curId: data.curId}})
    },
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/yard/teachPlan') {
          dispatch({type: 'listPlan', payload: location.query});
        }
      })
    }
  }
}
