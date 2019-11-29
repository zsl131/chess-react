import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';

const SchoolDic = ({
  dispatch,
  loading,
 schoolDic,
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
      dispatch({ type: 'schoolDic/modifyState', payload: {addVisible: true}});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: schoolDic.datas,

    loading: loading.models.schoolDic,
    location,
    totalElement: schoolDic.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'schoolDic/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'schoolDic/onUpdate', payload: id });
    },
  }

  const addOpts = {
    visible: schoolDic.addVisible,
    title: "添加学校数据",
    okText:'确认提交',
    cancelText: '取消并关闭',
    confirmLoading: loading.effects['schoolDic/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'schoolDic/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'schoolDic/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'schoolDic/modifyState', payload: { addVisible: false } });
    }
  }

  const updateOpts = {
    visible: schoolDic.updateVisible,
    title: `修改数据[${schoolDic.item.name}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: schoolDic.item,
    confirmLoading: loading.effects['schoolDic/addOrUpdate'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'schoolDic/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'schoolDic/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'schoolDic/modifyState', payload: { updateVisible: false } });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 学校数据字典管理<b>（{schoolDic.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {schoolDic.addVisible && <AddModal {...addOpts}/>}
      {schoolDic.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, schoolDic }) => ({ loading, schoolDic }))(SchoolDic);
