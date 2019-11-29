import React from 'react';
import {createForm} from 'rc-form';
import {Card, InputItem, Toast,Button} from 'antd-mobile';
import {Alert} from 'antd';

@createForm()
export default class NoRecord extends React.Component {

  state = {
    hasError: false,
  }

  onErrorClick = () => {
    if (this.state.hasError) {
      Toast.info('请认真输入手机号码');
    }
  }

  onChange = (value) => {
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({
        hasError: true,
      });
    } else {
      this.setState({
        hasError: false,
      });
    }
    this.setState({
      value,
    });
  }

  onSubmit = () => {
    const {getFieldValue} = this.props.form;
    const phone = getFieldValue("phone");
    if (!phone || phone.replace(/\s/g, '').length != 11) {
      Toast.fail("请认真输入手机号码");
    } else {
      this.props.onSearch(phone);
    }
  }

  render() {

    const {getFieldDecorator} = this.props.form;

    return(
      <div>
        <Alert type="warning" message="未检测到您的申请信息" style={{"textAlign": "center"}}/>
        <Card style={{"margin": "10px"}}>
          <Card.Header title="通过手机号码查找"/>
          <Card.Body>
            {getFieldDecorator("phone")
            (
            <InputItem
              type="phone"
              placeholder="输入申请时预留的手机号码"
              error={this.state.hasError}
              onErrorClick={this.onErrorClick}
              onChange={this.onChange}
            />)}
          </Card.Body>
          <Card.Footer extra={<Button type="primary" icon="search" inline size="small" onClick={this.onSubmit} disabled={this.state.hasError || this.props.loading} loading={this.props.loading}> 查找</Button>}/>
        </Card>
      </div>
    );
  }
}
