import React from 'react';
import {Button, Form, Input, Select} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
const Filter = ({
  onFilter,
  ageList,
  schoolList,
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
        {getFieldDecorator("schName_like")(<Input placeholder="学校"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("name_like")(<Input placeholder="姓名"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("status_eq")(
          <Select className="filterSelect" placeholder="状态" style={{"width":100}}>
            <Option value="">全部</Option>
            <Option value="1">显示</Option>
            <Option value="0">隐藏</Option>
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
