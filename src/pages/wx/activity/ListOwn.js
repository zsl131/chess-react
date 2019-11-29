import React from 'react';
import {connect} from 'dva';
import {Helmet} from 'react-helmet';
import ListOwnActivity from './components/ListOwnActivity';

const ListOwn = ({
                        wxActivity,
                        dispatch
                      }) => {

  const opts = {
    refreshing: wxActivity.refreshing,
    dataSource: wxActivity.recordList,
    onRefresh: () => {
      dispatch({type: 'wxActivity/listFeedback', payload: {page : wxActivity.curPage + 1}});
    },
    cleanData:() => {
      dispatch({type: 'wxActivity/modifyState', payload: {recordList:[]}})
    },
    onDeleteApply:(id) => {
      dispatch({type: 'wxActivity/onDeleteApply', payload: id});
    }
  }

  return (
    <div>
      <Helmet><title>我的活动</title></Helmet>
      {wxActivity.recordList && <ListOwnActivity {...opts}/>}
    </div>
  );
}

export default connect(({wxActivity}) => ({wxActivity}))(ListOwn);
