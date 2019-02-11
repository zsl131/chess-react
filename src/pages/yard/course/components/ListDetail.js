import React from 'react';
import {Icon, Table} from 'antd';

export default class ListDetail extends React.Component {

  state = {
    addVisible: false,
    updateVisible: false,
    item:{},
  }

  render() {
    const {
      system,
      ...listOpts
    } = this.props;

    const columns = [{
      title: '序号',
      dataIndex: 'orderNo'
    }, {
      title: '名称',
      // dataIndex: 'sectionNo'
      render:(record) => {
        return (
          <div>
            <p><span>{record.sectionNo}-{record.name}</span></p>
            <p>{record.inRange === '1'?<span className="blue">在课标范围</span>:<span className="red">不在课标范围</span>}</p>
          </div>
        )
      }
    }, {
      title: '对应课程',
      render:(record) => {
        return(
          record.courseId?
            <div>
              <p>标题：{record.courseTitle}</p>
              <p>目标：{record.courseTarget}</p>
            </div>:"未分配"

        );
      }
    }];

    return (
      <div>
        <div className="listHeader">
          <h3><Icon type="bars"/> 课程体系内容管理<b>（{system.name}，{listOpts.dataSource.length}条数据）</b></h3>
        </div>
        <Table {...listOpts} columns={columns} pagination={false}/>
      </div>
    );
  }

}
