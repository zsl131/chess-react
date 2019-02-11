import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';

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
    </div>
  );
}

export default connect(({ loading, teacher }) => ({ loading, teacher }))(Teacher);
