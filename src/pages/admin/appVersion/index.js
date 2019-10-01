import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import UpdateModal from './components/UpdateModal';
import AddModal from './components/AddModal';

const AppVersion = ({
                  dispatch,
                  loading,
                  appVersion,
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
      dispatch({ type: 'appVersion/modifyState', payload: {addVisible: true}});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: appVersion.data,
    loading: loading.models.appVersion,
    location,
    totalElement: appVersion.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'appVersion/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'appVersion/onUpdate', payload: id });
    },
    setField:(obj) => {
      // console.log(obj)
      dispatch({type: 'appVersion/updateField', payload: obj}).then(() => {handleRefresh()});
    }
  };

  const addOpts = {
    visible: appVersion.addVisible,
    title: "添加更新",
    okText:'确认提交',
    cancelText: '取消并关闭',
    maskClosable: false,
    confirmLoading: loading.effects['appVersion/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'appVersion/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'appVersion/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'appVersion/modifyState', payload: { addVisible: false } });
    }
  }

  const updateOpts = {
    maskClosable: false,
    visible: appVersion.updateVisible,
    title: `修改数据[${appVersion.item.version}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: appVersion.item,
    imgList: appVersion.imgList,
    confirmLoading: loading.effects['appVersion/reply'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'appVersion/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'appVersion/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'appVersion/modifyState', payload: { updateVisible: false } });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 移动端升级管理<b>（{appVersion.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {appVersion.updateVisible && <UpdateModal {...updateOpts}/>}
      {appVersion.addVisible && <AddModal {...addOpts}/>}
    </div>
  );
}

export default connect(({ loading, appVersion }) => ({ loading, appVersion }))(AppVersion);
