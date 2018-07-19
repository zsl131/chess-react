import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import SetUserModal from './components/SetUserModal';

const Department = ({
  dispatch,
  loading,
  department,
  location
}) => {

  location.query = queryString.parse(location.search)

  const { query, pathname } = location;

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }));
  }

  const operatorOpts = {
    onAdd: () => {
      dispatch({ type: 'department/modifyState', payload: {addVisible: true}});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: department.datas,
    loading: loading.models.department,
    location,
    totalElement: department.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'department/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'department/onUpdate', payload: id });
    },
    onMatchUser: (obj) => {
      // console.log(obj);
      dispatch({ type: 'department/onSetUser', payload: obj });
    },
  }

  const addOpts = {
    visible: department.addVisible,
    title: "添加部门",
    okText:'确认提交',
    cancelText: '取消并关闭',
    confirmLoading: loading.effects['department/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'department/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'department/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'department/modifyState', payload: { addVisible: false } });
    }
  }

  const updateOpts = {
    visible: department.updateVisible,
    title: `修改角色[${department.item.name}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: department.item,
    confirmLoading: loading.effects['department/addOrUpdate'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'department/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
    }
  }

  const setUserOpts = {
    visible: department.setUserVisible,
    title: `为部门【${department.item.name}】设置管理用户`,
    footer: false,
    userList: department.userList,
    userIds: department.userIds,
    onCancel: () => {
      dispatch({ type: 'department/modifyState', payload: { setUserVisible: false } });
    },
    onChange: (obj) =>  {
      // console.log("setUserOpts:", obj);
      dispatch({ type: 'department/setAuthUser', payload: { userId: obj.objId, depId: department.item.id } });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 用户管理<b>（{department.totalElements}）</b></h3>
        {/*<div className="listOperator"><Button type="primary" icon="plus">添加用户</Button></div>*/}
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        {/*<Table dataSource={users.datas} columns={columns} loading={loading.models.users} rowKey="id"/>*/}
        <List {...listOpts} />
      </div>
      {department.addVisible && <AddModal {...addOpts}/>}
      {department.updateVisible && <UpdateModal {...updateOpts}/>}
      {department.setUserVisible && <SetUserModal {...setUserOpts}/>}
    </div>
  );
}

export default connect(({ loading, department }) => ({ loading, department }))(Department);
