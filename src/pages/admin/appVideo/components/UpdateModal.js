import React from 'react';
import {Col, Form, Input, Modal, Row, Switch} from 'antd';
import PictureWall from '../../../../components/PictureWall';

const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
export default class UpdateModal extends React.Component {

  state = {
    fileList : [],
    status: false,
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.item);
    const curItem = this.props.item;
    this.setState({status: curItem.status === '1'});
    //console.log(curItem);
    if(curItem.picPath) {
      const fileList = [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: curItem.picPath,
        // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }]
      this.setState({fileList: fileList});
    }
  }

  render() {

    const { getFieldDecorator, setFieldsValue, validateFieldsAndScroll} = this.props.form;

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        values.status = values.status ? "1":"0";
        if(!errors) {
         this.props.onOk(values);
        }
      });
    };

    const onFileChange = (file) => {
      // console.log("onFileChange", file);
      if(file.status === 'done') {
        setFieldsValue({"picPath": file.response});
      }
    };


    const modalOpts = {
      ...this.props,
      onOk: handleOk
    };

    return(
      <Modal {...modalOpts} style={{ "minWidth": '80%', top: 20 }}>
        <Form layout="horizontal">
          {getFieldDecorator('picPath')(<Input type="hidden" />)}
          {getFieldDecorator('id')(<Input type="hidden" />)}
          <FormItem>
            <Row>
              <Col span={24}>
                {getFieldDecorator('title', {rules: [{required: true, message: '科普视频标题不能为空'}]})(<Input placeholder="输入科普视频标题"/>)}
              </Col>
            </Row>
          </FormItem>

          <FormItem>
            <Row>
              <Col span={24}>
                {getFieldDecorator('url', {rules: [{required: true, message: '科普视频URL地址不能为空'}]})(<Input placeholder="输入视频地址，可以从B站拷贝"/>)}
              </Col>
            </Row>
          </FormItem>

          <FormItem>
            <Row>
              <Col span={4}>
                <PictureWall showMsg="封面图片" fileList={this.state.fileList} accept="image/png, image/jpeg, image/gif" data={{'path':'appVideo'}} onFileChange={onFileChange}/>
              </Col>
              <Col span={20}>
                {getFieldDecorator('guide', {rules: [{required: true, message: '科普视频导读不能为空'}]})(<TextArea placeholder="输入科普视频导读" autosize={{ minRows: 4, maxRows: 4 }}/>)}
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row>
              <Col span={8}>
                状态：{getFieldDecorator("status")(<Switch defaultChecked={this.state.status} checkedChildren="显示" unCheckedChildren="隐藏"/>)}
              </Col>
            </Row>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
