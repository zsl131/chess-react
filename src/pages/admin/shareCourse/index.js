import React from 'react';
import { connect } from 'dva';
import {Icon, message} from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import {getLoginUser} from "../../../utils/authUtils";
import ShowModal from "./components/ShowModal";

const ShareCourse = ({
  dispatch,
  loading,
  shareCourse,
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
      dispatch({ type: 'shareCourse/modifyState', payload: {addVisible: true}});
    }
  };

  const filterOpts = {
    onFilter: (type, params) => {
      ///console.log(params)
      if(type==='filter') {
        handleRefresh({conditions: JSON.stringify(params)});
      } else {
        //console.log("======", params)
        //router.push("/api/download/student");
        const p = buildDownloadParams(params);
        //console.log(p);
        // router.push("/api/download/student"+p);
        const w=window.open('about:blank');
        w.location.href="/api/download/shareCourse"+p
      }
    }
  };

  const buildDownloadParams = (params) => {
    let res = "";
    for(let p in params) {
      const v = params[p];
      if(v && v!=='*') {
        res += (res.startsWith("?") ? "&" : "?") + p + "=" + (encodeURI(v));
      }
    }
    return res;
  }

  const user = getLoginUser();

  const listOpts = {
    dataSource: shareCourse.datas,
    loading: loading.models.shareCourse,
    location,
    totalElement: shareCourse.totalElements,
    onDelConfirm: (obj) => {
      if(obj.authorId!==user.id) {
        message.error("不是你添加的，你没有权限删除")
      } else {
        dispatch({ type: 'shareCourse/deleteObj', payload: obj.id }).then(() => {handleRefresh()});
      }
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (obj) => {
      // console.log("update::", id);
      //console.log(obj)
      if(obj.authorId!==user.id) {
        message.error("不是你添加的，你没有权限修改")
      } else {
        dispatch({ type: 'shareCourse/onUpdate', payload: obj.id });
      }
    },
    showContent: (obj)=> {
      //console.log(obj)
      dispatch({ type: 'shareCourse/modifyState', payload: {showVisible: true, item:obj} });
    }
  };

  const addOpts = {
    visible: shareCourse.addVisible,
    title: "添加推广课程",
    maskClosable: false,
    okText:'确认提交',
    cancelText: '取消并关闭',
    confirmLoading: loading.effects['shareCourse/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'shareCourse/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'shareCourse/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'shareCourse/modifyState', payload: { addVisible: false } });
    }
  };

  const updateOpts = {
    visible: shareCourse.updateVisible,
    title: `修改数据[${shareCourse.item.title}]`,
    okText:'确认提交',
    cancelText: '取消',
    maskClosable: false,
    item: shareCourse.item,
    confirmLoading: loading.effects['shareCourse/addOrUpdate'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'shareCourse/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'shareCourse/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'shareCourse/modifyState', payload: { updateVisible: false } });
    }
  };

  const showOpts = {
    visible: shareCourse.showVisible,
    title: `内容展示[${shareCourse.item.title}]`,
    maskClosable: false,
    item: shareCourse.item,
    onOk() {
      dispatch({ type: 'shareCourse/modifyState', payload: { showVisible: false } });
    },
    onCancel: () => {
      dispatch({ type: 'shareCourse/modifyState', payload: { showVisible: false } });
    }
  };

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 推广课程管理<b>（{shareCourse.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {shareCourse.addVisible && <AddModal {...addOpts}/>}
      {shareCourse.updateVisible && <UpdateModal {...updateOpts}/>}
      {shareCourse.showVisible && <ShowModal {...showOpts}/>}
    </div>
  );
}

export default connect(({ loading, shareCourse }) => ({ loading, shareCourse }))(ShareCourse);
