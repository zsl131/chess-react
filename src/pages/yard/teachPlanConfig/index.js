import React from 'react';
import { connect } from 'dva';
import {Form, Icon, Card, Button, Input, DatePicker, Radio, Select} from 'antd';
import { routerRedux } from 'dva/router';
import moment from 'moment';

import styles from './index.css';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
class TeachPlanConfig extends React.Component {

  state = {
    item: this.props.teachPlanConfig.item,
    year: '',
  };

  componentDidMount () {
    const { setFieldsValue } = this.props.form;
    // console.log("didMount::", this.props.teachPlanConfig.item);
    // setFieldsValue(this.state.item || {});
    // console.log(this.props.teachPlanConfig.item);
    const item = this.state.item;
    //console.log(item)
    setFieldsValue({term: item.term, flag: item.flag});
    setFieldsValue({configYear: moment(item.configYear, "YYYY")})
  }

  render() {

    const { query, pathname } = this.props.location;

    //console.log(this.props.teachPlanConfig)

    const handleRefresh = (newQuery) => {
      this.props.dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          ...newQuery,
        },
      }));
    };

    const {validateFieldsAndScroll, getFieldDecorator,setFieldsValue} = this.props.form;

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
          values.configYear = this.state.year;
          this.props.dispatch({ type: 'teachPlanConfig/save', payload: values }).then(()=>{handleRefresh()});
        }
      });
    };

    const handlePanelChange = (e, dateString) => {
      const year = moment(e).format('YYYY');
      this.setState({year: year});
      setFieldsValue({configYear: moment(year, "YYYY")})
    };

    const onChangeTerm = (e) => {

      const term = e.target.value;
      console.log(term)
    };

    return (
      <div>
        <div className="listHeader">
          <h3><Icon type="edit"/> 教案配置管理</h3>
        </div>
        <div className={styles.mainContainer}>
          <Card>
            <Form onSubmit={handleOk} layout="horizontal" loading={this.props.loading.models.teachPlanConfig}>
              {getFieldDecorator("id")(<Input type="hidden"/>)}
              <FormItem {...formItemLayout} label="年份">
                {getFieldDecorator('configYear', {rules: [{required: true, message: '年份不能为空'}]})(
                  <DatePicker
                    mode="year"
                    placeholder="请选择年份"
                    format="YYYY"
                    onPanelChange={handlePanelChange}
                  />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="学期">
                {getFieldDecorator('term', {rules: [{required: true, message: '请选择学期'}]})(
                  <Radio.Group>
                    <Radio value="1">春季学期</Radio>
                    <Radio value="2">秋季学期</Radio>
                  </Radio.Group>
                  /*<Select>
                  <Option value="1">春季学期</Option>
                  <Option value="2">秋季学期</Option>
                  </Select>*/
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="状态">
                {getFieldDecorator('flag', {rules: [{required: true, message: '请选择状态'}]})(
                  <Radio.Group>
                    <Radio value="1">开启设置</Radio>
                    <Radio value="2">关闭设置</Radio>
                  </Radio.Group>
                  /*<Select>
                    <Option value="1">开启设置</Option>
                    <Option value="2">关闭设置</Option>
                  </Select>*/
                )}
              </FormItem>

              <FormItem className={styles.submitOper}>
                <Button className={styles.submitBtn} htmlType="submit" type="primary" icon="check">提交保存</Button>
              </FormItem>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(({ teachPlanConfig, loading }) => ({ teachPlanConfig, loading }))(TeachPlanConfig);
