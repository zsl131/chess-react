import React from 'react';
import {DatePicker, Form, Input, InputNumber, Modal} from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@Form.create()
export default class AddRecordModal extends React.Component {

  state = {
    activity: this.props.activity || {}
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue({"actId": this.state.activity.id, "actTitle": this.state.activity.title, "depId": this.state.activity.depId, "depName": this.state.activity.depName});
  }

  render() {

    const { getFieldDecorator, setFieldsValue, validateFieldsAndScroll} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
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

    const modalOpts = {
      ...this.props,
      onOk: handleOk
    }

    const onChange = (value, dateString) => {
      setFieldsValue({startTime: dateString[0], deadline: dateString[1]});
    }

    const onChangeTime = (value, dateString) => {
      setFieldsValue({holdTime: dateString});
    }

    const disabledDate = (current) => {
      // Can not select days before today and today
      // return current && current < moment().endOf('day');
      return current < moment().endOf('day');
    }

    return(
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          {getFieldDecorator('actId')(<Input type="hidden" />)}
          {getFieldDecorator('actTitle')(<Input type="hidden" />)}
          {getFieldDecorator('depId')(<Input type="hidden" />)}
          {getFieldDecorator('depName')(<Input type="hidden" />)}
          {getFieldDecorator('startTime')(<Input type="hidden" />)}
          {getFieldDecorator('deadline')(<Input type="hidden" />)}
          {getFieldDecorator('holdTime')(<Input type="hidden" />)}

          <FormItem {...formItemLayout} label="活动时间">
            {getFieldDecorator("holdTimeTEmp", {rules:[{required: true, message: "请输入活动举行时间"}]})(
              <DatePicker
                onChange={onChangeTime}
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: moment('14:30', 'HH:mm')
                }}
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="请输入活动举行时间"/>
            )}

          </FormItem>

          <FormItem {...formItemLayout} label="活动地点">
            {getFieldDecorator("address", {rules:[{required: true, message: "请输入活动举行地址"}]})(<Input placeholder="输入活动举行地址"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="联系电话">
            {getFieldDecorator("phone", {rules:[{required: true, message: "请输入联系电话"}]})(<Input placeholder="输入联系电话"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="最多家庭数">
            {getFieldDecorator("maxCount", {rules:[{required: true, message: "请输入最多参与家庭数"}]})(<InputNumber placeholder="家庭数"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="报名时间">
            <RangePicker
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
              }}
              disabledDate={disabledDate}
              format="YYYY-MM-DD HH:mm:ss"
              placeholder={['报名开始时间', '报名截止时间']}
              onChange={onChange}
            />

          </FormItem>

          <FormItem {...formItemLayout} label="单价">
            {getFieldDecorator("money", {rules:[{required: true, message: "请输入每人所需要支付金额"}]})(<InputNumber placeholder="单价"/>)}
          </FormItem>

          {/*<FormItem {...formItemLayout} label="显示状态">
            {getFieldDecorator("status")(<Switch checkedChildren="显示" unCheckedChildren="隐藏"/>)}
          </FormItem>*/}
        </Form>
      </Modal>
    );
  }

}
