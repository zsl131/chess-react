import React from 'react';
import {Button, Form, Input,Select} from 'antd';

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
        {getFieldDecorator("title_like")(<Input placeholder="标题"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("status")(
          <Select placeholder="状态" style={{ width: '100px' }}>
            <Option key="*">=全部=</Option>
            <Option key="1">显示</Option>
            <Option key="0">隐藏</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator("isTop")(
          <Select placeholder="是否置顶" style={{ width: '100px' }}>
            <Option key="*">=全部=</Option>
            <Option key="1">置顶</Option>
            <Option key="0">未置顶</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator("needSend")(
          <Select placeholder="关注推送" style={{ width: '100px' }}>
            <Option key="*">=全部=</Option>
            <Option key="1">推送</Option>
            <Option key="0">不推送</Option>
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
