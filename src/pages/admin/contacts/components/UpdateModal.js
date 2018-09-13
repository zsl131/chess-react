import React from 'react';
import {Input,Modal,Form} from 'antd';
const FormItem = Form.Item;

@Form.create()
export default class UpdateModal extends React.Component {
  state = {
    contacts: this.props.contacts,
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.state.contacts);
  }

  render() {
    const {getFieldDecorator, validateFields} = this.props.form;

    const handleOk = (e) => {
      e.preventDefault();
      validateFields((errors, values) => {
        if (!errors) {
          this.props.onUpdate(values);
        }
      })
    };

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6},
      },
      wrapperCol:{
        xs:{span:24},
        sm:{span:17},
      },
    };
    return(
      <Modal  {...this.props} onOk={handleOk}>
        <Form onSubmit={handleOk}>
          {getFieldDecorator("id")(<Input type="hidden"/>)}
        </Form>
        <FormItem {...formItemLayout} label="修改姓名">
          {getFieldDecorator("name",{rules:[{required:true,message:"修改姓名"}]})(<Input placeholder="修改姓名"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="修改性别">
          {getFieldDecorator("sex",{rules:[{required:true,message:"修改性别"}]})(<Input placeholder="修改性别"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="修改单位">
          {getFieldDecorator("depName",{rules:[{required:true,message:"修改单位"}]})(<Input placeholder="修改单位"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="修改职务">
          {getFieldDecorator("duty",{rules:[{required:true,message:"修改职务"}]})(<Input placeholder="修改职务"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="修改电话">
          {getFieldDecorator("phone",{rules:[{required:true,message:"修改电话"}]})(<Input placeholder="修改电话"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="修改备注">
          {getFieldDecorator("remark",{rules:[{required:true,message:"修改备注"}]})(<Input placeholder="修改备注"/>)}
        </FormItem>
      </Modal>
    );
  }
}
