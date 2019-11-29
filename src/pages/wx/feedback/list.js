import React from 'react';
import {connect} from 'dva';
import List from './components/List';
import { routerRedux } from 'dva/router'
import ReplyModal from './components/ReplyModal'

const WxFeedback = ({
  wxFeedback,
  dispatch,
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

  const listOpts = {
    refreshing: wxFeedback.refreshing,
    dataSource: wxFeedback.data,
    totalPage: wxFeedback.totalPage,
    // query: this.props.query
    location: location,
    dispatch: dispatch,
    onReply:(obj) => {
      //console.log(obj);
      dispatch({type: 'wxFeedback/modifyState', payload: {replyVisible:true, item: obj}});
    }
  }

  const replyOpts = {
    visible: wxFeedback.replyVisible,
    item: wxFeedback.item,
    title: '回复反馈',
    okText: '确定回复',
    cancelText: '取消',
    maskClosable:false,
    onCancel: () => {
      dispatch({type: 'wxFeedback/modifyState', payload: {replyVisible:false}});
    },
    onOk: (values) => {
      dispatch({ type: 'wxFeedback/onReply', payload: values }).then(()=>{
        dispatch({ type: 'wxFeedback/modifyState', payload: {replyVisible: false} });
        handleRefresh();
      });
    }
  }

  return (
    <div>
      <List {...listOpts}/>
      {wxFeedback.replyVisible && <ReplyModal {...replyOpts}/>}
    </div>
  );
}

export default connect(({ wxFeedback,loading }) => ({ wxFeedback, loading }))(WxFeedback);
