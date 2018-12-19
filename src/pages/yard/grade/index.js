import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';

const Grade = ({
  dispatch,
  loading,
 grade,
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
    onAdd: () => {
      dispatch({ type: 'grade/modifyState', payload: {addVisible: true}});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: grade.datas,

    loading: loading.models.grade,
    location,
    totalElement: grade.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'grade/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'grade/onUpdate', payload: id });
    },
  }

  const addOpts = {
    visible: grade.addVisible,
    title: "添加年级数据",
    confirmLoading: loading.effects['grade/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'grade/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'grade/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'grade/modifyState', payload: { addVisible: false } });
    }
  }

  const updateOpts = {
    visible: grade.updateVisible,
    title: `修改年级[${grade.item.name}]`,
    item: grade.item,
    confirmLoading: loading.effects['grade/addOrUpdate'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'grade/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'grade/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'grade/modifyState', payload: { updateVisible: false } });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 年级管理<b>（{grade.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {grade.addVisible && <AddModal {...addOpts}/>}
      {grade.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, grade }) => ({ loading, grade }))(Grade);
