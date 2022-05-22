import React from 'react';
import { connect } from 'dva';
import {Icon, message} from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import {getLoginUser} from "../../../utils/authUtils";

const ShareUser = ({
  dispatch,
  loading,
  shareUser,
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

  const operatorOpts = {
    onAdd: () => {
      dispatch({ type: 'shareUser/modifyState', payload: {addVisible: true}});
    }
  };

  const filterOpts = {
    onFilter: (type, params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  };

  const listOpts = {
    dataSource: shareUser.datas,
    loading: loading.models.shareUser,
    location,
    totalElement: shareUser.totalElements,
    onDelConfirm: (obj) => {
      dispatch({ type: 'shareUser/deleteObj', payload: obj.id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (obj) => {
      dispatch({ type: 'shareUser/onUpdate', payload: obj.id });
    },
    showContent: (obj)=> {
      //console.log(obj)
      dispatch({ type: 'shareUser/modifyState', payload: {showVisible: true, item:obj} });
    }
  };

  const addOpts = {
    visible: shareUser.addVisible,
    title: "添加推广用户",
    maskClosable: false,
    okText:'确认提交',
    cancelText: '取消并关闭',
    confirmLoading: loading.effects['shareUser/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'shareUser/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'shareUser/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'shareUser/modifyState', payload: { addVisible: false } });
    }
  };

  const updateOpts = {
    visible: shareUser.updateVisible,
    title: `修改数据[${shareUser.item.name}]`,
    okText:'确认提交',
    cancelText: '取消',
    maskClosable: false,
    item: shareUser.item,
    confirmLoading: loading.effects['shareUser/addOrUpdate'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'shareUser/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'shareUser/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'shareUser/modifyState', payload: { updateVisible: false } });
    }
  };

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 推广用户管理<b>（{shareUser.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {shareUser.addVisible && <AddModal {...addOpts}/>}
      {shareUser.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, shareUser }) => ({ loading, shareUser }))(ShareUser);
