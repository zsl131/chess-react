import React from 'react';
import {connect} from 'dva';
import {Button, Col, Icon, Popconfirm, Row} from 'antd';
import LeftTree from './components/LeftTree';
import {routerRedux} from 'dva/router'
import ListRootSystem from './components/ListRootSystem';
import ListDetail from './components/ListDetail';
import ShowDetail from './components/ShowDetail';

const ClassSystem = ({
  loading,
  classSystem,
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
    treeData: classSystem.treeData,
    onSelect: (key, title) => {
      let selectKey = key[0];
      if(!selectKey) {title = "根分类"; selectKey = 0;}
      handleRefresh({"pid": selectKey});
      // console.log(key[0]);
      dispatch({ type: 'classSystem/setState', payload: {pid: selectKey, pname: title} });
    }
  }

  const listOpts = {
    dataSource: classSystem.datas,
    rowKey: 'id',
    totalElements: classSystem.totalElements,
    loading: loading.models.classSystem,
    onUpdate: (item) => {
      dispatch({ type: 'classSystem/setState', payload: { item: item, updateVisible: true } });
    },
    onDelete: (id) => {
      dispatch({ type: "classSystem/deleteMenu", payload: id }).then(() => {handleRefresh()});
    }
  }

  const updateOpts = {
    visible: classSystem.updateVisible,
    title: `修改课程分类【${classSystem.item.name}】`,
    item: classSystem.item,
    onCancel:() => {
      dispatch({ type: 'classSystem/setState', payload: { updateVisible: false } });
    },
    onOk:(obj) => {
      // console.log("onOk::"+obj,"string::"+ JSON.stringify(obj));
      dispatch({ type: 'classSystem/update', payload: obj }).then(() => {
        dispatch({ type: 'classSystem/setState', payload: { updateVisible: false } });
        handleRefresh();
      });
    }
  }

  const addOpts = {
    visible: classSystem.addVisible,
    title: `添加课程分类到【${classSystem.pname}】`,
    pid: classSystem.pid,
    // pname: classSystem.pname,
    onCancel: () => {
      dispatch({ type: 'classSystem/setState', payload: { addVisible: false } });
    },
    onOk : (obj) => {
      dispatch({type:'classSystem/add', payload: obj}).then(() => {
        dispatch({ type: 'classSystem/setState', payload: { addVisible: false } });
        handleRefresh();
      });
    }
  }

  const handleAdd = () => {
    dispatch({ type: 'classSystem/setState', payload: { addVisible: true } });
  }

  const listRootOpts = {
    dataSource: classSystem.data,
    rowKey: 'id',
    system: classSystem.system,
    totalElements: classSystem.data.length,
    loading: loading.models.classSystem,
    onUpdate: (item) => {
      dispatch({ type: 'classSystem/setState', payload: { item: item, updateVisible: true } });
    },
    deleteSystem: (obj) => {
      // console.log(obj);
      dispatch({ type: "classSystem/deleteSystem", payload: obj.id }).then(() => {handleRefresh()});
    },
    addSystem: (obj) => {
      dispatch({ type: "classSystem/addSystem", payload: obj }).then(() => {handleRefresh()});
    },
    updateSystem: (obj)=> {
      dispatch({type: "classSystem/updateSystem", payload: obj }).then(()=>{handleRefresh()});
    },
  };

  const listDetailOpts = {
    dataSource: classSystem.data,
    rowKey: 'id',
    system: classSystem.system,
    totalElements: classSystem.data.length,
    loading: loading.models.classSystem,
    addDetail: (obj) => {
      dispatch({ type: "classSystem/addOrUpdateDetail", payload: obj }).then(() => {handleRefresh()});
    },
    updateDetail: (obj)=> {
      dispatch({type: "classSystem/addOrUpdateDetail", payload: obj }).then(()=>{handleRefresh()});
    },
    deleteSystem: (obj)=> {
      // console.log(obj);
      dispatch({ type: "classSystem/deleteSystemDetail", payload: obj.id }).then(() => {handleRefresh()});
    }
  };

  const showDetailOpts = {
    detail: classSystem.obj,
    course: classSystem.course,
    ppt: classSystem.ppt,
    learn: classSystem.learn,
    video: classSystem.video,
  }

  return(
    <div style={{"minHeight":"100%", "overflowY": 'hidden'}}>
      <Row style={{"minHeight":"100%"}}>
        <Col span={7} style={{"minHeight":"100%","borderRight": "1px #c8c8c8 solid"}}>
          <LeftTree {...treeOpts}/>
        </Col>
        <Col span={17} style={{"background":"#FFF"}}>
          {(classSystem.type == 'base' || classSystem.type=='root') && <ListRootSystem {...listRootOpts}/>}
          {classSystem.type=='child' && <ListDetail {...listDetailOpts}/>}
          {classSystem.type=='detail' && <ShowDetail {...showDetailOpts}/>}
        </Col>
      </Row>
    </div>
  );
}

export default connect(({loading, classSystem}) => ({loading, classSystem}))(ClassSystem);
