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
      onFilter(values);
    });
  }

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem>
      {getFieldDecorator("category_like")(<Input placeholder="课程类型"/>)}
    </FormItem>
      <FormItem>
        {getFieldDecorator("options_like")(<Input placeholder="课程选项"/>)}
      </FormItem>
      <FormItem>
        <Button type="dashed" htmlType="submit">筛选</Button>
      </FormItem>
    </Form>
  );
}

export default Form.create()(Filter);
