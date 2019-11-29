import {Modal,Input,Form} from 'antd';

const FormItem = Form.Item;

const AddModal = ({
  form: {
    getFieldDecorator,
    validateFields,
  },
  onAdd,
  ...addOpts
}) => {
  const handleOk = (e) => {
    e.preventDefault();
    validateFields((errors,values)=> {
      console.log(errors,values);
      if(!errors) {
        onAdd(values);
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
  return(
    <Modal {...addOpts} onOk={handleOk}>
      <Form onSubmit={handleOk}>
        <FormItem {...formItemLayout} label="输入科目类型">
          {getFieldDecorator("category",{rules:[{required:true,message:"请输入科目类型"}]})(<Input placeholder="输入类型"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="输入选项">
          {getFieldDecorator("options",{rules:[{required:true,message:"请输入选项"}]})(<Input placeholder="输入选项"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="第一节课:">
          {getFieldDecorator("a",{rule:[{required:true,message:"请输入选项"}]})(<Input placeholder="输入时间"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="第二节课:">
          {getFieldDecorator("b",{rule:[{required:true,message:"请输入选项"}]})(<Input placehodler="输入时间"/>)}
        </FormItem>
      </Form>
    </Modal>
  );
}
export default Form.create()(AddModal);
