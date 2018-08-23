import {Modal,Input,Form} from 'antd';
import React from 'react';

const FormItem = Form.Item;
@Form.create()

export default class extends React.Component {
  state = {
    course:this.props.course
  }
  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.state.course);
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
        <Form>
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="请输入课程类型">
            {getFieldDecorator("category",{rules:[{required:true,message:"请输入科目类型"}]})(<Input placeholder="输入类型"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="请输入选项">
            {getFieldDecorator("options",{rules:[{required:true,message:"请输入选项"}]})(<Input palceholder="输入选项"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  };
}
