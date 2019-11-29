import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';

const AppVideo = ({
                  dispatch,
                  loading,
                  appVideo,
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
    msg: '添加科普视频',
    onAdd: () => {
      dispatch({ type: 'appVideo/onAdd', payload: {}});
    },
  };

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  };

  const listOpts = {
    dataSource: appVideo.data,
    loading: loading.models.appVideo,
    location,
    totalElement: appVideo.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'appVideo/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    updateProperty: (id, field, value) => {
      dispatch({type: 'appVideo/updateProperty', payload: {id: id, field: field, value: value}}).then(() => {handleRefresh()});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'appVideo/onUpdate', payload: id });
    },
  };

  const addOpts = {
    maskClosable: false,
    visible: appVideo.addVisible,
    title: "添加科普视频",
    confirmLoading: loading.effects['appVideo/addOrUpdate'],
    onOk: (datas) => {
      dispatch({ type: 'appVideo/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'appVideo/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'appVideo/modifyState', payload: { addVisible: false } });
    }
  };

  const updateOpts = {
    maskClosable: false,
    visible: appVideo.updateVisible,
    title: `修改数据[${appVideo.item.title}]`,
    item: appVideo.item,
    cateList: appVideo.categoryList,
    confirmLoading: loading.effects['appVideo/addOrUpdate'],
    onOk:(datas) => {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'appVideo/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'appVideo/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'appVideo/modifyState', payload: { updateVisible: false } });
    }
  };

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 科普视频管理<b>（{appVideo.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {appVideo.addVisible && <AddModal {...addOpts}/>}
      {appVideo.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, appVideo }) => ({ loading, appVideo }))(AppVideo);
