import React from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Button, Row } from 'antd';
import styles from './index.css';

const FormItem = Form.Item;

// @Form.create()
// export default class Login extends React.Component
const Login = ({
                 loading,
                 dispatch,
                 interceptor,
                 form: {
                   getFieldDecorator,
                   validateFieldsAndScroll,
                 },
               }) => {

  //console.log("Login", loading);

  // console.log("loginAppConfig::"+interceptor.appConfig, "loginWxConfig::"+interceptor.wxConfig+"---interceptor:"+interceptor);

  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      console.log("handleOk", errors, values);
      if(!errors) {
        dispatch({ type: 'login/login', payload: values });
      }
    });
  }

  // const { getFieldDecorator } = this.props.form;
  return (
    <div>
      <Card bordered={false} className={styles.loginCard}>
        <h2 className={styles.title}>{interceptor.appConfig.appName} - LOGIN</h2>
        <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
          <FormItem>
            {getFieldDecorator('username', {rules:[{ required: true, message: '请输入用户名'}]})(<Input onPressEnter={handleOk} placeholder="用户名"/>)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {rules:[{ required: true, message: '请输入密码'}]})(<Input onPressEnter={handleOk} type="password" placeholder="密码"/>)}
          </FormItem>
          <Row>
            <Button className={styles.loginBtn} type="primary" onClick={handleOk} loading={loading.models.login}>登   陆</Button>
          </Row>
          <Row className={styles.infoRow}>
            &copy; 2018 Created By zsl
          </Row>
        </Form>
      </Card>
    </div>
  );
}

// export default Login;
export default connect(({ loading, interceptor }) => ({ loading, interceptor }))(Form.create()(Login))
