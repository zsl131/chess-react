import React from 'react';
import styles from './header.css';
import { NavBar, Icon } from 'antd-mobile';
import WxLoginAccount from './WxLoginAccount';

export default class WxNormalHeader extends React.Component {



  render() {
    return (

      <NavBar
        mode="dark"
        leftContent={[<Icon key="2" type="left"/>]}
        onLeftClick={()=>window.history.back()}
        className={styles.templateNavBar}
        rightContent={[
          <WxLoginAccount key="0" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ]}
      >
        <div className={styles.headerContent}>
          <img src={require("../../assets/wx-logo.png")} className={styles.wxLogo} alt="LOGO"/>
        </div>
      </NavBar>
    );
  }
}
