import React from 'react';
import {Form, Input, Modal} from 'antd';
import {getLoginUser} from "../../../../utils/authUtils";
import {formItemLayout} from "../../../../utils/common";

const FormItem = Form.Item;

const AddModal = ({
  onOk,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
  ...modalProps
}) => {

  const handleOk = (e) => {
    e.preventDefault();

    validateFieldsAndScroll((errors, values) => {
      if(!errors) {
        const user = getLoginUser();
        // console.log(user)
        values.authorName=user.nickname;
        values.authorUsername = user.username;
        values.authorId = user.id;
        onOk(values);
      }
    });
  };

  const modalOpts = {
    ...modalProps,
    onOk: handleOk
  };

  return(
    <Modal {...modalOpts} >
      <Form layout="horizontal">
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

export default Form.create()(AddModal);
