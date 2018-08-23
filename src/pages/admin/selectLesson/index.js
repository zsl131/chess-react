import React from 'react';
import {Icon} from 'antd';
import List from './components/List'
import Operator from './components/Operator';
import AddModal from './components/AddModal';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
const SelectLesson=({
  loading,
  location,
  selectLesson,
  dispatch,
})=>{
  const {query,pathname} = location;
  const handleRefresh=(newQuery)=>{
    dispatch(routerRedux.push({
      pathname,
      query:{
        ...query,
        ...newQuery,
      }
    }))
  }
  const operatorOpts={
    onAdd:()=>{
      dispatch({type:'selectLesson/modifyState',payload:{addVisible:true}});
    }
  }
  const listOpts={
    dataSource:selectLesson.datas,
  }
  const addOpts ={
    visible:selectLesson.addVisible,
    title:'增加课程',
    onCancel:()=>{
      dispatch({type:'selectLesson',payload:{addVisible:false}});
    },
    onAdd:(values)=>{
      dispatch({type:'selectLesson/addOrUpdate',payload:values}).then(()=>{
        handleRefresh();
      });
    }
  }
  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/>选课管理<b>({selectLesson.totalElements})</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts}/>
      </div>
      {selectLesson.addVisible&&<AddModal {...addOpts}/>}
    </div>
  );
}
export default connect(({loading,selectLesson})=>({loading,selectLesson}))(SelectLesson);
