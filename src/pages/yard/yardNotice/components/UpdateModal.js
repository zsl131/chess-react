import React from 'react';
import {Form, Input, Modal, Radio, Tooltip} from 'antd';

const FormItem = Form.Item;

@Form.create()
export default class UpdateModal extends React.Component {


  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    const item = this.props.item;
    setFieldsValue(item);
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
      });
    };

    return(
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="公告内容">
            {getFieldDecorator('content', {rules: [{required: true, message: '公告内容不能为空'}]})(<Input placeholder="输入公告内容"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="序号">
            {getFieldDecorator('orderNo', {rules: [{required: true, message: '序号不能为空'}]})(<Input type="number" placeholder="输入序号"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="显示状态">
            <Tooltip title="设置是否在前台显示">
              {getFieldDecorator('status', {rules: [{required: true, message: '请选择显示状态'}]})(
                <Radio.Group>
                  <Radio value="1">前台显示</Radio>
                  <Radio value="0">不显示</Radio>
                </Radio.Group>
              )}
            </Tooltip>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
