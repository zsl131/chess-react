import React from 'react';
import { connect } from 'dva';
import { Icon, message } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import TeacherCountModal from './components/TeacherCountModal';
import TeacherRoleModal from './components/TeacherRoleModal';
import TeacherGradeModal from "./components/TeacherGradeModal";

const Teacher = ({
                  dispatch,
                  loading,
                  teacher,
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
  }

  const operatorOpts = {
    msg: '添加教师',
    onAdd: () => {
      dispatch({ type: 'teacher/onAdd', payload: {}});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: teacher.data,
    loading: loading.models.teacher,
    location,
    totalElement: teacher.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'teacher/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'teacher/onUpdate', payload: id });
    },
    handleVideoCount: (record) => {
      //console.log(record);
      dispatch({type: 'teacher/queryCountTree', payload: record.phone}).then(()=>{
        dispatch({ type: 'teacher/modifyState', payload: { videoCountVisible: true, item: record } });
      });
    },
    authGradeRole: (record)=> {
      dispatch({type: 'teacher/queryGradeRole', payload: {tid: record.id}}).then(()=> {
        dispatch({ type: 'teacher/modifyState', payload: { authRoleVisible: true, item: record } });
      });
    },
    initPwd: (record) => {
      dispatch({type: 'teacher/initPwd', payload: {id: record.id, phone: record.phone}});
    },
    setGrade: (record) => {
      dispatch({type: 'teacher/onSetGrade', payload: {tid: record.id}}).then(()=> {
        dispatch({ type: 'teacher/modifyState', payload: { setGradeVisible: true, item: record } });
      });
    }
  }

  const addOpts = {
    maskClosable: false,
    visible: teacher.addVisible,
    title: "添加教师",
    schoolList: teacher.schoolList,
    okText:'确认提交',
    cancelText: '取消并关闭',
    confirmLoading: loading.effects['teacher/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'teacher/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'teacher/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'teacher/modifyState', payload: { addVisible: false } });
    }
  }

  const updateOpts = {
    maskClosable: false,
    visible: teacher.updateVisible,
    title: `修改数据[${teacher.item.name}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: teacher.item,
    confirmLoading: loading.effects['teacher/addOrUpdate'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'teacher/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'teacher/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'teacher/modifyState', payload: { updateVisible: false } });
    }
  }

  const teaCountOpts = {
    maskClosable: false,
    visible: teacher.videoCountVisible,
    item: teacher.item,
    title: `为[${teacher.item.name}]配置视频播放次数`,
    countTree: teacher.countTree,
    onCancel: () => {
      dispatch({ type: 'teacher/modifyState', payload: { videoCountVisible: false } });
    },
    onOk: () => {
      dispatch({ type: 'teacher/modifyState', payload: { videoCountVisible: false } });
    },
    saveCount: (obj) => {
      //console.log(obj);
      dispatch({type: 'teacher/saveCount', payload:obj});
    }
  }

  const teaRoleOpts = {
    maskClosable: false,
    visible: teacher.authRoleVisible,
    item: teacher.item,
    roleList: teacher.roleList,
    ridList: teacher.ridList,
    title: `为[${teacher.item.name}]授权年级角色`,
    onCancel: () => {
      dispatch({ type: 'teacher/modifyState', payload: { authRoleVisible: false } });
    },
    onOk: () => {
      dispatch({ type: 'teacher/modifyState', payload: { authRoleVisible: false } });
    },
    saveAuth: (obj) => {
      // console.log(obj);
      dispatch({type: 'teacher/authRole', payload:obj});
    }
  }

  const teaGradeOpts = {
    maskClosable: false,
    visible: teacher.setGradeVisible,
    item: teacher.item,
    gradeList: teacher.gradeList,
    gradeIds: teacher.gradeIds,
    title: `为[${teacher.item.name}]设置年级`,
    onCancel: () => {
      dispatch({ type: 'teacher/modifyState', payload: { setGradeVisible: false } });
    },
    onOk: () => {
      dispatch({ type: 'teacher/modifyState', payload: { setGradeVisible: false } });
    },
    setGrade: (obj) => {
      // console.log(obj);
      dispatch({type: 'teacher/setGrade', payload:obj});
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 教师管理<b>（{teacher.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {teacher.addVisible && <AddModal {...addOpts}/>}
      {teacher.updateVisible && <UpdateModal {...updateOpts}/>}
      {teacher.videoCountVisible && <TeacherCountModal {...teaCountOpts}/>}
      {teacher.authRoleVisible && <TeacherRoleModal {...teaRoleOpts}/>}
      {teacher.setGradeVisible && <TeacherGradeModal {...teaGradeOpts}/>}
    </div>
  );
}

export default connect(({ loading, teacher }) => ({ loading, teacher }))(Teacher);
