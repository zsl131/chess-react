import React from 'react';
import {Form, Input, Modal, Select} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

const AddModal = ({
  onOk,
  schoolList,
  form: {
    getFieldDecorator,
    setFieldsValue,
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

  const handleSchChange = (value, opt) => {
    setFieldsValue({'schoolName':opt.props.children})
  }

  return(
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        {getFieldDecorator('schoolName')(<Input type='hidden'/>)}
        <FormItem {...formItemLayout} label="所属学校">
          {getFieldDecorator('schoolId', {rules: [{required: true, message: '请选择所属学校'}]})(
            <Select placeholder="所属学校" onChange={handleSchChange}>
              {schoolList.map((sch)=><Option key={sch.id} value={sch.id}>{sch.name}</Option>)}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="教师姓名">
          {getFieldDecorator('name', {rules: [{required: true, message: '教师姓名不能为空'}]})(<Input placeholder="输入教师姓名"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="手机号码">
          {getFieldDecorator('phone', {rules: [{required: true, message: '手机号码不能为空'}]})(<Input maxLength={11} placeholder="输入手机号码"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="身份证号">
          {getFieldDecorator('identity')(<Input placeholder="输入身份证号" maxLength={18}/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="性别">
          {getFieldDecorator('sex', {rules: [{required: true, message: '请选择姓名'}]})(
            <Select>
              <Option value="1">男</Option>
              <Option value="2">女</Option>
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
