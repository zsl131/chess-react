import React from 'react';
import styles from './header.css'
import router from 'umi/router';
import {getLoginAccount} from '../../utils/loginAccountUtils';

export default class WxLoginAccount extends React.Component {

  state = {
    account:{}
  }

  UNSAFE_componentWillMount() {
    try {
      // const loginAccountStr = localStorage.getItem(configApi.accountSessionName);
      const loginAccountStr = getLoginAccount();
      // console.log("loginAccountStr::", loginAccountStr);
      const loginAccount = JSON.parse(loginAccountStr);
      // console.log(loginAccount);
      this.setState({account: loginAccount || {}});
    } catch (e) {
      console.log("出错啦：", e);
    }
  }

  render() {
    return (
      <div>
        <img src={this.state.account.avatarUrl} onClick={() => {router.push("/wx/wxAccount");}} className={styles.accountAvator} alt="A"/>
      </div>
    );
  }
}
