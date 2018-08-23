import React from 'react';
import {Button, List} from 'antd-mobile';
import SignBtn from "./SignBtn";

const Item = List.Item;
const Brief = Item.Brief;

const ListRecord = ({
  dataSource,
  onCheck,
  loading
}) => {

  const handleSign = (obj) => {
    console.log(obj);
  }

  const OptBtn = (obj) => {
    return (
      <div>
        {obj.hasCheck === '1' ?<span className="blue">已签到</span>:<Button inline type="primary" onClick={()=>handleSign(obj)}>签到</Button>}
      </div>
    );
  }

  const SingleItem = (item) => {
    return (
      <Item multipleLine extra={<SignBtn item={item} onClick={onCheck} loading={loading}/>}>
        {item.stuName} <Brief>{item.status === '1'?<span className="blue">审核通过</span>:(item.status === '0'?<span className="green">未审核</span>:<span className="red">申请被驳回：{item.rejectReason}</span>)}</Brief>
      </Item>
    )
  }

  return (
    <List renderHeader={() => '我的申请'} className="my-list">
      {dataSource.map((item)=> (<SingleItem key={item.id} {...item}/>))}
    </List>
  );
}

export default ListRecord;
