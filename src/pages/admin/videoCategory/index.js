import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import {routerRedux} from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';

const VideoCategory = ({
  dispatch,
  loading,
  videoCategory,
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
      dispatch({ type: 'videoCategory/modifyState', payload: {addVisible: true}});
    }
  };

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  };

  const listOpts = {
    dataSource: videoCategory.data,
    loading: loading.models.videoCategory,
    location,
    totalElement: videoCategory.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'videoCategory/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'videoCategory/onUpdate', payload: id });
    },
  };

  const addOpts = {
    visible: videoCategory.addVisible,
    title: "添加视频分类",
    confirmLoading: loading.effects['videoCategory/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'videoCategory/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'videoCategory/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'videoCategory/modifyState', payload: { addVisible: false } });
    }
  };

  const updateOpts = {
    visible: videoCategory.updateVisible,
    title: `修改数据[${videoCategory.item.name}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: videoCategory.item,
    confirmLoading: loading.effects['videoCategory/addOrUpdate'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'videoCategory/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'videoCategory/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'videoCategory/modifyState', payload: { updateVisible: false } });
    }
  };

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 视频资源分类管理<b>（{videoCategory.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {videoCategory.addVisible && <AddModal {...addOpts}/>}
      {videoCategory.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, videoCategory }) => ({ loading, videoCategory }))(VideoCategory);
