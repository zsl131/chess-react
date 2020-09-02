import * as objectService from '../services/objectService';
import {getTeacherInfo, setTeacherClassroom} from "../../../../utils/authUtils";

export default {
  state : {
    teacher:{},
    classroomList:[], //班级
    gradeList: [], //年级
    config: {}, //配置信息
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
    *classroomList({payload: query}, {call,put}) {
      const teacher = getTeacherInfo();
      //console.log(teacher);
      query.teaId = teacher.id;
      const data = yield call(objectService.findOwn, query);
      //console.log(data)
      if(data) {
        yield put({type: "modifyState", payload: {teacher: data.teacher, classroomList: data.classroomList,
            gradeList: data.gradeList, config: data.config}});
      }
    },
    *addOrUpdate({payload: obj}, {call,put}) {
     // console.log(obj)
      const data = yield call(objectService.addOrUpdate, obj);
      //console.log(data)
      if(data) {
        setTeacherClassroom(data.classroomList);
        yield put({type: "modifyState", payload: {classroomList: data.classroomList}});
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen((location) => {
        if(location.pathname === "/yard/teacherClassroom") {
          dispatch({type: "classroomList", payload: location.query});
        }
      })
    }
  }
}
