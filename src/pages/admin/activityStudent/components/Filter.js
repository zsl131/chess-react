import React from 'react';
import {Button, Form, Input, Select, Spin} from 'antd';
import request from "../../../../utils/request";

const Option = Select.Option;
const FormItem = Form.Item;

@Form.create()
export default class Filter extends React.Component {

  state = {
    data: [],
    fetching: false,
    schoolList:[]
  }

  fetchDep = () => {
    if(this.state.data.length<=0) {
      this.setState({ data: [], fetching: true });
      request("activityService.listDep", {}, true).then((response) => {
        let data = [{value: "*", text: "==所有部门=="}];
        data.push( ...response.datas.map((item) => ({
          value: ""+item.id,
          text: item.name,
        })));

        this.setState({data, fetching: false});
      });
    }
  }

  fetchSchool = ()=> {
    if(this.state.schoolList<=0) {
      request("publicCommonService.listAllSchool", {}, true).then((response) => {
        let data = [{value: "*", text: "==所有学校=="}];
        data.push( ...response.obj.map((item) => ({
          value: ""+item.id,
          text: item.name,
        })));

        this.setState({schoolList: data, fetching: false});
      });
    }
  }

  render() {
    const {getFieldDecorator, validateFields} = this.props.form;
    const { fetching, data, ageList, schoolList } = this.state;
    const handleSubmit = (e) => {
      e.preventDefault();
      validateFields((errors, values) => {
        // console.log("filter", errors, values);
        this.props.onFilter("filter",values);
      });
    }

    const onHandleDownload = () => {
      validateFields((errors, values) => {
        // console.log("onHandleDownload", errors, values);
        this.props.onFilter("download", values);
      });
    };

    const onHandleDownloadExcel = ()=> {
      validateFields((errors, values) => {
        // console.log("onHandleDownload", errors, values);
        this.props.onFilter("cal", values);
      });
    };

    return (
      <Form layout="inline" onSubmit={handleSubmit}>
        <FormItem>
          {getFieldDecorator("depId")(
            <Select
              placeholder="选择部门"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              onFocus={this.fetchDep}
              style={{ width: '120px' }}
            >
              {data.map(d => <Option key={d.value}>{d.text}</Option>)}
            </Select>
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("schoolId")(
            <Select
              placeholder="所属学校"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              onFocus={this.fetchSchool}
              style={{ width: '120px' }}
            >
              {schoolList.map(d => <Option key={d.value}>{d.text}</Option>)}
            </Select>
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("sex")(
            <Select
              placeholder="选择性别"
              style={{ width: '100px' }}
            >
              <Option key="*">=全部=</Option>
              <Option key="1">男</Option>
              <Option key="2">女</Option>
            </Select>
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("status")(
            <Select
              placeholder="选择状态"
              style={{ width: '100px' }}
            >
              <Option key="*">=全部=</Option>
              <Option key="0">未审核</Option>
              <Option key="1">通过</Option>
              <Option key="2">驳回</Option>
            </Select>
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("payFlag")(
            <Select
              placeholder="缴费情况"
              style={{ width: '100px' }}
            >
              <Option key="*">=全部=</Option>
              <Option key="1">已缴费</Option>
              <Option key="0">未缴费</Option>
            </Select>
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("fromFlag")(
            <Select
              placeholder="报名来源"
              style={{ width: '100px' }}
            >
              <Option key="*">=全部=</Option>
              <Option key="0">社会</Option>
              <Option key="1">学校</Option>
            </Select>
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("hasCheck")(
            <Select
              placeholder="是否签到"
              style={{ width: '100px' }}
            >
              <Option key="*">=全部=</Option>
              <Option key="1">已签到</Option>
              <Option key="0">未签到</Option>
            </Select>
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("actTitle_like")(<Input placeholder="活动标题"/>)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("address_like")(<Input placeholder="活动地址"/>)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("holdTime_like")(<Input placeholder="活动时间"/>)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("stuName_like")(<Input placeholder="学生姓名"/>)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("phone_like")(<Input placeholder="联系电话"/>)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("hasShare")(
            <Select
              placeholder="有无推荐"
              style={{ width: '100px' }}
            >
              <Option key="*">=全部=</Option>
              <Option key="1">有推荐</Option>
              <Option key="0">无推荐</Option>
            </Select>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("shareName_like")(<Input placeholder="推荐者姓名"/>)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("sharePhone_like")(<Input placeholder="推荐者电话"/>)}
        </FormItem>
        <FormItem>
          <Button type="primary" icon="search" htmlType="submit" >筛选</Button> &nbsp;&nbsp;
          <Button type="primary" icon="download" onClick={()=>onHandleDownload()} >下载</Button> &nbsp;&nbsp;
          <Button type="primary" icon="download" onClick={()=>onHandleDownloadExcel()} >报名情况下载</Button>
        </FormItem>
      </Form>
    );
  }
}

