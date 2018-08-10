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
        {getFieldDecorator("name_like")(<Input placeholder="姓名"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("ageId_eq")(
          <Select className="filterSelect" placeholder="年龄段" style={{"width":100}}>
            <Option value="">全部</Option>
            {ageList.map((item)=> {return <Option value={item.id} key={item.id}>{item.name}</Option>})}
          </Select>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator("schoolId_eq")(
          <Select className="filterSelect" placeholder="就读学校" style={{"width":100}}>
            <Option value="">全部</Option>
            {schoolList.map((item)=> {return <Option value={item.id} key={item.id}>{item.name}</Option>})}
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
