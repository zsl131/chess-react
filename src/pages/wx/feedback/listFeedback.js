import React from 'react';
import {connect} from 'dva';

import Feedbacks from './components/Feedbacks';

const WxFeedback = ({
  wxFeedback,
  dispatch,
}) => {


  const feedbackOpts = {
    refreshing: wxFeedback.refreshing,
    dataSource: wxFeedback.data,
    onRefresh: () => {
      dispatch({type: 'wxFeedback/listFeedback', payload: {page : wxFeedback.curPage + 1}});
    },
    cleanData:() => {
      dispatch({type: 'wxFeedback/modifyState', payload: {data:[]}})
    }
  }

  return (
    <div>
      <Feedbacks {...feedbackOpts}/>
    </div>
  );
}

export default connect(({ wxFeedback,loading }) => ({ wxFeedback, loading }))(WxFeedback);
