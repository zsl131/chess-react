import React from 'react';
import {Modal, List, Button, InputItem, Picker, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';

@createForm()
export default class AddStudentModal extends React.Component {

  state = {
    hasPhoneError: false,
  }

  onErrorClick = () => {
    if (this.state.hasPhoneError) {
      Toast.info('请认真输入手机号码');
    }
  }

  checkPhone = (rule, value, callback)=> {
    if(!value || value.replace(/\s/g, '').length < 11) {
      this.setState({
        hasPhoneError: true,
      });
      callback("请认真输入手机号码");
    } else {
      this.setState({
        hasPhoneError: false,
      });
      callback();
    }
  }

  render() {
    const { getFieldProps,validateFields } = this.props.form;

    const handleSubmit = (e) => {
      e.preventDefault();
      validateFields((errors, values) => {
        // console.log(errors, values);
        if(!errors) {
          values.sex = values.sex[0];
          values.ageId = values.ageId[0];
          values.schoolId = values.schoolId[0];
          // console.log(values);
          this.props.onAdd(values);
        } else {
          const field0 = Object.keys(errors)[0];
          Toast.fail(errors[field0].errors[0].message);
        }
      });
    }

    return (
      <Modal
        popup
        {...this.props}
        animationType="slide-up"
      >
        <List renderHeader={() => <div>增加学生信息</div>} className="popup-list">
          <List>
            <InputItem {...getFieldProps('name', {rules: [{required: true, message: '请输入学员姓名'}]})} type="name"
                       placeholder="输入学员姓名">学员姓名：</InputItem>
            <Picker {...getFieldProps('sex', {rules: [{required: true, message: "请选择性别"}]})} extra="选择性别"
                    data={[{label: "男", value: '1'}, {label: '女', value: '2'}]}>
              <List.Item arrow="horizontal">学员性别：</List.Item>
            </Picker>
            <Picker {...getFieldProps('ageId', {rules: [{required: true, message: "请选择年龄段"}]})} extra="选择年龄"
                    data={this.props.ageList}>
              <List.Item arrow="horizontal">学员年龄：</List.Item>
            </Picker>
            <Picker {...getFieldProps('schoolId', {rules: [{required: true, message: "请选择就读学校"}]})} extra="选择学校"
                    data={this.props.schoolList}>
              <List.Item arrow="horizontal">就读学校：</List.Item>
            </Picker>
            <InputItem
              type="phone"
              error={this.state.hasPhoneError}
              onErrorClick={this.onErrorClick}
              {...getFieldProps('phone', {rules: [{required: true, message: '请输入家长联系电话'}, {validator: this.checkPhone}]})}
              placeholder="输入家长联系电话">联系电话：</InputItem>
          </List>
          <List.Item>
            <Button type="primary" onClick={handleSubmit}>确定增加</Button>
          </List.Item>
        </List>
      </Modal>
    );
  }
}
