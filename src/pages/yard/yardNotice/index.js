import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';

const YardNotice = ({
  dispatch,
  loading,
  yardNotice,
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
      dispatch({ type: 'yardNotice/modifyState', payload: {addVisible: true}});
    }
  };

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  };

  const listOpts = {
    dataSource: yardNotice.datas,

    loading: loading.models.yardNotice,
    location,
    totalElement: yardNotice.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'yardNotice/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'yardNotice/onUpdate', payload: id });
    },
  };

  const addOpts = {
    visible: yardNotice.addVisible,
    title: "添加数据",
    confirmLoading: loading.effects['yardNotice/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'yardNotice/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'yardNotice/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'yardNotice/modifyState', payload: { addVisible: false } });
    }
  };

  const updateOpts = {
    visible: yardNotice.updateVisible,
    title: `修改公告`,
    item: yardNotice.item,
    confirmLoading: loading.effects['yardNotice/addOrUpdate'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'yardNotice/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'yardNotice/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'yardNotice/modifyState', payload: { updateVisible: false } });
    }
  };

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 科普公告管理<b>（{yardNotice.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {yardNotice.addVisible && <AddModal {...addOpts}/>}
      {yardNotice.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
};

export default connect(({ loading, yardNotice }) => ({ loading, yardNotice }))(YardNotice);
