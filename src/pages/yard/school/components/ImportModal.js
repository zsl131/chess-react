import React from 'react';
import {Button, Form, Icon, message, Modal, Upload} from 'antd';

const ImportModal = ({
  item,
  ...modalProps
}) => {

  const modalOpts = {
    ...modalProps,
  }

  const uploadButton = (
    <div>
      <Button type="primary">
      <Icon type='upload' />
      选择Excel文件上传
      </Button>
    </div>
  );

  const downModule = () => {
    var win = window.open("/api/download?from=1&filename=teachers.xlsx", '_blank');
    win.focus();
  }

  const handleChange = (file) => {
    console.log(file, file.file.status)
    if(file.file.status==='done') {
      message.success(file.file.response);
    }
  }

  return(
    <Modal {...modalOpts}>
      <Upload
        action="/api/yardUpload/importTeachers"
        data={{'schoolId':item.id}}
        onChange={handleChange}
        accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      >
        {uploadButton}
      </Upload>
      <div style={{"marginTop":'12px'}}>
      <Button type="dashed" onClick={downModule}>
        <Icon type='download'/>
        下载Excel模板
      </Button>
      </div>
    </Modal>
  );
}

export default Form.create()(ImportModal);
