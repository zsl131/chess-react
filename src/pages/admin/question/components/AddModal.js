import {Modal,Form,Input} from 'antd';

const FormItem = Form.Item;

const AddModal = ({
  form:{
    getFieldDecorator,
    validateFields,
  },
  onAdd,
  ...addOpts
}) => {
  const handleOk = (e) => {
    e.preventDefault();
    validateFields((errors,values) => {
      console.log(errors,values);
      if(!errors) {
        onAdd(values);
      }
    });
  }
  return (
    <Modal {...addOpts} onOk={handleOk}>
      <Form onSubmit={handleOk}>
        <FormItem>
          {getFieldDecorator("content",{rules:[{required:true,message:"请输入题目内容"}]})(<Input placeholder="输入内容"/>)}
        </FormItem>
        <FormItem>
          输出答案A:{getFieldDecorator("A", {rules: [{required: true, message: "输入A答案"}]})(<Input placeholder="输入答案"/>)}
        </FormItem>
        <FormItem>
          输出答案B:{getFieldDecorator("B", {rules: [{required: true, message: "输入B答案"}]})(<Input placeholder="输入答案"/>)}
        </FormItem>
        <FormItem>
          输出答案C:{getFieldDecorator("C", {rules: [{required: true, message: "输入C答案"}]})(<Input placeholder="输入答案"/>)}
        </FormItem>
        <FormItem>
          输出答案D:{getFieldDecorator("D", {rules: [{required: true, message: "输入D答案"}]})(<Input placeholder="输入答案"/>)}
        </FormItem>
      </Form>
    </Modal>
  );
}

export default Form.create()(AddModal);
