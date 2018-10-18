import React from 'react';
import ReactDOM from 'react-dom';
import styles from './feedbacks.css';
import {PullToRefresh} from 'antd-mobile';

export default class Feedbacks extends React.Component {

  state = {
    height: document.documentElement.clientHeight,
    offsetTop: 0,
  }

  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height: hei,
      offsetTop: 1000,
    }), 0);

    /*this.setState({
      height: hei,
      offsetTop: -1000,
    });*/

    // let node = ReactDOM.findDOMNode(this.ptr);
    // node.offsetTop = 1000;
    // console.log(node.offsetHeight, node.offsetTop)
  }

  componentWillUnmount() {
    this.props.cleanData();
  }

  render() {
    const {dataSource, onRefresh, refreshing,} = this.props;

    const SingleFeedback = (item) => {
      return (
        <div className={styles.singleObj}>
          <p className={styles.createTime}><span>{item.createTime}</span></p>
          <div className={styles.content}>
            <div className={styles.imgDiv}><img src={item.headimgurl}/></div>
            <div className={styles.contentInfo}>
              <p>{item.nickname}</p>
              <p className={styles.con}>{item.content?item.content: '无内容'}
                <span className={styles.arrowRight}></span>
              </p>
            </div>
          </div>
          {item.reply?
            <div className={styles.replyContent}>
              <div className={styles.imgDiv}><img src={require("../../../../assets/logo.jpg")}/></div>
              <div className={styles.contentInfo}>
                <p>奇思教育</p>
                <p className={styles.con}>{item.reply}
                  <span className={styles.arrowLeft}></span>
                </p>
              </div>
            </div>:""
          }
        </div>
      )
    }

    const sortDataSource = dataSource.sort((o1, o2)=> {
      const val1 = o1.id, val2 = o2.id;
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    });

    return (
      <div className={styles.mainDiv}>
        {
          (dataSource && dataSource.length>0)?
            <PullToRefresh
              damping={60}
              ref={el => this.ptr = el}
              style={{
                height: this.state.height,
                overflow: 'auto',
                scrollY: this.state.offsetTop,
                offsetTop: this.state.offsetTop,
              }}
              indicator={{ deactivate: '下拉可以刷新' }}
              direction={'down'}
              refreshing={refreshing}
              onRefresh={onRefresh}
            >
              {sortDataSource.map((item) => {
                return (<SingleFeedback key={item.id} {...item}/>)
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
