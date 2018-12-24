import React from 'react';
import {Form, Input, Modal,InputNumber} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
export default class AddModal extends React.Component {

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue({pid:this.props.pid});
  }

  render() {

    const { getFieldDecorator, validateFieldsAndScroll} = this.props.form;

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
          this.props.onOk(values);
        }
      });
    }

    const modalOpts = {
      ...this.props,
      onOk: handleOk
    }

    return(
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          {getFieldDecorator("pid")(<input type="hidden"/>)}
          <FormItem {...formItemLayout} label="体系名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '体系名称不能为空'}]})(<Input placeholder="输入体系名称"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="序号">
            {getFieldDecorator('orderNo', {rules: [{required: true, message: '序号不能为空'}]})(<InputNumber placeholder="输入序号"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="备注">
            {getFieldDecorator('remark')(<TextArea rows={4} placeholder="输入备注信息"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
