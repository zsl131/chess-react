import React from 'react';
import {Button, Form, Input, InputNumber, Select, Tooltip} from 'antd';

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
      onFilter("filter", values);
    });
  };

  const onHandleDownload = () => {
    validateFields((errors, values) => {
      // console.log("onHandleDownload", errors, values);
      onFilter("download", values);
    });
  };

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator("authorName_like")(<Input placeholder="作者"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("title_like")(<Input placeholder="标题"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("updateDate_ge")(<InputNumber style={{"width":"120px"}} placeholder="开始日期，yyyyMMdd"/>)}
      </FormItem>
      <FormItem>
        <Tooltip title="结束日期，格式yyyyMMdd">{getFieldDecorator("updateDate_le")(<InputNumber style={{"width":"120px"}} placeholder="结束日期，yyyyMMdd"/>)}</Tooltip>
      </FormItem>
      <FormItem>
        {getFieldDecorator("hasProcess_eq")(
          <Select placeholder="是否录制" style={{"width":100}}>
            <Option value="">全部</Option>
            <Option value="0">未录制</Option>
            <Option value="1">已录制</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">筛选</Button>&nbsp;&nbsp;
        <Button type="primary" icon="download" onClick={()=>onHandleDownload()} >下载</Button>
      </FormItem>
    </Form>
  );
};

export default Form.create()(Filter);
