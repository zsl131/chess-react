import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import {routerRedux} from 'dva/router'
import Filter from './components/Filter';
import List from './components/List';
import UpdateModal from './components/UpdateModal';

const ActivityComment = ({
dispatch,
loading,
activityComment,
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

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: activityComment.datas,
    loading: loading.models.activityComment,
    location,
    totalElement: activityComment.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'activityComment/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'activityComment/onUpdate', payload: id });
    },
    onUpdateStatus:(id, status) => {
      dispatch({type: 'activityComment/onUpdateStatus', payload: {id: id, status: status}}).then(()=>handleRefresh());
    }
  }

  const updateOpts = {
    visible: activityComment.updateVisible,
    title: `修改数据`,
    okText:'确认提交',
    item: activityComment.item,
    confirmLoading: loading.effects['activityComment/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'activityComment/update', payload: datas }).then(() => {
        handleRefresh();
      });
    },
    onCancel: () => {
      dispatch({ type: 'activityComment/modifyState', payload: { updateVisible: false } });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 活动评论管理<b>（{activityComment.totalElements}）</b></h3>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {activityComment.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, activityComment }) => ({ loading, activityComment }))(ActivityComment);
