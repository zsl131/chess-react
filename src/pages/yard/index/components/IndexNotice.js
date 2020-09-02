import React from "react";
import {Carousel, Icon} from "antd";
import BeautyMarquee from 'react-beauty-marquee'

import styles from "./notice.css";

class IndexNotice extends React.Component {

  state = {
  };

  render() {

    const {
      dataSource
    } = this.props;

    //console.log(dataSource)

    return(
      <div className={styles.noticeMain}>
        <div className={styles.logo}><Icon type="sound"/></div>
        <div className={styles.content}>
          <BeautyMarquee
            direction="bottom"
            vertical={true}
            stop_on_box_hover={true}
            stop_on_content_hover={false}
            reverse={true}
            desktop_speed={10}
            mobile_speed={30}
          >
            {dataSource.map((item)=> {
              return (
                <div key={item.id}>{item.content}</div>
              )
            })}
          </BeautyMarquee >
        </div>
      </div>
    );
  }
}

export default IndexNotice;
