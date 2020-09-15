import React from 'react';
import {Button, Form, Input, Select} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
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
  };

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator("name_like")(<Input placeholder="学校名称"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("isUse")(
          <Select style={{width: 120}} defaultActiveFirstOption={true} placeholder="是否启用">
            <Option value="">==全部==</Option>
            <Option value="1">启用</Option>
            <Option value="0">停用</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        <Button type="dashed" htmlType="submit">筛选</Button>
      </FormItem>
    </Form>
  );
}

export default Form.create()(Filter);
