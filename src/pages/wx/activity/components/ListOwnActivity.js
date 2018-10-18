import React from 'react';
import ReactDOM from 'react-dom';
import {PullToRefresh, Card, Button,Modal} from 'antd-mobile';

const alert = Modal.alert;

export default class ListOwnActivity extends React.Component {

  state = {
    height: document.documentElement.clientHeight,
  }

  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height: hei,
    }), 0);

  }

  componentWillUnmount() {
    this.props.cleanData();
  }

  render() {
    const {dataSource, onRefresh, refreshing,onDeleteApply} = this.props;

    const showAlert = (id) => {
      alert('取消报名', '确定要取消报名吗？', [
        { text: '点错了', onPress: () => {}, style: 'default' },
        { text: '确定取消', onPress: () => onDeleteApply(id) },
      ]);
    };

    const SingleObj = (item) => {
      return (
        <Card style={{"margin":"5px"}}>
          <Card.Header title={item.actTitle} extra={item.status==='0'?<Button size="small" inline onClick={()=>showAlert(item.id)}>待审核</Button>:(item.status==='1'?<span className="blue">通过</span>:<span className="red">被驳回</span>)}/>
          <Card.Body>
            <p>姓名：{item.stuName}（{item.hasCheck==='1'?<span className="blue">已签到</span>:<span className="red">未签到</span>}）</p>
            {(item.status === '1' || item.status === '0') ?
              <div>
                <p>时间：{item.holdTime}</p>
                <p>地址：{item.address}</p>
              </div> :
              <div>原因：{item.rejectReason}</div>
            }
          </Card.Body>
        </Card>
      )
    }

    /*const sortDataSource = dataSource.sort((o1, o2)=> {
      const val1 = o1.id, val2 = o2.id;
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    });*/

    return (
      <div >
        {
          (dataSource && dataSource.length>0)?
            <PullToRefresh
              damping={60}
              ref={el => this.ptr = el}
              style={{
                height: this.state.height,
                overflow: 'auto',
              }}
              indicator={{ deactivate: '下拉可以刷新' }}
              direction={'down'}
              refreshing={refreshing}
              onRefresh={onRefresh}
            >
              {dataSource.map((item) => {
                return (<SingleObj key={item.id} {...item}/>)
              })}
            </PullToRefresh>:
            <h1 ref={el => this.ptr = el} style={{"height":this.state.height+"px", "textAlign":"center"}}>
              <p style={{"color":"#dadada"}}>无任何信息</p>
            </h1>
        }

      </div>
    );
  }
}
