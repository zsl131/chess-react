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
  }

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator("ticketNo_like")(<Input placeholder="单据号"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("title_like")(<Input placeholder="摘要"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("operator_like")(<Input placeholder="经办人"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("recordName_like")(<Input placeholder="记账人"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("flag")(
          <Select
            placeholder="账目标记"
            style={{ width: '100px' }}
          >
            <Option key="*">=全部=</Option>
            <Option key="1">进账</Option>
            <Option key="-1">出账</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator("status")(
          <Select
            placeholder="账目状态"
            style={{ width: '100px' }}
          >
            <Option key="*">=全部=</Option>
            <Option key="1">有效</Option>
            <Option key="-1">作废</Option>
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
