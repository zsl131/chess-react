import React from 'react';
import {Form, Input, Modal, Select} from 'antd';

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
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="appid">
            {getFieldDecorator('appid')(<Input placeholder="输入项目Appid"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="版本号">
            {getFieldDecorator('version', {rules: [{required: true, message: '版本号不能为空'}]})(<Input placeholder="输入版本号"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="wgt地址">
            {getFieldDecorator('url')(<Input placeholder="wgt地址（更新包）"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="apk地址">
            {getFieldDecorator('apkUrl')(<Input placeholder="安卓apk地址"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="iso地址">
            {getFieldDecorator('isoUrl')(<Input placeholder="苹果iso地址"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="更新说明">
            {getFieldDecorator('note', {rules: [{required: true, message: '更新说明不能为空'}]})(<TextArea rows={4} placeholder="输入更新说明"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
