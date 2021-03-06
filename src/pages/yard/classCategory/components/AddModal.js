import React from 'react';
import {Form, Input, InputNumber, Modal, Select} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

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
        if(!errors) {
          this.props.onOk(values);
        }
        // console.log("submit", errors, values);
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
          <FormItem {...formItemLayout} label="名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '名称不能为空'}]})(<Input placeholder="输入分类名称"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="序号">
            {getFieldDecorator('orderNo', {rules: [{required: true, message: '序号不能为空'}]})(<InputNumber placeholder="输入分类序号"/>)}
          </FormItem>
          {/*<FormItem {...formItemLayout} label="状态">
            {getFieldDecorator('status', {rules: [{required: true, message: '请选择分类状态'}]})(
              <Select>
                <Option value="1">使用</Option>
                <Option value="0">不使用</Option>
              </Select>
            )}
          </FormItem>*/}
        </Form>
      </Modal>
    );
  }
}
