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
      onFilter(values);
    });
  }

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator("content_like")(<Input placeholder="点评内容"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("schName_like")(<Input placeholder="学校名称"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("teaName_like")(<Input placeholder="教师姓名"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("teaPhone_like")(<Input placeholder="教师电话"/>)}
      </FormItem>
      <FormItem>
        <Button type="dashed" htmlType="submit">筛选</Button>
      </FormItem>
    </Form>
  );
}

export default Form.create()(Filter);
