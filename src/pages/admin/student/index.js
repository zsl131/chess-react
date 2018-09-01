import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import {routerRedux} from 'dva/router'
import Filter from './components/Filter';
import List from './components/List';
import Operator from "./components/Operator";
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';

const Student = ({
  dispatch,
  loading,
  student,
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

  const filterOpts = {
    ageList: student.ageList,
    schoolList: student.schoolList,
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: student.datas,
    loading: loading.models.student,
    location,
    totalElement: student.totalElements,
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onDelConfirm: (id)=> {
      dispatch({type: "student/deleteObj", payload: id}).then(()=>handleRefresh());
    },
    onUpdate: (id) => {
      // console.log(id);
      dispatch({type: "student/loadObj", payload: id}).then(()=> {
        dispatch({type: "student/modifyState", payload: {updateVisible: true}});
      });
    }
  }

  const operatorOpts = {
    onAdd: () => {
      dispatch({ type: 'student/modifyState', payload: {addVisible: true}});
    }
  }

  const addOpts = {
    visible: student.addVisible,
    title: "添加学生",
    ageList: student.ageList,
    schoolList: student.schoolList,
    onCancel: () => {dispatch({type: "student/modifyState", payload: {addVisible: false}});},
    onOk: (values) => {
      // console.log(values);
      dispatch({type: "student/addStudent", payload: values}).then(() => {
        dispatch({type: "student/modifyState", payload: {addVisible: false}});
        handleRefresh();
      });
    }
  };

  const updateOpts = {
    visible: student.updateVisible,
    title: "修改学生【" + student.item.name + "】",
    ageList: student.ageList,
    item: student.item,
    schoolList: student.schoolList,
    onCancel: () => {dispatch({type: "student/modifyState", payload: {updateVisible: false}});},
    onOk: (values) => {
      // console.log(values);
      dispatch({type: "student/updateObj", payload: values}).then(() => {
        dispatch({type: "student/modifyState", payload: {updateVisible: false}});
        handleRefresh();
      });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 学生管理<b>（{student.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {student.addVisible && <AddModal {...addOpts}/>}
      {student.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, student }) => ({ loading, student }))(Student);
