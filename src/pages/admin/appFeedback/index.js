import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import UpdateModal from './components/UpdateModal';

const AppFeedback = ({
                  dispatch,
                  loading,
                  appFeedback,
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
      dispatch({ type: 'appFeedback/modifyState', payload: {addVisible: true}});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: appFeedback.data,
    loading: loading.models.appFeedback,
    location,
    totalElement: appFeedback.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'appFeedback/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'appFeedback/onUpdate', payload: id });
    },
    handleImport:(appFeedback) => {
      console.log(appFeedback)
      dispatch({type: 'appFeedback/modifyState', payload: {item: appFeedback, importVisible: true}});
    }
  }

  const updateOpts = {
    maskClosable: false,
    visible: appFeedback.updateVisible,
    title: `修改数据[${appFeedback.item.teaName}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: appFeedback.item,
    imgList: appFeedback.imgList,
    confirmLoading: loading.effects['appFeedback/reply'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'appFeedback/reply', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'appFeedback/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'appFeedback/modifyState', payload: { updateVisible: false } });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 移动端评论管理<b>（{appFeedback.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {appFeedback.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, appFeedback }) => ({ loading, appFeedback }))(AppFeedback);
