import {Modal,Form,Input} from 'antd';
const FormItem = Form.Item;
const AddRule =({
  form:{
    getFieldDecorator,
    validateFields
  },
  onAdd,
  ...addOpts
})=>{
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
  const handleOk=(e)=>{
    e.preventDefault();
    validateFields((errors,values)=>{
      if(!errors){
        onAdd(values)
      }

    })
  }
  return (
    <Modal{...addOpts}onOk={handleOk}>
      <Form onSubmit={handleOk} layout="horizontal" key="id">
        <FormItem {...formItemLayout} label="积分代码">
          {getFieldDecorator("ruleCode",{rules:[{required:true,message:"请输入积分规则代码"}]})(<Input placeholder="请输入积分规则代码"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="积分规则">
          {getFieldDecorator("scoreRule",{rules:[{required:true,message:"请输入积分规则"}]})(<Input placeholder="请输入积分规则"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="积分数">
          {getFieldDecorator("addScore",{rules:[{required:true,message:"请输入积分数"}]})(<Input placeholder="请输入积分数"/>)}
        </FormItem>
      </Form>
    </Modal>
  );
}
export default Form.create()(AddRule);
