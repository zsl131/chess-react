import React from 'react';
import {Form, Input, Modal, Select} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

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
        onOk(values);
      }
    });
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk
  }

  return(
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem {...formItemLayout} label="学校名称">
          {getFieldDecorator('name', {rules: [{required: true, message: '学校名称不能为空'}]})(<Input placeholder="输入学校名称"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="联系人">
          {getFieldDecorator('contacts', {rules: [{required: true, message: '学校联系人不能为空'}]})(<Input placeholder="输入学校联系人"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="联系电话">
          {getFieldDecorator('phone', {rules: [{required: true, message: '学校联系电话不能为空'}]})(<Input placeholder="输入学校联系电话"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="学校地址">
          {getFieldDecorator('address')(<Input placeholder="输入学校地址"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="状态">
          {getFieldDecorator('status', {rules: [{required: true, message: '请选择状态'}]})(
            <Select>
              <Option value="1">在合作</Option>
              <Option value="0">未合作</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator('remark')(<TextArea rows={4} placeholder="输入备注信息"/>)}
        </FormItem>
      </Form>
    </Modal>
  );
}

export default Form.create()(AddModal);
