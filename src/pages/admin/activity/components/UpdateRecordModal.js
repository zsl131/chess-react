import React from 'react';
import {Form, Input, InputNumber, Modal, Switch, DatePicker} from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@Form.create()
export default class UpdateRecordModal extends React.Component {

  state = {
    record: this.props.record || {}
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.state.record);
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

    const onOk = (value) => {
      console.log("-->", value);
    }

    const disabledDate = (current) => {
      // Can not select days before today and today
      // return current && current < moment().endOf('day');
      return current < moment().endOf('day');
    }

    return(
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          {getFieldDecorator('id')(<Input type="hidden" />)}
          {getFieldDecorator('startTime')(<Input type="hidden" />)}
          {getFieldDecorator('deadline')(<Input type="hidden" />)}
          {getFieldDecorator('holdTime')(<Input type="hidden" />)}

          <FormItem {...formItemLayout} label="活动时间">
            <DatePicker
              onChange={onChangeTime}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: moment('14:30', 'HH:mm')
              }}
              defaultValue={ moment(this.state.record.holdTime)}
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="请输入活动举行时间"/>
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
              defaultValue={[moment(this.state.record.startTime), moment(this.state.record.deadline)]}
              disabledDate={disabledDate}
              format="YYYY-MM-DD HH:mm:ss"
              placeholder={['报名开始时间', '报名截止时间']}
              onChange={onChange}
              onOk={onOk}
            />

          </FormItem>

          <FormItem {...formItemLayout} label="显示状态">
            {getFieldDecorator("status")(<Switch checkedChildren="可报名" unCheckedChildren="不可报名" defaultChecked={this.state.record.status === "1"}/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }

}
