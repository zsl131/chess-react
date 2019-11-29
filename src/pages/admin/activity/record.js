import React from 'react';
import {Icon} from 'antd';
import {connect} from 'dva';
import {routerRedux} from 'dva/router'

import ListRecord from './components/ListRecord';
import RecordOperator from './components/RecordOperator';
import AddRecordModal from './components/AddRecordModal';
import UpdateRecordModal from './components/UpdateRecordModal';

import Show from "./components/Show";

const Record = ({
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

  const listOpts = {
    dataSource: activity.recordList,
    loading: loading.effects['activity/activityRecord'],
    totalElement: activity.recordList.length,
    onDelConfirm: (id) => {
      dispatch({ type: 'activity/deleteRecord', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'activity/onUpdateRecord', payload: id });
    },
    onShow: (id) => {
      // console.log("id:::", id);
      dispatch({ type: 'activity/onShow', payload: id });
    }
  }

  const operatorOpts = {
    onAdd: () => {
      dispatch({ type: 'activity/modifyState', payload: {addRecordVisible: true} });
    }
  }

  const onShow = (id) => {
    dispatch({ type: 'activity/onShow', payload: id });
  }

  const showOpts = {
    item: activity.item,
    visible: activity.showVisible,
    title: `活动详情：${activity.item.title}`,
    footer: false,
    onCancel: () => {
      dispatch({ type: 'activity/modifyState', payload: { showVisible: false } });
    }
  }

  const addRecordOpts = {
    visible: activity.addRecordVisible,
    activity: activity.item,
    title: '发布活动',
    onCancel:() => {
      dispatch({type: 'activity/modifyState', payload: {addRecordVisible: false}});
    },
    onOk: (obj) => {
      // console.log("--->", obj);
      dispatch({type: 'activity/addOrUpdateRecord', payload: obj}).then(()=>{
        dispatch({type: 'activity/modifyState', payload: {addRecordVisible: false}});
        handleRefresh();
      });
    }
  }

  const updateRecordOpts = {
    visible: activity.updateRecordVisible,
    record: activity.recordItem,
    title: '修改活动',
    onCancel:() => {
      dispatch({type: 'activity/modifyState', payload: {updateRecordVisible: false}});
    },
    onOk: (obj) => {
      obj.status = obj.status?"1":"2";
      dispatch({type: 'activity/addOrUpdateRecord', payload: obj}).then(()=>{
        dispatch({type: 'activity/modifyState', payload: {updateRecordVisible: false}});
        handleRefresh();
      });
    }
  }

  return (
    <div>
      { (activity.item && activity.item.hasOwnProperty("id"))  ?
        <div>
          <div className="listHeader">
            <h3><Icon type="bars"/> 活动开展记录<b>（{activity.recordList.length}）</b>
              <a href="###" onClick={() => {
                onShow(activity.item.id)
              }}>{activity.item.title}</a>
            </h3>

            <RecordOperator {...operatorOpts}/>
          </div>

          <ListRecord {...listOpts}/>

          {activity.showVisible && <Show {...showOpts}/>}
          {activity.addRecordVisible && <AddRecordModal {...addRecordOpts}/>}
          {activity.updateRecordVisible && <UpdateRecordModal {...updateRecordOpts}/>}
        </div>:
        <h2 className="red" style={{"textAlign":"center"}}>没有权限访问！</h2>
      }
    </div>
  );
}

export default connect(({activity, loading})=>({activity, loading}))(Record);
