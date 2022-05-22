import React from 'react';
import {Button, Form, Input} from 'antd';

const FormItem = Form.Item;
const Filter = ({
  onFilter,
  form: {
    getFieldDecorator,
    validateFields,
  }
}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((errors, values) => {
      // console.log("filter", errors, values);
      onFilter("filter", values);
    });
  };

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator("name_like")(<Input placeholder="名称"/>)}
      </FormItem>
      {/*<FormItem>
        {getFieldDecorator("phone_like")(<Input placeholder="手机号码"/>)}
      </FormItem>*/}
      <FormItem>
        <Button type="primary" htmlType="submit">筛选</Button>&nbsp;&nbsp;
      </FormItem>
    </Form>
  );
};

export default Form.create()(Filter);
