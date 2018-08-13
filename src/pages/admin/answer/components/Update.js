import React from 'react';
import {Modal,Form,Input} from 'antd';

const FormItem = Form.Item;

@Form.create()

export default class Update extends React.Component {
  state = {
    answer: this.props.answer
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.answer);
    console.log(this.props);
    console.log(this.props.answer);
  }
  render() {
    const {getFieldDecorator,validateFields} = this.props.form;
    const handOk=(e) => {
      e.preventDefault();
      validateFields((errors,values) => {
        console.log(errors,values);
        if(!errors) {
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
      <Modal {...this.props} onOk={handOk}>
        <Form>
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="请输入正确答案">
            {getFieldDecorator("options",{rules:[{required:true,message:"请输入答案"}]})(<Input placeholder="修改答案"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
