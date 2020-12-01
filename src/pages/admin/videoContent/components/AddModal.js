import React from 'react';
import {Form, Input, InputNumber, Modal, Select, Spin} from 'antd';
import {formItemLayout_large} from "../../../../utils/common";
import request from "../../../../utils/request";
import BraEditor from "../../../../components/common/BraEditor";

const FormItem = Form.Item;

@Form.create()
export default class AddModal extends React.Component {

  state = {
    cateList: [],
    fetching: true,
  };

  fetchCate = ()=> {
    if(this.state.cateList<=0) {
      request("videoCategoryService.listNoPage", {}, true).then((response) => {
        console.log(response)
        let data = [];
        data.push( ...response.list.map((item) => ({
          value: ""+item.id,
          text: item.name,
        })));

        this.setState({cateList: data, fetching: false});
      });
    }
  };

  render() {
    const {getFieldDecorator, setFieldsValue, validateFieldsAndScroll} = this.props.form;
    const {cateList, fetching} = this.state;

    const handleOk = (e) => {
      e.preventDefault();

      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
          this.props.onOk(values);
        }
      });
    };

    const modalOpts = {
      ...this.props,
      onOk: handleOk
    };

    const onCateChange = (value, e) => {
      // console.log(value, e.props.children)
      setFieldsValue({"cateName": e.props.children});
    };

    const handleChangeContent = (obj) => {
      //console.log("add===", obj);
      setFieldsValue({"content": obj.content, rawContent: obj.raw});
    };

    return(
      <Modal {...modalOpts} style={{ "minWidth": '80%', top: 20 }}>
        <Form layout="horizontal">
          {getFieldDecorator('cateName')(<Input type="hidden" />)}
          <FormItem {...formItemLayout_large} label="所属分类">
            {getFieldDecorator('cateId', {rules: [{required: true, message: '请选择所在分类'}]})(
              <Select
                placeholder="选择分类"
                notFoundContent={fetching ? <Spin size="small" /> : null}
                onFocus={this.fetchCate}
                style={{ width: '100%' }}
                onChange={onCateChange}
              >
                {cateList.map(d => <Option key={d.value}>{d.text}</Option>)}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout_large} label="标题">
            {getFieldDecorator('title', {rules: [{required: true, message: '标题不能为空'}]})(<Input placeholder="输入标题"/>)}
          </FormItem>

          <FormItem {...formItemLayout_large} label="序号">
            {getFieldDecorator('orderNo', {rules: [{required: true, message: '序号'}]})(<InputNumber placeholder="输入分类名称" style={{"width":"100%"}}/>)}
          </FormItem>
          <FormItem {...formItemLayout_large} label="内容">
            {getFieldDecorator('rawContent')(<Input type="hidden" placeholder=""/>)}
            {getFieldDecorator("content", {rules: [{required: true, message: '内容不能为空'}]})(
              <BraEditor onChangeContent={handleChangeContent}/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
