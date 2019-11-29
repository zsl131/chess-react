import React from 'react';
import {Form, Input, Modal, Select} from 'antd';
import request from "../../../../utils/request";

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

@Form.create()
export default class AddModal extends React.Component {
  state = {
    systemList:[],
    fetching: false,
    recordDate:'',
  }

  fetchSystem = ()=> {
    if(this.state.systemList<=0) {
      request("classSystemService.findSystem", {}, true).then((response) => {
        let data = [];
        data.push( ...response.list.map((item) => ({
          value: ""+item.id,
          text: item.name,
        })));

        this.setState({systemList: data, fetching: false});
      });
    }
  }

  render() {
    const {
      onOk,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
      },
      ...modalProps
    } = this.props;

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
          onOk(values);
        }
      });
    }

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    }

    return(
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <FormItem {...formItemLayout} label="学校名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '学校名称不能为空'}]})(<Input placeholder="输入学校名称"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="联系人">
            {getFieldDecorator('contacts', {rules: [{required: true, message: '学校联系人不能为空'}]})(<Input placeholder="输入学校联系人"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="联系电话">
            {getFieldDecorator('phone', {rules: [{required: true, message: '学校联系电话不能为空'}]})(<Input placeholder="输入学校联系电话"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="学校地址">
            {getFieldDecorator('address')(<Input placeholder="输入学校地址"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="状态">
            {getFieldDecorator('status', {rules: [{required: true, message: '请选择状态'}]})(
              <Select>
                <Option value="1">在合作</Option>
                <Option value="0">未合作</Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="使用体系">
            {getFieldDecorator("systemId")(
              <Select
                placeholder="选择所使用体系"
                notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
                onFocus={this.fetchSystem}
                style={{ width: '200px' }}
              >
                {this.state.systemList.map(d => <Option key={d.value}>{d.text}</Option>)}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="备注">
            {getFieldDecorator('remark')(<TextArea rows={4} placeholder="输入备注信息"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
