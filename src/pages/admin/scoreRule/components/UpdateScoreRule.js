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
    return (
      <div>
        <Modal {...this.props} onOk={handleOk}>
          <Form >
            {getFieldDecorator("id")(<Input type="hidden"/>)}
            <FormItem>
              {getFieldDecorator("ruleCode", {rules:[{required: true, message: "积分代码"}]})(<Input placeholder="输入积分代码"/>)}
            </FormItem>
            <FormItem>
              {getFieldDecorator("scoreRule", {rules:[{required: true, message: "请输入积分规则"}]})(<Input placeholder="输入积分规则"/>)}
            </FormItem>
            <FormItem>
              {getFieldDecorator("addScore", {rules:[{required: true, message: "请输入积分数"}]})(<Input placeholder="输入积分数"/>)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
