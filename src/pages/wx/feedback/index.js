import React from 'react';
import {connect} from 'dva';

const WxFeedback = ({
  wxFeedback,
  dispatch,
}) => {

  return (
    <div>
      ---
    </div>
  );
}

export default connect(({ wxFeedback,loading }) => ({ wxFeedback, loading }))(WxFeedback);
