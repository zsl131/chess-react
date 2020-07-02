import * as activityService from '../services/activityService';
import { message } from 'antd';

export default {
  namespace: 'activity',
  state: {
    datas:[],
    item:{},
    totalElements: 0,
    addVisible: false,
    updateVisible: false,
    depList:[],
    showVisible: false,
    recordList:[],
    addRecordVisible: false,
    updateRecordVisible: false,
    recordItem:{},

    imageVisible: false,
    imageList: [],
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
    indexPage(state, { payload: data }) {
      return {...state, datas: data.datas, totalElements: data.size};
    },
    updatePage(state, { payload: obj }) {
      return {...state, item: obj.obj, updateVisible: true};
    },
    activityRecordPage(state, {payload: {data}}) {
      return {...state, item: data.activity, recordList: data.list};
    },
    onUpdateRecordPage(state, {payload: data}) {
      return {...state, recordItem: data.record, updateRecordVisible: true};
    }
  },
  effects: {
    *index({ payload: query }, { call, put }) {
      query.sort = "publishDate_d,id_d";
      const data = yield call(activityService.list, query);
      yield put({ type: 'indexPage', payload: data });
    },
    *addOrUpdate({ payload: obj }, { call }) {
      // console.log("addOrUpdate", obj);
      yield call(activityService.addOrUpdate, obj);
    },
    *deleteObj({ payload: id }, { call }) {
      yield call(activityService.deleteObj, { id });
    },
    *onAdd({ payload: obj }, { call, put }) {
      const data = yield call(activityService.listDep);
      // console.log("onAdd::", data);
      yield put({ type: 'modifyState', payload: { depList: data.datas, addVisible: true } });
    },
    *onUpdate({ payload: id }, { call, put }) {
      const data = yield call(activityService.loadOne, {id});
      // console.log(data);
      yield put({ type: 'updatePage', payload: data });
    },
    *onShow({ payload: id }, { call, put }) {
      const data = yield call(activityService.loadOne, {id});
      yield put({ type: 'modifyState', payload: { item: data.obj, showVisible: true } });
    },
    *activityRecord({payload: query}, {call, put}) {
      const data = yield call(activityService.listRecord, query);
      yield put({type: 'activityRecordPage', payload: {actId: query.actId, data: data}});
    },
    *addOrUpdateRecord({payload: obj}, {call, put}) {
      const data = yield call(activityService.addOrUpdateRecord, obj);
      yield put({type: "addOrUpdateRecordPage", payload: data});
    },
    *deleteRecord({payload: id}, {call}) {
      const data = yield call(activityService.deleteRecord, {id});
      if(data) {
        message.success(data.message);
      }
    },
    *onUpdateRecord({payload: id}, {call, put}) {
      const data = yield call(activityService.loadOneRecord, {id});
      if(data) {
        yield put({type:'onUpdateRecordPage', payload: data});
      }
    },
    *showImages({payload: obj}, {call,put}) {
      const data =yield call(activityService.loadImage, {recordId: obj.id});
      //console.log(data);
      if(data) {
        yield put({type: "modifyState", payload: {imageVisible: true, imageList: data.imageList, item: obj}});
      }
    },
    *deleteImage({payload: id}, {call}) {
      const data = yield call(activityService.deleteImage, {id});
      if(data) {
        message.success(data.message);
      }
    },
  },
  subscriptions: {
    setupt({ history, dispatch }) {
      return history.listen(( location ) => {
        const pathname = location.pathname;
        if(pathname === "/admin/activity") {
          dispatch({ type: 'index', payload: location.query });
        }
        if(pathname === '/admin/activity/record') {
          dispatch({type: 'activityRecord', payload: location.query});
        }
      });
    }
  }
}
