import React from 'react';
import {connect} from 'dva';
import {Button, Card, Col, Form, Icon, Input, message, Row, Switch} from 'antd';

import styles from './index.css';
import PictureWall from "../../../components/PictureWall";

const FormItem = Form.Item;

const imgRef = React.createRef();
const imgConRef = React.createRef();
@Form.create()
class ShareConfig extends React.Component {

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
    setTimeout(()=>{
      const { setFieldsValue } = this.props.form;
      // console.log(this.props, this.props.shareConfig.item)
      const item = this.props.shareConfig.item;
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
    }, 500) //只执行一次，延时1秒执行

    // console.log(this.imgRef.current)
  }

  render() {

    const {validateFieldsAndScroll, setFieldsValue, getFieldValue, getFieldDecorator} = this.props.form;
    const {imgPath, fileList, needShow, qrSize, startPoint} = this.state;

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
        values.status = values.status?"1":"0";
        if(!errors) {
          this.props.dispatch({ type: 'shareConfig/save', payload: values });
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

    /*const checkShow = () => {
      const imgPath = getFieldValue("imgPath");
      if(imgPath) {
        let scale = 1;
        getImgSize(imgPath).then((size) => {
          try {
            const width = imgConRef.current.clientWidth;
            scale = width / size.width;

            const startX = getFieldValue("startX");
            const startY = getFieldValue("startY");
            const endX = getFieldValue("endX");
            const endY = getFieldValue("endY");
            if(startX === undefined||startY === undefined||endX === undefined||endY === undefined) {
              return false;
            }
            const realQrSize = {width: Math.abs(endX - startX), height: Math.abs(endY - startY)};
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
    };*/

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

    return (
      <div>
        <div className="listHeader">
          <h3><Icon type="edit"/> 推广配置管理</h3>
        </div>
        <div className={styles.mainContainer}>
          <Card>
            <Form onSubmit={handleOk} layout="horizontal" loading={this.props.loading.effects['shareConfig/config']}>
              {getFieldDecorator("id")(<Input type="hidden"/>)}
              {getFieldDecorator('imgPath')(<Input type="hidden" />)}
              <FormItem {...formItemLayout} label="推广图片">
                <PictureWall fileList={fileList} onBeforeUpload={onBeforeUpload} accept="image/png, image/jpeg, image/gif" showMsg="推广图片" data={{'path':'abcdef', "extra":'{"scale":"false"}'}} onFileChange={onFileChange}/>
                <span style={{"color":"#999"}}>请预留好推广二维码的位置，输入以下起始点坐标后，查看下方红色方框是否刚好在预留的推广二维码位置</span>
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

              <FormItem className={styles.submitOper}>
                <Button className={styles.submitBtn} htmlType="submit" type="primary" icon="check">提交保存</Button>
              </FormItem>
            </Form>
            {imgPath &&
            <div className={styles.imgDiv} id="showImgDiv" ref={imgRef}>
              <img ref={imgConRef} src={this.state.imgPath} onLoad={loadedImg}/>
              {needShow && <span className={styles.qrSpan} style={{width: qrSize.width, height: qrSize.height, lineHeight: qrSize.height+"px", left: startPoint.x, top: startPoint.y}}>预留二维码</span>}
            </div>
            }

          </Card>
        </div>
      </div>
    );
  }
}

export default connect(({ shareConfig, loading }) => ({ shareConfig, loading }))(ShareConfig);
