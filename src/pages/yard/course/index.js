import React from 'react';
import {connect} from 'dva';
import {Col, Row} from 'antd';
import LeftTree from './components/LeftTree';
import {routerRedux} from 'dva/router'
import ListRootSystem from './components/ListRootSystem';
import ListDetail from './components/ListDetail';
import ShowDetail from './components/ShowDetail';

const ClassCourse = ({
  loading,
  classCourse,
  location,
  dispatch
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

  const treeOpts = {
    treeData: classCourse.treeData,
    onSelect: (key, title) => {
      let selectKey = key[0];
      if(!selectKey) {title = "根分类"; selectKey = 0;}
      handleRefresh({"pid": selectKey});
      // console.log(key[0]);
      dispatch({ type: 'classCourse/setState', payload: {pid: selectKey, pname: title} });
    }
  }

  const listOpts = {
    dataSource: classCourse.datas,
    rowKey: 'id',
    totalElements: classCourse.totalElements,
    loading: loading.models.classCourse,
    onUpdate: (item) => {
      dispatch({ type: 'classCourse/setState', payload: { item: item, updateVisible: true } });
    },
    onDelete: (id) => {
      dispatch({ type: "classCourse/deleteMenu", payload: id }).then(() => {handleRefresh()});
    }
  }

  const updateOpts = {
    visible: classCourse.updateVisible,
    title: `修改课程分类【${classCourse.item.name}】`,
    item: classCourse.item,
    onCancel:() => {
      dispatch({ type: 'classCourse/setState', payload: { updateVisible: false } });
    },
    onOk:(obj) => {
      // console.log("onOk::"+obj,"string::"+ JSON.stringify(obj));
      dispatch({ type: 'classCourse/update', payload: obj }).then(() => {
        dispatch({ type: 'classCourse/setState', payload: { updateVisible: false } });
        handleRefresh();
      });
    }
  }

  const addOpts = {
    visible: classCourse.addVisible,
    title: `添加课程分类到【${classCourse.pname}】`,
    pid: classCourse.pid,
    // pname: classCourse.pname,
    onCancel: () => {
      dispatch({ type: 'classCourse/setState', payload: { addVisible: false } });
    },
    onOk : (obj) => {
      dispatch({type:'classCourse/add', payload: obj}).then(() => {
        dispatch({ type: 'classCourse/setState', payload: { addVisible: false } });
        handleRefresh();
      });
    }
  }

  const handleAdd = () => {
    dispatch({ type: 'classCourse/setState', payload: { addVisible: true } });
  }

  const listRootOpts = {
    dataSource: classCourse.data,
    rowKey: 'id',
    system: classCourse.system,
    totalElements: classCourse.data.length,
    loading: loading.models.classCourse,
    onUpdate: (item) => {
      dispatch({ type: 'classCourse/setState', payload: { item: item, updateVisible: true } });
    },
    onDelete: (id) => {
      dispatch({ type: "classCourse/deleteMenu", payload: id }).then(() => {handleRefresh()});
    },
    addSystem: (obj) => {
      dispatch({ type: "classCourse/addSystem", payload: obj }).then(() => {handleRefresh()});
    },
    updateSystem: (obj)=> {
      dispatch({type: "classCourse/updateSystem", payload: obj }).then(()=>{handleRefresh()});
    }
  }

  const listDetailOpts = {
    dataSource: classCourse.data,
    rowKey: 'id',
    system: classCourse.system,
    totalElements: classCourse.data.length,
    loading: loading.models.classCourse,
    addDetail: (obj) => {
      dispatch({ type: "classCourse/addOrUpdateDetail", payload: obj }).then(() => {handleRefresh()});
    },
    updateDetail: (obj)=> {
      dispatch({type: "classCourse/addOrUpdateDetail", payload: obj }).then(()=>{handleRefresh()});
    }
  }

  const showDetailOpts = {
    detail: classCourse.obj,
    course: classCourse.course,
    ppt: classCourse.ppt,
    learn: classCourse.learn,
    video: classCourse.video,
    surplusCount: classCourse.surplusCount,
  }

  return(
    <div style={{"minHeight":"100%", "overflowY": 'hidden'}}>
      <Row style={{"minHeight":"100%"}}>
        <Col span={7} style={{"minHeight":"100%","borderRight": "1px #c8c8c8 solid"}}>
          <LeftTree {...treeOpts}/>
        </Col>
        <Col span={17} style={{"background":"#FFF"}}>
          {(classCourse.type == 'base' || classCourse.type=='root') && <ListRootSystem {...listRootOpts}/>}
          {classCourse.type=='child' && <ListDetail {...listDetailOpts}/>}
          {classCourse.type=='detail' && <ShowDetail {...showDetailOpts}/>}
        </Col>
      </Row>
    </div>
  );
}

export default connect(({loading, classCourse}) => ({loading, classCourse}))(ClassCourse);
