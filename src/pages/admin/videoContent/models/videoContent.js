import * as objService from '../services/objService';
import {message} from 'antd';
import * as activityCommentService from "../../activityComment/services/activityCommentService";

export default {
  state: {
    data:[],
    totalElements: 0,
    item:[],
    categoryList:[],
    addVisible: false,
    updateVisible: false,
    invalidVisible: false,
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    }
  },
  effects: {
    *list({payload: query}, {call,put}) {
      const data = yield call(objService.list, query);
      yield put({ type: 'modifyState', payload: {data: data.data, totalElements: data.size} });
    },
    *addOrUpdate({payload: obj}, {call}) {
      const data = yield call(objService.addOrUpdate, obj);
      if(data) {
        message.success("保存成功");
      }
    },
    *updateField({payload: obj}, {call}) {
      const data = yield call(objService.updateField, obj);
      if(data) {
        message.success("操作成功");
      }
    },
    *deleteObj({payload: id}, {call}) {
      const data = yield call(objService.deleteObj, {id});
      if(data) {
        message.success(data.message);
      }
    },
    *onUpdate({payload: id}, {call,put}) {
      const data = yield call(objService.loadOne, {id});
      //console.log(data)
      if(data) {
        yield put({type:'modifyState', payload: {item: data.obj, categoryList: data.categoryList, updateVisible: true}});
      }
    },
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/admin/videoContent') {
          dispatch({ type: 'list', payload: location.query });
        }
      });
    }
  }
}
