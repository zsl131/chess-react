import React from 'react';
import {Form, Switch, Input, Modal, Icon} from 'antd';

const FormItem = Form.Item;

const AddModal = ({
  onOk,
  form: {
    getFieldDecorator,
    getFieldValue,
    validateFieldsAndScroll,
  },
  ...modalProps
}) => {

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
      // console.log(values)
      if(!errors) {
        values.status = values.status?"1":"0";
        onOk(values);
      }
      // console.log("submit", errors, values);
    });
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk
  }

  return(
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem {...formItemLayout} label="名称">
          {getFieldDecorator('name', {rules: [{required: true, message: '名称不能为空'}]})(<Input placeholder="输入名称"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="跳转地址">
          {getFieldDecorator('url', {rules: [{required: true, message: '跳转地址不能为空'}]})(<Input placeholder="输入地址，http:// 开头"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="是否启用">
          {getFieldDecorator("status")(<Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross" />}/>)}
        </FormItem>
      </Form>
    </Modal>
  );
}

export default Form.create()(AddModal);
