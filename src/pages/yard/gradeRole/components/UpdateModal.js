import React from 'react';
import {Form, Input, Modal} from 'antd';

const FormItem = Form.Item;

@Form.create()
export default class UpdateModal extends React.Component {

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.item);
  }

  render() {

    const { getFieldDecorator, validateFieldsAndScroll} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
      },
    };

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
         this.props.onOk(values);
        }
      });
    }

    return(
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="角色名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '角色名称不能为空'}]})(<Input placeholder="输入角色名称" />)}
          </FormItem>
          {/*<FormItem {...formItemLayout} label="教师标记">
            <Tooltip title="标记上 表示教师在设置管理班级时可以选择此角色，建议以年级名称，如：三年级">
              {getFieldDecorator('teacherFlag', {rules: [{required: true, message: '教师标记不能为空'}]})(
                <Radio.Group>
                  <Radio value="1">可选择</Radio>
                  <Radio value="0">不可选择</Radio>
                </Radio.Group>
              )}
            </Tooltip>
          </FormItem>*/}
        </Form>
      </Modal>
    );
  }
}
