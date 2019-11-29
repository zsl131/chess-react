import React from 'react';
import {connect} from 'dva';
import {Button, Card, Form, Icon, Input, Switch} from 'antd';
import {routerRedux} from 'dva/router';

import styles from './index.css';

const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
class AppRemark extends React.Component {

  state = {
    item: this.props.appRemark.item,
  }

  componentDidMount() {
    const { setFieldsValue } = this.props.form;
    // console.log("didMount::", this.props.wxConfig.item);
    // setFieldsValue(this.state.item || {});
    // console.log(this.props.wxConfig.item);
    setFieldsValue(this.props.appRemark.item);
  }

  render() {

    const { query, pathname } = this.props.location;

    const handleRefresh = (newQuery) => {
      this.props.dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          ...newQuery,
        },
      }));
    }

    const {validateFieldsAndScroll, getFieldDecorator} = this.props.form;

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

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
          values.status = values.status?"1":"0";
          this.props.dispatch({ type: 'appRemark/addOrUpdate', payload: values }).then(()=>{handleRefresh()});
        }
      });
    }

    return (
      <div>
        <div className="listHeader">
          <h3><Icon type="edit"/> 移动端说明管理</h3>
        </div>
        <div className={styles.mainContainer}>
          <Card>
            <Form onSubmit={handleOk} layout="horizontal" loading={this.props.loading.models.appRemark}>
              {getFieldDecorator("id")(<Input type="hidden"/>)}
              <FormItem {...formItemLayout} label="名称">
                {getFieldDecorator('title', {rules: [{required: true, message: '名称不能为空'}]})(<Input placeholder="输入名称"/>)}
              </FormItem>

              <FormItem {...formItemLayout} label="内容">
                {getFieldDecorator('remark', {rules: [{required: true, message: '内容不能为空'}]})(<TextArea rows={6} placeholder="输入内容"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="启用">
                {getFieldDecorator("status")(<Switch checkedChildren={<Icon type="check"/>} defaultChecked={this.state.item && this.state.item.status=="1"} unCheckedChildren={<Icon type="cross" />}/>)}
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

export default connect(({ appRemark, loading }) => ({ appRemark, loading }))(AppRemark);
