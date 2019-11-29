import React from 'react';
import {Form, Input, Modal, Select} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const AddModal = ({
  onOk,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
  ageList,
  schoolList,
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

  const checkPhone = (rule, value, callback)=> {
    if(!value || value.replace(/\s/g, '').length < 11) {
      callback("请认真输入手机号码");
    } else {
      callback();
    }
  }

  const handlePhone = (e) => {
    const value = parseInt(e.target.value);
    e.target.value = isNaN(value) ? "":value;
  }

  return(
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('name', {rules: [{required: true, message: '姓名不能为空'}]})(<Input placeholder="输入姓名"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="手机号码">
          {getFieldDecorator('phone', {rules: [{required: true, message: '手机号码不能为空'}, {validator: checkPhone}]})(<Input type="phone" onKeyUp={handlePhone} maxLength={11} placeholder="输入家长手机号码"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="性别">
          {getFieldDecorator('sex', {rules: [{required: true, message: '请选择性别'}]})(
            <Select>
              <Option value="1">男</Option>
              <Option value="2">女</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="年龄段">
          {getFieldDecorator('ageId', {rules: [{required: true, message: '请选择年龄段'}]})(
            <Select>
              {ageList.map((item)=>(<Option value={item.id} key={item.id}>{item.name}</Option>))}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="就读学校">
          {getFieldDecorator('schoolId', {rules: [{required: true, message: '请选择就读学校'}]})(
            <Select>
              {schoolList.map((item)=>(<Option value={item.id} key={item.id}>{item.name}</Option>))}
            </Select>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
}

export default Form.create()(AddModal);
