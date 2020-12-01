import React from 'react';
import {Form, Input, InputNumber, Modal, Select} from 'antd';
import {formItemLayout_large} from "../../../../utils/common";
import BraEditor from "../../../../components/common/BraEditor";

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class UpdateModal extends React.Component {

  state = {
    cateList: [],
    fetching: true,
  };

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.item);
  }

  render() {

    const { getFieldDecorator, setFieldsValue, validateFieldsAndScroll} = this.props.form;
    const {item} = this.props;

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
         this.props.onOk(values);
        }
      });
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
      <Modal {...this.props} onOk={handleOk} style={{ "minWidth": '80%', top: 20 }}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          {getFieldDecorator('cateName')(<Input type="hidden" />)}
          <FormItem {...formItemLayout_large} label="所属分类">
            {getFieldDecorator('cateId', {rules: [{required: true, message: '请选择所在分类'}]})(
              <Select
                placeholder="选择分类"
                style={{ width: '100%' }}
                onChange={onCateChange}
              >
                {this.props.cateList.map(d => <Option key={d.id} value={d.id}>{d.name}</Option>)}
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
              <BraEditor content={item.rawContent} onChangeContent={handleChangeContent}/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
