import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import {routerRedux} from 'dva/router'
import Operator from './components/Operator';
import List from './components/List';
import ShowCoursePlan from "./components/ShowCoursePlan";
import ListSchool from "./components/ListSchool";
import ListTeacher from "./components/ListTeacher";

const TeachPlan = ({
                  dispatch,
                  loading,
                  teachPlan,
                  location
                }) => {

  const { query, pathname } = location;

  const teacher = teachPlan.teacher;
  const school = teachPlan.school;

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      query: {
        ...query,
        ...newQuery,
      },
    }));
  };

  const operatorOpts = {
    msg: '添加教师',
    onAdd: () => {
      dispatch({ type: 'teachPlan/onAdd', payload: {}});
    }
  };

  const listOpts = {
    dataSource: teachPlan.planList,
    loading: loading.models.teachPlan,
    location,
    totalElement: teachPlan.totalElements,
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    showDetail: (obj) => {
      dispatch({ type: 'teachPlan/listByCourse', payload: obj});
    }
  };

  const showOpts = {
    maskClosable: false,
    visible: teachPlan.showVisible,
    title: "查看课程教案",
    curId: teachPlan.curId,
    planList: teachPlan.planList,
    onOk() {
      dispatch({ type: 'teachPlan/modifyState', payload: { showVisible: false } });
    },
    onCancel() {
      dispatch({ type: 'teachPlan/modifyState', payload: { showVisible: false } });
    }
  };

  const schOpts = {
    schoolList: teachPlan.schoolList,
    onClick: (sch) => {
      dispatch({ type: 'teachPlan/listPlan', payload: { type: "2", schId: sch.id } });
    },
  };

  const teaOpts = {
    teacherList: teachPlan.teacherList,
    onClick: (obj) => {
      dispatch({ type: 'teachPlan/listPlan', payload: { type: "3", schId: obj.schoolId, teaId: obj.id } });
    },
  };

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 教案管理<b>&nbsp;&nbsp;{(school&&school.id)?school.name:""}{(teacher&&teacher.id)?("->"+teacher.name):""}</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      {teachPlan.type==='1' && <ListSchool {...schOpts}/>}
      {teachPlan.type==='2' && <ListTeacher {...teaOpts}/>}
      {teachPlan.type==='3' && <List {...listOpts} />}
      {/*<div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>*/}
      {teachPlan.showVisible && <ShowCoursePlan {...showOpts}/>}
    </div>
  );
};

export default connect(({ loading, teachPlan }) => ({ loading, teachPlan }))(TeachPlan);
