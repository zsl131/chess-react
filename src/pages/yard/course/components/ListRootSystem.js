import React from 'react';
import {Icon, Table} from 'antd';

export default class ListRootSystem extends React.Component {

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
      title: '分类名称',
      dataIndex: 'name'
    }];

    return (
      <div>
        <div className="listHeader">
          <h3><Icon type="bars"/> 课程体系管理<b>（{(system && system.name)?system.name:"根目录"}，{listOpts.dataSource.length}条数据）</b><span className="red">仅限2级分类</span>

          </h3>
        </div>
        {/*<Table {...listOpts} columns={columns} pagination={false}/>*/}
        <h2 style={{"textAlign":"center", "padding":"10px"}}>点击左边课程体系查看具体内容</h2>
      </div>
    );
  }

}
