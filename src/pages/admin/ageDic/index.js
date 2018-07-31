import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';

const AgeDic = ({
  dispatch,
  loading,
  ageDic,
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
      dispatch({ type: 'ageDic/modifyState', payload: {addVisible: true}});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: ageDic.datas,
    loading: loading.models.ageDic,
    location,
    totalElement: ageDic.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'ageDic/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'ageDic/onUpdate', payload: id });
    },
  }

  const addOpts = {
    visible: ageDic.addVisible,
    title: "添加年龄数据",
    okText:'确认提交',
    cancelText: '取消并关闭',
    confirmLoading: loading.effects['ageDic/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'ageDic/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'ageDic/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'ageDic/modifyState', payload: { addVisible: false } });
    }
  }

  const updateOpts = {
    visible: ageDic.updateVisible,
    title: `修改数据[${ageDic.item.name}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: ageDic.item,
    confirmLoading: loading.effects['ageDic/addOrUpdate'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'ageDic/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'ageDic/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'ageDic/modifyState', payload: { updateVisible: false } });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 年龄数据字典管理<b>（{ageDic.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {ageDic.addVisible && <AddModal {...addOpts}/>}
      {ageDic.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, ageDic }) => ({ loading, ageDic }))(AgeDic);
