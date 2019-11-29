import React from 'react';
import {connect} from 'dva';
import {Button,Icon} from 'antd';
import {routerRedux} from 'dva/router';
import Filter from '././components/Filter';
import List from '././components/List';
import AddModal from '././components/AddModal';
import UpdateModal from '././components/UpdateModal';

const Course = ({
  loading,
  dispatch,
  course,
  location,
}) => {
  const {query,pathname} = location;
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
    dataSource:course.datas,
    loading:loading.models.course,
    location,
    totalElements:course.totalElements,
    onDelConfirm:(id)=>{
      dispatch({type:'course/deleteObj',payload:id}).then(() => handleRefresh());
    },
    onUpdate:(id)=> {
      dispatch({type:'course/onUpdate',payload:id});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
  }
  const addOpts = {
    visible:course.addVisible,
    text:"添加课程",
    onCancel:()=> {
      dispatch({type:'course/modifyState',payload:{addVisible:false}});
    },
    onAdd:(values)=> {
      console.log(values);
      dispatch({type:'course/addOrUpdate',payload:values}).then(()=>handleRefresh());
    }
  }

  const updateOpts ={
    visible:course.updateVisible,
    text:"修改",
    course:course.item,
    onCancel:() => {
      dispatch({type:'course/modifyState',payload:{updateVisible:false}});
    },
    onUpdate:(values) => {
      console.log(values);
      dispatch({type:'course/addOrUpdate',payload:values}).then(() => {
        dispatch({type: 'course/modifyState', payload: {updateVisible: false}});
        handleRefresh();
        });
    }
  }
  const handle = () => {
    dispatch({type:'course/modifyState',payload:{addVisible:true}});
  }
  const filterOpts = {
    onFilter: (params) => {
      // console.log(params, JSON.stringify(params));
      handleRefresh({conditions: JSON.stringify(params)});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
  }
  return(
  <div>
    <div className="listHeader">
      <h3><Icon type="bars"/><b>选课管理（{course.totalElements}）</b></h3>
      <div className="listOperator"><Button type="primary" icon="plus" onClick={handle}>添加课程</Button></div>
    </div>
    <div className="listFilter">
      <Filter {...filterOpts}/>
    </div>
    <div className="listContent">
      <List {...listOpts}/>
    </div>
    <div>
      {course.addVisible && <AddModal {...addOpts}/>}
      {course.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  </div>
  );
}

export default connect(({course,loading}) =>({course,loading}))(Course);
