import React from 'react';
import {connect} from 'dva';
import {Button, Card, Col, Form, Input, Row, Spin, Tabs, Alert} from 'antd';
import styles from './index.css';
import Helmet from 'react-helmet';
import PhoneLogin from './components/PhoneLogin';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

// @Form.create()
// export default class Login extends React.Component
const Login = ({
                 loading,
                 dispatch,
                 interceptor,
  login,
                 form: {
                   getFieldDecorator,
                   validateFieldsAndScroll,
                 },
               }) => {

  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      // console.log("handleOk", errors, values);
      if(!errors) {
        dispatch({ type: 'login/login', payload: values });
      }
    });
  }

  const onTabChange = (key) => {
    if(login.wxInterval) {clearInterval(login.wxInterval);}
    if(key==='wx') {
      dispatch({type: 'login/onQrScene'}).then(()=>{
        const interval = setInterval(()=> {
          const token = sessionStorage.getItem("wxLoginToken");
          if(token) {
            dispatch({type: 'login/wxLoginCheck', payload: token});
          }
        }, 1000);
        dispatch({type: 'login/modifyState', payload: {wxInterval: interval}});
      });
    }
  }

  const phoneOpts = {
    canInputCode: login.canInputCode,
    sendCodeSuc: login.sendCodeSuc,
    code: login.code,
    sendCode: (phone) => {
      dispatch({type:'login/sendCode', payload: phone});
    },
    loginByCode: () => {
      dispatch({type: 'login/loginByUsername', payload: {username:login.loginUsername, token: login.loginToken}});
    }
  }

  // const { getFieldDecorator } = this.props.form;
  return (
    <div>
      <Helmet><title>用户登陆</title></Helmet>
      <Row align="middle" justify="center" type="flex" className={styles.mainRow}>
        <Col xs={22} sm={16} md={12} lg={10} xl={8}>
          <Card bordered={false} className={styles.loginCard}>
            <h2 className={styles.title}>{interceptor.appConfig.appName} - LOGIN</h2>

            <Tabs defaultActiveKey="pwd" onChange={onTabChange}>
              <TabPane tab="用户登陆" key="pwd">
                <Form onSubmit={handleOk} className={styles.loginForm}>
                  <FormItem>
                    {getFieldDecorator('username', {rules:[{ required: true, message: '请输入用户名'}]})(<Input onPressEnter={handleOk} placeholder="用户名"/>)}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator("password", {rules:[{ required: true, message: '请输入密码'}]})(<Input onPressEnter={handleOk} type="password" placeholder="密码"/>)}
                  </FormItem>
                  <Row>
                    <Button className={styles.loginBtn} type="primary" onClick={handleOk} loading={loading.models.login}>登   陆</Button>
                  </Row>
                </Form>
              </TabPane>
              <TabPane tab="扫码登陆" key="wx">
                <div style={{"textAlign":"center"}}>
                  {(login.wxLogin && login.wxLogin.ticket)?
                    <div>
                      <img width={300}
                           src={`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${login.wxLogin.ticket}`}/>
                      {login.wxError==='1'?<Alert message={login.wxMessage} type="warning" showIcon/>:<Alert message={login.wxMessage} type="success" showIcon/>}
                    </div>:
                    <div style={{"padding":"30px 0px"}}><Spin size="large" /></div>
                  }
                </div>
              </TabPane>
              <TabPane tab="短信登陆" key="phone">
                <PhoneLogin {...phoneOpts}/>
              </TabPane>
            </Tabs>
            <Row className={styles.infoRow}>
              &copy; 2018-2020 Created By zsl
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

// export default Login;
export default connect(({ loading, interceptor,login }) => ({ loading, interceptor,login }))(Form.create()(Login))
