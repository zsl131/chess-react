import React from 'react';
import {connect} from 'dva';
import Personal from './components/Personal';
import ListFunction from './components/ListFunction';
const WxAccountCenter = ({
  wxAccountCenter,
  dispatch,
}) => {

  const personalOpts = {
    canInputCode: wxAccountCenter.canInputCode,
    code: wxAccountCenter.code,
    loadCode:(phone) => {
      dispatch({type: 'wxAccountCenter/loadCode', payload: phone});
    },
    bindPhone: () => {
      dispatch({type: 'wxAccountCenter/bindPhone', payload: wxAccountCenter.phone}).then(()=>{window.location.reload();});
    },
    refreshAccount: ()=> {
      dispatch({type: 'wxAccountCenter/queryAccountByOpenid', payload: {}});
    }
  }

  return (
    <div>
      <Personal {...personalOpts}/>
      <ListFunction/>
    </div>
  );
}

export default connect(({ wxAccountCenter,loading }) => ({ wxAccountCenter, loading }))(WxAccountCenter);
