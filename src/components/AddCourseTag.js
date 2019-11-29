import React from 'react';
import {Form, Input, Modal} from "antd";

const FormItem = Form.Item;

/**
 * 此组件用于发表评论
 * 所有参数：
 * objId：被评论的对象Id
 * onOk: 当评论被提交时的回调函数
 */
@Form.create()
export default class AddCourseTag extends React.Component {

  state = {
  }

  render() {

    const { validateFieldsAndScroll, getFieldDecorator } = this.props.form;

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
          this.props.onOk(values);
        }
      });
    }

    const modalOpts = {
      ...this.props,
      title: "添加标签",
      onOk: handleOk
    }

    return (
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <FormItem {...formItemLayout} label="名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '名称不能为空'}]})(<Input placeholder="输入标签名称"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
