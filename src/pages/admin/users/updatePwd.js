import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Card, Button } from 'antd';
import styles from './index.css';

const FormItem = Form.Item;

@Form.create()
class UpdatePwd extends React.Component {

  UNSAFE_componentWillMount() {
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
    this.setState({
      loginUser: loginUser
    })
  }

  componentDidMount() {
    const { setFieldsValue } = this.props.form;
    setFieldsValue(this.state.loginUser);
    setFieldsValue({password:''});
  }

  render() {

    const {getFieldValue, validateFieldsAndScroll, getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
      },
    };

    const checkPassword = (rule, value, callback) => {
      //console.log("checkPassword", value);
      if(value && (value.length>25 || value.length<4)) {
        callback("密码长度应为：4~25");
      } else {
        callback();
      }
    }

    const checkConfirmPwd = (rule, value, callback) => {
      if(value && value !== getFieldValue('password')) {
        callback("两次密码输入不一致");
      } else {
        callback();
      }
    }

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
          this.props.dispatch({ type: 'userPwd/updatePwd', payload: values });
        }
      });
    }

    return (
      <div>
        <div className="listHeader">
          <h3><Icon type="edit"/> 修改密码</h3>
        </div>
        <div className={styles.mainContainer}>
          <Card>
            <Form onSubmit={handleOk} layout="horizontal">
              {getFieldDecorator("id")(<Input type="hidden"/>)}
              <FormItem {...formItemLayout} label="用户名">
                <span className={styles.nickname}>{this.state.loginUser.username}</span>
              </FormItem>

              <FormItem {...formItemLayout} label="用户昵称">
                {getFieldDecorator('nickname', {rules: [{required: true, message: '用户昵称不能为空'}]})(<Input placeholder="输入用户昵称"/>)}
              </FormItem>

              <FormItem {...formItemLayout} label="原始密码">
                {getFieldDecorator('oldPwd', {rules: [{required: true, message: '请输入原始密码'}, {validator: checkPassword}]})(<Input type="password" placeholder="输入原始密码"/>)}
              </FormItem>

              <FormItem {...formItemLayout} label="登陆密码">
                {getFieldDecorator('password', {rules: [{required: true, message: '请输入密码'}, {validator: checkPassword}]})(<Input type="password" placeholder="输入密码"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="重复密码">
                {getFieldDecorator("confirmPwd", {rules: [{required: true, message: '请再次输入密码'}, {validator: checkConfirmPwd}]})(<Input type="password" placeholder="再次输入密码"/>)}
              </FormItem>
              <FormItem className={styles.submitOper}>
                <Button className={styles.submitBtn} htmlType="submit" type="primary" icon="check">提交保存</Button>
              </FormItem>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(({ userPwd }) => ({ userPwd }))(UpdatePwd);
