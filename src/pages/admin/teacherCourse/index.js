import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import {routerRedux} from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import ListTest from "./components/ListTest";
import ListHistory from "./components/ListHistory";
import ShowModal from "./components/ShowModal";
import ListCourse from "./components/ListCourse";
import AddModal from './components/AddModal';

const TeacherCourse = ({
  dispatch,
  loading,
  teacherCourse,
  location
}) => {

  const { query, pathname } = location;

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      query: {
        ...query,
        ...newQuery,
      },
    }));
  };

  const testOpts = {
    dataSource: teacherCourse.dataList,
    loading: loading.models.teacherCourse,
    gid: teacherCourse.gid,
    location,
    totalElement: teacherCourse.totalElements,
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    showCourse: (cid) => {
      dispatch({ type: 'teacherCourse/loadCourse', payload: {cid} });
    },
    uploadImage: (cid)=> {
      console.log(cid)
      dispatch({ type: 'teacherCourse/modifyState', payload: {uploadVisible: true, courseId: cid} });
    }
  };

  const showOpts = {
    visible: teacherCourse.showVisible,
    title: `课程详情-${teacherCourse.course.title}[${teacherCourse.course.grade}]`,
    maskClosable: false,
    commentList: teacherCourse.commentList,
    ppt: teacherCourse.ppt,
    learn: teacherCourse.learn,
    course: teacherCourse.course,
    video: teacherCourse.video,
    commentCount: teacherCourse,
    onCancel: ()=> {
      dispatch({ type: 'teacherCourse/modifyState', payload: {showVisible: false} });
    },
    onOk: () => {
      dispatch({ type: 'teacherCourse/modifyState', payload: {showVisible: false} });
    }
  };

  const addOpts = {
    visible: teacherCourse.uploadVisible,
    title: "添加课堂影像",
    maskClosable: false,
    courseId: teacherCourse.courseId,
    onOk(datas) {
      dispatch({ type: 'teacherCourse/modifyState', payload: { uploadVisible: false } });
    },
    onCancel() {
      dispatch({ type: 'teacherCourse/modifyState', payload: { uploadVisible: false } });
    }
  };

  const gid = teacherCourse.gid;

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> {
          gid===-1?"测试用户-课程库":(
            gid===0?"访问历史":
          "课程体系"
          )
        }<b>（{teacherCourse.totalElements}）</b></h3>
        {/*<Operator {...operatorOpts}/>*/}
      </div>
      {/*<div className="listFilter">
        <Filter {...filterOpts}/>
      </div>*/}
      <div className="listContent">
        {teacherCourse.gid===-1 && <ListTest {...testOpts}/>}
        {teacherCourse.gid===0 && <ListHistory {...testOpts}/>}
        {teacherCourse.gid>0 && <ListCourse {...testOpts}/>}
        {teacherCourse.uploadVisible && <AddModal {...addOpts}/>}
      </div>
      {teacherCourse.showVisible && <ShowModal {...showOpts}/>}
    </div>
  );
}

export default connect(({ loading, teacherCourse }) => ({ loading, teacherCourse }))(TeacherCourse);
