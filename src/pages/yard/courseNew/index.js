import React from 'react';
import {connect} from 'dva';
import {Button, Col, Icon, Popconfirm, Row} from 'antd';
import LeftTree from './components/LeftTree';
import {routerRedux} from 'dva/router'
import ListRootCategory from './components/ListRootCategory';
import ListCourse from './components/ListCourse';
import ShowCourse from './components/ShowCourse';

const CourseNew = ({
  loading,
  courseNew,
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
    treeData: courseNew.treeData,
    onSelect: (key, title) => {
      let selectKey = key[0];
      if(!selectKey) {title = "根分类"; selectKey = 0;}
      handleRefresh({"pid": selectKey});
      // console.log(key[0]);
      dispatch({ type: 'courseNew/setState', payload: {pid: selectKey, pname: title} });
    }
  }

  const listOpts = {
    dataSource: courseNew.datas,
    rowKey: 'id',
    totalElements: courseNew.totalElements,
    loading: loading.models.courseNew,
    onUpdate: (item) => {
      dispatch({ type: 'courseNew/setState', payload: { item: item, updateVisible: true } });
    },
    onDelete: (id) => {
      dispatch({ type: "courseNew/deleteMenu", payload: id }).then(() => {handleRefresh()});
    }
  }

  const updateOpts = {
    visible: courseNew.updateVisible,
    title: `修改课程分类【${courseNew.item.name}】`,
    item: courseNew.item,
    onCancel:() => {
      dispatch({ type: 'courseNew/setState', payload: { updateVisible: false } });
    },
    onOk:(obj) => {
      // console.log("onOk::"+obj,"string::"+ JSON.stringify(obj));
      dispatch({ type: 'courseNew/update', payload: obj }).then(() => {
        dispatch({ type: 'courseNew/setState', payload: { updateVisible: false } });
        handleRefresh();
      });
    }
  }

  const addOpts = {
    visible: courseNew.addVisible,
    title: `添加课程分类到【${courseNew.pname}】`,
    pid: courseNew.pid,
    // pname: courseNew.pname,
    onCancel: () => {
      dispatch({ type: 'courseNew/setState', payload: { addVisible: false } });
    },
    onOk : (obj) => {
      dispatch({type:'courseNew/add', payload: obj}).then(() => {
        dispatch({ type: 'courseNew/setState', payload: { addVisible: false } });
        handleRefresh();
      });
    }
  }

  const handleAdd = () => {
    dispatch({ type: 'courseNew/setState', payload: { addVisible: true } });
  }

  const listRootOpts = {
    dataSource: courseNew.data,
    rowKey: 'id',
    category: courseNew.category,
    totalElements: courseNew.data.length,
    loading: loading.models.courseNew,
    onUpdate: (item) => {
      dispatch({ type: 'courseNew/setState', payload: { item: item, updateVisible: true } });
    },
    onDelete: (id) => {
      dispatch({ type: "courseNew/deleteMenu", payload: id }).then(() => {handleRefresh()});
    },
    addCategory: (obj) => {
      dispatch({ type: "courseNew/addCategory", payload: obj }).then(() => {handleRefresh()});
    },
    updateCategory: (obj)=> {
      dispatch({type: "courseNew/updateCategory", payload: obj }).then(()=>{handleRefresh()});
    }
  }

  const listCourseOpts = {
    dataSource: courseNew.data,
    rowKey: 'id',
    category: courseNew.category,
    totalElements: courseNew.data.length,
    loading: loading.models.courseNew,
    addCourse: (obj) => {
      dispatch({ type: "courseNew/addOrUpdateCourse", payload: obj }).then(() => {handleRefresh()});
    },
    updateCourse: (obj)=> {
      dispatch({type: "courseNew/addOrUpdateCourse", payload: obj }).then(()=>{handleRefresh()});
    },
    setShowTest: (record) => {
      dispatch({type: "courseNew/setShowTest", payload: {id: record.id, showTest: record.showTest==="1"?"0":"1"}}).then(()=>{handleRefresh()});
    }
  }

  const showCourseOpts = {
    course: courseNew.obj,
    ppt: courseNew.ppt,
    learn: courseNew.learn,
    video: courseNew.video,
  }

  return(
    <div style={{"minHeight":"100%", "overflowY": 'hidden'}}>
      <Row style={{"minHeight":"100%"}}>
        <Col span={7} style={{"minHeight":"100%","borderRight": "1px #c8c8c8 solid"}}>
          <LeftTree {...treeOpts}/>
        </Col>
        <Col span={17} style={{"background":"#FFF"}}>
          {(courseNew.type == 'base' || courseNew.type=='root') && <ListRootCategory {...listRootOpts}/>}
          {courseNew.type=='child' && <ListCourse {...listCourseOpts}/>}
          {courseNew.type=='course' && <ShowCourse {...showCourseOpts}/>}
        </Col>
      </Row>
    </div>
  );
}

export default connect(({loading, courseNew}) => ({loading, courseNew}))(CourseNew);
