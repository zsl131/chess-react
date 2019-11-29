import React from 'react';
import {Col, Icon, Modal, Row, Table} from 'antd';

export default class TeacherGradeModalOld extends React.Component {

  render() {

    const {gradeIds, gradeList, setGrade, item} = this.props;

    console.log(gradeIds);

    const columns = [{
      title: '年级名称',
      dataIndex: 'name'
    }];

    const rowSelection = {
      /*onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        onSetMenu(selectedRowKeys)
      },*/
      onSelect: (record, selected, selectedRows) => {
        // console.log(`record:${record.name},,selected:${selected}`,`selectedRows::${selectedRows}`);
        setGrade({tid: item.id, gid: record.id, flag:(selected?"1":"0")});
      },
      getCheckboxProps(record) {
        // console.log(record.id, gradeIds.includes(record.id));
        return {
          // defaultChecked: record.id === 1, // 配置默认勾选的列
          defaultChecked: (gradeIds.includes(record.id))
          // defaultChecked: false
        };
      },
    };

    return(
      <Modal {...this.props} footer={null}>
        <Row>
          <Col span={24}>
            <div className="listHeader">
              <h3><Icon type="bars"/> 年级列表<b>（勾选上即授权，不能全选）</b></h3>
            </div>
            <Table dataSource={gradeList} rowSelection={rowSelection} columns={columns}/>
          </Col>
        </Row>
      </Modal>
    );
  }
}
