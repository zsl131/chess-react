import {Modal,Form,Input} from 'antd';
import React from 'react';

const FormItem = Form.Item;


@Form.create()
export default class UpdateModal extends React.Component {
  state = {
    question: this.props.question
  }
  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.state.question);
    console.log(this.props);
    console.log(this.props.question);
  }
  render() {
    const {getFieldDecorator,validateFields} = this.props.form;
    const handleOk = (e) => {
      e.preventDefault();
      validateFields((errors, values) => {
        console.log(errors, values);
        if (!errors) {
          this.props.onUpdate(values);
        }
      });
    }
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
    return (
      <Modal {...this.props} onOk={handleOk}>
        <Form >
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="题目内容">
            {getFieldDecorator("content", {rules: [{required: true, message: "请输入题目内容"}]})(<Input placeholder="输入内容"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="答案A:">
            {getFieldDecorator("a", {rules: [{required: true, message: "输入A答案"}]})(<Input placeholder="输入答案"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="答案B:">
            {getFieldDecorator("b", {rules: [{required: true, message: "输入B答案"}]})(<Input placeholder="输入答案"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="答案C:">
            {getFieldDecorator("c", {rules: [{required: true, message: "输入C答案"}]})(<Input placeholder="输入答案"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="答案D:">
            {getFieldDecorator("d", {rules: [{required: true, message: "输入D答案"}]})(<Input placeholder="输入答案"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
