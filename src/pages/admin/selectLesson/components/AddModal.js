import {Modal,Form,Input} from 'antd';
const FormItem = Form.Item;
const AddModal=({
  form:{
    getFieldDecorator,
    validateFields
  },
  onAdd,
  ...addOpts
})=>{
  const formItemLayout = {
    labelCol:{
      xs:{span:24},
      sm:{span:6},
    },
    wrapperCol:{
      xs:{span:24},
      sm:{span:17},
    },
  }
  const handleOk=(e)=>{
    e.preventDefault();
    validateFields((errors,values)=>{
      if(!errors){
        onAdd(values)
      }
    })
  }
  return(
    <Modal {...addOpts}onOk={handleOk}>
      <Form onSubmit={handleOk} layout="horizontal" key="id">
        <FormItem {...formItemLayout} label="课程名称">
          {getFieldDecorator("lesson",{rules:[{require:true,message:"请输入课程名称"}]})(<Input placeholder="请输入课程名称"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="开课日期">
          {getFieldDecorator("createDate",{rules:[{require:true,message:"请输入开课日期"}]})(<Input placeholder="请输入开课日期"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="开课时间">
          {getFieldDecorator("createTime",{rules:[{require:true,message:"请输入开课时间"}]})(<Input placeholder="请输入开课时间"/>)}
        </FormItem>
      </Form>
    </Modal>
  );
}
export default Form.create()(AddModal);
