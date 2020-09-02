import React from 'react';
import {Form, Input, Modal, Radio, Select, Spin, Tooltip} from 'antd';
import request from "../../../../utils/request";

const FormItem = Form.Item;
const {Option} = Select;

@Form.create()
export default class UpdateModal extends React.Component {

  state = {
    fetching: false,
    keyword: '',
    systemList: [],
  };

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    const item = this.props.item;
    setFieldsValue(item);
  }

  render() {

    const { getFieldDecorator, validateFieldsAndScroll,setFieldsValue} = this.props.form;
    const {keyword,fetching, systemList} = this.state;
    const {item} = this.props;
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
    };

    const fetchSystem = (e) => {
      if(!this.state.fetching) {
        this.setState({fetching: true, systemList: []});
        // let api = {apiCode: "productService.searchByTitle", title: e};
        request("classSystemService.searchByTitle", {title: e}, true).then((res)=> {
          //console.log(res);
          this.setState({fetching: false, systemList: res.systemList});
        })
      }
    };

    const handleSystemChange = (e) => {
      const title = e.label.join("");
      setFieldsValue({sid: e.key, sname: title});
    };

    return(
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          {getFieldDecorator('sid')(<Input type="hidden"/>)}
          {getFieldDecorator('sname')(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '年级名称不能为空'}]})(<Input placeholder="输入年级名称" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="序号">
            {getFieldDecorator('orderNo', {rules: [{required: true, message: '序号不能为空'}]})(<Input type="number" placeholder="输入序号"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="教师标记">
            <Tooltip title="标记上 表示教师在设置管理班级时可以选择此角色，建议以年级名称，如：三年级">
              {getFieldDecorator('teacherFlag', {rules: [{required: true, message: '教师标记不能为空'}]})(
                <Radio.Group>
                  <Radio value="1">可选择</Radio>
                  <Radio value="0">不可选择</Radio>
                </Radio.Group>
              )}
            </Tooltip>
          </FormItem>
          <FormItem {...formItemLayout} label="关联体系">
            <b className="red">{item.sname}</b>
            {getFieldDecorator("sys")(
              <Select
                showSearch
                value={keyword}
                placeholder="输入体系名称查找"
                defaultActiveFirstOption={false}
                showArrow={false}
                labelInValue={true}
                filterOption={false}
                onSearch={fetchSystem}
                onChange={handleSystemChange}
                style={{ width: '100%' }}
                notFoundContent={fetching ? <Spin size="small" /> : null}
              >
                {systemList.map(d => (
                  <Option key={d.id}>{d.pname}{d.name}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="备注">
            {getFieldDecorator('remark')(<Input placeholder="输入备注信息"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
