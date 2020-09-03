import * as objectService from '../services/objectService';
import {getTeacherInfo} from "../../../../utils/authUtils";
import router from "umi/router";

export default {
  namespace: 'yardIndex',
  state : {
    teacher:[],
    classroomList:[], //教师班级信息
    noticeList: [], //公告
    courseDtoList: [], //课程
    planList:[], //教案
    roomCourseList: [], //课程
    imageList: [], //影集
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
    *yardIndex({payload: query}, {call,put}) {
      const teacher = getTeacherInfo();
      // console.log(teacher);
      query.teaId = teacher.id;
      const data = yield call(objectService.index, query);
      console.log(data)
      if(data) {
        if(!data.classroomList || data.classroomList.length<=0) {
          router.push("/yard/teacherClassroom");
        }
        yield put({type: "modifyState", payload: {teacher: data.teacher, classroomList: data.classroomList,
          noticeList: data.noticeList, courseDtoList: data.courseDtoList,
            planList: data.planList, roomCourseList: data.roomCourseList,
            imageList: data.imageList}});
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen((location) => {
        if(location.pathname === "/yard/index") {
          dispatch({type: "yardIndex", payload: location.query});
        }
      })
    }
  }
}
