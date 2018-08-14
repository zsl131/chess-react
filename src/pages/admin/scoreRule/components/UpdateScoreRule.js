import React from 'react';
import {Form,Input,Modal} from 'antd';
const FormItem = Form.Item;
@Form.create()
export default class UpdateScoreRule extends React.Component{
  state = {
    scoreRule: this.props.scoreRule
  }
  componentDidMount(){
    const{setFieldsValue}=this.props.form;
    setFieldsValue(this.state.scoreRule);
  }
  render(){
    const {getFieldDecorator,validateFields}= this.props.form;
    const handleOk=(e)=>{
      e.preventDefault();
      validateFields((errors,values)=>{
        if(!errors){
          this.props.onUpdate(values);
        }
      });
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
      },
    }
    return (
      <div>
        <Modal {...this.props} onOk={handleOk}>
          <Form layout="horizontal">
            {getFieldDecorator("id")(<Input type="hidden"/>)}
            <FormItem {...formItemLayout} label="积分代码">
              {getFieldDecorator("ruleCode")(<Input disabled={true}/>)}
            </FormItem>
            <FormItem {...formItemLayout}label="积分规则">
              {getFieldDecorator("scoreRule", {rules:[{required: true, message: "请输入积分规则"}]})(<Input placeholder="输入积分规则"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="积分数">
              {getFieldDecorator("addScore", {rules:[{required: true, message: "请输入积分数"}]})(<Input placeholder="输入积分数"/>)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
