import React from 'react';
import {Button, Col, Form, Input, message, Modal, Row, Switch} from 'antd';
import {formItemLayout, formItemLayout_large} from "../../../../utils/common";
import PictureWall from "../../../../components/PictureWall";
import styles from "../../shareConfig/index.css";

const FormItem = Form.Item;

const imgRef = React.createRef();
const imgConRef = React.createRef();

@Form.create()
export default class UpdateModal extends React.Component {

  state = {
    // item: this.props.shareConfig.item,
    fileList: [],
    imgPath: "",
    needShow: false,
    qrSize: {width: 0, height: 0},
    startPoint: {x: 0, y: 0},
    // imgRef: {}
  };

  constructor(props) {
    super(props);
    // this.imgRef = React.createRef();
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    const item = this.props.item;
    setFieldsValue(item);

    if(item.imgPath) {
      const fileList = [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: item.imgPath,
      }];
      this.setState({fileList: fileList, imgPath: item.imgPath});
    }
  }

  render() {

    const {validateFieldsAndScroll, setFieldsValue, getFieldValue, getFieldDecorator} = this.props.form;
    const {imgPath, fileList, needShow, qrSize, startPoint} = this.state;

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
          values.status = values.status?"1":"0";
         this.props.onOk(values);
        }
      });
    };

    const onBeforeUpload = (file) => {
      const maxSize = 1; //最大上传的大小，1.0兆
      // console.log(maxSize*1024*1024, file);
      const size = file.size;
      if(size>maxSize*1024*1024) { //
        message.warn("请上传小于【"+maxSize+" 兆】的图片")
        return false;
      }
      if(file.type.indexOf("image")<0) {
        message.error("只能上传图片格式文件");
        return false;
      }
      return true;
    };

    const onFileChange = (file) => {
      if(file.status === 'done') {
        const imgPath = file.response;
        setFieldsValue({"imgPath": imgPath});
        this.setState({imgPath: imgPath})
      }
    };

    const getImgSize = (url) => {
      return new Promise((resolve, reject) => {
        let imgObj = new Image();
        imgObj.src = url;
        imgObj.onload = () => {
          resolve({
            width: imgObj.width,
            height: imgObj.height
          })
        }
      })
    };

    const loadedImg = (img, obj) => {
      checkShow();
    };

    const checkShow = () => {
      const imgPath = getFieldValue("imgPath");
      if(imgPath) {
        let scale = 1;
        getImgSize(imgPath).then((size) => {
          try {
            const width = imgConRef.current.clientWidth;
            scale = width / size.width;

            const startX = getFieldValue("startX");
            const startY = getFieldValue("startY");
            const qrWidth = getFieldValue("qrWidth");
            const qrHeight = getFieldValue("qrHeight");
            if(startX === undefined||startY === undefined||qrWidth === undefined||qrHeight === undefined) {
              return false;
            }
            const realQrSize = {width: qrWidth, height: qrHeight};
            const showQrSize = {width: parseInt(realQrSize.width * scale), height: parseInt(realQrSize.height * scale)};
            const startPoint = {x: parseInt(startX * scale), y: parseInt(startY * scale)};
            // console.log(showQrSize)
            // console.log(startPoint)
            this.setState({needShow: true, qrSize: showQrSize, startPoint: startPoint});
          } catch (e) {
            this.setState({needShow: false});
          }
        })
      }
    };

    return(
      <Modal {...this.props} onOk={handleOk} style={{"minWidth":"80%", "top":"20px"}}>
        <Form layout="horizontal" >
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          {getFieldDecorator('imgPath')(<Input type="hidden" />)}
          <FormItem {...formItemLayout} label="推广图片">
            <PictureWall fileList={fileList} onBeforeUpload={onBeforeUpload} accept="image/png, image/jpeg, image/gif" showMsg="推广图片" data={{'path':'abcdef', "extra":'{"scale":"false"}'}} onFileChange={onFileChange}/>
            <span style={{"color":"#999"}}>请预留好推广二维码的位置，输入以下起始点坐标后，查看下方红色方框是否刚好在预留的推广二维码位置</span>
          </FormItem>

          <FormItem {...formItemLayout_large} label="名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '输入名称'}]})(<Input type="text" placeholder="名称"/>)}
          </FormItem>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="二维码起点X">
                {getFieldDecorator('startX', {rules: [{required: true, message: '推广二维码的起点X'}]})(<Input onChange={checkShow} type="number" placeholder="二维码起点X"/>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="二维码起点Y">
                {getFieldDecorator('startY', {rules: [{required: true, message: '推广二维码的起点Y'}]})(<Input onChange={checkShow} type="number" placeholder="二维码起点Y"/>)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="二维码宽度">
                {getFieldDecorator('qrWidth', {rules: [{required: true, message: '推广二维码的宽度'}]})(<Input onChange={checkShow} type="number" placeholder="二维码宽度"/>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="二维码高度">
                {getFieldDecorator('qrHeight', {rules: [{required: true, message: '推广二维码的高度'}]})(<Input onChange={checkShow} type="number" placeholder="二维码高度"/>)}
              </FormItem>
            </Col>
          </Row>

          <FormItem {...formItemLayout} label="是否启用">
            {getFieldDecorator("status")(<Switch checkedChildren="启用" unCheckedChildren="停用" defaultChecked/>)}
          </FormItem>

          {/*<FormItem className={styles.submitOper}>
            <Button className={styles.submitBtn} htmlType="submit" type="primary" icon="check">提交保存</Button>
          </FormItem>*/}
        </Form>
        {imgPath &&
        <div className={styles.imgDiv} id="showImgDiv" ref={imgRef}>
          <img ref={imgConRef} src={this.state.imgPath} onLoad={loadedImg}/>
          {needShow && <span className={styles.qrSpan} style={{width: qrSize.width, height: qrSize.height, lineHeight: qrSize.height+"px", left: startPoint.x, top: startPoint.y}}>预留二维码</span>}
        </div>
        }
      </Modal>
    );
  }
}
