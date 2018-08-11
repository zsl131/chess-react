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
      <Form onSubmit={handleOk}>
        <FormItem>
          {getFieldDecorator("ruleCode",{rules:[{required:true,message:"请输入积分规则代码"}]})(<Input placeholder="请输入积分规则代码"/>)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("scoreRule",{rules:[{required:true,message:"请输入积分规则"}]})(<Input placeholder="请输入积分规则"/>)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("addScore",{rules:[{required:true,message:"请输入积分数"}]})(<Input placeholder="请输入积分数"/>)}
        </FormItem>
      </Form>
    </Modal>
  );
}
export default Form.create()(AddRule);
