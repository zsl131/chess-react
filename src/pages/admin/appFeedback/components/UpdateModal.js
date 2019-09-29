import React from 'react';
import {Form, Input, Modal, Select} from 'antd';
import request from "../../../../utils/request";

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

@Form.create()
export default class UpdateModal extends React.Component {

  state = {
    systemList:[],
    fetching: false,
    recordDate:'',
    item:{},
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.item);
    this.setState({item: this.props.item});
  }

  render() {

    const { getFieldDecorator, validateFieldsAndScroll} = this.props.form;
    const {item, imgList} = this.props;
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
      <Modal {...this.props} onOk={handleOk}  style={{ "minWidth": '80%', top: 20 }}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="评论人">
            {item.schName}-{item.teaName}-{item.phone}-{item.contact}
          </FormItem>
          <FormItem {...formItemLayout} label="评论内容">
            <p>{item.content}</p>
            <p>{item.createTime}</p>
          </FormItem>
          <FormItem {...formItemLayout} label="状态">
            {getFieldDecorator('status', {rules: [{required: true, message: '请选择状态'}]})(
              <Select>
                <Option value="1">显示</Option>
                <Option value="0">隐藏</Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="回复">
            {getFieldDecorator('reply')(<TextArea rows={4} placeholder="输入回复内容"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="图片">
            {imgList.map((img)=>{
              return (
                <a href={img.url} target="_blank" rel="noopener noreferrer"><img src={img.url} alt={img.id} style={{"width":"100px", "margin":"5px"}}/></a>
              )
            })}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
