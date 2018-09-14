import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import PlayVideoModal from './components/PlayVideoModal';
import ShowPDFModal from './components/ShowPDFModal';

const ClassCourse = ({
                  dispatch,
                  loading,
                  classCourse,
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
    msg:'添加课程',
    onAdd: () => {
      dispatch({ type: 'classCourse/modifyState', payload: {addVisible: true}});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: classCourse.data,
    loading: loading.models.classCourse,
    location,
    totalElement: classCourse.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'classCourse/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'classCourse/onUpdate', payload: id });
    },
    handlePlayVideo:(record) => {
      dispatch({type: 'classCourse/onPlayVideo', payload: record.videoId})
    },
    handleShowPDF:(objId) => {
      dispatch({type: 'classCourse/onShowPDF', payload: objId})
    }
  }

  const addOpts = {
    maskClosable: false,
    visible: classCourse.addVisible,
    title: "添加课程",
    okText:'确认提交',
    cancelText: '取消并关闭',
    confirmLoading: loading.effects['classCourse/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'classCourse/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'classCourse/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'classCourse/modifyState', payload: { addVisible: false } });
    }
  }

  const updateOpts = {
    maskClosable: false,
    visible: classCourse.updateVisible,
    title: `修改数据[${classCourse.item.title}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: classCourse.item,
    confirmLoading: loading.effects['classCourse/addOrUpdate'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'classCourse/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'classCourse/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'classCourse/modifyState', payload: { updateVisible: false } });
    }
  }

  const playVideoOpts = {
    maskClosable: false,
    visible: classCourse.playVideoVisible,
    title: `播放视频`,
    okText:'关闭窗口',
    cancelText: '取消',
    video: classCourse.video,
    onOk:()=> {
      dispatch({ type: 'classCourse/modifyState', payload: { playVideoVisible: false } });
    },
    onCancel: () => {
      dispatch({ type: 'classCourse/modifyState', payload: { playVideoVisible: false } });
    }
  }

  const showPDFOpts = {
    maskClosable: false,
    visible: classCourse.showPDFVisible,
    title: `PDF预览`,
    okText:'关闭窗口',
    cancelText: '取消',
    pdf: classCourse.pdf,
    onOk:()=> {
      dispatch({ type: 'classCourse/modifyState', payload: { showPDFVisible: false } });
    },
    onCancel: () => {
      dispatch({ type: 'classCourse/modifyState', payload: { showPDFVisible: false } });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 课程管理<b>（{classCourse.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {classCourse.addVisible && <AddModal {...addOpts}/>}
      {classCourse.updateVisible && <UpdateModal {...updateOpts}/>}
      {classCourse.playVideoVisible && <PlayVideoModal {...playVideoOpts}/>}
      {classCourse.showPDFVisible && <ShowPDFModal {...showPDFOpts}/>}
    </div>
  );
}

export default connect(({ loading, classCourse }) => ({ loading, classCourse }))(ClassCourse);
