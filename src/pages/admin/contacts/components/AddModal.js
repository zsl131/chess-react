import {Input,Modal,Form} from 'antd';


const FormItem = Form.Item;
const AddModal = ({
  form:{
    getFieldDecorator,
    validateFields,
  },
  onAdd,
  ...addOpts,
}) => {
  const handleOk =(e)=> {
    e.preventDefault();
    validateFields((errors,values)=>{
      if(!errors) {
        console.log(values);
        onAdd(values);
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
    <Modal {...addOpts} onOk={handleOk}>
      <Form onSubmit={handleOk}>
        <FormItem {...formItemLayout} label="输入姓名">
          {getFieldDecorator("name",{rules:[{required:true,message:"输入姓名"}]})(<Input placeholder="输入姓名"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="输入性别">
          {getFieldDecorator("sex",{rules:[{required:true,message:"输入性别"}]})(<Input placeholder="输入性别"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="单位名称">
          {getFieldDecorator("depName",{rules:[{required:true,message:"单位名称"}]})(<Input placeholder="单位名称"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="所处职务">
          {getFieldDecorator("duty",{rules:[{required:true,message:"所处职务"}]})(<Input placeholder="所处职务"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="联系电话">
          {getFieldDecorator("phone",{rules:[{required:true,message:"联系电话"}]})(<Input placeholder="联系电话"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="输入备注">
          {getFieldDecorator("remark",{rules:[{required:true,message:"输入备注"}]})(<Input placeholder="输入备注"/>)}
        </FormItem>
      </Form>
    </Modal>
  );
}

export default Form.create()(AddModal);
