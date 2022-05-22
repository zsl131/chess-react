import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Show from "./components/Show";
import QrModal from "./components/QrModal";

const Activity = ({
  activity,
  loading,
  dispatch,
  location,
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
      dispatch({ type: 'activity/onAdd' });
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      // console.log(params, JSON.stringify(params));
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: activity.datas,
    loading: loading.models.activity,
    location,
    totalElement: activity.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'activity/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'activity/onUpdate', payload: id });
    },
    onShow: (id) => {
      dispatch({ type: 'activity/onShow', payload: id });
    },
    showShareQr: (obj) => {
      obj.qrType = "Activity";
      dispatch({ type: 'activity/showShareQr', payload: obj });
    }
  }

  const addOpts = {
    visible: activity.addVisible,
    title: "添加活动",
    okText:'确认提交',
    cancelText: '取消并关闭',
    maskClosable: false,
    depList: activity.depList,
    confirmLoading: loading.effects['activity/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'activity/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'activity/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'activity/modifyState', payload: { addVisible: false } });
    }
  }

  const updateOpts = {
    visible: activity.updateVisible,
    title: `修改活动[${activity.item.title}]`,
    okText:'确认提交',
    item: activity.item,
    maskClosable: false,
    confirmLoading: loading.effects['activity/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'activity/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'activity/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'activity/modifyState', payload: { updateVisible: false } });
    }
  }

  const showOpts = {
    item: activity.item,
    visible: activity.showVisible,
    title: `活动详情：${activity.item.title}`,
    footer: false,
    onCancel: () => {
      dispatch({ type: 'activity/modifyState', payload: { showVisible: false } });
    }
  };

  const qrOpts = {
    visible: activity.qrVisible,
    qrList: activity.qrList,
    record: activity.item,
    maskClosable: false,
    title: "推荐码",
    onCancel:() => {
      dispatch({type: 'activity/modifyState', payload: {qrVisible: false}});
    },
    onOk: (obj) => {
      dispatch({type: 'activity/modifyState', payload: {qrVisible: false}});
    },
    buildQr: () => {
      // console.log(activity.item)
      let obj = activity.item;
      obj.qrType = "Activity";
      dispatch({type: 'activity/buildQr', payload: obj});
    },
  };

  return (
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 活动内容管理<b>（{activity.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List key="0" {...listOpts} />
      </div>
      {activity.addVisible && <AddModal {...addOpts}/>}
      {activity.updateVisible && <UpdateModal {...updateOpts}/>}
      {activity.showVisible && <Show {...showOpts}/>}
      {activity.qrVisible && <QrModal {...qrOpts}/>}
    </div>
  );
}

export default connect(({ activity, loading }) => ({ activity, loading }))(Activity);
