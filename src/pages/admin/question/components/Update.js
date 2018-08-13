import {Modal,Form,Input} from 'antd';
import React from 'react';

const FormItem = Form.Item;


@Form.create()
export default class Update extends React.Component {
  state = {
    question: this.props.question
  }
  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.state.question);
    console.log(this.props);
    setFieldsValue({"questionId": this.state.question.id});
    setFieldsValue({"questionContent": this.state.question.content});
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
          {getFieldDecorator("questionId")(<Input type="hidden"/>)}
          <FormItem >
            {getFieldDecorator("questionContent")(<Input type="hidden"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="请输入正确答案:">
            {getFieldDecorator("options", {rules: [{required: true, message: "请输入答案"}]})(<Input placeholder="输入答案"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
