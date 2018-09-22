import React from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Button, Row, Col,Tabs } from 'antd';
import styles from './index.css';
import Helmet from 'react-helmet';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

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

  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      // console.log("handleOk", errors, values);
      if(!errors) {
        dispatch({ type: 'login/login', payload: values });
      }
    });
  }

  // const { getFieldDecorator } = this.props.form;
  return (
    <div>
      <Helmet><title>用户登陆</title></Helmet>
      <Row align="middle" gutter={{md:12}} justify="center" type="flex" className={styles.mainRow}>
        <Col xs={22} sm={16} md={12} lg={10} xl={8}>
          <Card bordered={false} className={styles.loginCard}>
            <h2 className={styles.title}>{interceptor.appConfig.appName} - LOGIN</h2>

            <Tabs defaultActiveKey="1">
              <TabPane tab="用户名密码登陆" key="1">
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
                  <Row className={styles.infoRow}>
                    &copy; 2018-2020 Created By zsl
                  </Row>
                </Form>
              </TabPane>
              <TabPane tab="微信扫码登陆" key="2">
                提示：正在开发…
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

// export default Login;
export default connect(({ loading, interceptor }) => ({ loading, interceptor }))(Form.create()(Login))
