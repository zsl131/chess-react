import React from 'react';
import {connect} from 'dva';
import {Helmet} from 'react-helmet';
import MyTabs from "./components/MyTabs";

const ListOwn = ({
                   wxCourse,
                   dispatch
                 }) => {

  const opts = {
    refreshing: wxCourse.refreshing,
    dataSource: wxCourse.recordList,
    onRefresh: () => {
      dispatch({type: 'wxCourse/listFeedback', payload: {page : wxCourse.curPage + 1}});
    },
    cleanData:() => {
      dispatch({type: 'wxCourse/modifyState', payload: {recordList:[]}})
    },
    onDeleteApply:(id) => {
      dispatch({type: 'wxCourse/onDeleteApply', payload: id});
    }
  }

  const tabOpts = {
    dataSource: wxCourse.dtoList
  }

  return (
    <div>
      <Helmet><title>我的课程</title></Helmet>
      <MyTabs {...tabOpts}/>
    </div>
  );
}

export default connect(({wxCourse}) => ({wxCourse}))(ListOwn);
