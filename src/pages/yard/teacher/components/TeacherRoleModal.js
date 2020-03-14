import React from 'react';
import {Col, Icon, Modal, Row, Table} from 'antd';

export default class TeacherRoleModal extends React.Component {

  render() {

    const {ridList, roleList, saveAuth, item} = this.props;

   //console.log(ridList)

    const columns = [{
      title: '角色名称',
      dataIndex: 'name'
    }];

    const rowSelection = {
      /*onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        onSetMenu(selectedRowKeys)
      },*/
      onSelect: (record, selected, selectedRows) => {
        console.log(record)
        // console.log(`record:${record.name},,selected:${selected}`,`selectedRows::${selectedRows}`);
        saveAuth({tid: item.id, rid: record.id, checked:(selected?"1":"0")});
      },
      getCheckboxProps(record) {
        const include = ridList.includes(record.id);
        //console.log(record.id+"---", include);
        return {
          // defaultChecked: record.id === 1, // 配置默认勾选的列
          defaultChecked: include,
          checked: include,
          name: 'name_'+record.id
        };
      },
    };

    return(
      <Modal {...this.props} footer={null}>
        <Row>
          <Col span={24}>
            <div className="listHeader">
              <h3><Icon type="bars"/> 年级角色列表<b>（勾选上即授权，不能全选）</b></h3>
            </div>
            <Table dataSource={roleList} rowSelection={rowSelection} columns={columns}/>
          </Col>
        </Row>
      </Modal>
    );
  }
}
