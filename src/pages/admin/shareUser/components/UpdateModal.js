import React from 'react';
import {Form, Input, Modal} from 'antd';
import {formItemLayout} from "../../../../utils/common";

const FormItem = Form.Item;

@Form.create()
export default class UpdateModal extends React.Component {

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.item);
  }

  render() {

    const { getFieldDecorator, validateFieldsAndScroll} = this.props.form;

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
         this.props.onOk(values);
        }
      });
    };

    return(
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="用户姓名">
            {getFieldDecorator('name', {rules: [{required: true, message: '用户姓名不能为空'}]})(<Input placeholder="输入用户姓名"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="手机号码">
            {getFieldDecorator('phone', {rules: [{required: true, message: '手机号码不能为空'}]})(<Input placeholder="输入手机号码"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
