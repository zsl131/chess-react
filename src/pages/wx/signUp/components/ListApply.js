import React from 'react';
import {Modal, List, Icon, Toast} from 'antd-mobile';
import styles from './listStudent.css';

const alert = Modal.alert;
const Item = List.Item;
const Brief = Item.Brief;
export default class ListApply extends React.Component {

  deleteAlert = (stu) => {
    if(stu.status === '0') {
      const alertInstance = alert("取消报名", "确定取消["+stu.stuName+"]的报名吗？", [
        {text: "关闭", onPress: ()=> {onClose()}, style: 'default'},
        {text: "确定", onPress: ()=> {this.props.onDeleteApply(stu.id); onClose()}}
      ]);
      const onClose = () => alertInstance.close();
    } else {
      Toast.info("当前状态不能取消报名");
    }
  }

  render() {
    const SingleApplyList = ({item}) => {
      return (
        <Item multipleLine extra={<Icon type="cross" onClick={()=>this.deleteAlert(item)} />}>
          {item.stuName}
          <Brief>
            {item.status === '0' ? <span>待审核</span>: (item.status==='1'?<span className="blue">[{item.rejectReason}]审核通过，请准时参加</span>:<span className="red">被驳回[{item.rejectReason}]</span>)}
          </Brief>
        </Item>
      );
    }

    const dataSource = this.props.dataSource;
    return (
      <div className={styles.mainContainer}>
        { (dataSource === undefined || dataSource.length<=0)? '':
          <List renderHeader={() => '我的报名信息'}>
            {
              dataSource.map((item) => {
                return <SingleApplyList item={item} key={item.id}/>
              })
            }
          </List>
        }
      </div>
    );
  }
}
