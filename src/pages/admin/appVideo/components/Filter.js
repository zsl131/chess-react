import React from 'react';
import {Button, Form, Input, Select} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class Filter extends React.Component {

  state = {
    cateList: [],
    fetching: true,
  }

  render() {
    const {getFieldDecorator,validateFields} = this.props.form;
    const handleSubmit = (e) => {
      e.preventDefault();
      validateFields((errors, values) => {
        this.props.onFilter(values);
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
            <Button type="dashed" htmlType="submit">筛选</Button>
          </FormItem>
        </Form>
    );
  }
}
