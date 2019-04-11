import React from 'react';
import {getLoginAccount2Obj} from "../../../../utils/loginAccountUtils";
import styles from './personal.css';
import {Button,Modal,List,InputItem,Toast} from 'antd-mobile';

export default class Personal extends React.Component {

  state = {
    bindPhoneVisible: false,
    hasError: false,
    value:'',
    canGetCode:false,
    btnName:'获取验证码',
    timer:null,
    hasCodeError: false
  }

  onClose =()=> {
    this.setState({bindPhoneVisible: false});
  }

  onBindPhone = () => {
    this.setState({bindPhoneVisible: true});
  }

  onErrorClick = () => {
    if (this.state.hasError) {
      Toast.info('输入11位手机号码');
    }
  }
  onCodeErrorClick = () => {
    if (this.state.hasCodeError) {
      Toast.info('短信验证码不正确');
    }
  }
  onChange = (value) => {
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({
        hasError: true,
      });
    } else {
      this.setState({
        hasError: false, canGetCode: true
      });
    }
    this.setState({
      value,
    });
  }

  onChangeCode = (value) => {
    if(value!=this.props.code) {
      this.setState({hasCodeError: true})
    } else {
      this.setState({hasCodeError: false});
      this.props.bindPhone();
    }
  }

  onLoadCode = () => {
    if(!this.state.hasError && this.state.value) {
      const phone = this.state.value.replace(/\s+/g,""); //去空格
      this.props.loadCode(phone);
      let second = 60;
      const that = this;
      const timer = setInterval(() => {
        that.setState({btnName: second+"s后重试"});
        if(second<=0) {
          that.setState({canGetCode:true, btnName: "重获验证码", timer: null});
          clearInterval(timer);
        }
        second--;
      }, 1000)
      this.setState({timer: timer, canGetCode: false});
    } else {
      Toast.fail("请先输入手机号码");
    }
  }

  render() {
    const loginAccount = getLoginAccount2Obj();
    return (
      <div className={styles.mainDiv}>
        <img src={loginAccount.avatarUrl} className={styles.headimg}/>
        <div className={styles.content}>
          <span className={styles.nickname}>{loginAccount.nickname}</span>
          <span className={styles.phone}>{loginAccount.bindPhone==='1'?<b>手机号码：{loginAccount.phone}</b>:<Button size="small" type="ghost" onClick={this.onBindPhone} inline>马上绑定手机号码</Button>}</span>
        </div>
        <Button onClick={this.props.refreshAccount} className={styles.refreshBtn} type="primary" inline size="small">刷新权限</Button>

        <Modal
          popup
          visible={this.state.bindPhoneVisible}
          animationType="slide-up"
        >
          <List renderHeader={() => <div>绑定手机号码</div>} className="popup-list">
              <InputItem
                type="phone"
                placeholder="输入手机号码"
                error={this.state.hasError}
                onErrorClick={this.onErrorClick}
                onChange={this.onChange}
                value={this.state.value}
              >手机号码</InputItem>

            <InputItem
              type="number"
              placeholder="输入短信验证码"
              error={this.state.hasCodeError}
              onErrorClick={this.onCodeErrorClick}
              onChange={this.onChangeCode}
              maxLength={4}
              disabled={!this.props.canInputCode}
              extra={<Button size="small" inline onClick={this.onLoadCode} disabled={!this.state.canGetCode}>{this.state.btnName}</Button>}
              /*extra={this.state.btnName}*/
              /*onExtraClick={this.onLoadCode}*/
            >验证码</InputItem>
            <List.Item>
              <Button size="small" onClick={this.onClose}>取消绑定</Button>
            </List.Item>
          </List>
        </Modal>
      </div>
    );
  }
}
