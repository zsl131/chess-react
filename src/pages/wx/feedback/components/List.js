import React from 'react';
import ReactDOM from 'react-dom';
import styles from './list.css';
import WeixinPage from "../../../../components/WeixinPage";

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
    const {dataSource, totalPage, onReply,} = this.props;

    const SingleFeedback = (item) => {
      return (
        <div className={styles.singleObj}>
          <p className={styles.createTime}><span>{item.createTime}</span></p>
          <div className={styles.content} onClick={()=>onReply(item)}>
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

    return (
      <div className={styles.mainDiv}>
        {
          (dataSource && dataSource.length>0)?
            <div>
              {dataSource.map((item) => {
                return (<SingleFeedback key={item.id} {...item}/>)
              })}
              <div>
                &nbsp;
                <WeixinPage {...this.props} totalPage={totalPage}/>
              </div>
            </div>:
            <h1 ref={el => this.ptr = el} style={{"height":this.state.height+"px", "textAlign":"center"}}>
              <p style={{"color":"#dadada"}}>无任何信息</p>
            </h1>
        }

      </div>
    );
  }
}
