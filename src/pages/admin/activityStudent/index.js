import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import {routerRedux} from 'dva/router'
import Filter from './components/Filter';
import router from 'umi/router';
import List from './components/List';
import UpdateModal from './components/UpdateModal';

const ActivityStudent = ({
dispatch,
loading,
activityStudent,
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
    onFilter: (type, params) => {
      if(type==='filter') {
        handleRefresh({conditions: JSON.stringify(params)});
      } else if(type==='download') {
        //console.log("======", params)
        //router.push("/api/download/student");
        const p = buildDownloadParams(params);
        //console.log(p);
        // router.push("/api/download/student"+p);
        const w=window.open('about:blank');
        w.location.href="/api/download/student"+p
      } else if(type==='cal') {
        const w=window.open('about:blank');
        w.location.href="/api/download/countRecord"
      }
    }
  }

  const buildDownloadParams = (params) => {
    let res = "";
    for(let p in params) {
      const v = params[p];
      if(v && v!='*') {
        res += (res.startsWith("?") ? "&" : "?") + p + "=" + (encodeURI(v));
      }
    }
    return res;
  }

  const listOpts = {
    dataSource: activityStudent.datas,
    loading: loading.models.activityStudent,
    location,
    totalElement: activityStudent.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'activityStudent/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdateStatus:(id, status) => {
      dispatch({type: 'activityStudent/onUpdateStatus', payload: {id: id, status: status}}).then(()=>handleRefresh());
    },
    onVerify: (id, status, reason) => {
      // console.log("id::"+id+",,status::"+status, reason);
      dispatch({type: 'activityStudent/onUpdateStatus', payload: {id: id, status: status, reason: reason}}).then(()=>handleRefresh());
    },
    onPay: (id, flag) => {
      console.log("id::"+id+",,flag::"+flag);
      dispatch({type: 'activityStudent/onUpdatePayFlag', payload: {id: id, flag: flag}}).then(()=>handleRefresh());
    }
  };

  const updateOpts = {
    visible: activityStudent.updateVisible,
    title: `修改数据`,
    okText:'确认提交',
    item: activityStudent.item,
    confirmLoading: loading.effects['activityStudent/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'activityStudent/update', payload: datas }).then(() => {
        handleRefresh();
      });
    },
    onCancel: () => {
      dispatch({ type: 'activityStudent/modifyState', payload: { updateVisible: false } });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 报名管理<b>（{activityStudent.totalElements}）</b></h3>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {activityStudent.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, activityStudent }) => ({ loading, activityStudent }))(ActivityStudent);
