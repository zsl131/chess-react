import * as selectLessonService from '../services/selectLessonService';
export default {
  state:{
    totalElements:0,
    datas:[],
    addVisible:false
  },
  reducers:{
    modifyState(state,{payload:options}){
      return{...state,...options};
    }
  },
  effects:{
    *listObj({payload:query},{call,put}){
      const data = yield call(selectLessonService.list,query);
      yield put({type:'modifyState',payload:{totalElements:data.size,datas:data.datas}});
    },
  },
  subscriptions:{
    setup({history,dispatch}){
      return history.listen((location)=>{
        if(location.pathname==='/admin/selectLesson'){
          dispatch({type:'listObj',payload:location.query});
        }
      })
    }
  }
}
