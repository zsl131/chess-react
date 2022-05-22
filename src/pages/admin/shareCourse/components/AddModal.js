import React from 'react';
import {Form, Input, Modal} from 'antd';
import {getLoginUser} from "../../../../utils/authUtils";

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const AddModal = ({
  onOk,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
  ...modalProps
}) => {

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 3 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 21 },
    },
  };

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
    <Modal {...modalOpts} style={{"minWidth":"80%", "top":"20px"}}>
      <Form layout="horizontal">
        <FormItem {...formItemLayout} label="视频标题">
          {getFieldDecorator('title', {rules: [{required: true, message: '视频标题不能为空'}]})(<Input placeholder="输入视频标题"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="引导问题">
          {getFieldDecorator('guide', {rules: [{required: true, message: '引导问题不能为空'}]})(<Input placeholder="输入引导问题"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="引导问题">
          {getFieldDecorator('content', {rules: [{required: true, message: '内容不能为空'}]})(<TextArea rows={8} placeholder="内容部份">&nbsp;</TextArea>)}
        </FormItem>
      </Form>
    </Modal>
  );
}

export default Form.create()(AddModal);
