import React from 'react';
import {Button, Modal, Popconfirm} from 'antd';
import styles from "./image.css";

export default class QrModal extends React.Component {
  state = {
    qrList: this.props.qrList
  };

  render() {

    const {
      onOk,
      record,
      ...modalProps
    } = this.props;

    // console.log(record)

    const {qrList} = this.state;
    const handleOk = (e) => {
      onOk();
    };

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    };

    const deleteImage = (obj) => {
      this.props.deleteImage(obj.id);
      let newData = [];
      this.state.imageList.map((item)=> {
        if(item.id!==obj.id) {newData.push(item);}
      })
      this.setState({imageList: newData});
    };

    const buildQr = (data) => {
      console.log("---------------")
      this.props.buildQr();
    };

    return(
      <Modal {...modalOpts} style={{ "minWidth": '80%', top: 20 }}>
        {/*<PictureWall fileListLength={20} onBeforeUpload={onBeforeUpload} accept="image/png, image/jpeg, image/gif" showMsg="上传图片" data={{'path':'abcdef'}} onFileChange={onFileChange}/>*/}

        <Popconfirm title="确定要生成所有用户的推荐码吗？" onConfirm={()=>buildQr()}><Button type="primary">生成已有用户的推荐码</Button></Popconfirm>
        <div><div className={styles.imageMain}>
          {
            qrList.map((item)=>{
              return (
                <div className={styles.singleImage} key={item.id}>
                  <img src={"/"+item.qrPath}/>
                  <p>{item.name}-{item.phone}</p>
                </div>
              )
            })
          }
        </div></div>
        {(!qrList||qrList.length<=0) && <b className="red">还没有生成任何推荐码</b>}
      </Modal>
    );
  }
}
