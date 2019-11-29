import React from 'react';
import {connect} from 'dva';
import {Button, Col, Icon, Popconfirm, Row} from 'antd';
import LeftTree from './components/LeftTree';
import List from './components/List';
import {routerRedux} from 'dva/router'
import UpdateModal from './components/UpdateModal';
import AddModal from './components/AddModal';

const ClassCategory = ({
  loading,
  classCategory,
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
    menuTree: classCategory.menuTree,
    onSelect: (key, title) => {
      let selectKey = key[0];
      if(!selectKey) {title = "根分类"; selectKey = 0;}
      handleRefresh({"pid": selectKey});
      // console.log(key[0]);
      dispatch({ type: 'classCategory/setState', payload: {pid: selectKey, pname: title} });
    }
  }

  const listOpts = {
    dataSource: classCategory.datas,
    rowKey: 'id',
    totalElements: classCategory.totalElements,
    loading: loading.models.classCategory,
    onUpdate: (item) => {
      dispatch({ type: 'classCategory/setState', payload: { item: item, updateVisible: true } });
    },
    onDelete: (id) => {
      dispatch({ type: "classCategory/deleteMenu", payload: id }).then(() => {handleRefresh()});
    }
  }

  const updateOpts = {
    visible: classCategory.updateVisible,
    title: `修改课程分类【${classCategory.item.name}】`,
    item: classCategory.item,
    onCancel:() => {
      dispatch({ type: 'classCategory/setState', payload: { updateVisible: false } });
    },
    onOk:(obj) => {
      // console.log("onOk::"+obj,"string::"+ JSON.stringify(obj));
      dispatch({ type: 'classCategory/update', payload: obj }).then(() => {
        dispatch({ type: 'classCategory/setState', payload: { updateVisible: false } });
        handleRefresh();
      });
    }
  }

  const addOpts = {
    visible: classCategory.addVisible,
    title: `添加课程分类到【${classCategory.pname}】`,
    pid: classCategory.pid,
    // pname: classCategory.pname,
    onCancel: () => {
      dispatch({ type: 'classCategory/setState', payload: { addVisible: false } });
    },
    onOk : (obj) => {
      dispatch({type:'classCategory/add', payload: obj}).then(() => {
        dispatch({ type: 'classCategory/setState', payload: { addVisible: false } });
        handleRefresh();
      });
    }
  }

  const handleAdd = () => {
    dispatch({ type: 'classCategory/setState', payload: { addVisible: true } });
  }

  return(
    <div style={{"height":"100%", "overflowY": 'hidden'}}>
      <Row style={{"height":"100%"}}>
        <Col span={5} style={{"height":"100%"}}>
          <LeftTree {...treeOpts}/>
        </Col>
        <Col span={19}>
          <div className="listHeader">
            <h3><Icon type="bars"/> 课程分类管理<b>（{classCategory.pname}：{classCategory.totalElements}）</b><span className="red">仅限2级分类</span></h3>
            <div className="listOperator">
                <Button type="primary" icon="plus" onClick={handleAdd}>添加课程分类</Button>
            </div>
          </div>
          <List {...listOpts}/>
          {classCategory.updateVisible && <UpdateModal {...updateOpts}/>}
          {classCategory.addVisible && <AddModal {...addOpts}/>}
        </Col>
      </Row>
    </div>
  );
}

export default connect(({loading, classCategory}) => ({loading, classCategory}))(ClassCategory);
